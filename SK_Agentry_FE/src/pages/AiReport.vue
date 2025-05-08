<template>
  <div class="report-wrapper" v-html="renderedMarkdown"></div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { marked } from 'marked'

const markdownContent = ref('')
const renderedMarkdown = ref('')

async function fetchMarkdown() {
  // 예: API 호출해서 마크다운 문자열 받아오기
  const res = await fetch('/api/reports/company123') // URL은 임시 예시
  const data = await res.text()
  markdownContent.value = data
  renderedMarkdown.value = marked(data)
}

onMounted(() => {
  fetchMarkdown()
})
</script>

<style scoped src="../styles/aireport.css" />
