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
  background: linear-gradient(135deg, #ffffff 0%, #f0fff4 100%);
}

.ideal-weight-main {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, rgba(82, 196, 26, 0.05) 0%, rgba(149, 222, 100, 0.05) 100%);
  border-radius: var(--radius-lg);
  margin-bottom: 16px;
}

.ideal-weight-value {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 4px;
}

.ideal-weight-number {
  font-size: 40px;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
}

.ideal-weight-unit {
  font-size: 16px;
  color: var(--text-tertiary);
  font-weight: 500;
}

.ideal-weight-label {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 8px;
}

.weight-range {
  background: var(--bg-secondary);
  padding: 16px;
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.range-title {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: 8px;
}

.range-values {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 8px;
}

.range-min, .range-max {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}

.range-separator {
  font-size: 20px;
  color: var(--text-tertiary);
}

.range-unit {
  font-size: 12px;
  color: var(--text-tertiary);
}

.weight-comparison {
  margin-bottom: 16px;
}

.comparison-bar {
  margin-bottom: 16px;
}

.comparison-track {
  position: relative;
  height: 8px;
  background: #f0f0f0;
  border-radius: var(--radius-full);
  margin: 20px 0;
}

.comparison-range {
  position: absolute;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, #95de64, #52c41a);
  border-radius: var(--radius-full);
}

.comparison-marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 4px;
}

.marker-dot-normal {
  background: #52c41a;
}

.marker-dot-over {
  background: #ff4d4f;
}

.marker-dot-under {
  background: #1890ff;
}

.marker-label {
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 500;
  white-space: nowrap;
}

.comparison-result {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  font-size: 14px;
}

.result-normal {
  background: rgba(82, 196, 26, 0.1);
  color: #389e0d;
}

.result-over {
  background: rgba(255, 77, 79, 0.1);
  color: #cf1322;
}

.result-under {
  background: rgba(24, 144, 255, 0.1);
  color: #096dd9;
}

.result-icon {
  font-size: 16px;
}

.result-text strong {
  font-weight: 600;
}

.weight-tips {
  padding: 12px 16px;
  background: #fffbe6;
  border-radius: var(--radius-md);
  border-left: 3px solid #faad14;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.tip-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.tip-text {
  font-size: 12px;
  color: #8c6500;
  line-height: 1.5;
}

@media (max-width: 375px) {
  .ideal-weight-number {
    font-size: 32px;
  }
  
  .range-min, .range-max {
    font-size: 18px;
  }
}
</style>
