<template>
    <div class="modal-overlay" @click.self="close">
      <div class="modal-card">
        <h2>AI 에이전트 도입 리포트를 작성해드릴까요?</h2>
        <p class="sub-text">마이페이지에서 나중에 다시 확인할 수도 있습니다.</p>
        <div class="button-group">
          <button @click="confirm">네</button>
          <button @click="close">아니요</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const emit = defineEmits(['confirm', 'close'])
  
  function confirm() {
    emit('confirm')
  }
  
  function close() {
    emit('close')
  }
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  .modal-card {
    background: white;
    padding: 32px;
    border-radius: 16px;
    max-width: 360px;
    text-align: center;
  }
  .modal-card h2 {
    font-size: 18px;
    margin-bottom: 12px;
  }
  .sub-text {
    font-size: 13px;
    color: #888;
    margin-bottom: 20px;
  }
  .button-group {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  button {
    padding: 10px 18px;
    border: none;
    border-radius: 6px;
    font-weight: bold;
    cursor: pointer;
  }
  button:first-child {
    background-color: #ea002c;
    color: white;
  }
  button:last-child {
    background-color: white;
    color: #ea002c;
    border: 1px solid #ea002c;
  }
  </style>
  