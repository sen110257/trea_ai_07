<script setup>
const props = defineProps({
  records: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['clear', 'load'])

function formatDate(timestamp) {
  const date = new Date(timestamp)
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours().toString().padStart(2, '0')
  const minutes = date.getMinutes().toString().padStart(2, '0')
  return `${month}月${day}日 ${hours}:${minutes}`
}

function getLevelBadge(bmiLevel) {
  const levels = {
    underweight: { label: '偏瘦', class: 'level-underweight' },
    normal: { label: '标准', class: 'level-normal' },
    overweight: { label: '微超重', class: 'level-overweight' },
    obesity_l1: { label: '超重', class: 'level-obesity' },
    obesity_l2: { label: '肥胖', class: 'level-obesity' }
  }
  return levels[bmiLevel] || { label: '未知', class: 'level-unknown' }
}

function getGenderLabel(gender) {
  return gender === 'male' ? '男' : '女'
}

function loadRecord(record) {
  emit('load', record)
}
</script>

<template>
  <div class="history-section card mb-4">
    <div class="card-header history-header">
      <div class="history-title">
        <div class="section-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
          <div class="section-title-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
          </div>
          <span class="section-title-text">测评历史</span>
        </div>
        <span class="history-count">{{ records.length }} 条记录</span>
      </div>
      <button 
        v-if="records.length > 0"
        class="clear-btn"
        @click="$emit('clear')"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
        清空
      </button>
    </div>
    
    <div class="card-body">
      <div class="history-empty" v-if="records.length === 0">
        <span class="empty-icon">📋</span>
        <span class="empty-text">暂无测评记录</span>
        <span class="empty-hint">输入身高体重后将自动保存记录</span>
      </div>
      
      <div class="history-list" v-else>
        <div 
          v-for="record in records" 
          :key="record.id" 
          class="history-item"
          @click="loadRecord(record)"
        >
          <div class="record-main">
            <div class="record-bmi">
              <span class="bmi-value">{{ record.bmi }}</span>
              <span class="bmi-label">BMI</span>
            </div>
            <div class="record-info">
              <div class="info-row">
                <span class="info-text">{{ getGenderLabel(record.gender) }} · {{ record.age }}岁</span>
                <span class="level-badge" :class="getLevelBadge(record.bmiLevel).class">
                  {{ getLevelBadge(record.bmiLevel).label }}
                </span>
              </div>
              <div class="info-row">
                <span class="info-text">{{ record.height }}cm · {{ record.weight }}kg</span>
              </div>
              <div class="info-row">
                <span class="info-date">{{ formatDate(record.timestamp) }}</span>
              </div>
            </div>
          </div>
          <div class="record-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-section {
  background: linear-gradient(135deg, #ffffff 0%, #fafafa 100%);
}

.history-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-light);
}

.history-title {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.history-count {
  font-size: 12px;
  color: var(--text-tertiary);
}

.clear-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 12px;
  color: #ff4d4f;
  background: rgba(255, 77, 79, 0.05);
  border: 1px solid rgba(255, 77, 79, 0.2);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.clear-btn:hover {
  background: rgba(255, 77, 79, 0.1);
  border-color: rgba(255, 77, 79, 0.4);
}

.clear-btn svg {
  width: 14px;
  height: 14px;
}

.history-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 16px;
  gap: 8px;
}

.empty-icon {
  font-size: 40px;
}

.empty-text {
  font-size: 14px;
  color: var(--text-secondary);
  font-weight: 500;
}

.empty-hint {
  font-size: 12px;
  color: var(--text-tertiary);
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 400px;
  overflow-y: auto;
  padding-right: 4px;
}

.history-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: var(--bg-secondary);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.history-item:hover {
  background: var(--bg-primary);
  box-shadow: var(--shadow-sm);
}

.record-main {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.record-bmi {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #52c41a 0%, #95de64 100%);
  border-radius: var(--radius-md);
  flex-shrink: 0;
}

.bmi-value {
  font-size: 18px;
  font-weight: 700;
  color: white;
  line-height: 1;
}

.bmi-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 2px;
}

.record-info {
  flex: 1;
  min-width: 0;
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
  gap: 8px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.info-text {
  font-size: 12px;
  color: var(--text-secondary);
}

.info-date {
  font-size: 11px;
  color: var(--text-tertiary);
}

.level-badge {
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-size: 10px;
  font-weight: 600;
  flex-shrink: 0;
}

.level-underweight {
  background: rgba(24, 144, 255, 0.1);
  color: #096dd9;
}

.level-normal {
  background: rgba(82, 196, 26, 0.1);
  color: #389e0d;
}

.level-overweight {
  background: rgba(250, 173, 20, 0.1);
  color: #d48806;
}

.level-obesity {
  background: rgba(255, 77, 79, 0.1);
  color: #cf1322;
}

.level-unknown {
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
}

.record-arrow {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  flex-shrink: 0;
}

.record-arrow svg {
  width: 16px;
  height: 16px;
}

@media (max-width: 375px) {
  .record-bmi {
    width: 52px;
    height: 52px;
  }
  
  .bmi-value {
    font-size: 16px;
  }
  
  .info-text {
    font-size: 11px;
  }
}
</style>
