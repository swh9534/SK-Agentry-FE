<template>
  <div class="home-wrapper">
    <!-- 내비게이션 바 -->
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

    <!-- 메인 콘텐츠 -->
    <div class="home-content">
      <!-- 맞춤 추천 -->
      <section class="agent-section">
        <h2 class="section-title red">맞춤 추천 에이전트</h2>
        <div class="agent-scroll">
          <div class="agent-card" v-for="agent in recommendedAgents" :key="agent.id" @click="goToDetail(agent.id)"
            style="cursor: pointer">
            <h3>{{ agent.name }}</h3>
            <p class="tag">#{{ agent.tag }}</p>
            <div class="buttons">
              <button class="run-btn">실행</button>
              <button class="buy-btn">구매하기</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 인기 에이전트 -->
      <section class="agent-section">
        <h2 class="section-title red">인기 에이전트</h2>
        <div class="agent-scroll">
          <div class="agent-card" v-for="agent in popularAgents" :key="agent.id" @click="goToDetail(agent.id)"
            style="cursor: pointer">
            <h3>{{ agent.name }}</h3>
            <p class="tag">#{{ agent.tag }}</p>
            <div class="buttons">
              <button class="run-btn">실행</button>
              <button class="buy-btn">구매하기</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>

  <ReportPromptModal
  v-if="showModal"
  @confirm="handleConfirm"
  @close="handleClose"/>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ReportPromptModal from '../components/ReportPromptModal.vue'

const router = useRouter()
const showModal = ref(false)

// 로그인된 사용자 ID
const userId = localStorage.getItem('loggedInUser') || 'defaultUser'

// 테스트용: 항상 모달 띄우기
showModal.value = true

// ✅ 실제 조건부 로직은 추후 사용 가능하도록 주석 처리
// onMounted(() => {
//   const key = `reportPrompt_shown_${userId}`
//   const shown = localStorage.getItem(key)
//   if (!shown) {
//     showModal.value = true
//   }
// })

function handleConfirm() {
  localStorage.setItem(`reportPrompt_shown_${userId}`, 'true')
  showModal.value = false
  router.push('/ai-report') // 보고서 페이지로 이동
}

function handleClose() {
  localStorage.setItem(`reportPrompt_shown_${userId}`, 'true')
  showModal.value = false
}
</script>


<style scoped src="../styles/home.css" />