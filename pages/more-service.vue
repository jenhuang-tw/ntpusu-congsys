<template>
  <div>
    
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-6xl mx-auto">
        <!-- 頁面標題 -->
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            其他服務
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300">
            提案相關表單範本與系統服務
          </p>
        </div>

        <!-- 服務區塊 -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- 提案附件範本 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-blue-600">
            <div class="flex items-center mb-4">
              <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                提案附件範本
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              提案相關表單與文件範本下載
            </p>
            <div class="space-y-2">
              <a 
                :href="TEMPLATE_LINKS.regulationAmendment" 
                class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                📋 法規案 修正條文對照表
              </a>
              <a 
                :href="TEMPLATE_LINKS.budgetForm" 
                class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 預算案 總預算書範例
              </a>
              <a 
                :href="TEMPLATE_LINKS.budgetZhuijia" 
                class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 預算案 追加預算書範例
              </a>
              <a 
                :href="TEMPLATE_LINKS.priceComparison" 
                class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                📊 預算案 比價資料單
              </a>
              <a 
                :href="TEMPLATE_LINKS.juesuan" 
                class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                📄 決算案 總決算書範例
              </a>
              
              <a 
                :href="TEMPLATE_LINKS.personalResume" 
                class="block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                📝 人事案 人事簡歷表
              </a>
            </div>
          </div>

          <!-- 邀請備詢系統 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-green-600">
            <div class="flex items-center mb-4">
              <svg class="w-8 h-8 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                邀請備詢系統
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              邀請相關人員列席會議，以備質（諮）詢
            </p>
            <button 
              class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
              @click="handleServiceClick('邀請備詢系統')"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              前往系統
            </button>
          </div>

          <!-- 預算變更系統 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-purple-600">
            <div class="flex items-center mb-4">
              <svg class="w-8 h-8 text-purple-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                預算變更系統
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              審議預算時，提議刪減/凍結
            </p>
            <button 
              class="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
              @click="handleServiceClick('預算變更系統')"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              前往系統
            </button>
          </div>

          <!-- 議事規則查詢 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-orange-600">
            <div class="flex items-center mb-4">
              <svg class="w-8 h-8 text-orange-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                議事規則查詢
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              查詢議事規則、組織規程等相關法規
            </p>
            <button 
              class="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
              @click="handleServiceClick('議事規則查詢')"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              查詢規則
            </button>
          </div>

          <!-- 會議直播 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-red-600">
            <div class="flex items-center mb-4">
              <svg class="w-8 h-8 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                會議直播
              </h3>
            </div>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              觀看議會會議現場直播
            </p>
            <button 
              class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
              @click="handleServiceClick('會議直播')"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15" />
              </svg>
              觀看直播
            </button>
          </div>

          <!-- 聯絡資訊 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-t-4 border-gray-600">
            <div class="flex items-center mb-4">
              <svg class="w-8 h-8 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                聯絡資訊
              </h3>
            </div>
            <div class="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>
                <strong>辦公室：</strong><br>
                商學大樓 B1F08 室
              </p>
              <p>
                <strong>議場：</strong><br>
                綜合體育館 2F44 室
              </p>
              <p>
                <strong>電子郵件：</strong><br>
                <a href="https://pili.app/email-html/show/?text=ntpuscs%40gmail.com&title=%E4%B8%89%E5%B3%BD%E6%A0%A1%E5%8D%80%E5%AD%B8%E7%94%9F%E8%AD%B0%E6%9C%83%20%E7%A7%98%E6%9B%B8%E8%99%95" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300" target="_blank" rel="noopener noreferrer">
                  請點此展開
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- 返回首頁按鈕 -->
        <div class="text-center mt-12">
          <NuxtLink 
            to="/" 
            class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首頁
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { EXTERNAL_LINKS } from '~/utils/constants.js'
    
useHead({
  title: `其他服務 - 三峽校區議事服務`,
  meta: [
    {
      name: 'description',
      content: `本會其他資訊服務，包括提案附件範本、邀請備詢系統、預算變更系統、議事規則查詢、會議直播等。`
    }
  ]
})


// 處理服務點擊事件
const handleServiceClick = (serviceName) => {

switch (serviceName) {
  
  case '邀請備詢系統':
    window.open(EXTERNAL_LINKS.inviteSystem, '_blank');
     break;
   case '預算變更系統':
     window.open(EXTERNAL_LINKS.budgetSystem, '_blank');
     break;
   case '議事規則查詢':
     window.open(EXTERNAL_LINKS.yiShiGuiZe, '_blank');
     break;
   case '會議直播':
     window.open(EXTERNAL_LINKS.liveStream, '_blank');
     break;
 }
};
</script>

<style scoped>
/* 自定義樣式 */
.container {
  min-height: calc(100vh - 200px);
}

/* 卡片懸停效果 */
.bg-white:hover,
.dark .bg-gray-800:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

/* 按鈕動畫 */
button {
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* 響應式設計 */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>