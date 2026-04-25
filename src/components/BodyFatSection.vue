<script setup>
const props = defineProps({
  bodyFat: {
    type: Object,
    default: null
  },
  bmiLevel: {
    type: Object,
    default: null
  }
})

function getLevelColor(level) {
  switch (level) {
    case '偏低':
      return '#1890ff'
    case '正常':
      return '#52c41a'
    case '偏高':
      return '#faad14'
    case '过高':
      return '#ff4d4f'
    default:
      return '#52c41a'
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (result) {
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
  }
  return '82, 196, 26'
}
</script>

<template>
  <div class="body-fat-section card mb-4" v-if="bodyFat">
    <div class="card-header">
      <div class="section-title" style="border-bottom: none; margin-bottom: 0; padding-bottom: 0;">
        <div class="section-title-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <span class="section-title-text">体脂率估算</span>
      </div>
    </div>
    
    <div class="card-body">
      <div class="body-fat-display">
        <div class="fat-value-circle" :style="{ borderColor: getLevelColor(bodyFat.level) }">
          <div class="fat-value">
            <span class="fat-number">{{ bodyFat.value }}</span>
            <span class="fat-unit">%</span>
          </div>
          <div class="fat-label">体脂率</div>
        </div>
        
        <div class="fat-level-badge" :style="{ 
          backgroundColor: `rgba(${hexToRgb(getLevelColor(bodyFat.level))}, 0.1)`,
          color: getLevelColor(bodyFat.level),
          borderColor: getLevelColor(bodyFat.level)
        }">
          {{ bodyFat.level }}
        </div>
      </div>
      
      <div class="body-fat-scale">
        <div class="scale-title">体脂率参考范围</div>
        <div class="scale-ranges">
          <div class="scale-range-item">
            <span class="range-label">男性标准</span>
            <span class="range-value">10%-20%</span>
          </div>
          <div class="scale-range-item">
            <span class="range-label">女性标准</span>
            <span class="range-value">20%-30%</span>
          </div>
        </div>
      </div>
      
      <div class="body-fat-info">
        <div class="info-item">
          <div class="info-icon low">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          </div>
          <div class="info-content">
            <div class="info-title">体脂率过低</div>
            <div class="info-desc">可能导致免疫力下降、内分泌失调</div>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon normal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          </div>
          <div class="info-content">
            <div class="info-title">体脂率正常</div>
            <div class="info-desc">保持健康饮食和运动习惯</div>
          </div>
        </div>
        
        <div class="info-item">
          <div class="info-icon high">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="2 12 6 12 9 3 15 21 18 12 22 12" />
            </svg>
          </div>
          <div class="info-content">
            <div class="info-title">体脂率偏高</div>
            <div class="info-desc">增加有氧运动，控制热量摄入</div>
          </div>
        </div>
      </div>
      
      <div class="body-fat-tip">
        <span class="tip-text">⚠️ 以上为估算值，如需精准测量请使用专业体脂秤</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.body-fat-section {
  background: linear-gradient(135deg, #ffffff 0%, #fff7e6 100%);
}

.body-fat-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 16px;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
}

.fat-value-circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 247, 230, 0.9) 100%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.fat-value {
  display: flex;
  align-items: baseline;
  gap: 2px;
}

.fat-number {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}

.fat-unit {
  font-size: 14px;
  color: var(--text-tertiary);
}

.fat-label {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

.fat-level-badge {
  padding: 12px 24px;
  border-radius: var(--radius-md);
  border: 2px solid;
  font-size: 18px;
  font-weight: 600;
}

.body-fat-scale {
  background: var(--bg-secondary);
  padding: 16px;
  border-radius: var(--radius-md);
  margin-bottom: 16px;
}

.scale-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.scale-ranges {
  display: flex;
  gap: 16px;
}

.scale-range-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: var(--bg-primary);
  border-radius: var(--radius-sm);
}

.range-label {
  font-size: 11px;
  color: var(--text-tertiary);
  margin-bottom: 4px;
}

.range-value {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}

.body-fat-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: var(--bg-primary);
  border-radius: var(--radius-md);
}

.info-icon {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.info-icon.low {
  background: rgba(24, 144, 255, 0.1);
  color: #1890ff;
}

.info-icon.normal {
  background: rgba(82, 196, 26, 0.1);
  color: #52c41a;
}

.info-icon.high {
  background: rgba(255, 77, 79, 0.1);
  color: #ff4d4f;
}

.info-icon svg {
  width: 20px;
  height: 20px;
}

.info-content {
  flex: 1;
}

.info-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 2px;
}

.info-desc {
  font-size: 12px;
  color: var(--text-secondary);
}

.body-fat-tip {
  padding: 12px 16px;
  background: #fffbe6;
  border-radius: var(--radius-md);
  border-left: 3px solid #faad14;
}

.tip-text {
  font-size: 12px;
  color: #8c6500;
}

@media (max-width: 375px) {
  .body-fat-display {
    flex-direction: column;
    gap: 16px;
  }
  
  .fat-value-circle {
    width: 100px;
    height: 100px;
  }
  
  .fat-number {
    font-size: 28px;
  }
  
  .scale-ranges {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
