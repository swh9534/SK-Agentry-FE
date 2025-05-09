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
          <div class="agent-card" v-for="agent in recommendedAgents" :key="agent.agent_id"
            @click="goToDetail(agent.agent_id)" style="cursor: pointer">
            <h3>{{ agent.display_name }}</h3>
            <p class="tag">#{{ agent.category }} | {{ agent.llm_type }}</p>
            <div class="buttons">
              <button class="run-btn">실행</button>
              <button class="buy-btn">구매하기</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 전체 에이전트 -->
<section class="agent-section">
  <h2 class="section-title red">전체 에이전트</h2>
  <div class="agent-list-vertical">
    <div class="agent-card" v-for="agent in allAgents" :key="agent.agent_id" @click="goToDetail(agent.agent_id)"
      style="cursor: pointer">
      <h3>{{ agent.display_name }}</h3>
      <p class="tag">#{{ agent.category }} | {{ agent.llm_type }}</p>
      <div class="buttons">
        <button class="run-btn">실행</button>
        <button class="buy-btn">구매하기</button>
      </div>
    </div>
  </div>
</section>

</div> <!-- 이거: .home-content -->
</div> <!-- 이거: .home-wrapper -->
</template>



<script setup>
import { ref, computed, onMounted } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const token = localStorage.getItem('accessToken')
const userId = Number(localStorage.getItem('user_id'))
const recommendedAgents = ref([])
const popularAgents = ref([])

const allAgents = ref([])
const currentSlide = ref(0)
const itemsPerSlide = 3


const fetchRecommendedAgents = async () => {
  try {
    const res = await fetch(`http://10.250.172.225:8000/agent/getRecom`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    recommendedAgents.value = data
  } catch (err) {
    console.error('맞춤 추천 에이전트 로딩 실패:', err)
  }
}

const fetchAllAgents = async () => {
  try {
    const res = await fetch('http://10.250.172.225:8000/agent/all', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    const data = await res.json()
    allAgents.value = data.agents || data
  } catch (err) {
    console.error('전체 에이전트 로딩 실패:', err)
  }
}

const goToDetail = (agentId) => {
  router.push(`/agent-detail/${agentId}`)
}

onMounted(() => {
  // ✅ 최초 1회 리포트 자동 생성
  const userId = localStorage.getItem('user_id')
  const reportKey = `ai_report_generated_${userId}`

  if (!localStorage.getItem(reportKey)) {
    localStorage.setItem(reportKey, 'true')
    router.push('/ai-report')
    return
  }

  fetchRecommendedAgents()
  fetchAllAgents()
})
</script>


<style scoped src="../styles/home.css" />
