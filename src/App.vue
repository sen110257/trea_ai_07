<script setup>import { ref, computed, onMounted, watch } from 'vue';
import { calculateBMI, getBMILevel, calculateIdealWeight, estimateBodyFat, getAgeReference, generateHealthAdvice, generateHealthAnalysis, saveBMIRecord, getBMIRecords, clearBMIRecords, HEALTH_TIPS } from './utils/bmi';
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
const isReady = computed(() => {
 return age.value && height.value && weight.value;
});
const bmi = computed(() => {
 if (!isReady.value)
 return null;
 return calculateBMI(parseFloat(weight.value), parseFloat(height.value));
});
const bmiLevel = computed(() => {
 if (bmi.value === null)
 return null;
 return getBMILevel(bmi.value);
});
const idealWeight = computed(() => {
 if (!height.value)
 return null;
 return calculateIdealWeight(parseFloat(height.value), gender.value);
});
const bodyFat = computed(() => {
 if (!bmi.value || !age.value)
 return null;
 return estimateBodyFat(bmi.value, parseInt(age.value), gender.value);
});
const ageReference = computed(() => {
 if (!age.value)
 return null;
 return getAgeReference(parseInt(age.value));
});
const healthAdvice = computed(() => {
 return generateHealthAdvice(bmiLevel.value, age.value ? parseInt(age.value) : null, gender.value);
});
const healthAnalysis = computed(() => {
 return generateHealthAnalysis(bmi.value, bmiLevel.value, idealWeight.value, age.value ? parseInt(age.value) : null, gender.value);
});
const bmiPercentage = computed(() => {
 if (!bmi.value)
 return 0;
 let percentage;
 if (bmi.value <= 15) {
 percentage = 10;
 }
 else if (bmi.value >= 40) {
 percentage = 100;
 }
 else {
 percentage = ((bmi.value - 15) / 25) * 90 + 10;
 }
 return Math.min(Math.max(percentage, 0), 100);
});
function resetForm() {
 gender.value = 'male';
 age.value = '';
 height.value = '';
 weight.value = '';
}
function saveCurrentRecord() {
 if (!isReady.value)
 return;
 const record = {
 gender: gender.value,
 age: parseInt(age.value),
 height: parseFloat(height.value),
 weight: parseFloat(weight.value),
 bmi: bmi.value,
 bmiLevel: bmiLevel.value?.level
 };
 saveBMIRecord(record);
 loadHistoryRecords();
}
function loadHistoryRecords() {
 historyRecords.value = getBMIRecords();
}
function clearHistory() {
 clearBMIRecords();
 loadHistoryRecords();
}
function setGender(value) {
 gender.value = value;
}
function updateAge(value) {
 const numValue = parseInt(value);
 if (!isNaN(numValue) && numValue >= 1 && numValue <= 120) {
 age.value = value;
 }
 else if (value === '') {
 age.value = '';
 }
}
function updateHeight(value) {
 const numValue = parseFloat(value);
 if (!isNaN(numValue) && numValue >= 50 && numValue <= 250) {
 height.value = value;
 }
 else if (value === '') {
 height.value = '';
 }
}
function updateWeight(value) {
 const numValue = parseFloat(value);
 if (!isNaN(numValue) && numValue >= 10 && numValue <= 500) {
 weight.value = value;
 }
 else if (value === '') {
 weight.value = '';
 }
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
watch([bmi, isReady], ([newBmi, newIsReady]) => {
 if (newIsReady && newBmi !== null) {
 saveCurrentRecord();
 }
});
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
          />
          
          <div class="divider" />
          
          <HeightWeightInput 
            :height="height"
            :weight="weight"
            @update:height="updateHeight"
            @update:weight="updateWeight"
          />
        </div>
      </div>
      
      <div v-if="isReady && bmi !== null" class="result-section animate-slideUp">
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
      />
      
      <HistorySection 
        v-if="showHistory"
        :records="historyRecords"
        @clear="clearHistory"
        class="mb-4"
      />
      
      <FooterSection />
    </main>
  </div>
</template>

<style scoped>
.bmi-app {
  min-height: 100vh;
  min-height: 100dvh;
  background: linear-gradient(180deg, #f0fff4 0%, #ffffff 50%, #f6ffed 100%);
}

.main-content {
  padding: 16px 20px;
  padding-bottom: calc(var(--safe-area-bottom) + 24px);
}

.input-section {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.result-section {
  animation-delay: 0.1s;
}

.progress-section {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
