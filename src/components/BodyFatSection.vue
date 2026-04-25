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
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(245, 245, 255, 0.95) 100%);
  border: 1px solid rgba(105, 177, 255, 0.1);
}

.body-fat-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
  padding: 24px;
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  border: 1px solid var(--border-lighter);
  box-shadow: var(--shadow-sm);
}

.fat-value-circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 5px solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(250, 250, 255, 0.9) 100%);
  box-shadow: 0 8px 24px currentColor;
  position: relative;
}

.fat-value-circle::before {
  content: '';
  position: absolute;
  inset: 4px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(105, 177, 255, 0.08) 0%, rgba(82, 201, 169, 0.04) 100%);
}

.fat-value {
  display: flex;
  align-items: baseline;
  gap: 4px;
  position: relative;
  z-index: 1;
}

.fat-number {
  font-size: 48px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
  text-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  letter-spacing: -2px;
}

.fat-unit {
  font-size: 18px;
  color: var(--text-tertiary);
  font-weight: 600;
}

.fat-label {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-top: 6px;
  font-weight: 500;
  letter-spacing: 1px;
  position: relative;
  z-index: 1;
}

.fat-level-badge {
  padding: 16px 28px;
  border-radius: var(--radius-xl);
  border: 3px solid;
  font-size: 22px;
  font-weight: 800;
  box-shadow: 0 6px 20px currentColor;
  backdrop-filter: blur(8px);
}

.body-fat-scale {
  background: var(--bg-secondary);
  padding: 20px 24px;
  border-radius: var(--radius-lg);
  margin-bottom: 20px;
  border: 1px solid var(--border-lighter);
}

.scale-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 16px;
  letter-spacing: 0.5px;
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
  padding: 16px;
  background: var(--bg-primary);
  border-radius: var(--radius-md);
  border: 1px solid var(--border-lighter);
  transition: all var(--transition-standard);
}

.scale-range-item:hover {
  border-color: var(--primary-light);
  box-shadow: var(--shadow-sm);
}

.range-label {
  font-size: 12px;
  color: var(--text-tertiary);
  margin-bottom: 6px;
  font-weight: 500;
}

.range-value {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary-color);
}

.body-fat-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px;
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-lighter);
  transition: all var(--transition-standard);
}

.info-item:hover {
  border-color: var(--border-light);
  box-shadow: var(--shadow-sm);
}

.info-icon {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all var(--transition-standard);
}

.info-icon.low {
  background: linear-gradient(135deg, rgba(105, 177, 255, 0.15) 0%, rgba(158, 207, 255, 0.08) 100%);
  color: #69b1ff;
}

.info-icon.normal {
  background: linear-gradient(135deg, rgba(82, 201, 169, 0.15) 0%, rgba(131, 217, 194, 0.08) 100%);
  color: #52c9a9;
}

.info-icon.high {
  background: linear-gradient(135deg, rgba(255, 183, 77, 0.15) 0%, rgba(255, 204, 128, 0.08) 100%);
  color: #ffb74d;
}

.info-icon svg {
  width: 22px;
  height: 22px;
}

.info-content {
  flex: 1;
}

.info-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.info-desc {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}

.body-fat-tip {
  padding: 16px 20px;
  background: linear-gradient(135deg, rgba(255, 183, 77, 0.08) 0%, rgba(255, 204, 128, 0.04) 100%);
  border-radius: var(--radius-lg);
  border-left: 4px solid #ffb74d;
  border: 1px solid rgba(255, 183, 77, 0.15);
}

.tip-text {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 500;
  line-height: 1.5;
}

@media (max-width: 375px) {
  .body-fat-display {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }
  
  .fat-value-circle {
    width: 120px;
    height: 120px;
  }
  
  .fat-number {
    font-size: 40px;
  }
  
  .fat-level-badge {
    padding: 12px 24px;
    font-size: 18px;
  }
  
  .scale-ranges {
    flex-direction: column;
    gap: 10px;
  }
  
  .info-item {
    padding: 12px;
  }
}
</style>
