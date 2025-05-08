<template>
  <div class="signup-wrapper">
    <div class="logo-wrapper">
      <router-link to="/home">
          <img src="/SK_Agentry_logo.png" alt="SK Agentry 로고" />
        </router-link>
    </div>
    <div class="signup-card">
      <h2 class="signup-title">회원가입</h2>
      <form @submit.prevent="submitForm">
        <input type="text" v-model="form.id" placeholder="아이디" />
        <input type="password" v-model="form.password" placeholder="비밀번호" />
        <input type="text" v-model="form.company" placeholder="기업명" />

        <!-- 산업군 선택 -->
        <select v-model="form.industry">
          <option disabled value="">산업</option>
          <option v-for="item in industries" :key="item">{{ item }}</option>
        </select>

        <input type="number" v-model="form.employees" placeholder="직원수" />

        <!-- 관심분야 -->
        <div class="interest-box">
          <label>관심분야</label>
          <div class="interest-scroll">
            <div v-for="field in interests" :key="field" @click="toggleInterest(field)"
              :class="['interest-chip', form.interest.includes(field) ? 'selected' : '']">
              {{ field }}
            </div>
          </div>
        </div>

        <input type="number" v-model="form.budget" placeholder="예산 규모" />

        <button class="signup-button">가입하기</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const industries = ['공공', '제조', '금융', '유통/물류', 'IT/통신', '서비스업', '기타']
const interests = ['스마트 팩토리', 'ESG', '고객 상담 자동화', '문서 자동화', 'AI 분석', '업무 효율화']

const form = ref({
  id: '',
  password: '',
  company: '',
  industry: '',
  employees: '',
  interest: [],
  budget: ''
})

function toggleInterest(field) {
  const idx = form.value.interest.indexOf(field)
  if (idx === -1) form.value.interest.push(field)
  else form.value.interest.splice(idx, 1)
}

function submitForm() {
  const f = form.value

  // 유효성 검사
  if (!f.id || !f.password || !f.company || !f.industry || !f.employees || f.interest.length === 0 || !f.budget) {
    alert('모든 항목을 입력해 주세요.')
    return
  }

  // 가입 완료 처리
  alert('회원가입이 완료되었습니다.')
  console.log('제출된 정보:', f)

  // 로그인 화면으로 이동
  router.push('/login')
}
</script>

<style scoped src="../styles/signup.css" />