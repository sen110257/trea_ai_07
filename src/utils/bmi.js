export const BMI_LEVELS = {
  UNDERWEIGHT: {
    level: 'underweight',
    name: '偏瘦',
    color: '#69b1ff',
    colorLight: '#9ecfff',
    gradient: 'linear-gradient(135deg, #69b1ff 0%, #9ecfff 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(105, 177, 255, 0.15) 0%, rgba(158, 207, 255, 0.08) 100%)',
    min: 0,
    max: 18.5,
    description: '您的体重偏轻，建议适当增加营养摄入'
  },
  NORMAL: {
    level: 'normal',
    name: '标准',
    color: '#52c9a9',
    colorLight: '#83d9c2',
    gradient: 'linear-gradient(135deg, #52c9a9 0%, #83d9c2 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(82, 201, 169, 0.15) 0%, rgba(131, 217, 194, 0.08) 100%)',
    min: 18.5,
    max: 24,
    description: '恭喜！您的体重在正常范围内，继续保持'
  },
  OVERWEIGHT: {
    level: 'overweight',
    name: '微超重',
    color: '#ffb74d',
    colorLight: '#ffcc80',
    gradient: 'linear-gradient(135deg, #ffb74d 0%, #ffcc80 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(255, 183, 77, 0.15) 0%, rgba(255, 204, 128, 0.08) 100%)',
    min: 24,
    max: 27,
    description: '您的体重略微超标，建议注意饮食和运动'
  },
  OBESITY_L1: {
    level: 'obesity_l1',
    name: '超重',
    color: '#ff9e4d',
    colorLight: '#ffb74d',
    gradient: 'linear-gradient(135deg, #ff9e4d 0%, #ffb74d 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(255, 158, 77, 0.15) 0%, rgba(255, 183, 77, 0.08) 100%)',
    min: 27,
    max: 30,
    description: '您的体重超标较多，建议调整生活方式'
  },
  OBESITY_L2: {
    level: 'obesity_l2',
    name: '肥胖',
    color: '#ff7875',
    colorLight: '#ffa39e',
    gradient: 'linear-gradient(135deg, #ff7875 0%, #ffa39e 100%)',
    bgGradient: 'linear-gradient(135deg, rgba(255, 120, 117, 0.15) 0%, rgba(255, 163, 158, 0.08) 100%)',
    min: 30,
    max: 100,
    description: '您的体重严重超标，建议咨询医生进行专业指导'
  }
}

export const AGE_REFERENCES = {
  children: {
    name: '儿童(6-12岁)',
    minAge: 6,
    maxAge: 12,
    bmiMin: 14.5,
    bmiMax: 19.5,
    description: '儿童时期BMI范围相对较低，关注均衡营养'
  },
  teenager: {
    name: '青少年(13-17岁)',
    minAge: 13,
    maxAge: 17,
    bmiMin: 16.5,
    bmiMax: 22.5,
    description: '青少年身体处于发育期，BMI范围逐渐接近成人'
  },
  adult: {
    name: '成年人(18-64岁)',
    minAge: 18,
    maxAge: 64,
    bmiMin: 18.5,
    bmiMax: 24,
    description: '成年人BMI标准范围为18.5-24，在此范围内最健康'
  },
  senior: {
    name: '老年人(65岁以上)',
    minAge: 65,
    maxAge: 120,
    bmiMin: 20,
    bmiMax: 26,
    description: '老年人BMI可以略高于年轻人，20-26为理想范围'
  }
}

export const HEALTH_TIPS = [
  '每天至少喝8杯水，保持身体水分充足',
  '每周进行至少150分钟中等强度有氧运动',
  '保证每晚7-8小时的高质量睡眠',
  '多吃新鲜蔬菜和水果，均衡营养',
  '减少久坐时间，每小时起身活动5分钟',
  '学会放松，保持积极乐观的心态',
  '定期体检，及时了解身体状况',
  '戒烟限酒，远离不良生活习惯',
  '适量补充维生素D，多晒太阳',
  '保持良好的个人卫生习惯'
]

export function calculateBMI(weight, height) {
  if (!weight || !height || weight <= 0 || height <= 0) {
    return null
  }
  
  const heightInMeter = height / 100
  const bmi = weight / (heightInMeter * heightInMeter)
  
  return Math.round(bmi * 10) / 10
}

export function getBMILevel(bmi) {
  if (bmi === null) return null
  
  if (bmi < BMI_LEVELS.UNDERWEIGHT.max) {
    return BMI_LEVELS.UNDERWEIGHT
  } else if (bmi < BMI_LEVELS.NORMAL.max) {
    return BMI_LEVELS.NORMAL
  } else if (bmi < BMI_LEVELS.OVERWEIGHT.max) {
    return BMI_LEVELS.OVERWEIGHT
  } else if (bmi < BMI_LEVELS.OBESITY_L1.max) {
    return BMI_LEVELS.OBESITY_L1
  } else {
    return BMI_LEVELS.OBESITY_L2
  }
}

export function calculateIdealWeight(height, gender = 'male') {
  if (!height || height <= 0) {
    return null
  }
  
  const baseHeight = 100
  let idealWeight
  
  if (gender === 'male') {
    idealWeight = (height - baseHeight) * 0.9
  } else {
    idealWeight = (height - baseHeight) * 0.85
  }
  
  const minWeight = Math.round((idealWeight * 0.9) * 10) / 10
  const maxWeight = Math.round((idealWeight * 1.1) * 10) / 10
  idealWeight = Math.round(idealWeight * 10) / 10
  
  return {
    ideal: idealWeight,
    min: minWeight,
    max: maxWeight
  }
}

export function estimateBodyFat(bmi, age, gender = 'male') {
  if (!bmi || !age) {
    return null
  }
  
  let bodyFat
  
  if (gender === 'male') {
    bodyFat = (1.2 * bmi) + (0.23 * age) - 16.2
  } else {
    bodyFat = (1.2 * bmi) + (0.23 * age) - 5.4
  }
  
  bodyFat = Math.round(bodyFat * 10) / 10
  
  let bodyFatLevel
  
  if (gender === 'male') {
    if (bodyFat < 10) {
      bodyFatLevel = '偏低'
    } else if (bodyFat < 20) {
      bodyFatLevel = '正常'
    } else if (bodyFat < 25) {
      bodyFatLevel = '偏高'
    } else {
      bodyFatLevel = '过高'
    }
  } else {
    if (bodyFat < 20) {
      bodyFatLevel = '偏低'
    } else if (bodyFat < 30) {
      bodyFatLevel = '正常'
    } else if (bodyFat < 35) {
      bodyFatLevel = '偏高'
    } else {
      bodyFatLevel = '过高'
    }
  }
  
  return {
    value: bodyFat,
    level: bodyFatLevel
  }
}

export function getAgeReference(age) {
  if (!age || age < 0) {
    return null
  }
  
  if (age >= 65) {
    return AGE_REFERENCES.senior
  } else if (age >= 18) {
    return AGE_REFERENCES.adult
  } else if (age >= 13) {
    return AGE_REFERENCES.teenager
  } else if (age >= 6) {
    return AGE_REFERENCES.children
  }
  
  return null
}

export function generateHealthAdvice(bmiLevel, age, gender) {
  const baseAdvice = {
    diet: [],
    exercise: [],
    lifestyle: []
  }
  
  if (!bmiLevel) {
    return baseAdvice
  }
  
  switch (bmiLevel.level) {
    case 'underweight':
      baseAdvice.diet = [
        '增加高热量、高营养食物的摄入',
        '每天增加2-3次加餐',
        '选择优质蛋白质：鸡蛋、牛奶、瘦肉、鱼类',
        '适当增加碳水化合物的摄入',
        '多吃坚果和健康油脂'
      ]
      baseAdvice.exercise = [
        '每周进行2-3次力量训练，增加肌肉量',
        '避免长时间的有氧运动',
        '运动后及时补充营养',
        '保证充足的休息时间'
      ]
      baseAdvice.lifestyle = [
        '保持规律的作息时间',
        '减少压力，保持心情舒畅',
        '定期监测体重变化',
        '如持续消瘦建议就医检查'
      ]
      break
      
    case 'normal':
      baseAdvice.diet = [
        '继续保持均衡的饮食习惯',
        '多吃新鲜蔬菜水果',
        '控制油脂和糖分的摄入',
        '适量摄入优质蛋白质',
        '保持水分充足'
      ]
      baseAdvice.exercise = [
        '每周进行3-5次中等强度运动',
        '结合有氧运动和力量训练',
        '每次运动30-45分钟',
        '养成运动习惯，持之以恒'
      ]
      baseAdvice.lifestyle = [
        '保持规律作息，不要熬夜',
        '定期体检，了解身体状况',
        '保持积极乐观的心态',
        '避免久坐，多活动'
      ]
      break
      
    case 'overweight':
    case 'obesity_l1':
      baseAdvice.diet = [
        '控制每日总热量摄入',
        '减少高糖、高脂食物的摄入',
        '增加膳食纤维的摄入',
        '选择低热量、高营养的食物',
        '控制晚餐摄入量，避免夜宵'
      ]
      baseAdvice.exercise = [
        '每周进行4-5次有氧运动',
        '每次运动45-60分钟',
        '可以选择快走、慢跑、游泳等',
        '逐渐增加运动强度和时间',
        '配合力量训练增加基础代谢'
      ]
      baseAdvice.lifestyle = [
        '记录每日饮食和运动情况',
        '保持充足睡眠，避免熬夜',
        '减少压力，避免情绪化进食',
        '设定合理的减重目标',
        '定期监测体重和体脂变化'
      ]
      break
      
    case 'obesity_l2':
      baseAdvice.diet = [
        '建议在医生或营养师指导下进行饮食控制',
        '严格控制每日热量摄入',
        '避免高糖、高脂、高盐食物',
        '增加蔬菜和膳食纤维的摄入',
        '规律饮食，避免暴饮暴食'
      ]
      baseAdvice.exercise = [
        '建议在医生指导下开始运动',
        '从低强度运动开始，如散步',
        '逐渐增加运动时间和强度',
        '避免剧烈运动，注意保护关节',
        '可以选择游泳等对关节压力小的运动'
      ]
      baseAdvice.lifestyle = [
        '建议咨询专业医生进行评估',
        '定期进行健康检查',
        '保持积极的减重心态',
        '寻求家人和朋友的支持',
        '关注血压、血糖、血脂等指标'
      ]
      break
  }
  
  return baseAdvice
}

export function generateHealthAnalysis(bmi, bmiLevel, idealWeight, age, gender) {
  if (!bmi || !bmiLevel) {
    return null
  }
  
  const analysis = {
    summary: '',
    details: [],
    risks: [],
    positives: []
  }
  
  analysis.summary = `您的BMI指数为 ${bmi}，属于${bmiLevel.name}范围。`
  
  switch (bmiLevel.level) {
    case 'underweight':
      analysis.details = [
        '体重偏低可能影响免疫力和身体健康',
        '建议适当增加营养摄入，关注均衡饮食',
        '如近期有明显体重下降，建议就医检查'
      ]
      analysis.risks = [
        '免疫力可能较低，容易感冒',
        '可能影响生长发育（青少年）',
        '女性可能影响月经周期'
      ]
      analysis.positives = [
        '心血管疾病风险较低',
        '关节负担较小'
      ]
      break
      
    case 'normal':
      analysis.details = [
        '恭喜！您的体重在健康范围内',
        '继续保持良好的饮食和运动习惯',
        '定期监测体重，维持健康状态'
      ]
      analysis.risks = [
        '继续保持，暂无明显风险'
      ]
      analysis.positives = [
        '心血管疾病风险低',
        '糖尿病风险低',
        '整体健康状况良好',
        '生活质量较高'
      ]
      break
      
    case 'overweight':
    case 'obesity_l1':
      analysis.details = [
        '体重超出正常范围，需要引起重视',
        '建议调整饮食结构，增加运动',
        '通过健康方式逐步减轻体重',
        '设定合理目标，每周减重0.5-1kg为宜'
      ]
      analysis.risks = [
        '心血管疾病风险增加',
        '糖尿病风险升高',
        '高血压风险增加',
        '关节负担加重'
      ]
      analysis.positives = [
        '通过调整可以改善',
        '早期干预效果好'
      ]
      break
      
    case 'obesity_l2':
      analysis.details = [
        '体重严重超标，健康风险较高',
        '建议咨询医生进行专业评估',
        '在专业指导下进行体重管理',
        '关注血压、血糖、血脂等指标'
      ]
      analysis.risks = [
        '心血管疾病风险显著增加',
        '2型糖尿病风险高',
        '高血压、高血脂风险高',
        '睡眠呼吸暂停风险',
        '关节疾病风险高'
      ]
      analysis.positives = [
        '积极干预可以改善健康状况',
        '减重后健康获益明显'
      ]
      break
  }
  
  if (idealWeight) {
    analysis.details.push(`您的理想体重约为 ${idealWeight.ideal}kg，合理体重范围为 ${idealWeight.min}kg - ${idealWeight.max}kg`)
  }
  
  return analysis
}

export function saveBMIRecord(record) {
  const records = getBMIRecords()
  const newRecord = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...record
  }
  
  records.unshift(newRecord)
  
  if (records.length > 20) {
    records.splice(20)
  }
  
  localStorage.setItem('bmi_records', JSON.stringify(records))
  return newRecord
}

export function getBMIRecords() {
  const records = localStorage.getItem('bmi_records')
  return records ? JSON.parse(records) : []
}

export function clearBMIRecords() {
  localStorage.removeItem('bmi_records')
}
