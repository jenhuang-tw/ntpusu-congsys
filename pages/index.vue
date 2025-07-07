<template>
  <div class="max-w-6xl mx-auto">
    <!-- 主標題區塊 -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        三峽校區議事服務
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">
        國立臺北大學學生自治會 三峽校區學生議會
      </p>
    </div>

    <!-- 服務區塊 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- 提案系統 -->
      <div class="card">
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center mr-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">提案系統</h2>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            提交新的議案提案，包含各類型議案的表單填寫。
          </p>
          <a 
            :href="config.public.proposalFormUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            前往提案
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- 議案查詢 -->
      <div class="card">
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center mr-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">議案查詢</h2>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            查詢歷屆議案資料，支援多種篩選條件和分頁瀏覽。
          </p>
          <NuxtLink to="/bill" class="btn btn-primary">
            開始查詢
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- 會議紀錄 -->
      <div class="card">
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center mr-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">會議紀錄</h2>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            瀏覽歷次會議的會議紀錄和決議內容。
          </p>
          <a 
            :href="config.public.meetingRecordsUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            查看紀錄
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- 其他服務 -->
      <div class="card">
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center mr-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">其他服務</h2>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            提案範本下載、備詢系統、預算變更等其他服務。
          </p>
          <NuxtLink to="/more-service" class="btn btn-primary">
            查看服務
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- 回到會網 -->
      <div class="card">
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center mr-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h2a2 2 0 012 2v2H8V5z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">學生議會</h2>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            回到學生議會主要網站，瀏覽更多資訊和服務。
          </p>
          <a 
            :href="config.public.congressWebsiteUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            前往會網
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- 最新消息 -->
      <div class="card">
        <div class="card-body">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center mr-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">系統公告</h2>
          </div>
          <p class="text-gray-600 dark:text-gray-400 mb-4">
            本系統為開放原始碼專案，歡迎貢獻與回饋。
          </p>
          <a 
            :href="config.public.githubRepoUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-secondary"
          >
            GitHub Repository
            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- 統計資訊 -->
    <div class="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
        系統統計
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="text-3xl font-bold text-primary mb-2">{{ stats.totalBills }}</div>
          <div class="text-gray-600 dark:text-gray-400">總議案數</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary mb-2">{{ stats.currentTerm }}</div>
          <div class="text-gray-600 dark:text-gray-400">目前屆次</div>
        </div>
        <div class="text-center">
          <div class="text-3xl font-bold text-primary mb-2">{{ stats.thisTermBills }}</div>
          <div class="text-gray-600 dark:text-gray-400">本屆議案數</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()

// 設定頁面 meta 標籤
useHead({
  title: '三峽校區議事服務 - 國立臺北大學學生自治會',
  meta: [
    { name: 'description', content: '國立臺北大學學生自治會三峽校區學生議會議事服務系統首頁' }
  ]
})

// 統計資料
const stats = ref({
  totalBills: 0,
  currentTerm: 26,
  thisTermBills: 0
})

// 載入統計資料
onMounted(async () => {
  try {
    const { data } = await $fetch('/api/bills/stats')
    if (data) {
      stats.value = data
    }
  } catch (error) {
    console.error('載入統計資料失敗:', error)
  }
})
</script>