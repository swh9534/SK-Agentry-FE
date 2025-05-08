import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import SignUpPage from '../pages/SignUpPage.vue'
import AgentMarket from '../pages/AgentMarket.vue'
import AiReport from '../pages/AiReport.vue'
import AgentDetail from '../pages/AgentDetail.vue'
import Mypage from '../pages/Mypage.vue'
import HomePage from '../pages/HomePage.vue'

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/signup', component: SignUpPage },
  { path: '/agent-market', component: AgentMarket },
  { path: '/ai-report', component: AiReport },
  { path: '/agents/:id', component: AgentDetail },
  { path: '/mypage', component: Mypage },
  { path: '/home', component: HomePage },
  
  { path: '/', redirect: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
