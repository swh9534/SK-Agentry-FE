<template>
  <div>
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

    <!-- 마켓 콘텐츠 -->
    <div class="market-wrapper">
      <div class="market-content">
        <h2 class="market-title">에이전트 마켓</h2>

        <div class="filter-bar">
          <!-- 관심 분야 => category 기준 -->
          <select v-model="selectedInterest">
            <option value="">관심 분야 선택</option>
            <option v-for="interest in interests" :key="interest" :value="interest">
              {{ interest }}
            </option>
          </select>

          <!-- 산업군 => llm_type 기준 -->
          <select v-model="selectedIndustry">
            <option value="">LLM 선택</option>
            <option value="GPT-4o">GPT-4o</option>
            <option value="Claude-3.5-sonnet">Claude-3.5-sonnet</option>
          </select>

        </div>

        <div class="agent-list">
          <AgentCard v-for="agent in filteredAgents" :key="agent.id" :agent="agent" @click="goToDetail(agent.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AgentCard from './AgentCard.vue'
import '../styles/agentMarket.css'
import { useRouter } from 'vue-router'
import { usePurchaseStore } from '../composables/usePurchaseStore'

const { addPurchase } = usePurchaseStore()
const router = useRouter()

const selectedIndustry = ref('')
const selectedInterest = ref('')
const selectedSort = ref('latest')

const agents = ref([])

const fetchAllAgents = async () => {
  try {
    const token = localStorage.getItem('accessToken')
    const res = await fetch('http://10.250.73.224:8000/agent/all', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    const data = await res.json()

    // 백엔드에서 내려주는 구조에 따라 변환 필요 시 이 부분 조정
    agents.value = (data.agents || data).map(agent => ({
      id: agent.agent_id,
      display_name: agent.display_name,
      description: agent.description || '설명이 없습니다.',
      category: agent.category,
      llm_type: agent.llm_type,
      language: agent.language || '한국어',
      purchased: false,
      image_url: agent.image_url,
      createdAt: agent.created_at || '2024-01-01',
    }))

  } catch (err) {
    console.error('에이전트 목록 불러오기 실패:', err)
  }
}

onMounted(fetchAllAgents)

// 관심분야 목록 자동 추출
const interests = computed(() => {
  const categories = agents.value.map(agent => agent.category)
  return [...new Set(categories.filter(Boolean))] // 중복 제거 + 빈값 제외
})
// llm 목록 자동 추출
const llms = computed(() => {
  const types = agents.value.map(agent => agent.llm_type)
  return [...new Set(types.filter(Boolean))]
})


const filteredAgents = computed(() => {
  let filtered = agents.value.filter(agent => {
    const matchCategory = !selectedInterest.value || agent.category === selectedInterest.value
    const matchLLM = !selectedIndustry.value || agent.llm_type === selectedIndustry.value
    return matchCategory && matchLLM
  })

  if (selectedSort.value === 'latest') {
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return filtered
})



function goToDetail(id) {
  router.push(`/agents/${id}`)
}
</script>