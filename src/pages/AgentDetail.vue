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

    <!-- 에이전트 상세 내용 -->
    <div v-if="agent" class="agent-detail-container">
      <div class="header">
        <h1>{{ agent.display_name }}</h1>
        <p class="sub">{{ agent.description }}</p>
        <div class="price">₩{{ price.toLocaleString() }}</div>
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

    <!-- ✅ 로딩 표시 -->
    <div v-else class="loading-message">
      <p>에이전트 정보를 불러오는 중...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const agentId = route.params.id;
const agent = ref(null);

const price = 29000; // 필요 시 agent.price로 교체 가능

const parsedFeatures = computed(() => {
  if (!agent.value || !agent.value.features) return [];
  try {
    return typeof agent.value.features === "string"
      ? JSON.parse(agent.value.features)
      : agent.value.features;
  } catch {
    return [];
  }
});

onMounted(async () => {
  try {
    const res = await fetch(
      `http://10.250.73.224:8000/agent/detail/${agentId}`
    );
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    agent.value = data;
  } catch (err) {
    console.error("에이전트 불러오기 실패", err);
  }
});
function goToRunPage() {
  router.push(`/agent-run/${agentId}`);
}
</script>

<style scoped src="../styles/agentDetail.css" />
