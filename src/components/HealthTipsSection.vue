<script setup>
const props = defineProps({
  tips: {
    type: Array,
    default: () => []
  },
  currentIndex: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:currentIndex'])

function goToTip(index) {
  emit('update:currentIndex', index)
}

function goToNext() {
  const nextIndex = (props.currentIndex + 1) % props.tips.length
  emit('update:currentIndex', nextIndex)
}

function goToPrev() {
  const prevIndex = (props.currentIndex - 1 + props.tips.length) % props.tips.length
  emit('update:currentIndex', prevIndex)
}
</script>

<template>
  <div class="health-tips-section card mb-4">
    <div class="card-header tips-header">
      <div class="tips-title">
        <span class="tips-icon">💡</span>
        <span class="tips-label">健康小贴士</span>
      </div>
      <div class="tips-nav">
        <button class="nav-btn" @click="goToPrev">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span class="tips-counter">{{ currentIndex + 1 }} / {{ tips.length }}</span>
        <button class="nav-btn" @click="goToNext">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
    
    <div class="card-body">
      <div class="tips-carousel">
        <div class="tips-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
          <div 
            v-for="(tip, index) in tips" 
            :key="index" 
            class="tip-slide"
          >
            <div class="tip-content">
              <span class="tip-quote">"</span>
              <p class="tip-text">{{ tip }}</p>
              <span class="tip-quote">"</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="tips-dots">
        <button 
          v-for="(_, index) in tips" 
          :key="index"
          class="tip-dot"
          :class="{ active: index === currentIndex }"
          @click="goToTip(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.health-tips-section {
  background: linear-gradient(135deg, #fff7e6 0%, #ffffff 100%);
}

.tips-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-light);
}

.tips-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tips-icon {
  font-size: 20px;
}

.tips-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
}

.tips-nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.nav-btn {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-full);
  border: none;
  background: var(--bg-secondary);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
  padding: 0;
}

.nav-btn:hover {
  background: var(--primary-bg);
  color: var(--primary-color);
}

.nav-btn svg {
  width: 16px;
  height: 16px;
}

.tips-counter {
  font-size: 12px;
  color: var(--text-tertiary);
  font-weight: 500;
  min-width: 40px;
  text-align: center;
}

.tips-carousel {
  overflow: hidden;
  position: relative;
  border-radius: var(--radius-md);
}

.tips-track {
  display: flex;
  transition: transform 0.5s ease;
}

.tip-slide {
  flex: 0 0 100%;
  width: 100%;
}

.tip-content {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 16px;
  background: linear-gradient(135deg, rgba(250, 173, 20, 0.05) 0%, rgba(255, 197, 61, 0.05) 100%);
  border-radius: var(--radius-md);
  border-left: 3px solid #faad14;
}

.tip-quote {
  font-size: 24px;
  color: #faad14;
  font-weight: 700;
  line-height: 1;
  opacity: 0.5;
}

.tip-text {
  flex: 1;
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.7;
  font-weight: 500;
}

.tips-dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
}

.tip-dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);
  border: none;
  background: var(--border-color);
  padding: 0;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.tip-dot:hover {
  background: var(--primary-light);
}

.tip-dot.active {
  width: 24px;
  background: linear-gradient(90deg, #52c41a, #95de64);
}

@media (max-width: 375px) {
  .tips-header {
    padding: 10px 12px;
  }
  
  .tips-label {
    font-size: 14px;
  }
  
  .tip-content {
    padding: 12px;
  }
  
  .tip-text {
    font-size: 13px;
  }
}
</style>
