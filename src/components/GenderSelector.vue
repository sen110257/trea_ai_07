<script setup>
const props = defineProps({
  gender: {
    type: String,
    default: 'male'
  }
})

const emit = defineEmits(['change'])

function selectGender(value) {
  emit('change', value)
}
</script>

<template>
  <div class="gender-selector">
    <div class="section-title">
      <div class="section-title-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M12 14v8M8 22h8" />
        </svg>
      </div>
      <span class="section-title-text">选择性别</span>
    </div>
    
    <div class="radio-group">
      <div class="radio-item">
        <input 
          type="radio" 
          id="gender-male" 
          :value="'male'" 
          :checked="gender === 'male'"
          class="radio-input"
          @change="selectGender('male')"
        />
        <label for="gender-male" class="radio-label gender-label" :class="{ active: gender === 'male' }">
          <span class="gender-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="10" cy="7" r="4" />
              <path d="M10.5 14H9.6C8.077 14 7.146 14 6.361 14.172C5.193 14.429 4.192 15.212 3.54 16.3C2.378 18.278 2.378 21 5.155 21H14.845C17.622 21 17.622 18.278 16.46 16.3C15.808 15.212 14.807 14.429 13.639 14.172C12.854 14 11.923 14 10.4 14" />
              <path d="M16 3h5v5" />
              <path d="M21 3L14 10" />
            </svg>
          </span>
          <span class="gender-text">男</span>
        </label>
      </div>
      
      <div class="radio-item">
        <input 
          type="radio" 
          id="gender-female" 
          :value="'female'" 
          :checked="gender === 'female'"
          class="radio-input"
          @change="selectGender('female')"
        />
        <label for="gender-female" class="radio-label gender-label" :class="{ active: gender === 'female' }">
          <span class="gender-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="10" cy="7" r="4" />
              <path d="M10.5 14H9.6C8.077 14 7.146 14 6.361 14.172C5.193 14.429 4.192 15.212 3.54 16.3C2.378 18.278 2.378 21 5.155 21H14.845C17.622 21 17.622 18.278 16.46 16.3C15.808 15.212 14.807 14.429 13.639 14.172C12.854 14 11.923 14 10.4 14" />
              <path d="M19 14v6M16 17h6" />
            </svg>
          </span>
          <span class="gender-text">女</span>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gender-selector {
  width: 100%;
}

.gender-label {
  position: relative;
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--radius-lg);
  border: 2px solid var(--border-light);
  background: var(--bg-secondary);
  transition: all var(--transition-normal);
  cursor: pointer;
  user-select: none;
}

.gender-label:hover {
  border-color: var(--primary-light);
  background: var(--primary-bg);
}

.gender-label.active {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, rgba(82, 196, 26, 0.1) 0%, rgba(149, 222, 100, 0.1) 100%);
  box-shadow: 0 4px 12px rgba(82, 196, 26, 0.15);
}

.gender-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-tertiary);
  transition: color var(--transition-fast);
}

.gender-icon svg {
  width: 32px;
  height: 32px;
}

.gender-label.active .gender-icon {
  color: var(--primary-color);
}

.gender-text {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--text-secondary);
  transition: color var(--transition-fast);
}

.gender-label.active .gender-text {
  color: var(--primary-dark);
}

@media (max-width: 375px) {
  .gender-label {
    padding: 12px 16px;
  }
  
  .gender-icon {
    width: 36px;
    height: 36px;
  }
  
  .gender-icon svg {
    width: 28px;
    height: 28px;
  }
  
  .gender-text {
    font-size: var(--font-size-base);
  }
}
</style>
