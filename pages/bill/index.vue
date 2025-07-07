<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">歷屆議案總覽</h1>
      <p class="text-gray-600 dark:text-gray-300">點選屆次，查看該屆學生議會議案資料</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <NuxtLink 
        v-for="term in availableTermsRange" 
        :key="term" 
        :to="`/bill/${term}`"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
      >
        <div class="p-6">
          <div class="text-primary text-sm font-semibold mb-2">第 {{ term }} 屆</div>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">學生議會</h2>
          <p class="text-gray-600 dark:text-gray-400 text-sm mt-2">點擊查看本屆議案</p>
        </div>
        <div 
          v-if="term === currentTerm" 
          class="bg-primary-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg absolute top-0 right-0"
        >
          當前屆次
        </div>
      </NuxtLink>
    </div>

    <div class="mt-12 text-center text-gray-500 dark:text-gray-400">
      <p>資料範圍：第 {{ STARTING_TERM }} 屆起</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue' // 確保引入 computed
import { useCurrentTerm } from '~/composables/useCurrentTerm'

// SEO 設定
definePageMeta({
  title: '議案查詢 - 三峽校區議事服務',
  description: '查看國立臺北大學學生自治會三峽校區學生議會歷屆議案資料'
})

// 使用新的 Composables 獲取當前屆次和屆次範圍
const { currentTerm, availableTermsRange } = useCurrentTerm()

// 從 useCurrentTerm 中獲取起始屆次，用於頁面底部顯示
const STARTING_TERM = 23; // 這裡直接寫死或者從 useCurrentTerm 導出

// 如果需要在模板中直接使用 STARTING_TERM，確保它可用
// 如果 useCurrentTerm 只導出 computed，可能需要在這裡定義
// const STARTING_TERM = 23; // 根據 useCurrentTerm 的內部定義

</script>

<style scoped>
.container {
  max-width: 1200px;
}

/* 確保 NuxtLink 的樣式能正常應用 */
.grid-cols-1 > a {
  position: relative; /* 為了 "當前屆次" 標籤的定位 */
}
</style>