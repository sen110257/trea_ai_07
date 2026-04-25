<script setup>
import { computed } from 'vue'
import { AGE_REFERENCES } from '../utils/bmi'

const props = defineProps({
  ageReference: {
    type: Object,
    default: null
  },
  currentBMI: {
    type: Number,
    default: null
  }
})

const allAgeGroups = Object.values(AGE_REFERENCES)

const isBMIIdeal = computed(() => {
  if (!props.ageReference || props.currentBMI === null) {
    return null
  }
  return props.currentBMI >= props.ageReference.bmiMin && props.currentBMI <= props.ageReference.bmiMax
})

const bmiStatus = computed(() => {
  if (!props.ageReference || props.currentBMI === null) {
    return null
  }
  if (props.currentBMI < props.ageReference.bmiMin) {
    return '偏低'
  } else if (props.currentBMI > props.ageReference.bmiMax) {
    return '偏高'
  }
  return '正常'
})

function getBarPercent(value) {
  const min = 14
  const max = 28
  const percent = ((value - min) / (max - min)) * 100
  return `${Math.max(0, Math.min(100, percent))}%`
}

function getBarWidth(min, max) {
  const totalRange = 28 - 14
  const width = ((max - min) / totalRange) * 100
  return `${Math.max(0, Math.min(100, width))}%`
}
</script>

<template>
  <div class="age-reference-section card mb-4" v-if="ageReference">
    <div class="card-header">
      <div class="section-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
        <div class="section-title-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
            <line x1="9" y1="14" x2="15" y2="14" />
          </svg>
        </div>
        <span class="section-title-text">年龄段健康参考</span>
      </div>
    </div>
    
    <div class="card-body">
      <div class="age-group-badge">
        <span class="age-group-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M12 14v8M8 22h8" />
          </svg>
        </span>
        <span class="age-group-name">{{ ageReference.name }}</span>
      </div>
      
      <div class="reference-range">
        <div class="range-header">
          <span class="range-label">BMI 参考范围</span>
          <span class="range-status" :class="{ 
            'status-normal': bmiStatus === '正常',
            'status-low': bmiStatus === '偏低',
            'status-high': bmiStatus === '偏高'
          }" v-if="bmiStatus">
            {{ bmiStatus }}
          </span>
        </div>
        <div class="range-values">
          <div class="range-value-item">
            <span class="range-value-num">{{ ageReference.bmiMin }}</span>
            <span class="range-value-label">最低</span>
          </div>
          <div class="range-separator">
            <span class="separator-text">-</span>
          </div>
          <div class="range-value-item">
            <span class="range-value-num">{{ ageReference.bmiMax }}</span>
            <span class="range-value-label">最高</span>
          </div>
        </div>
      </div>
      
      <div class="range-bar" v-if="currentBMI !== null">
        <div class="range-bar-track">
          <div class="range-bar-ideal" :style="{
            left: getBarPercent(ageReference.bmiMin),
            width: getBarWidth(ageReference.bmiMin, ageReference.bmiMax)
          }"></div>
          <div class="range-bar-marker" :style="{ left: getBarPercent(currentBMI) }">
            <div class="marker-dot" :class="{
              'dot-normal': bmiStatus === '正常',
              'dot-low': bmiStatus === '偏低',
              'dot-high': bmiStatus === '偏高'
            }"></div>
            <div class="marker-value">{{ currentBMI }}</div>
          </div>
        </div>
      </div>
      
      <div class="reference-description">
        <div class="desc-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>
        <p class="desc-text">{{ ageReference.description }}</p>
      </div>
      
      <div class="age-groups-grid">
        <div class="age-group-item" v-for="group in allAgeGroups" :key="group.name" :class="{ active: group.name === ageReference.name }">
          <span class="group-label">{{ group.name }}</span>
          <span class="group-range">{{ group.bmiMin }} - {{ group.bmiMax }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.age-reference-section {
  background: linear-gradient(135deg, #ffffff 0%, #e6f7ff 100%);
}

.age-group-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.1) 0%, rgba(64, 169, 255, 0.1) 100%);
  border-radius: var(--radius-full);
  margin-bottom: 16px;
}

.age-group-icon {
  width: 24px;
  height: 24px;
  color: #1890ff;
}

.age-group-icon svg {
  width: 100%;
  height: 100%;
}

.age-group-name {
  font-size: 15px;
  font-weight: 600;
  color: #096dd9;
}

.reference-range {
  padding: 16px;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  margin-bottom: 16px;
}

.range-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.range-label {
  font-size: 13px;
  color: var(--text-secondary);
}

.range-status {
  font-size: 12px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: var(--radius-full);
}

.status-normal {
  background: rgba(82, 196, 26, 0.1);
  color: #389e0d;
}

.status-low {
  background: rgba(24, 144, 255, 0.1);
  color: #096dd9;
}

.status-high {
  background: rgba(255, 77, 79, 0.1);
  color: #cf1322;
}

.range-values {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.range-value-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 20px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.range-value-num {
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
}

.range-value-label {
  font-size: 11px;
  color: var(--text-tertiary);
}

.range-separator {
  display: flex;
  align-items: center;
  justify-content: center;
}

.separator-text {
  font-size: 24px;
  font-weight: 300;
  color: var(--text-tertiary);
}

.range-bar {
  margin-bottom: 16px;
  padding: 16px;
  background: var(--bg-primary);
  border-radius: var(--radius-md);
}

.range-bar-track {
  position: relative;
  height: 8px;
  background: #f0f0f0;
  border-radius: var(--radius-full);
}

.range-bar-ideal {
  position: absolute;
  top: 0;
  height: 100%;
  background: linear-gradient(90deg, #95de64, #52c41a);
  border-radius: var(--radius-full);
}

.range-bar-marker {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.marker-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.dot-normal {
  background: #52c41a;
}

.dot-low {
  background: #1890ff;
}

.dot-high {
  background: #ff4d4f;
}

.marker-value {
  font-size: 10px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-top: 2px;
  white-space: nowrap;
}

.reference-description {
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  background: #e6f7ff;
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.desc-icon {
  width: 20px;
  height: 20px;
  color: #1890ff;
  flex-shrink: 0;
  margin-top: 2px;
}

.desc-icon svg {
  width: 100%;
  height: 100%;
}

.desc-text {
  font-size: 13px;
  color: #096dd9;
  line-height: 1.5;
}

.age-groups-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.age-group-item {
  padding: 10px 12px;
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-light);
  display: flex;
  flex-direction: column;
  gap: 2px;
  transition: all var(--transition-fast);
}

.age-group-item.active {
  border-color: #1890ff;
  background: rgba(24, 144, 255, 0.05);
}

.group-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-primary);
}

.group-range {
  font-size: 11px;
  color: var(--text-tertiary);
}

@media (max-width: 375px) {
  .range-values {
    gap: 8px;
  }
  
  .range-value-item {
    padding: 8px 12px;
  }
  
  .range-value-num {
    font-size: 20px;
  }
  
  .age-groups-grid {
    grid-template-columns: 1fr;
  }
}
</style>
