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
            <div class="agent-card" v-for="agent in recommendedAgents" :key="agent.id" @click="goToDetail(agent.id)" style="cursor: pointer">
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
            <div class="agent-card" v-for="agent in popularAgents" :key="agent.id" @click="goToDetail(agent.id)" style="cursor: pointer">
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
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const recommendedAgents = [
    { id: 1, name: '이메일 분류 마법사', tag: 'Gmail API' },
    { id: 2, name: '이메일 분류 마법사', tag: 'Gmail API' },
    { id: 3, name: '이메일 분류 마법사', tag: 'Gmail API' }
  ]
  
  const popularAgents = [
    { id: 4, name: '이메일 분류 마법사', tag: 'Gmail API' },
    { id: 5, name: '이메일 분류 마법사', tag: 'Gmail API' },
    { id: 6, name: '이메일 분류 마법사', tag: 'Gmail API' }
  ]

  const goToDetail = (id) => {
  router.push(`/agents/${id}`)
  }
  </script>
  
  <style scoped src="../styles/home.css" />
  