<script setup>
import { computed } from 'vue'

const props = defineProps({
  bmi: {
    type: Number,
    default: null
  },
  bmiLevel: {
    type: Object,
    default: null
  }
})

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
  }
  return '82, 196, 26'
}

function getMarkerPosition(bmi) {
  let position
  if (bmi <= 15) {
    position = 0
  } else if (bmi >= 40) {
    position = 100
  } else {
    position = ((bmi - 15) / 25) * 100
  }
  return `${Math.max(0, Math.min(100, position))}%`
}
</script>

<template>
  <div class="bmi-result-section card mb-4" v-if="bmi !== null && bmiLevel !== null">
    <div class="card-body">
      <div class="bmi-result-header">
        <div class="section-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
          <div class="section-title-icon" :style="{ background: `rgba(${hexToRgb(bmiLevel.color)}, 0.1)`, color: bmiLevel.color }">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <span class="section-title-text">测评结果</span>
        </div>
      </div>
      
      <div class="bmi-result-content">
        <div class="bmi-value-display">
          <div class="bmi-value-label">您的 BMI 指数</div>
          <div class="bmi-value-number" :style="{ color: bmiLevel.color }">
            {{ bmi }}
          </div>
        </div>
        
        <div class="bmi-level-display">
          <div class="bmi-level-badge" :style="{ backgroundColor: `rgba(${hexToRgb(bmiLevel.color)}, 0.1)`, color: bmiLevel.color, borderColor: bmiLevel.color }">
            <span class="bmi-level-text">{{ bmiLevel.name }}</span>
          </div>
        </div>
      </div>
      
      <div class="bmi-result-description">
        <p class="bmi-description-text">{{ bmiLevel.description }}</p>
      </div>
      
      <div class="bmi-scale">
        <div class="bmi-scale-title">BMI 健康标尺</div>
        <div class="bmi-scale-bar">
          <div class="bmi-scale-segment underweight" style="background: linear-gradient(90deg, #1890ff, #40a9ff)"></div>
          <div class="bmi-scale-segment normal" style="background: linear-gradient(90deg, #40a9ff, #52c41a)"></div>
          <div class="bmi-scale-segment overweight" style="background: linear-gradient(90deg, #52c41a, #faad14)"></div>
          <div class="bmi-scale-segment obesity" style="background: linear-gradient(90deg, #faad14, #ff4d4f)"></div>
          <div class="bmi-scale-marker" :style="{ left: getMarkerPosition(bmi), backgroundColor: bmiLevel.color }"></div>
        </div>
        <div class="bmi-scale-labels">
          <div class="bmi-scale-label">
            <span class="bmi-scale-label-value">18.5</span>
          </div>
          <div class="bmi-scale-label">
            <span class="bmi-scale-label-value">24</span>
          </div>
          <div class="bmi-scale-label">
            <span class="bmi-scale-label-value">27</span>
          </div>
          <div class="bmi-scale-label">
            <span class="bmi-scale-label-value">30</span>
          </div>
        </div>
        <div class="bmi-scale-legend">
          <div class="bmi-legend-item">
            <span class="bmi-legend-dot" style="background: #1890ff"></span>
            <span class="bmi-legend-text">偏瘦</span>
          </div>
          <div class="bmi-legend-item">
            <span class="bmi-legend-dot" style="background: #52c41a"></span>
            <span class="bmi-legend-text">标准</span>
          </div>
          <div class="bmi-legend-item">
            <span class="bmi-legend-dot" style="background: #faad14"></span>
            <span class="bmi-legend-text">微超重</span>
          </div>
          <div class="bmi-legend-item">
            <span class="bmi-legend-dot" style="background: #ff4d4f"></span>
            <span class="bmi-legend-text">超重/肥胖</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bmi-result-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 255, 249, 0.98) 100%);
  border: 1px solid rgba(82, 201, 169, 0.1);
}

.bmi-result-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 28px 0;
  padding: 24px;
  background: linear-gradient(135deg, var(--bg-secondary) 0%, rgba(82, 201, 169, 0.03) 100%);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(82, 201, 169, 0.08);
}

.bmi-value-display {
  text-align: left;
}

.bmi-value-label {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-bottom: 8px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.bmi-value-number {
  font-size: 72px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -2px;
  text-shadow: 0 4px 12px currentColor;
}

.bmi-level-display {
  text-align: right;
}

.bmi-level-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  border-radius: var(--radius-xl);
  border: 2px solid;
  background: rgba(82, 201, 169, 0.1);
  box-shadow: 0 4px 16px currentColor;
}

.bmi-level-text {
  font-size: var(--font-size-2xl);
  font-weight: 800;
  letter-spacing: 1px;
}

.bmi-result-description {
  margin-bottom: 28px;
}

.bmi-description-text {
  font-size: var(--font-size-lg);
  color: var(--text-secondary);
  text-align: center;
  padding: 16px 24px;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  border-left: 4px solid var(--primary-color);
  font-weight: 500;
  line-height: 1.7;
}

.bmi-scale {
  padding: 24px;
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-lighter);
}

.bmi-scale-title {
  font-size: var(--font-size-base);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  text-align: center;
  letter-spacing: 0.5px;
}

.bmi-scale-bar {
  position: relative;
  height: 16px;
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 16px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.bmi-scale-segment {
  position: absolute;
  top: 0;
  height: 100%;
}

.bmi-scale-segment.underweight {
  left: 0;
  width: 14%;
  background: linear-gradient(90deg, #69b1ff, #9ecfff);
}

.bmi-scale-segment.normal {
  left: 14%;
  width: 22%;
  background: linear-gradient(90deg, #83d9c2, #52c9a9);
}

.bmi-scale-segment.overweight {
  left: 36%;
  width: 12%;
  background: linear-gradient(90deg, #ffcc80, #ffb74d);
}

.bmi-scale-segment.obesity {
  left: 48%;
  width: 52%;
  background: linear-gradient(90deg, #ffa39e, #ff7875);
}

.bmi-scale-marker {
  position: absolute;
  top: 50%;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 4px solid white;
  box-shadow: 0 4px 16px currentColor;
  z-index: 10;
  transition: all var(--transition-bounce);
}

.bmi-scale-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  padding: 0 12px;
}

.bmi-scale-label-value {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 600;
}

.bmi-scale-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.bmi-legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.bmi-legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.bmi-legend-text {
  font-size: var(--font-size-sm);
  color: var(--text-secondary);
  font-weight: 500;
}

@media (max-width: 375px) {
  .bmi-result-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
  }
  
  .bmi-level-display {
    text-align: left;
  }
  
  .bmi-value-number {
    font-size: 56px;
  }
  
  .bmi-level-badge {
    padding: 12px 24px;
  }
  
  .bmi-level-text {
    font-size: var(--font-size-xl);
  }
  
  .bmi-scale {
    padding: 16px;
  }
}
</style>
