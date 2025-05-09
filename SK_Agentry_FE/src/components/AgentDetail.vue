<template>
  <div class="agent-detail-container">
    <div class="header">
      <h1>{{ agent.display_name }}</h1>
      <p class="sub">{{ agent.description }}</p>
      <div class="price">₩{{ price }}</div>
    </div>

    <div class="tabs">
      <div class="tab active">기능 설명</div>
      <div class="tab">사용 방법</div>
      <div class="tab">기술 스택</div>
      <div class="tab">FAQ</div>
    </div>

    <div class="content-area">
      <div class="image-box">
        <img :src="agent.image_url || '/default.png'" alt="agent image" />
      </div>

      <div class="features">
        <h3>주요 기능</h3>
        <ul>
          <li v-for="feature in parsedFeatures" :key="feature">
            • {{ feature }}
          </li>
        </ul>
      </div>
    </div>

    <button class="run-button" @click="goToRunPage">실행하기</button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

defineProps({
  agent: Object,
});

const router = useRouter();
const price = 29000; // 필요시 agent.price로 연결

// features가 JSON string이면 파싱
const parsedFeatures = computed(() => {
  if (!agent?.features) return [];

  try {
    const parsed = JSON.parse(agent.features);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    // JSON parse 실패 → 콤마 기준으로 split
    return agent.features.split(",").map((f) => f.trim());
  }
});
</script>

<style scoped src="../styles/agentDetail.css" />
