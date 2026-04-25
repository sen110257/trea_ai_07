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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(246, 255, 237, 0.95) 100%);
}

.bmi-result-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
  padding: 16px;
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
}

.bmi-value-display {
  text-align: left;
}

.bmi-value-label {
  font-size: var(--font-size-sm);
  color: var(--text-tertiary);
  margin-bottom: 4px;
}

.bmi-value-number {
  font-size: 48px;
  font-weight: 700;
  line-height: 1;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.bmi-level-display {
  text-align: right;
}

.bmi-level-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  border-radius: var(--radius-full);
  border: 2px solid;
  background: rgba(82, 196, 26, 0.1);
}

.bmi-level-text {
  font-size: var(--font-size-xl);
  font-weight: 700;
}

.bmi-result-description {
  margin-bottom: 20px;
}

.bmi-description-text {
  font-size: var(--font-size-base);
  color: var(--text-secondary);
  text-align: center;
  padding: 12px 16px;
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--primary-light);
}

.bmi-scale {
  padding: 16px;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
}

.bmi-scale-title {
  font-size: var(--font-size-sm);
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 12px;
  text-align: center;
}

.bmi-scale-bar {
  position: relative;
  height: 12px;
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 12px;
}

.bmi-scale-segment {
  position: absolute;
  top: 0;
  height: 100%;
}

.bmi-scale-segment.underweight {
  left: 0;
  width: 14%;
}

.bmi-scale-segment.normal {
  left: 14%;
  width: 22%;
}

.bmi-scale-segment.overweight {
  left: 36%;
  width: 12%;
}

.bmi-scale-segment.obesity {
  left: 48%;
  width: 52%;
}

.bmi-scale-marker {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.bmi-scale-labels {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  padding: 0 8px;
}

.bmi-scale-label-value {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

.bmi-scale-legend {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.bmi-legend-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.bmi-legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.bmi-legend-text {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
}

@media (max-width: 375px) {
  .bmi-result-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  
  .bmi-level-display {
    text-align: left;
  }
  
  .bmi-value-number {
    font-size: 40px;
  }
  
  .bmi-scale {
    padding: 12px;
  }
}
</style>
