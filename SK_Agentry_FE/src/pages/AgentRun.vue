<template>
  <div class="run-wrapper">
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

    <div class="run-content">
      <h2 class="agent-title">{{ agent.display_name }}</h2>
      <p class="agent-desc">{{ agent.description }}</p>

      <!-- 기존 입력란들 제거하고 아래처럼 대체 -->
      <div class="input-group">
        <label class="input-label">회사명</label>
        <input class="input-field" v-model="form.company_name" placeholder="예: 우리금융" />

        <label class="input-label">AI 도입 목표</label>
        <input class="input-field" v-model="form.ai_goal" placeholder="예: 문서 자동화" />

        <label class="input-label">투자 예산 (원)</label>
        <input class="input-field" v-model.number="form.investment_amount" type="number" placeholder="예: 1000000" />
      </div>

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
const loading = ref(false);
const result = ref("");
const form = ref({
  company_name: "",
  investment_amount: 0,
  ai_goal: ""
});

const token = localStorage.getItem("accessToken");

onMounted(async () => {
  try {
    const res = await fetch(`http://10.250.73.224:8000/agent/detail/${agentId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    agent.value = data;
  } catch (err) {
    alert("에이전트 정보를 불러오는 데 실패했습니다.");
    console.error(err);
  }
});

async function executeAgent() {
  const { company_name, investment_amount, ai_goal } = form.value;

  if (!company_name || !ai_goal || !investment_amount) {
    alert("모든 항목을 입력해 주세요.");
    return;
  }

  loading.value = true;

  console.log(agent.value.name)

  try {
    const res = await fetch(`http://10.250.73.224:8000/run_agent/${agent.value.name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        input_data: {
          input: {
            company_name,
            investment_amount,
            ai_goal
          },
        },
        tools: []
      }),
    });

    const raw = await res.json()
    result.value = marked(raw.result.output || '# 결과를 찾을 수 없습니다.')

  } catch (err) {
    alert("에이전트 실행 중 오류가 발생했습니다.");
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped src="../styles/agentRun.css"></style>
