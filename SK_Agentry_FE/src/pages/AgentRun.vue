<template>
  <div class="run-wrapper">
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

    <!-- 실행 화면 -->
    <div class="run-content">
      <h2 class="agent-title">{{ agent.display_name }}</h2>
      <p class="agent-desc">{{ agent.description }}</p>

      <label class="input-label">{{ agent.input_guide }}</label>
      <textarea v-model="userInput" placeholder="입력하세요..." />

      <button class="run-button" @click="executeAgent" :disabled="loading">
        실행하기
      </button>

      <div v-if="loading" class="loading-msg">에이전트를 실행 중입니다...</div>

      <div class="markdown" v-if="result" v-html="result"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";

const route = useRoute();
const agentId = route.params.id;
const agent = ref({});
const userInput = ref("");
const loading = ref(false);
const result = ref("");

const token = localStorage.getItem("accessToken");

onMounted(async () => {
  try {
    const res = await fetch(`http://10.250.172.225:8000/agent/${agentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    agent.value = await res.json();
  } catch (err) {
    alert("에이전트 정보를 불러오는 데 실패했습니다.");
    console.error(err);
  }
});

async function executeAgent() {
  if (!userInput.value) {
    alert("입력을 작성해 주세요.");
    return;
  }

  loading.value = true;

  try {
    const res = await fetch(`http://10.250.172.225:8000/run_agent/${agentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        input_data: {
          // ✅ 서버가 요구하는 key
          input: userInput.value,
          tools: [], // 필요 시 tool 이름 배열로 추가
        },
      }),
    });

    let raw = await res.text();
    raw = raw
      .replace(/^"(.*)"$/, "$1")
      .replace(/\\"/g, '"')
      .replace(/\\n/g, "\n")
      .replace(/\\r/g, "")
      .replace(/\\t/g, "\t");

    result.value = marked(raw);
  } catch (err) {
    alert("에이전트 실행 중 오류가 발생했습니다.");
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>
<style scoped src="../styles/agentRun.css"></style>
