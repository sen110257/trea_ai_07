<script setup>
const props = defineProps({
  age: {
    type: [String, Number],
    default: ''
  }
})

const emit = defineEmits(['update'])

const quickAgeOptions = [
  { label: '18岁', value: 18 },
  { label: '25岁', value: 25 },
  { label: '30岁', value: 30 },
  { label: '40岁', value: 40 }
]

function handleInput(event) {
  emit('update', event.target.value)
}
</script>

<template>
  <div class="age-input">
    <div class="section-title">
      <div class="section-title-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </div>
      <span class="section-title-text">输入年龄</span>
    </div>
    
    <div class="input-group">
      <div class="input-wrapper">
        <span class="input-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M12 14v8M8 22h8" />
          </svg>
        </span>
        <input 
          type="number" 
          class="input-field"
          :value="age"
          placeholder="请输入您的年龄"
          min="1"
          max="120"
          @input="handleInput"
        />
        <span class="input-suffix">岁</span>
      </div>
      <p class="input-hint">年龄范围：1-120岁</p>
    </div>
    
    <div class="quick-age">
      <div class="quick-age-label">快速选择</div>
      <div class="quick-age-buttons">
        <button 
          v-for="ageOption in quickAgeOptions" 
          :key="ageOption.value"
          class="quick-age-btn"
          :class="{ active: parseInt(age) === ageOption.value }"
          @click="emit('update', String(ageOption.value))"
        >
          {{ ageOption.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.age-input {
  width: 100%;
}

.quick-age {
  margin-top: 12px;
}

.quick-age-label {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-bottom: 8px;
}

.quick-age-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.quick-age-btn {
  padding: 8px 16px;
  font-size: var(--font-size-sm);
  font-weight: 500;
  color: var(--text-secondary);
  background: var(--bg-secondary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
}

.quick-age-btn:hover {
  background: var(--primary-bg);
  border-color: var(--primary-light);
  color: var(--primary-dark);
}

.quick-age-btn.active {
  background: var(--primary-color);
  border-color: var(--primary-color);
  color: white;
  box-shadow: 0 2px 8px rgba(82, 196, 26, 0.3);
}

@media (max-width: 375px) {
  .quick-age-btn {
    padding: 6px 12px;
    font-size: var(--font-size-xs);
  }
}
</style>
