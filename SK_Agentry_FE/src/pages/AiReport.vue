<template>
    <div class="report-wrapper">
      <div class="report-header">
        <h1 class="report-title">
          {{ companyName }} AI 에이전트 도입 리포트
        </h1>
        <p class="report-date">발행일: {{ publishedDate }}</p>
      </div>
  
      <div class="summary-grid">
        <div class="summary-item"><strong>기업명:</strong> {{ companyName }}</div>
        <div class="summary-item"><strong>산업군:</strong> {{ industry }}</div>
        <div class="summary-item"><strong>기업 규모:</strong> {{ companyScale }}</div>
        <div class="summary-item full">
          <strong>기술 도입 경험:</strong> {{ techExperience }}
        </div>
      </div>
  
      <div class="section">
        <h2>1. 디지털 성숙도 분석</h2>
        <ul>
          <li><strong>기술 도입 단계:</strong> {{ maturityLevel }}</li>
          <li><strong>보유 기술:</strong> {{ ownedTech.join(', ') }}</li>
          <li><strong>강점:</strong> {{ strengths }}</li>
          <li><strong>약점:</strong> {{ weaknesses }}</li>
        </ul>
      </div>
  
      <div class="section">
        <h2>2. 추천 AI 에이전트</h2>
        <table class="agent-table">
          <thead>
            <tr>
              <th>에이전트명</th>
              <th>적용 부서</th>
              <th>적용 사례</th>
              <th>절감 시간</th>
              <th>도입 난이도</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="agent in recommendedAgents" :key="agent.name">
              <td>{{ agent.name }}</td>
              <td>{{ agent.department }}</td>
              <td>{{ agent.useCase }}</td>
              <td>{{ agent.timeSaved }}</td>
              <td>{{ agent.difficulty }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="section">
        <h2>3. 도입 효과 분석 (ROI)</h2>
        <p>
          연간 절감 시간: <strong>{{ roiData.totalTime }}</strong><br />
          인건비 환산: <strong>{{ roiData.costSaved }}</strong><br />
          도입/운영 비용: <strong>{{ roiData.cost }}</strong><br />
          ROI: <strong>{{ roiData.roi }}</strong><br />
          <em>{{ roiData.note }}</em>
        </p>
      </div>
  
      <div class="section">
        <h2>4. 리스크 및 고려사항</h2>
        <ul>
          <li v-for="risk in risks" :key="risk">{{ risk }}</li>
        </ul>
      </div>
  
      <div class="section">
        <h2>5. 다음 단계 제안</h2>
        <ol>
          <li v-for="step in nextSteps" :key="step">{{ step }}</li>
        </ol>
      </div>
  
      <div class="section">
        <h2>6. 요약 (Executive Summary)</h2>
        <p v-html="executiveSummary"></p>
      </div>
  
      <div class="footer">
        <p>📮 담당자 문의: <a :href="`mailto:${contactEmail}`">{{ contactEmail }}</a></p>
        <p>🧠 Powered by SK Agentry AI Market</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      companyName: String,
      publishedDate: String,
      industry: String,
      companyScale: String,
      techExperience: String,
      maturityLevel: String,
      ownedTech: Array,
      strengths: String,
      weaknesses: String,
      recommendedAgents: Array,
      roiData: Object,
      risks: Array,
      nextSteps: Array,
      executiveSummary: String,
      contactEmail: String
    }
  };
  </script>
  
  <style src="../styles/aireport.css"></style>
  