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
          @click.stop="handlePurchase(agent)"
        >
          {{ agent.purchased ? '다운로드' : '구매하기' }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { usePurchaseStore } from '../composables/usePurchaseStore' 
  const { addPurchase } = usePurchaseStore()
  defineProps({
    agent: {
      type: Object,
      required: true
    }
  })
  
  const handlePurchase = (agent) => {
    addPurchase(agent)
    agent.purchased = true
    alert('구매가 완료되었습니다.')
  }
  </script>
  