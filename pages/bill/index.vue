<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">議案查詢</h1>
      <p class="text-gray-600 dark:text-gray-300">查詢歷屆學生議會議案資料</p>
    </div>

    <!-- 錯誤訊息 -->
    <div v-if="error" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <div class="flex items-center">
        <ExclamationTriangleIcon class="h-5 w-5 text-red-500 mr-2" />
        <p class="text-red-700 dark:text-red-300">{{ error }}</p>
      </div>
    </div>

    <!-- 載入中 -->
    <div v-if="pending" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span class="ml-2 text-gray-600 dark:text-gray-300">載入中...</span>
    </div>

    <!-- 篩選器 -->
    <div v-if="!pending && !error" class="mb-8">
      <BillFilter
        :filters="filters"
        :available-terms="availableTerms"
        :available-types="availableTypes"
        :available-agencies="availableAgencies"
        @update-filters="updateFilters"
        @reset-filters="resetFilters"
      />
    </div>

    <!-- 議案列表 -->
    <div v-if="!pending && !error && filteredBills.length > 0" class="space-y-6">
      <!-- 結果統計 -->
      <div class="text-sm text-gray-600 dark:text-gray-400">
        共找到 {{ filteredBills.length }} 筆議案
      </div>

      <!-- 議案卡片 -->
      <div class="grid gap-4">
        <BillCard
          v-for="bill in paginatedBills"
          :key="bill.編號"
          :bill="bill"
          @click="navigateToBill(bill)"
        />
      </div>

      <!-- 分頁 -->
      <Pagination
        :current-page="currentPage"
        :total-pages="totalPages"
        :total-items="filteredBills.length"
        @page-change="handlePageChange"
      />
    </div>

    <!-- 倘若無結果 -->
    <div v-if="!pending && !error && filteredBills.length === 0" class="text-center py-12">
      <DocumentTextIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">找不到相關議案</h3>
      <p class="text-gray-600 dark:text-gray-300">請調整篩選條件或稍後再試</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ExclamationTriangleIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'
import { useBills } from '~/composables/useBills'

// SEO 設定
definePageMeta({
  title: '議案查詢 - 三峽校區議事服務',
  description: '查詢國立臺北大學學生自治會三峽校區學生議會歷屆議案資料'
})

// 響應式數據
const currentPage = ref(1)
const itemsPerPage = 10

// 篩選器狀態
const filters = ref({
  term: '',
  type: '',
  agency: '',
  keyword: '',
  dateFrom: '',
  dateTo: ''
})

// 使用 composable 獲取議案資料
const { bills, loading: pending, error, refresh } = await useBills()

// 調用 refresh() ，首次獲取資料
await refresh()

// 計算可用的篩選選項
const availableTerms = computed(() => {
  // Use optional chaining or a more explicit check for bills.value
  if (!bills.value) return []
  const terms = [...new Set(bills.value.map(bill => extractTermFromNumber(bill.編號)))];
  return terms.filter(Boolean).sort((a, b) => b - a);
});

const availableTypes = computed(() => {
  if (!bills.value) return []
  return [...new Set(bills.value.map(bill => bill.提案類型))].filter(Boolean).sort()
})

const availableAgencies = computed(() => {
  if (!bills.value) return []
  return [...new Set(bills.value.map(bill => bill['提案機關/議員']))].filter(Boolean).sort()
})

// 篩選議案
const filteredBills = computed(() => {
  if (!bills.value) return []
  
  return bills.value.filter(bill => {
    // 屆次篩選
    if (filters.value.term) {
      const billTerm = extractTermFromNumber(bill.編號)
      if (billTerm !== parseInt(filters.value.term)) return false
    }

    // 類型篩選
    if (filters.value.type && bill.提案類型 !== filters.value.type) return false

    // 機關篩選
    if (filters.value.agency && bill['提案機關/議員'] !== filters.value.agency) return false

    // 關鍵字篩選
    if (filters.value.keyword) {
      const keyword = filters.value.keyword.toLowerCase()
      // Ensure bill properties are accessed safely
      const searchFields = [bill.案由, bill.說明, bill.辦法, bill.編號]
                                .filter(Boolean) // Filter out any null/undefined fields
                                .join(' ')
                                .toLowerCase()
      if (!searchFields.includes(keyword)) return false
    }

    // 日期篩選
    if (filters.value.dateFrom || filters.value.dateTo) {
      // Ensure bill.時間戳記 exists and is valid before creating a Date object
      if (!bill.時間戳記) return false; 
      const billDate = new Date(bill.時間戳記)
      if (isNaN(billDate.getTime())) return false; // Check for invalid date

      if (filters.value.dateFrom && billDate < new Date(filters.value.dateFrom)) return false
      if (filters.value.dateTo && billDate > new Date(filters.value.dateTo)) return false
    }

    return true
  }).sort((a, b) => new Date(b.時間戳記) - new Date(a.時間戳記))
})

// 分頁計算
const totalPages = computed(() => Math.ceil(filteredBills.value.length / itemsPerPage))

const paginatedBills = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredBills.value.slice(start, end)
})

// 方法
const updateFilters = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters }
  currentPage.value = 1
}

const resetFilters = () => {
  filters.value = {
    term: '',
    type: '',
    agency: '',
    keyword: '',
    dateFrom: '',
    dateTo: ''
  }
  currentPage.value = 1
}

const handlePageChange = (page) => {
  currentPage.value = page
  // 滾動到頂部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const navigateToBill = (bill) => {
  const term = extractTermFromNumber(bill.編號)
  const number = extractNumberFromNumber(bill.編號)
  if (term && number) {
    navigateTo(`/bill/${term}/${number}`)
  }
}

// 輔助函數
const extractTermFromNumber = (billNumber) => {
  if (typeof billNumber !== 'string') return null; // Ensure billNumber is a string
  const match = billNumber.match(/^(\d+)屆/)
  return match ? parseInt(match[1]) : null
}

const extractNumberFromNumber = (billNumber) => {
  if (typeof billNumber !== 'string') return null; // Ensure billNumber is a string
  const match = billNumber.match(/第(\d+)號$/)
  return match ? parseInt(match[1]) : null
}

// 監聽篩選器變化，重置頁面
watch(filters, () => {
  currentPage.value = 1
}, { deep: true })
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>