<template>
    <div class="mypage-wrapper">
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

        <!-- 콘텐츠 시작 -->
        <div class="mypage-content">
            <h1 class="title">마이페이지</h1>

            <!-- 기업 정보 -->
            <div class="company-card">
                <div class="info">
                    <h2>{{ companyInfo.name }}</h2>
                    <p>산업군: {{ companyInfo.industry }}</p>
                    <p>가입일: {{ companyInfo.created_date }}</p>
                </div>
                <button class="edit-button">정보 수정</button>
            </div>


            <!-- 구매한 에이전트 -->
            <h2 class="section-title">구매한 에이전트</h2>
            <div class="agent-list">
                <div class="agent-card" v-for="agent in purchasedAgents" :key="agent.id">
                    <h3>{{ agent.name }}</h3>
                    <p class="tag">#{{ agent.tags[0] }}</p>
                    <div class="card-buttons">
                        <button class="run-btn">실행</button>
                        <button class="download-btn">다운로드</button>
                    </div>
                </div>
            </div>

            <!-- 기업 분석 결과 -->
            <div class="analysis-section">
                <h2>기업 분석 결과</h2>
                <div class="analysis-buttons">
                    <button class="retry-btn">다시 하기</button>
                    <button class="view-btn" @click="goToReport">결과 보기</button>
                </div>
            </div>

            <div class="logout-area">
                <button class="logout-btn" @click="handleLogout">로그아웃</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { usePurchaseStore } from '../composables/usePurchaseStore'

const { purchasedAgents } = usePurchaseStore()
const router = useRouter()

const companyInfo = ref({
    name: '',
    industry: '',
    created_date: ''
})

const handleLogout = () => {
    router.push('/login')
}

const goToReport = () => {
    router.push('/ai-report')
}

onMounted(async () => {
    const userId = localStorage.getItem('loggedInUser')
    if (!userId) return

    try {
        const res = await fetch(`http://10.250.172.225:8000/user/info/${userId}`)
        const data = await res.json()
        companyInfo.value = {
            name: data.name,
            industry: data.industry,
            created_date: formatDate(data.created_date)
        }
    } catch (err) {
        console.error('기업 정보 불러오기 실패:', err)
    }
})

function formatDate(dateStr) {
    const date = new Date(dateStr)
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`
}
</script>


<style scoped src="../styles/mypage.css" />