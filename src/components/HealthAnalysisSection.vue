<script setup>
const props = defineProps({
  analysis: {
    type: Object,
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
</script>

<template>
  <div class="health-analysis-section card mb-4" v-if="analysis">
    <div class="card-header">
      <div class="section-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
        <div class="section-title-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        </div>
        <span class="section-title-text">健康状况分析</span>
      </div>
    </div>
    
    <div class="card-body">
      <div class="analysis-summary" :style="{ borderColor: bmiLevel?.color || '#52c41a' }">
        <div class="summary-icon" :style="{ backgroundColor: `rgba(${hexToRgb(bmiLevel?.color || '#52c41a')}, 0.1)`, color: bmiLevel?.color || '#52c41a' }">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </div>
        <div class="summary-text">
          <p class="summary-content">{{ analysis.summary }}</p>
        </div>
      </div>
      
      <div class="analysis-details">
        <div class="detail-section">
          <div class="detail-header">
            <span class="detail-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </span>
            <span class="detail-title">详细分析</span>
          </div>
          <ul class="detail-list">
            <li v-for="(item, index) in analysis.details" :key="index" class="detail-item">
              <span class="detail-bullet" :style="{ backgroundColor: bmiLevel?.color || '#52c41a' }"></span>
              <span class="detail-text">{{ item }}</span>
            </li>
          </ul>
        </div>
        
        <div class="detail-section" v-if="analysis.risks.length > 0">
          <div class="detail-header risk-header">
            <span class="detail-icon risk-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </span>
            <span class="detail-title">潜在风险</span>
          </div>
          <ul class="detail-list risk-list">
            <li v-for="(item, index) in analysis.risks" :key="index" class="detail-item">
              <span class="detail-bullet risk-bullet"></span>
              <span class="detail-text">{{ item }}</span>
            </li>
          </ul>
        </div>
        
        <div class="detail-section" v-if="analysis.positives.length > 0">
          <div class="detail-header positive-header">
            <span class="detail-icon positive-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </span>
            <span class="detail-title">积极方面</span>
          </div>
          <ul class="detail-list positive-list">
            <li v-for="(item, index) in analysis.positives" :key="index" class="detail-item">
              <span class="detail-bullet positive-bullet"></span>
              <span class="detail-text">{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div class="analysis-note">
        <span class="note-icon">ℹ️</span>
        <span class="note-text">以上分析仅供参考，如有健康问题请咨询专业医生</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.health-analysis-section {
  background: linear-gradient(135deg, #ffffff 0%, #f6ffed 100%);
}

.analysis-summary {
  display: flex;
  gap: 12px;
  padding: 16px;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  border-left: 4px solid;
  margin-bottom: 20px;
}

.summary-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.summary-icon svg {
  width: 24px;
  height: 24px;
}

.summary-text {
  flex: 1;
}

.summary-content {
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.6;
  font-weight: 500;
}

.analysis-details {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-section {
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.detail-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--bg-secondary);
}

.risk-header {
  background: #fff1f0;
}

.positive-header {
  background: #f6ffed;
}

.detail-icon {
  width: 20px;
  height: 20px;
  color: #1890ff;
}

.risk-icon {
  color: #ff4d4f;
}

.positive-icon {
  color: #52c41a;
}

.detail-icon svg {
  width: 100%;
  height: 100%;
}

.detail-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.detail-list {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.detail-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.detail-bullet {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-top: 6px;
  flex-shrink: 0;
}

.risk-bullet {
  background: #ff4d4f;
}

.positive-bullet {
  background: #52c41a;
}

.detail-text {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.analysis-note {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 16px;
  padding: 12px 16px;
  background: #e6f7ff;
  border-radius: var(--radius-md);
}

.note-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.note-text {
  font-size: 12px;
  color: #096dd9;
  line-height: 1.5;
}

@media (max-width: 375px) {
  .analysis-summary {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .summary-icon {
    width: 36px;
    height: 36px;
  }
  
  .summary-icon svg {
    width: 20px;
    height: 20px;
  }
}
</style>
