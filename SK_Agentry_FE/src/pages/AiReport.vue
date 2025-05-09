<template>
  <div class="report-page">
    <!-- 네비게이션 바 -->
    <header class="nav-bar">
      <div class="logo-box">
        <router-link to="/home">
          <img src="/SK_Agentry_logo.png" alt="SK Agentry 로고" />
        </router-link>
      </div>
      <nav class="nav-menu">
        <router-link to="/home">홈</router-link>
        <router-link to="/agent-market">에이전트 마켓</router-link>
        <router-link to="/mypage">마이페이지</router-link>
      </nav>
    </header>

    <!-- 로딩 화면 -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
      <div class="loading-message">{{ loadingMessage }}</div>
      <div class="progress-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="progress-text">{{ progress }}%</div>
    </div>

    <!-- 결과 화면 -->
    <div v-else class="report-wrapper" v-html="renderedMarkdown"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const renderedMarkdown = ref('')
const loading = ref(true)
const progress = ref(0)
const loadingMessage = ref('AI 리포트를 준비 중입니다...')

const token = localStorage.getItem('accessToken')
const userId = Number(localStorage.getItem('user_id'))

const messages = [
  'AI 리포트를 생성 중입니다...',
  'AI 분석을 진행 중입니다...',
  '보고서를 작성 중입니다...',
  '보고서를 불러오는 중입니다...'
]

let interval

function startLoading() {
  let step = 0
  interval = setInterval(() => {
    if (progress.value >= 100) {
      clearInterval(interval)
      return
    }

    progress.value += 5
    const msgIndex = Math.floor(progress.value / (100 / messages.length))
    loadingMessage.value = messages[Math.min(msgIndex, messages.length - 1)]
  }, 300)
}

function stopLoading() {
  clearInterval(interval)
  loading.value = false
}

async function generateAndLoadReport() {
  try {
    startLoading()

    const postRes = await fetch('http://10.250.73.224:8000/agent/analyze', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: userId })
    })
    if (!postRes.ok) throw new Error('리포트 생성 실패')

    const userRes = await fetch(`http://10.250.73.224:8000/user/${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const userData = await userRes.json()
    const latestReport = userData.reports.at(-1)
    const reportId = latestReport.user_report_id

    const mdRes = await fetch(`http://10.250.73.224:8000/agent/report/${reportId}/content`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

    let rawText = await mdRes.text()
    rawText = rawText
      .replace(/^"(.*)"$/, '$1')
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '')
      .replace(/\\t/g, '\t')
      .replace(/^```markdown\s*/i, '')  

    renderedMarkdown.value = marked(rawText)
  } catch (err) {
    console.error(err)
    alert('리포트를 불러오는 데 실패했습니다.')
  } finally {
    progress.value = 100
    setTimeout(stopLoading, 500)
  }
}

onMounted(generateAndLoadReport)
</script>

<style src="../styles/aireport.css" />