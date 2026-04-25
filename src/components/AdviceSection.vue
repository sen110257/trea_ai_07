<script setup>
import { ref } from 'vue'

const props = defineProps({
  advice: {
    type: Object,
    default: { diet: [], exercise: [], lifestyle: [] }
  },
  bmiLevel: {
    type: Object,
    default: null
  }
})

const activeTab = ref('diet')

const tabs = [
  {
    value: 'diet',
    label: '饮食',
    icon: '🍎',
    iconClass: 'icon-diet'
  },
  {
    value: 'exercise',
    label: '运动',
    icon: '🏃',
    iconClass: 'icon-exercise'
  },
  {
    value: 'lifestyle',
    label: '生活',
    icon: '🌟',
    iconClass: 'icon-lifestyle'
  }
]

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
  }
  return '82, 196, 26'
}
</script>

<template>
  <div class="advice-section card mb-4">
    <div class="card-header">
      <div class="section-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
        <div class="section-title-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <span class="section-title-text">个性化建议</span>
      </div>
    </div>
    
    <div class="card-body">
      <div class="advice-tabs">
        <button 
          v-for="tab in tabs" 
          :key="tab.value"
          class="advice-tab"
          :class="{ active: activeTab === tab.value }"
          @click="activeTab = tab.value"
        >
          <span class="tab-icon" :class="tab.iconClass">{{ tab.icon }}</span>
          <span class="tab-label">{{ tab.label }}</span>
        </button>
      </div>
      
      <div class="advice-content">
        <div class="advice-list" v-if="activeTab === 'diet' && advice.diet.length > 0">
          <div class="advice-item" v-for="(item, index) in advice.diet" :key="index">
            <span class="advice-number" :style="{ backgroundColor: `rgba(${hexToRgb(bmiLevel?.color || '#52c41a')}, 0.1)`, color: bmiLevel?.color || '#52c41a' }">{{ index + 1 }}</span>
            <span class="advice-text">{{ item }}</span>
          </div>
        </div>
        
        <div class="advice-list" v-if="activeTab === 'exercise' && advice.exercise.length > 0">
          <div class="advice-item" v-for="(item, index) in advice.exercise" :key="index">
            <span class="advice-number" :style="{ backgroundColor: `rgba(${hexToRgb(bmiLevel?.color || '#52c41a')}, 0.1)`, color: bmiLevel?.color || '#52c41a' }">{{ index + 1 }}</span>
            <span class="advice-text">{{ item }}</span>
          </div>
        </div>
        
        <div class="advice-list" v-if="activeTab === 'lifestyle' && advice.lifestyle.length > 0">
          <div class="advice-item" v-for="(item, index) in advice.lifestyle" :key="index">
            <span class="advice-number" :style="{ backgroundColor: `rgba(${hexToRgb(bmiLevel?.color || '#52c41a')}, 0.1)`, color: bmiLevel?.color || '#52c41a' }">{{ index + 1 }}</span>
            <span class="advice-text">{{ item }}</span>
          </div>
        </div>
        
        <div class="advice-empty" v-if="!advice[activeTab] || advice[activeTab].length === 0">
          <span class="empty-icon">💡</span>
          <span class="empty-text">请先输入身高体重获取建议</span>
        </div>
      </div>
      
      <div class="advice-tip">
        <span class="tip-icon">💪</span>
        <span class="tip-text">坚持健康的生活方式，每天进步一点点！</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.advice-section {
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
}

.advice-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  padding: 4px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
}

.advice-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.advice-tab:hover {
  background: var(--bg-primary);
}

.advice-tab.active {
  background: var(--bg-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.tab-icon {
  font-size: 20px;
}

.tab-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--text-secondary);
}

.advice-tab.active .tab-label {
  color: var(--primary-color);
  font-weight: 600;
}

.advice-content {
  min-height: 160px;
}

.advice-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.advice-item {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px;
  background: var(--bg-primary);
  border-radius: var(--radius-md);
}

.advice-number {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
}

.advice-text {
  flex: 1;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.advice-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 160px;
  gap: 8px;
  color: var(--text-tertiary);
}

.empty-icon {
  font-size: 32px;
}

.empty-text {
  font-size: 13px;
}

.advice-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(149, 222, 100, 0.1) 100%);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--primary-color);
}

.tip-icon {
  font-size: 16px;
}

.tip-text {
  font-size: 12px;
  color: #389e0d;
  font-weight: 500;
}

@media (max-width: 375px) {
  .advice-tabs {
    gap: 4px;
  }
  
  .advice-tab {
    padding: 8px;
  }
  
  .tab-icon {
    font-size: 18px;
  }
  
  .tab-label {
    font-size: 11px;
  }
}
</style>
