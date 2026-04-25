<script setup>
const props = defineProps({
  height: {
    type: [String, Number],
    default: ''
  },
  weight: {
    type: [String, Number],
    default: ''
  },
  errors: {
    type: Object,
    default: () => ({ height: null, weight: null })
  }
})

const emit = defineEmits(['update:height', 'update:weight'])

const quickInputs = [
  { label: '标准男', height: 175, weight: 70 },
  { label: '标准女', height: 165, weight: 55 },
  { label: '偏高', height: 185, weight: 80 },
  { label: '娇小', height: 155, weight: 45 }
]

function handleHeightInput(event) {
  emit('update:height', event.target.value)
}

function handleWeightInput(event) {
  emit('update:weight', event.target.value)
}

function quickSelect(item) {
  emit('update:height', String(item.height))
  emit('update:weight', String(item.weight))
}
</script>

<template>
  <div class="height-weight-input">
    <div class="section-title">
      <div class="section-title-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <span class="section-title-text">身高体重</span>
    </div>
    
    <div class="input-row">
      <div class="input-group input-col">
        <label class="input-label">身高</label>
        <div class="input-wrapper" :class="{ 'has-error': errors.height }">
          <span class="input-icon" :class="{ 'error-icon': errors.height }">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="6" width="18" height="12" rx="2" />
              <path d="M7 2v4M17 2v4" />
              <line x1="12" y1="10" x2="12" y2="14" />
            </svg>
          </span>
          <input 
            type="number" 
            class="input-field"
            :value="height"
            placeholder="请输入身高"
            min="80"
            max="230"
            step="0.1"
            @input="handleHeightInput"
          />
          <span class="input-suffix" :class="{ 'error-suffix': errors.height }">cm</span>
        </div>
        <p class="input-hint" :class="{ 'error-hint': errors.height }">
          范围：80-230cm
        </p>
      </div>
      
      <div class="input-group input-col">
        <label class="input-label">体重</label>
        <div class="input-wrapper" :class="{ 'has-error': errors.weight }">
          <span class="input-icon" :class="{ 'error-icon': errors.weight }">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="5" r="3" />
              <path d="M12 8v8" />
              <path d="M8 21s-4-3-4-9 4-9 4-9 4 3 4 9-4 9-4 9M16 21s4-3 4-9-4-9-4-9-4 3-4 9 4 9 4 9" />
            </svg>
          </span>
          <input 
            type="number" 
            class="input-field"
            :value="weight"
            placeholder="请输入体重"
            min="20"
            max="300"
            step="0.1"
            @input="handleWeightInput"
          />
          <span class="input-suffix" :class="{ 'error-suffix': errors.weight }">kg</span>
        </div>
        <p class="input-hint" :class="{ 'error-hint': errors.weight }">
          范围：20-300kg
        </p>
      </div>
    </div>
    
    <div class="quick-inputs" v-if="quickInputs.length > 0">
      <div class="quick-input-label">常用参考</div>
      <div class="quick-input-grid">
        <button 
          v-for="item in quickInputs" 
          :key="item.label"
          class="quick-input-btn"
          @click="quickSelect(item)"
        >
          <span class="quick-input-label-text">{{ item.label }}</span>
          <span class="quick-input-value">{{ item.height }}cm / {{ item.weight }}kg</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.height-weight-input {
  width: 100%;
}

.input-row {
  display: flex;
  gap: 16px;
}

.input-col {
  flex: 1;
  min-width: 0;
}

.quick-inputs {
  margin-top: 16px;
}

.quick-input-label {
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  margin-bottom: 8px;
  font-weight: 500;
}

.quick-input-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.quick-input-btn {
  padding: 12px 14px;
  background: var(--bg-secondary);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-bounce);
  font-family: inherit;
  text-align: left;
}

.quick-input-btn:hover {
  background: var(--primary-bg);
  border-color: var(--primary-light);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.quick-input-btn:active {
  transform: scale(0.98);
}

.quick-input-label-text {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.quick-input-value {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  font-weight: 500;
}

.input-wrapper.has-error {
  border-color: rgba(255, 120, 117, 0.5) !important;
  background: linear-gradient(135deg, rgba(255, 120, 117, 0.05) 0%, rgba(255, 163, 158, 0.03) 100%) !important;
}

.input-wrapper.has-error:focus-within {
  border-color: #ff7875 !important;
  box-shadow: 0 0 0 4px rgba(255, 120, 117, 0.1) !important;
}

.error-icon {
  color: #ff7875 !important;
}

.error-suffix {
  color: #ff7875 !important;
}

.error-hint {
  color: #cf1322 !important;
  font-weight: 600;
}

@media (max-width: 375px) {
  .input-row {
    flex-direction: column;
    gap: 12px;
  }
  
  .quick-input-grid {
    gap: 8px;
  }
  
  .quick-input-btn {
    padding: 10px 12px;
  }
}
</style>
