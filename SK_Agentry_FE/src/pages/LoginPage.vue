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
        <a href="#" class="forgot-password-link">비밀번호 찾기</a>
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

const handleLogin = async () => {
  if (!username.value || !password.value) {
    alert('아이디와 비밀번호를 입력해주세요.')
    return
  }

  try {
    const response = await fetch('http://10.250.172.225:8000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: username.value,
        password: password.value
      })
    })

    const result = await response.json()

    if (response.ok && result.access_token) {
      // 토큰 저장
      localStorage.setItem('accessToken', result.access_token)
      localStorage.setItem('user_id', result.user.user_id)


      router.push('/home')
    } else {
      alert(result.detail || '아이디 또는 비밀번호가 일치하지 않습니다.')
    }
  } catch (error) {
    console.error('로그인 오류:', error)
    alert('서버 오류가 발생했습니다.')
  }
}

</script>
