<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 麵包屑導覽 -->
    <nav class="mb-6">
      <ol class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <li>
          <NuxtLink to="/" class="hover:text-primary">首頁</NuxtLink>
        </li>
        <li>/</li>
        <li>
          <NuxtLink to="/bill" class="hover:text-primary">議案查詢</NuxtLink>
        </li>
        <li>/</li>
        <li class="text-gray-900 dark:text-white">第{{ term }}屆</li>
      </ol>
    </nav>

    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">第{{ term }}屆議案查詢</h1>
      <p class="text-gray-600 dark:text-gray-300">查詢第{{ term }}屆學生議會議案資料</p>
    </div>

    <!-- 錯誤訊息 -->
    <div v-if="fetchError" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <div class="flex items-center">
        <ExclamationTriangleIcon class="h-5 w-5 text-red-500 mr-2" />
        <p class="text-red-700 dark:text-red-300">{{ fetchError.message || '載入資料時發生錯誤' }}</p>
      </div>
    </div>

    <!-- 載入中 -->
    <div v-if="fetchPending" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span class="ml-2 text-gray-600 dark:text-gray-300">載入中...</span>
    </div>

    <!-- 篩選器 -->
    <div v-if="!fetchPending && !fetchError" class="mb-8">
      <BillFilter
        :filters="filters"
        :available-types="availableTypes"
        :available-agencies="availableAgencies"
        :hide-term-filter="true"
        @update-filters="updateFilters"
        @reset-filters="resetFilters"
      />
    </div>

    <!-- 議案列表 -->
    <div v-if="!fetchPending && !fetchError && filteredBills.length > 0" class="space-y-6">
      <!-- 結果統計 -->
      <div class="text-sm text-gray-600 dark:text-gray-400">
        第{{ term }}屆共有 {{ filteredBills.length }} 筆議案
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

    <!-- 無結果 -->
    <div v-if="!fetchPending && !fetchError && filteredBills.length === 0" class="text-center py-12">
      <DocumentTextIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">第{{ term }}屆暫無議案資料</h3>
      <p class="text-gray-600 dark:text-gray-300">請稍後再試或查看其他屆次</p>
      <div class="mt-4">
        <NuxtLink
          to="/bill"
          class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          查看所有議案
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { ExclamationTriangleIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'
import { useBills } from '~/composables/useBills' // 保持匯入 useBills

// 獲取路由參數
const route = useRoute()
const term = parseInt(route.params.term)

// 驗證屆次參數
if (!term || isNaN(term)) {
  throw createError({
    statusCode: 404,
    statusMessage: '屆次參數無效'
  })
}

// SEO 設定
useHead({
  title: `第${term}屆議案查詢 - 三峽校區議事服務`,
  meta: [
    {
      name: 'description',
      content: `查詢本會第${term}屆議案資料`
    }
  ]
})

// 響應式數據
const currentPage = ref(1)
const itemsPerPage = 10
// 篩選器狀態（不包含屆次，因為已經固定）
const filters = ref({
  type: '',
  agency: '',
  keyword: '',
  dateFrom: '',
  dateTo: ''
})

// ---------------------- 核心修改部分 ----------------------
// 透過 useAsyncData 呼叫您的 useBills 來獲取資料
const { data: billsData, pending: fetchPending, error: fetchError, refresh: fetchRefresh } = useAsyncData(
  `bills-by-term-${term}`,
  async () => {
    const { fetchBillsByTerm } = useBills()
    return await fetchBillsByTerm(term, {
      page: currentPage.value,
      pageSize: itemsPerPage,
      ...filters.value
    })
  },
  {
    watch: [currentPage, filters],
    default: () => ({ bills: [], total: 0, totalPages: 0 })
  }
)

// 從 billsData 中提取實際的議案列表
const bills = computed(() => billsData.value?.bills || []);
// ---------------------- 核心修改部分結束 ----------------------

// 計算可用的篩選選項（僅針對該屆）
const availableTypes = computed(() => {
  if (!bills.value) return []
  return [...new Set(bills.value.map(bill => bill.提案類型))].filter(Boolean).sort()
})

const availableAgencies = computed(() => {
  if (!bills.value) return []
  return [...new Set(bills.value.map(bill => bill['提案機關/議員']))].filter(Boolean).sort()
})

// 篩選議案 (這個邏輯仍然是基於 bills.value，所以需要確保 bills.value 正確更新)
const filteredBills = computed(() => {
  if (!bills.value) return []

  return bills.value.filter(bill => {
    // 類型篩選
    if (filters.value.type && bill.提案類型 !== filters.value.type) return false

    // 機關篩選
    if (filters.value.agency && bill['提案機關/議員'] !== filters.value.agency) return false

    // 關鍵字篩選
    if (filters.value.keyword) {
      const keyword = filters.value.keyword.toLowerCase()
      const searchFields = [bill.案由, bill.說明, bill.辦法, bill.編號].join(' ').toLowerCase()
      if (!searchFields.includes(keyword)) return false
    }

    // 日期篩選
    if (filters.value.dateFrom || filters.value.dateTo) {
      // 確保 bill.時間戳記 是有效的日期格式
      const billDate = new Date(bill.時間戳記)
      if (isNaN(billDate)) return false; // 如果日期無效，則不過濾
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
  currentPage.value = 1 // 重置到第一頁
  // fetchRefresh() // 由於 useAsyncData 有 watch，這裡不需要手動呼叫 refresh
}

const resetFilters = () => {
  filters.value = {
    type: '',
    agency: '',
    keyword: '',
    dateFrom: '',
    dateTo: ''
  }
  currentPage.value = 1 // 重置到第一頁
  // fetchRefresh() // 由於 useAsyncData 有 watch，這裡不需要手動呼叫 refresh
}

const handlePageChange = (page) => {
  currentPage.value = page
  // 滾動到頂部
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const navigateToBill = (bill) => {
  const number = extractNumberFromNumber(bill.編號)
  if (number) {
    navigateTo(`/bill/${term}/${number}`)
  }
}

// 輔助函數
const extractNumberFromNumber = (billNumber) => {
  const match = billNumber.match(/第(\d+)號$/)
  return match ? parseInt(match[1]) : null
}

// 由於 useAsyncData 已經監聽了 currentPage 和 filters，
// 這裡不需要額外的 watch 監聽 filters 來觸發 refresh。
// watch(filters, () => {
//   currentPage.value = 1
// }, { deep: true })
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>