<template>
    <div class="agent-card">
      <div class="card-left">
        <h3 class="agent-title">{{ agent.name }}</h3>
        <p class="agent-desc">{{ agent.description }}</p>
        <div class="tag-list">
          <span v-for="tag in agent.tags" :key="tag" class="tag">#{{ tag }}</span>
        </div>
      </div>
      <div class="agent-actions">
        <button class="run-btn">실행</button>
        <button
          class="buy-btn"
          :class="{ disabled: agent.purchased }"
          @click="handleBuy"
        >
          {{ agent.purchased ? '다운로드' : '구매하기' }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    agent: {
      type: Object,
      required: true
    }
  })
  
  function handleBuy() {
    if (agent.purchased) {
      // 다운로드 처리
      window.open(agent.downloadUrl, '_blank')
    } else {
      alert('결제 페이지로 이동합니다.')
      // 결제 연동 코드 추가 가능
    }
  }
  </script>
  