<template>
  <div class="agent-page">
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

    <!-- 상세 본문 -->
    <div class="agent-detail-container">
      <div class="header">
        <h1>{{ agent.name }}</h1>
        <p class="sub">{{ agent.description }}</p>
        <div class="price">₩{{ agent.price.toLocaleString() }}</div>
      </div>

      <div class="tabs">
        <div class="tab active">기능 설명</div>
        <div class="tab">사용 방법</div>
        <div class="tab">기술 스택</div>
        <div class="tab">FAQ</div>
      </div>

      <div class="content-area">
        <div class="image-box">
          <img :src="agent.image" alt="agent image" />
        </div>

        <div class="features">
          <h3>주요 기능</h3>
          <ul>
            <li v-for="item in agent.features" :key="item">• {{ item }}</li>
          </ul>

          <div class="download-buttons">
            <button>.py</button>
            <button>.yaml</button>
          </div>
        </div>
      </div>

      <button class="run-button">실행하기</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const agentId = route.params.id

const agent = {
  id: agentId,
  name: '이메일 분류 마법사',
  description: 'GPT-4 + Python 기반 이메일 자동 분류',
  price: 29000,
  image: '../public/email_magician.png',
  features: [
    '수신 이메일 내용 분류하여 태그 지정',
    'ERP 시스템과 통합 가능',
    'Gmail OAuth 인증 지원'
  ]
}
</script>

<style scoped src="../styles/agentDetail.css" />