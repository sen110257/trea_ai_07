<script setup>
const props = defineProps({
  percentage: {
    type: Number,
    default: 0
  },
  bmiLevel: {
    type: Object,
    default: null
  },
  bmi: {
    type: Number,
    default: null
  }
})

const ringSize = 160
const strokeWidth = 12
const radius = (ringSize - strokeWidth) / 2
const circumference = 2 * Math.PI * radius

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
  }
  return '82, 196, 26'
}
</script>

<template>
  <div class="progress-ring-wrapper">
    <div class="progress-ring">
      <svg class="progress-ring-svg" :viewBox="`0 0 ${ringSize} ${ringSize}`">
        <circle
          class="progress-ring-bg"
          :cx="ringSize / 2"
          :cy="ringSize / 2"
          :r="radius"
          :stroke-width="strokeWidth"
        />
        <circle
          class="progress-ring-fill"
          :cx="ringSize / 2"
          :cy="ringSize / 2"
          :r="radius"
          :stroke-width="strokeWidth"
          :stroke="bmiLevel?.color || '#52c41a'"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="circumference - (percentage / 100) * circumference"
        />
      </svg>
      
      <div class="progress-ring-text">
        <div class="ring-bmi-value" :style="{ color: bmiLevel?.color || '#52c41a' }">
          {{ bmi || '--' }}
        </div>
        <div class="ring-bmi-label">BMI 指数</div>
        <div class="ring-level-badge" v-if="bmiLevel" :style="{ backgroundColor: `rgba(${hexToRgb(bmiLevel.color)}, 0.1)`, color: bmiLevel.color }">
          {{ bmiLevel.name }}
        </div>
      </div>
    </div>
    
    <div class="ring-info">
      <div class="ring-info-item">
        <span class="ring-info-label">最低</span>
        <span class="ring-info-value underweight">18.5</span>
      </div>
      <div class="ring-info-item">
        <span class="ring-info-label">标准</span>
        <span class="ring-info-value normal">18.5-24</span>
      </div>
      <div class="ring-info-item">
        <span class="ring-info-label">最高</span>
        <span class="ring-info-value obesity">30+</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.progress-ring-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.progress-ring {
  position: relative;
  width: 160px;
  height: 160px;
}

.progress-ring-svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
}

.progress-ring-bg {
  fill: none;
  stroke: #f0f0f0;
  stroke-width: 12;
}

.progress-ring-fill {
  fill: none;
  stroke-width: 12;
  stroke-linecap: round;
  transition: stroke-dashoffset 0.8s ease, stroke 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.progress-ring-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
}

.ring-bmi-value {
  font-size: 36px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 4px;
}

.ring-bmi-label {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: 6px;
}

.ring-level-badge {
  display: inline-block;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: var(--radius-full);
  background: rgba(82, 196, 26, 0.1);
}

.ring-info {
  display: flex;
  gap: 24px;
  width: 100%;
  justify-content: center;
}

.ring-info-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ring-info-label {
  font-size: 11px;
  color: var(--text-tertiary);
}

.ring-info-value {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
}

.ring-info-value.underweight {
  color: #1890ff;
}

.ring-info-value.normal {
  color: #52c41a;
}

.ring-info-value.obesity {
  color: #ff4d4f;
}

@media (max-width: 375px) {
  .progress-ring {
    width: 140px;
    height: 140px;
  }
  
  .ring-bmi-value {
    font-size: 32px;
  }
  
  .ring-info {
    gap: 16px;
  }
}
</style>
