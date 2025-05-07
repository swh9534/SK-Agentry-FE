<template>
    <div class="market-wrapper">
        <!-- 로고 영역 -->
    <div class="logo-box">
      <img src="/SK_Agentry_logo.png" alt="SK Agentry 로고" />
    </div>
      <h2 class="market-title">에이전트 마켓</h2>
  
      <div class="filter-bar">
        <select v-model="selectedIndustry">
          <option value="">산업군 선택</option>
          <option v-for="industry in industries" :key="industry" :value="industry">
            {{ industry }}
          </option>
        </select>
  
        <select v-model="selectedInterest">
          <option value="">관심 분야 선택</option>
          <option v-for="interest in interests" :key="interest" :value="interest">
            {{ interest }}
          </option>
        </select>
  
        <select v-model="selectedSort">
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
          <option value="price">가격순</option>
        </select>
      </div>
  
      <div class="agent-list">
        <AgentCard
          v-for="agent in filteredAgents"
          :key="agent.id"
          :agent="agent"
        />
      </div>
    </div>
  </template>

  <script setup>
  import { ref, computed } from 'vue'
  import AgentCard from './AgentCard.vue'
  import '../styles/agentMarket.css'
  
  const industries = ['공공', '제조', '금융', '유통/물류', 'IT/통신', '서비스업', '기타']
  const interests = ['스마트 팩토리', 'ESG', '고객 상담 자동화', '문서 자동화', 'AI 분석', '업무 효율화']
  
  const selectedIndustry = ref('')
  const selectedInterest = ref('')
  const selectedSort = ref('latest')
  
  const agents = [
    {
      id: 1,
      name: '이메일 분류 마법사',
      description: '수신 이메일을 자동으로 분류하는 에이전트',
      tags: ['메일', '문서 자동화'],
      industry: 'IT/통신',
      purchased: false,
      downloadUrl: '/downloads/email_sorter.py'
    },
    {
      id: 2,
      name: '슬랙 회의 요약봇',
      description: 'GPT-4 기반 회의 자동 요약 시스템',
      tags: ['협업', '문서 자동화'],
      industry: '서비스업',
      purchased: true,
      downloadUrl: '/downloads/slack_summary.py'
    }
  ]
  
  const filteredAgents = computed(() => {
    return agents.filter(agent => {
      const matchIndustry =
        !selectedIndustry.value || agent.industry === selectedIndustry.value
      const matchInterest =
        !selectedInterest.value || agent.tags.includes(selectedInterest.value)
      return matchIndustry && matchInterest
    })
  })
  </script>
  
  