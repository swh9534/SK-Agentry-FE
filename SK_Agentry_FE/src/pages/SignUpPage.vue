<template>
  <div class="signup-wrapper">
    <div class="logo-wrapper">
        <img src="/SK_Agentry_logo.png" alt="SK Agentry 로고" />
    </div>
    <div class="signup-card">
      <h2 class="signup-title">회원가입</h2>
      <form @submit.prevent="submitForm">
        <input type="text" v-model="form.id" placeholder="아이디" />
        <input type="password" v-model="form.password" placeholder="비밀번호" />
        <input type="text" v-model="form.name" placeholder="기업명" />

        <!-- 산업군 선택 -->
        <select v-model="form.industry">
          <option disabled value="">산업</option>
          <option v-for="item in industries" :key="item">{{ item }}</option>
        </select>

        <input type="number" v-model="form.scale" placeholder="직원수" />

        <!-- 관심분야 -->
        <div class="interest-box">
          <label>관심분야</label>
          <div class="interest-scroll">
            <div v-for="field in interests" :key="field" @click="toggleInterest(field)"
              :class="['interest-chip', form.interests === field ? 'selected' : '']">
              {{ field }}
            </div>
          </div>
        </div>

        <input type="number" v-model="form.budget_size" placeholder="예산 규모" />

        <button class="signup-button">가입하기</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()



const interests = ['스마트 팩토리', 'ESG', '고객 상담 자동화', '문서 자동화', 'AI 분석', '업무 효율화']
const industries = ['공공', '제조', '금융', '유통/물류', 'IT/통신', '서비스업', '기타']

const form = ref({
  id: '',
  password: '',
  name: '',          
  industry: '',
  scale: '',
  interests: '',   
  budget_size: ''
})

function toggleInterest(field) {
  form.value.interests = field 
}

async function submitForm() {
  const f = form.value

  if (!f.id || !f.password || !f.name || !f.industry || !f.scale || !f.interests || !f.budget_size) {
    alert('모든 항목을 입력해 주세요.')
    return
  }

  try {
    const response = await fetch('http://10.250.172.225:8000/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...f,
        scale: Number(f.scale),
        budget_size: parseFloat(f.budget_size)
      })
    })

    const result = await response.json()

    if (response.ok && result.success) {

      localStorage.setItem('user_id', result.user_id)
      
      alert('회원가입이 완료되었습니다.')
      router.push('/login')
    } else {
      alert(result.detail || '회원가입에 실패했습니다.')
    }
  } catch (err) {
    console.error('회원가입 오류:', err)
    alert('서버 오류가 발생했습니다.')
  }
}
</script>



<style scoped src="../styles/signup.css" />