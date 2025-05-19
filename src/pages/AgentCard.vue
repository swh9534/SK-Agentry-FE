<template>
  <div class="agent-card">
    <div class="card-left">
      <h3 class="agent-title-with-icon">
        <img v-if="agent.image_url" :src="agent.image_url" alt="Agent Icon" class="agent-icon" />
        {{ agent.display_name }}
      </h3>
      <p class="agent-desc">{{ agent.description }}</p>
      <div class="tag-list">
        <span class="tag">#{{ agent.category }}</span>
        <span class="tag">#{{ agent.llm_type }}</span>
        <span class="tag">#{{ agent.language }}</span>
      </div>
    </div>
    <div class="agent-actions">
      <button class="run-btn">실행</button>
      <button class="buy-btn" :class="{ disabled: agent.purchased }" @click.stop="handlePurchase(agent)">
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
  if (agent.purchased) return

  addPurchase(agent)
  agent.purchased = true
  alert('구매가 완료되었습니다.')
}

</script>
<style scoped>
.agent-title-with-icon {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 6px;
}

.agent-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: 4px;
}
</style>