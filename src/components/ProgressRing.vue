<script setup>
import { computed, watch, ref, onMounted } from 'vue'

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

const ringSize = 200
const strokeWidth = 16
const radius = (ringSize - strokeWidth) / 2
const circumference = 2 * Math.PI * radius

const animatedPercentage = ref(0)
const animationFrame = ref(null)

const gradientId = computed(() => `ring-gradient-${Math.random().toString(36).substr(2, 9)}`)

const currentGradient = computed(() => {
  if (!props.bmiLevel) {
    return {
      start: '#83d9c2',
      end: '#52c9a9'
    }
  }
  return {
    start: props.bmiLevel.colorLight || props.bmiLevel.color,
    end: props.bmiLevel.color
  }
})

function animatePercentage(from, to, duration = 1200) {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value)
  }
  
  const startValue = from
  const targetValue = to
  const startTime = performance.now()
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    const easeOutCubic = 1 - Math.pow(1 - progress, 3)
    const currentValue = startValue + (targetValue - startValue) * easeOutCubic
    
    animatedPercentage.value = currentValue
    
    if (progress < 1) {
      animationFrame.value = requestAnimationFrame(animate)
    }
  }
  
  animationFrame.value = requestAnimationFrame(animate)
}

const strokeDashoffset = computed(() => {
  return circumference - (animatedPercentage.value / 100) * circumference
})

watch([() => props.percentage], ([newPercentage], [oldPercentage]) => {
  if (newPercentage !== undefined) {
    animatePercentage(animatedPercentage.value, newPercentage)
  }
}, { immediate: false })

onMounted(() => {
  if (props.percentage > 0) {
    animatePercentage(0, props.percentage)
  }
})
</script>

<template>
  <div class="progress-ring-wrapper">
    <div class="progress-ring">
      <svg class="progress-ring-svg" :viewBox="`0 0 ${ringSize} ${ringSize}`">
        <defs>
          <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" :style="`stop-color: ${currentGradient.start}; stop-opacity: 1`" />
            <stop offset="100%" :style="`stop-color: ${currentGradient.end}; stop-opacity: 1`" />
          </linearGradient>
        </defs>
        
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
          :stroke="`url(#${gradientId})`"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="strokeDashoffset"
          :style="{
            filter: `drop-shadow(0 4px 12px ${bmiLevel?.color || '#52c9a9'}50)`
          }"
        />
      </svg>
      
      <div class="progress-ring-text">
        <div 
          class="ring-bmi-value" 
          :style="{ 
            color: bmiLevel?.color || '#52c9a9',
            textShadow: `0 4px 20px ${bmiLevel?.color || '#52c9a9'}40`
          }"
        >
          {{ bmi !== null ? Number(bmi).toFixed(1) : '--' }}
        </div>
        <div class="ring-bmi-label">BMI 指数</div>
        <div 
          v-if="bmiLevel" 
          class="ring-level-badge" 
          :style="{ 
            backgroundColor: `linear-gradient(135deg, ${bmiLevel.color}20 0%, ${bmiLevel.color}10 100%)`,
            color: bmiLevel.color,
            borderColor: bmiLevel.color,
            boxShadow: `0 4px 20px ${bmiLevel.color}40`
          }"
        >
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
}

.progress-ring-bg {
  fill: none;
  stroke: linear-gradient(135deg, #f5f5f5, #fafafa);
  stroke-width: 16;
  stroke-linecap: round;
}

.progress-ring-fill {
  fill: none;
  stroke-width: 16;
  stroke-linecap: round;
  transition: stroke 0.6s ease;
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
  border: 2px solid;
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
