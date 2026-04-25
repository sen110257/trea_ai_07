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
  gap: 24px;
  padding: 8px;
}

.progress-ring {
  position: relative;
  width: 200px;
  height: 200px;
}

.progress-ring-svg {
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 12px rgba(82, 201, 169, 0.15));
}

.progress-ring-bg {
  fill: none;
  stroke: linear-gradient(135deg, #f0f0f0, #f8f8f8);
  stroke-width: 16;
  stroke-linecap: round;
}

.progress-ring-fill {
  fill: none;
  stroke-width: 16;
  stroke-linecap: round;
  transition: stroke-dashoffset 1s cubic-bezier(0.34, 1.56, 0.64, 1), stroke 0.5s ease;
  filter: drop-shadow(0 2px 8px currentColor);
}

.progress-ring-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  width: 100%;
  padding: 16px;
}

.ring-bmi-value {
  font-size: 52px;
  font-weight: 800;
  line-height: 1;
  margin-bottom: 8px;
  text-shadow: 0 4px 16px currentColor;
  letter-spacing: -2px;
}

.ring-bmi-label {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-bottom: 10px;
  font-weight: 500;
  letter-spacing: 1px;
}

.ring-level-badge {
  display: inline-block;
  padding: 8px 20px;
  font-size: 15px;
  font-weight: 700;
  border-radius: var(--radius-full);
  border: 2px solid currentColor;
  box-shadow: 0 4px 16px currentColor;
}

.ring-info {
  display: flex;
  gap: 32px;
  width: 100%;
  justify-content: center;
  padding: 16px 24px;
  background: linear-gradient(135deg, rgba(82, 201, 169, 0.03) 0%, rgba(105, 177, 255, 0.03) 100%);
  border-radius: var(--radius-xl);
  border: 1px solid rgba(82, 201, 169, 0.08);
}

.ring-info-item {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ring-info-label {
  font-size: 12px;
  color: var(--text-tertiary);
  font-weight: 500;
  letter-spacing: 0.5px;
}

.ring-info-value {
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
}

.ring-info-value.underweight {
  color: #69b1ff;
}

.ring-info-value.normal {
  color: #52c9a9;
}

.ring-info-value.obesity {
  color: #ff7875;
}

@media (max-width: 375px) {
  .progress-ring {
    width: 160px;
    height: 160px;
  }
  
  .ring-bmi-value {
    font-size: 42px;
  }
  
  .ring-info {
    gap: 20px;
    padding: 12px 16px;
  }
  
  .ring-info-value {
    font-size: 14px;
  }
}
</style>
