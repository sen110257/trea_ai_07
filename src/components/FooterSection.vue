<script setup>
</script>

<template>
  <footer class="footer-section pb-safe">
    <div class="footer-content">
      <div class="footer-quote">
        <div class="quote-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
        </div>
        <p class="quote-text">健康是人生最大的财富，珍惜身体，享受生活的每一天。</p>
      </div>
      
      <div class="footer-tips">
        <div class="tip-item">
          <span class="tip-emoji">🥗</span>
          <span class="tip-label">均衡饮食</span>
        </div>
        <div class="tip-item">
          <span class="tip-emoji">🏃</span>
          <span class="tip-label">适量运动</span>
        </div>
        <div class="tip-item">
          <span class="tip-emoji">😴</span>
          <span class="tip-label">充足睡眠</span>
        </div>
        <div class="tip-item">
          <span class="tip-emoji">😊</span>
          <span class="tip-label">心情愉悦</span>
        </div>
      </div>
      
      <div class="footer-divider"></div>
      
      <div class="footer-info">
        <p class="info-text">BMI 指数仅供参考，不作为诊断依据</p>
        <p class="info-text">如有健康问题，请咨询专业医生</p>
      </div>
      
      <div class="footer-copyright">
        <span class="copyright-text">© 2024 BMI 健康测评工具</span>
        <span class="copyright-divider">|</span>
        <span class="copyright-text">用心守护您的健康</span>
      </div>
      
      <div class="footer-decor">
        <div class="decor-leaf left">🌿</div>
        <div class="decor-leaf right">🌿</div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-section {
  margin-top: 24px;
  padding: 24px 0;
  background: linear-gradient(180deg, rgba(82, 196, 26, 0.02) 0%, rgba(82, 196, 26, 0.05) 100%);
  border-top: 1px solid rgba(82, 196, 26, 0.1);
  position: relative;
  overflow: hidden;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 20px;
  position: relative;
  z-index: 1;
}

.footer-quote {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.quote-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  opacity: 0.6;
}

.quote-icon svg {
  width: 24px;
  height: 24px;
}

.quote-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  font-style: italic;
  max-width: 280px;
}

.footer-tips {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  padding: 12px 0;
}

.tip-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.tip-emoji {
  font-size: 24px;
}

.tip-label {
  font-size: 11px;
  color: var(--text-tertiary);
  font-weight: 500;
}

.footer-divider {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary-light), transparent);
  border-radius: var(--radius-full);
}

.footer-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.info-text {
  font-size: 11px;
  color: var(--text-tertiary);
  text-align: center;
}

.footer-copyright {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.copyright-text {
  font-size: 11px;
  color: var(--text-tertiary);
}

.copyright-divider {
  font-size: 11px;
  color: var(--border-color);
}

.footer-decor {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  opacity: 0.3;
  pointer-events: none;
}

.decor-leaf {
  font-size: 32px;
}

.decor-leaf.left {
  transform: rotate(-30deg);
}

.decor-leaf.right {
  transform: scaleX(-1) rotate(-30deg);
}

@media (max-width: 375px) {
  .footer-content {
    padding: 0 16px;
  }
  
  .quote-text {
    font-size: 13px;
  }
  
  .footer-tips {
    gap: 12px;
  }
  
  .tip-emoji {
    font-size: 20px;
  }
  
  .footer-copyright {
    flex-direction: column;
    gap: 4px;
  }
  
  .copyright-divider {
    display: none;
  }
}
</style>
