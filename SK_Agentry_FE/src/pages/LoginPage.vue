<template>
  <div class="login-wrapper">
    <!-- 로고 영역 -->
    <div class="logo-box">
      <img src="/SK_Agentry_logo.png" alt="SK Agentry 로고" />
    </div>

    <!-- 로그인 카드 -->
    <div class="login-card">
      <h2 class="login-title">로그인</h2>

      <form @submit.prevent="handleLogin">
        <label>아이디</label>
        <input v-model="username" type="text" placeholder="아이디" />

        <label>비밀번호</label>
        <input v-model="password" type="password" placeholder="비밀번호" />

        <button type="submit" class="login-button">로그인</button>
      </form>

      <div class="extra-links">
        <a href="#">비밀번호 찾기</a>
      </div>

      <hr />

      <div class="signup-line">
        계정이 없으신가요? <a href="#" class="signup-link" @click.prevent="goToSignup">회원가입</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import '../styles/login.css' 

const username = ref('')
const password = ref('')
const router = useRouter()

const goToSignup = () => {
  router.push('/signup') 
}

const handleLogin = () => {
  console.log('로그인 시도:', username.value, password.value)
}
</script>
