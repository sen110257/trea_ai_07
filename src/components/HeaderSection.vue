<script setup>
</script>

<template>
  <header class="header-section pt-safe">
    <div class="header-content">
      <div class="header-icon">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="22" fill="url(#grad1)" />
          <path d="M24 12C20.1 12 17 15.1 17 19C17 22.9 20.1 26 24 26C27.9 26 31 22.9 31 19C31 15.1 27.9 12 24 12Z" fill="white" />
          <path d="M24 28C19.03 28 14.25 30.45 11.6 34.32C10.5 35.96 11.7 38 13.7 38H34.3C36.3 38 37.5 35.96 36.4 34.32C33.75 30.45 28.97 28 24 28Z" fill="white" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#52c41a;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#95de64;stop-opacity:1" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      
      <div class="header-text">
        <h1 class="header-title">BMI 健康测评</h1>
        <p class="header-subtitle">轻松测算，守护健康</p>
      </div>
      
      <div class="header-decor">
        <div class="decor-dot"></div>
        <div class="decor-dot"></div>
        <div class="decor-dot"></div>
      </div>
    </div>
    
    <div class="header-wave">
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path 
          d="M0,30 
             C360,0 360,60 720,30 
             C1080,0 1080,60 1440,30 
             L1440,60 L0,60 Z" 
          fill="#ffffff"
        />
      </svg>
    </div>
  </header>
</template>

<style scoped>
.header-section {
  position: relative;
  background: linear-gradient(135deg, #52c41a 0%, #95de64 50%, #73d13d 100%);
  padding-bottom: 60px;
  overflow: hidden;
}

.header-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -30%;
  width: 200px;
  height: 200px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.header-section::after {
  content: '';
  position: absolute;
  bottom: 20%;
  left: -20%;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 50%;
}

.header-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
}

.header-icon {
  width: 56px;
  height: 56px;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15));
}

.header-icon svg {
  width: 100%;
  height: 100%;
}

.header-text {
  flex: 1;
  margin-left: 16px;
}

.header-title {
  font-size: 24px;
  font-weight: 700;
  color: white;
  margin: 0;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  margin: 4px 0 0 0;
  line-height: 1.4;
}

.header-decor {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.decor-dot {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
}

.decor-dot:nth-child(2) {
  opacity: 0.8;
}

.decor-dot:nth-child(3) {
  opacity: 0.6;
}

.header-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  line-height: 0;
}

.header-wave svg {
  width: 100%;
  height: 60px;
}

@media (max-width: 375px) {
  .header-content {
    padding: 16px 20px;
  }
  
  .header-icon {
    width: 48px;
    height: 48px;
  }
  
  .header-title {
    font-size: 20px;
  }
  
  .header-subtitle {
    font-size: 12px;
  }
}
</style>
