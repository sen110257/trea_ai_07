<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { calculateBMI, getBMILevel, calculateIdealWeight, estimateBodyFat, getAgeReference, generateHealthAdvice, generateHealthAnalysis, saveBMIRecord, getBMIRecords, clearBMIRecords, HEALTH_TIPS, BMI_LEVELS } from './utils/bmi';
import HeaderSection from './components/HeaderSection.vue';
import GenderSelector from './components/GenderSelector.vue';
import AgeInput from './components/AgeInput.vue';
import HeightWeightInput from './components/HeightWeightInput.vue';
import BMIResultSection from './components/BMIResultSection.vue';
import ProgressRing from './components/ProgressRing.vue';
import StandardWeightSection from './components/StandardWeightSection.vue';
import BodyFatSection from './components/BodyFatSection.vue';
import AgeReferenceSection from './components/AgeReferenceSection.vue';
import HealthAnalysisSection from './components/HealthAnalysisSection.vue';
import AdviceSection from './components/AdviceSection.vue';
import HealthTipsSection from './components/HealthTipsSection.vue';
import HistorySection from './components/HistorySection.vue';
import ActionButtons from './components/ActionButtons.vue';
import FooterSection from './components/FooterSection.vue';

const gender = ref('male');
const age = ref('');
const height = ref('');
const weight = ref('');
const historyRecords = ref([]);
const currentTipIndex = ref(0);
const showHistory = ref(false);

const animationFrame = ref(null);
const animatedBmi = ref(null);
const animatedPercentage = ref(0);

const validationErrors = ref({
  age: null,
  height: null,
  weight: null
});

const saveSuccessMessage = ref(null);

const VALIDATION_RANGES = {
  age: { min: 1, max: 120, label: '年龄' },
  height: { min: 80, max: 230, label: '身高' },
  weight: { min: 20, max: 300, label: '体重' }
};

function validateInput(type, value) {
  const range = VALIDATION_RANGES[type];
  const numValue = parseFloat(value);
  
  if (value === '' || value === null) {
    validationErrors.value[type] = null;
    return true;
  }
  
  if (isNaN(numValue)) {
    validationErrors.value[type] = `请输入有效的${range.label}数值`;
    return false;
  }
  
  if (numValue < range.min) {
    validationErrors.value[type] = `${range.label}不能小于 ${range.min}`;
    return false;
  }
  
  if (numValue > range.max) {
    validationErrors.value[type] = `${range.label}不能大于 ${range.max}`;
    return false;
  }
  
  validationErrors.value[type] = null;
  return true;
}

const isReady = computed(() => {
  if (!age.value || !height.value || !weight.value) return false;
  
  const ageValid = validateInput('age', age.value);
  const heightValid = validateInput('height', height.value);
  const weightValid = validateInput('weight', weight.value);
  
  return ageValid && heightValid && weightValid;
});

const hasErrors = computed(() => {
  return validationErrors.value.age || validationErrors.value.height || validationErrors.value.weight;
});

const rawBmi = computed(() => {
  if (!isReady.value) return null;
  return calculateBMI(parseFloat(weight.value), parseFloat(height.value));
});

const bmi = computed(() => {
  return animatedBmi.value !== null ? animatedBmi.value : rawBmi.value;
});

const bmiLevel = computed(() => {
  if (bmi.value === null) return null;
  return getBMILevel(bmi.value);
});

const idealWeight = computed(() => {
  if (!height.value) return null;
  const heightNum = parseFloat(height.value);
  if (!validateInput('height', height.value)) return null;
  return calculateIdealWeight(heightNum, gender.value);
});

const bodyFat = computed(() => {
  if (!bmi.value || !age.value) return null;
  if (!validateInput('age', age.value)) return null;
  return estimateBodyFat(bmi.value, parseInt(age.value), gender.value);
});

const ageReference = computed(() => {
  if (!age.value) return null;
  if (!validateInput('age', age.value)) return null;
  return getAgeReference(parseInt(age.value));
});

const healthAdvice = computed(() => {
  return generateHealthAdvice(bmiLevel.value, age.value ? parseInt(age.value) : null, gender.value);
});

const healthAnalysis = computed(() => {
  return generateHealthAnalysis(bmi.value, bmiLevel.value, idealWeight.value, age.value ? parseInt(age.value) : null, gender.value);
});

const rawPercentage = computed(() => {
  if (!rawBmi.value) return 0;
  let percentage;
  if (rawBmi.value <= 15) {
    percentage = 10;
  } else if (rawBmi.value >= 40) {
    percentage = 100;
  } else {
    percentage = ((rawBmi.value - 15) / 25) * 90 + 10;
  }
  return Math.min(Math.max(percentage, 0), 100);
});

const bmiPercentage = computed(() => {
  return animatedPercentage.value !== 0 ? animatedPercentage.value : rawPercentage.value;
});

function animateBmi(from, to, duration = 1200) {
  if (animationFrame.value) {
    cancelAnimationFrame(animationFrame.value);
  }
  
  if (from === null || to === null) {
    animatedBmi.value = to;
    return;
  }
  
  const startValue = from;
  const targetValue = to;
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const currentValue = startValue + (targetValue - startValue) * easeOutCubic;
    
    animatedBmi.value = Math.round(currentValue * 10) / 10;
    
    if (progress < 1) {
      animationFrame.value = requestAnimationFrame(animate);
    }
  }
  
  animationFrame.value = requestAnimationFrame(animate);
}

function animatePercentage(from, to, duration = 1200) {
  const startValue = from;
  const targetValue = to;
  const startTime = performance.now();
  
  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    const easeOutCubic = 1 - Math.pow(1 - progress, 3);
    const currentValue = startValue + (targetValue - startValue) * easeOutCubic;
    
    animatedPercentage.value = currentValue;
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  }
  
  requestAnimationFrame(animate);
}

function resetForm() {
  gender.value = 'male';
  age.value = '';
  height.value = '';
  weight.value = '';
  animatedBmi.value = null;
  animatedPercentage.value = 0;
  validationErrors.value = { age: null, height: null, weight: null };
  saveSuccessMessage.value = null;
}

function saveCurrentRecord() {
  if (!isReady.value || rawBmi.value === null) {
    return;
  }
  
  const record = {
    gender: gender.value,
    age: parseInt(age.value),
    height: parseFloat(height.value),
    weight: parseFloat(weight.value),
    bmi: rawBmi.value,
    bmiLevel: bmiLevel.value?.level
  };
  
  saveBMIRecord(record);
  loadHistoryRecords();
  
  saveSuccessMessage.value = '记录已保存！';
  setTimeout(() => {
    saveSuccessMessage.value = null;
  }, 2000);
}

function loadHistoryRecords() {
  historyRecords.value = getBMIRecords();
}

function clearHistory() {
  clearBMIRecords();
  loadHistoryRecords();
}

function loadRecord(record) {
  if (!record) return;
  
  gender.value = record.gender;
  age.value = String(record.age);
  height.value = String(record.height);
  weight.value = String(record.weight);
  showHistory.value = false;
  
  validateInput('age', age.value);
  validateInput('height', height.value);
  validateInput('weight', weight.value);
}

function setGender(value) {
  gender.value = value;
}

function updateAge(value) {
  validateInput('age', value);
  age.value = value;
}

function updateHeight(value) {
  validateInput('height', value);
  height.value = value;
}

function updateWeight(value) {
  validateInput('weight', value);
  weight.value = value;
}

let tipTimer = null;

function startTipRotation() {
  tipTimer = setInterval(() => {
    currentTipIndex.value = (currentTipIndex.value + 1) % HEALTH_TIPS.length;
  }, 5000);
}

function stopTipRotation() {
  if (tipTimer) {
    clearInterval(tipTimer);
    tipTimer = null;
  }
}

onMounted(() => {
  loadHistoryRecords();
  startTipRotation();
});

watch([rawBmi, isReady], ([newBmi, newIsReady], [oldBmi]) => {
  if (newIsReady && newBmi !== null) {
    const startValue = oldBmi !== null ? oldBmi : 0;
    const startPercentage = animatedPercentage.value;
    
    nextTick(() => {
      animateBmi(startValue, newBmi);
      animatePercentage(startPercentage, rawPercentage.value);
    });
  } else if (!newIsReady) {
    animatedBmi.value = null;
    animatedPercentage.value = 0;
  }
}, { immediate: true });
</script>

<template>
  <div class="bmi-app">
    <HeaderSection />
    
    <main class="main-content safe-area-horizontal">
      <div class="input-section card mb-4 animate-fadeIn">
        <div class="card-body">
          <GenderSelector 
            :gender="gender" 
            @change="setGender" 
          />
          
          <div class="divider" />
          
          <AgeInput 
            :age="age" 
            @update="updateAge"
            :error="validationErrors.age"
          />
          
          <div class="divider" />
          
          <HeightWeightInput 
            :height="height"
            :weight="weight"
            @update:height="updateHeight"
            @update:weight="updateWeight"
            :errors="{ height: validationErrors.height, weight: validationErrors.weight }"
          />
          
          <div v-if="hasErrors" class="error-summary">
            <div v-for="(error, field) in validationErrors" :key="field" v-if="error" class="error-item">
              <svg class="error-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span class="error-text">{{ error }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <Transition name="slide-up">
        <div v-if="isReady && rawBmi !== null" class="result-section">
          <BMIResultSection 
            :bmi="bmi"
            :bmi-level="bmiLevel"
          />
          
          <div class="progress-section card mb-4 mt-4">
            <div class="card-body">
              <ProgressRing 
                :percentage="bmiPercentage"
                :bmi-level="bmiLevel"
                :bmi="bmi"
              />
            </div>
          </div>
          
          <StandardWeightSection 
            :ideal-weight="idealWeight"
            :current-weight="weight ? parseFloat(weight) : null"
          />
          
          <BodyFatSection 
            :body-fat="bodyFat"
            :bmi-level="bmiLevel"
          />
          
          <AgeReferenceSection 
            :age-reference="ageReference"
            :current-bmi="bmi"
          />
          
          <HealthAnalysisSection 
            :analysis="healthAnalysis"
            :bmi-level="bmiLevel"
          />
          
          <AdviceSection 
            :advice="healthAdvice"
            :bmi-level="bmiLevel"
          />
        </div>
      </Transition>
      
      <HealthTipsSection 
        :tips="HEALTH_TIPS"
        :current-index="currentTipIndex"
      />
      
      <ActionButtons 
        @reset="resetForm"
        @save="saveCurrentRecord"
        @toggle-history="showHistory = !showHistory"
        :show-history="showHistory"
        :history-count="historyRecords.length"
        :is-ready="isReady"
      />
      
      <Transition name="fade">
        <div v-if="saveSuccessMessage" class="save-success-toast">
          <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{{ saveSuccessMessage }}</span>
        </div>
      </Transition>
      
      <Transition name="slide-up">
        <HistorySection 
          v-if="showHistory"
          :records="historyRecords"
          @clear="clearHistory"
          @load="loadRecord"
          class="mb-4"
        />
      </Transition>
      
      <FooterSection />
    </main>
  </div>
</template>

<style scoped>
.bmi-app {
  min-height: 100vh;
  min-height: 100dvh;
  background: linear-gradient(180deg, #f0fff9 0%, #ffffff 50%, #f0f9ff 100%);
}

.main-content {
  padding: 16px 20px;
  padding-bottom: calc(var(--safe-area-bottom) + 24px);
}

.input-section {
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(82, 201, 169, 0.08);
}

.result-section {
  animation: fadeIn 0.4s ease forwards;
}

.progress-section {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 255, 249, 0.95) 100%);
}

.error-summary {
  margin-top: 16px;
  padding: 12px 16px;
  background: linear-gradient(135deg, rgba(255, 120, 117, 0.08) 0%, rgba(255, 163, 158, 0.04) 100%);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 120, 117, 0.2);
}

.error-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
}

.error-item:not(:last-child) {
  border-bottom: 1px solid rgba(255, 120, 117, 0.1);
}

.error-icon {
  width: 18px;
  height: 18px;
  color: #ff7875;
  flex-shrink: 0;
}

.error-text {
  font-size: var(--font-size-sm);
  color: #cf1322;
  font-weight: 500;
}

.save-success-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 28px;
  background: linear-gradient(135deg, #52c9a9 0%, #73d4b3 100%);
  color: white;
  border-radius: var(--radius-xl);
  box-shadow: 0 12px 40px rgba(82, 201, 169, 0.35);
  font-weight: 600;
  font-size: var(--font-size-lg);
  z-index: 1000;
}

.toast-icon {
  width: 24px;
  height: 24px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
