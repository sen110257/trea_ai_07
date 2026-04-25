<script setup>
const props = defineProps({
  showHistory: {
    type: Boolean,
    default: false
  },
  historyCount: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['reset', 'save', 'toggle-history'])
</script>

<template>
  <div class="action-buttons-section mb-4">
    <div class="buttons-row">
      <button class="btn btn-secondary btn-lg action-btn" @click="$emit('reset')">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="23 4 23 10 17 10" />
          <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
        </svg>
        重新测评
      </button>
      
      <button class="btn btn-primary btn-lg action-btn" @click="$emit('save')">
        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
          <polyline points="17 21 17 13 7 13 7 21" />
          <polyline points="7 3 7 8 15 8" />
        </svg>
        保存记录
      </button>
    </div>
    
    <button 
      class="history-toggle-btn"
      :class="{ active: showHistory }"
      @click="$emit('toggle-history')"
    >
      <svg class="toggle-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
      <span class="toggle-text">{{ showHistory ? '收起历史记录' : '查看历史记录' }}</span>
      <span v-if="historyCount > 0" class="toggle-badge">{{ historyCount }}</span>
      <svg 
        class="toggle-arrow" 
        :class="{ rotated: showHistory }"
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.action-buttons-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.buttons-row {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  gap: 8px;
}

.btn-icon {
  width: 20px;
  height: 20px;
}

.history-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-family: inherit;
  font-size: 14px;
  color: var(--text-secondary);
}

.history-toggle-btn:hover {
  border-color: var(--primary-light);
  background: var(--primary-bg);
  color: var(--primary-dark);
}

.history-toggle-btn.active {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, rgba(82, 196, 26, 0.05) 0%, rgba(149, 222, 100, 0.05) 100%);
  color: var(--primary-dark);
}

.toggle-icon {
  width: 18px;
  height: 18px;
}

.toggle-text {
  font-weight: 500;
}

.toggle-badge {
  padding: 2px 8px;
  background: var(--primary-color);
  color: white;
  border-radius: var(--radius-full);
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}

.toggle-arrow {
  width: 16px;
  height: 16px;
  transition: transform var(--transition-normal);
}

.toggle-arrow.rotated {
  transform: rotate(180deg);
}

@media (max-width: 375px) {
  .buttons-row {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
  }
}
</style>
