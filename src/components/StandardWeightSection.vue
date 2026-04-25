<script setup>
import { computed } from 'vue'

const props = defineProps({
  idealWeight: {
    type: Object,
    default: null
  },
  currentWeight: {
    type: Number,
    default: null
  }
})

const weightDifference = computed(() => {
  if (!props.idealWeight || props.currentWeight === null) {
    return null
  }
  const diff = props.currentWeight - props.idealWeight.ideal
  return {
    value: Math.abs(diff),
    isOverweight: diff > 0,
    isUnderweight: diff < 0,
    isNormal: Math.abs(diff) < 0.1
  }
})

function getRangePercent(value) {
  const min = 40
  const max = 120
  const percent = ((value - min) / (max - min)) * 100
  return `${Math.max(0, Math.min(100, percent))}%`
}

function getRangeWidth(min, max) {
  const totalRange = 120 - 40
  const width = ((max - min) / totalRange) * 100
  return `${Math.max(0, Math.min(100, width))}%`
}

function getWeightPercent(weight, rangeMin, rangeMax) {
  const min = 40
  const max = 120
  let percent
  if (weight <= rangeMin) {
    percent = ((weight - min) / (max - min)) * 100
  } else if (weight >= rangeMax) {
    percent = ((weight - min) / (max - min)) * 100
  } else {
    percent = ((weight - min) / (max - min)) * 100
  }
  return `${Math.max(5, Math.min(95, percent))}%`
}
</script>

<template>
  <div class="standard-weight-section card mb-4" v-if="idealWeight">
    <div class="card-header">
      <div class="section-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
        <div class="section-title-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="5" r="3" />
            <path d="M12 8v8" />
            <path d="M8 21s-4-3-4-9 4-9 4-9 4 3 4 9-4 9-4 9M16 21s4-3 4-9-4-9-4-9-4 3-4 9 4 9 4 9" />
          </svg>
        </div>
        <span class="section-title-text">标准体重参考</span>
      </div>
    </div>
    
    <div class="card-body">
      <div class="ideal-weight-main">
        <div class="ideal-weight-value">
          <span class="ideal-weight-number">{{ idealWeight.ideal }}</span>
          <span class="ideal-weight-unit">kg</span>
        </div>
        <div class="ideal-weight-label">您的理想体重</div>
      </div>
      
      <div class="weight-range">
        <div class="range-title">合理体重范围</div>
        <div class="range-values">
          <span class="range-min">{{ idealWeight.min }}</span>
          <span class="range-separator">-</span>
          <span class="range-max">{{ idealWeight.max }}</span>
          <span class="range-unit">kg</span>
        </div>
      </div>
      
      <div class="weight-comparison" v-if="weightDifference !== null && currentWeight !== null">
        <div class="comparison-bar">
          <div class="comparison-track">
            <div class="comparison-range" :style="{ 
              left: getRangePercent(idealWeight.min), 
              width: getRangeWidth(idealWeight.min, idealWeight.max) 
            }"></div>
            <div class="comparison-marker" :style="{ left: getWeightPercent(currentWeight, idealWeight.min, idealWeight.max) }">
              <div class="marker-dot" :class="{ 
                'marker-dot-normal': weightDifference.isNormal,
                'marker-dot-over': weightDifference.isOverweight,
                'marker-dot-under': weightDifference.isUnderweight
              }"></div>
              <div class="marker-label">{{ currentWeight }}kg</div>
            </div>
          </div>
        </div>
        
        <div class="comparison-result" :class="{ 
          'result-normal': weightDifference.isNormal,
          'result-over': weightDifference.isOverweight,
          'result-under': weightDifference.isUnderweight
        }">
          <template v-if="weightDifference.isNormal">
            <span class="result-icon">✓</span>
            <span class="result-text">您的体重在理想范围内</span>
          </template>
          <template v-else-if="weightDifference.isOverweight">
            <span class="result-icon">↑</span>
            <span class="result-text">超出理想体重 <strong>{{ weightDifference.value }}</strong> kg</span>
          </template>
          <template v-else>
            <span class="result-icon">↓</span>
            <span class="result-text">低于理想体重 <strong>{{ weightDifference.value }}</strong> kg</span>
          </template>
        </div>
      </div>
      
      <div class="weight-tips">
        <div class="tip-item">
          <span class="tip-icon">💡</span>
          <span class="tip-text">标准体重公式：(身高-100)×系数（男0.9，女0.85）</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.standard-weight-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 255, 249, 0.95) 100%);
  border: 1px solid rgba(82, 201, 169, 0.1);
}

.ideal-weight-main {
  text-align: center;
  padding: 32px;
  background: linear-gradient(135deg, rgba(82, 201, 169, 0.06) 0%, rgba(131, 217, 194, 0.04) 100%);
  border-radius: var(--radius-xl);
  margin-bottom: 20px;
  border: 1px solid rgba(82, 201, 169, 0.1);
}

.ideal-weight-value {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
}

.ideal-weight-number {
  font-size: 64px;
  font-weight: 800;
  color: var(--primary-color);
  line-height: 1;
  text-shadow: 0 4px 16px rgba(82, 201, 169, 0.3);
  letter-spacing: -2px;
}

.ideal-weight-unit {
  font-size: 20px;
  color: var(--text-tertiary);
  font-weight: 600;
}

.ideal-weight-label {
  font-size: 15px;
  color: var(--text-secondary);
  margin-top: 12px;
  font-weight: 500;
  letter-spacing: 1px;
}

.weight-range {
  background: var(--bg-secondary);
  padding: 20px 24px;
  border-radius: var(--radius-lg);
  margin-bottom: 20px;
  border: 1px solid var(--border-lighter);
}

.range-title {
  font-size: 13px;
  color: var(--text-tertiary);
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.range-values {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 12px;
}

.range-min, .range-max {
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
}

.range-separator {
  font-size: 28px;
  color: var(--text-tertiary);
  font-weight: 300;
}

.range-unit {
  font-size: 14px;
  color: var(--text-tertiary);
  font-weight: 500;
}

.weight-comparison {
  margin-bottom: 20px;
}

.comparison-bar {
  margin-bottom: 20px;
}

.comparison-track {
  position: relative;
  height: 12px;
  background: var(--bg-tertiary);
  border-radius: var(--radius-full);
  margin: 28px 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.04);
}

.comparison-range {
  position: absolute;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, #83d9c2, #52c9a9);
  border-radius: var(--radius-full);
}

.comparison-marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
}

.marker-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 4px solid white;
  box-shadow: 0 4px 16px currentColor;
  margin-bottom: 8px;
  transition: all var(--transition-bounce);
}

.marker-dot-normal {
  background: #52c9a9;
}

.marker-dot-over {
  background: #ff7875;
}

.marker-dot-under {
  background: #69b1ff;
}

.marker-label {
  font-size: 13px;
  color: var(--text-primary);
  font-weight: 700;
  white-space: nowrap;
  background: var(--bg-primary);
  padding: 4px 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-lighter);
}

.comparison-result {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 24px;
  border-radius: var(--radius-lg);
  font-size: 15px;
  border: 1px solid currentColor;
  box-shadow: 0 4px 16px currentColor;
}

.result-normal {
  background: linear-gradient(135deg, rgba(82, 201, 169, 0.1) 0%, rgba(131, 217, 194, 0.05) 100%);
  color: #3daa8d;
}

.result-over {
  background: linear-gradient(135deg, rgba(255, 120, 117, 0.1) 0%, rgba(255, 163, 158, 0.05) 100%);
  color: #cf1322;
}

.result-under {
  background: linear-gradient(135deg, rgba(105, 177, 255, 0.1) 0%, rgba(158, 207, 255, 0.05) 100%);
  color: #096dd9;
}

.result-icon {
  font-size: 20px;
}

.result-text strong {
  font-weight: 800;
  font-size: 18px;
}

.weight-tips {
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(255, 183, 77, 0.08) 0%, rgba(255, 204, 128, 0.04) 100%);
  border-radius: var(--radius-lg);
  border-left: 4px solid #ffb74d;
  border: 1px solid rgba(255, 183, 77, 0.15);
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.tip-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.tip-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
  font-weight: 500;
}

@media (max-width: 375px) {
  .ideal-weight-number {
    font-size: 48px;
  }
  
  .ideal-weight-main {
    padding: 24px;
  }
  
  .range-min, .range-max {
    font-size: 24px;
  }
  
  .comparison-result {
    padding: 12px 16px;
    font-size: 14px;
  }
}
</style>
