<template>
  <div class="container mx-auto px-4 py-8">
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
        <li>
          <NuxtLink :to="`/bill/${term}`" class="hover:text-primary">第{{ term }}屆</NuxtLink>
        </li>
        <li>/</li>
        <li class="text-gray-900 dark:text-white">第{{ number }}號</li>
      </ol>
    </nav>

    <div v-if="error" class="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
      <div class="flex items-center">
        <ExclamationTriangleIcon class="h-5 w-5 text-red-500 mr-2" />
        <p class="text-red-700 dark:text-red-300">{{ error.message || '載入資料失敗' }}</p>
      </div>
    </div>

    <div v-if="pending" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      <span class="ml-2 text-gray-600 dark:text-gray-300">載入中...</span>
    </div>

    <div v-if="!pending && !error && bill" class="space-y-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {{ bill.編號 }}
        </h1>
        <p class="text-lg text-gray-700 dark:text-gray-300">{{ bill.案由 }}</p>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">議案資訊</h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(field, index) in displayFields" :key="index">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700/50 w-1/4">
                  {{ field.label }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  <div v-if="field.key === 'attachments'" class="space-y-2">
                    <div v-for="(attachment, attachIndex) in getAttachments(bill)" :key="attachIndex">
                      <a
                        v-if="attachment.url"
                        :href="attachment.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center text-primary hover:text-primary-600 hover:underline"
                      >
                        <DocumentIcon class="h-4 w-4 mr-1" />
                        {{ attachment.name }}
                        <ArrowTopRightOnSquareIcon class="h-3 w-3 ml-1" />
                      </a>
                    </div>
                    <div v-if="getAttachments(bill).length === 0" class="text-gray-500 dark:text-gray-400">
                      無附件
                    </div>
                  </div>
                  <div v-else-if="field.key === '提案時間'" class="font-mono">
                    {{ formatDate(bill[field.originalKey]) }}
                  </div>
                  <div v-else-if="field.isMultiline" class="whitespace-pre-wrap">
                    {{ bill[field.originalKey] || '無' }}
                  </div>
                  <div v-else>
                    {{ bill[field.originalKey] || '無' }}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex flex-wrap gap-4">
        <button
          @click="$router.back()"
          class="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          <ChevronLeftIcon class="h-4 w-4 mr-2" />
          返回上一頁
        </button>
        <button
          @click="copyUrl"
          class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          <LinkIcon class="h-4 w-4 mr-2" />
          複製連結
        </button>
        <button
          @click="printPage"
          class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <PrinterIcon class="h-4 w-4 mr-2" />
          列印
        </button>
      </div>
    </div>

    <div v-if="!pending && !error && !bill" class="text-center py-12">
      <DocumentTextIcon class="h-16 w-16 text-gray-400 mx-auto mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">找不到此議案</h3>
      <p class="text-gray-600 dark:text-gray-300">請確認議案編號是否正確</p>
      <div class="mt-4">
        <NuxtLink
          :to="`/bill/${term}`"
          class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          查看第{{ term }}屆議案
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="showCopySuccess"
      class="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50"
    >
      連結已複製到剪貼簿
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  ExclamationTriangleIcon,
  DocumentTextIcon,
  DocumentIcon,
  ArrowTopRightOnSquareIcon,
  ChevronLeftIcon,
  LinkIcon,
  PrinterIcon
} from '@heroicons/vue/24/outline'

// 獲取路由參數
const route = useRoute()
const term = parseInt(route.params.term)
const number = parseInt(route.params.number)

// 驗證參數 (這裡的錯誤處理會被 Nuxt 的 createError 捕獲)
if (!term || isNaN(term) || !number || isNaN(number)) {
  throw createError({
    statusCode: 404,
    statusMessage: '議案參數無效'
  })
}

// 使用 Nuxt 內建的 useAsyncData 來從 API 獲取資料
// URL 直接指向我們新建立的 API 路由
const { data, pending, error } = await useAsyncData(
  `bill-${term}-${number}`, // 唯一的 key
  () => $fetch(`/api/bills/${term}/${number}`) // 請求我們的 API
);

// 解構出 bill 資料
// 注意：如果 API 返回 { bill: targetBill }，那麼 data.value.bill 就是您要的議案物件
const bill = computed(() => data.value?.bill);


// 響應式數據
const showCopySuccess = ref(false)


// SEO 設定
const billTitle = computed(() => {
  return bill.value ? `${bill.value.編號} - 三峽校區議事服務` : `第${term}屆第${number}號議案 - 三峽校區議事服務`
})

useHead(() => ({
  title: bill.value
    ? `${bill.value.編號} - 三峽校區議事服務`
    : `第${term}屆第${number}號議案 - 三峽校區議事服務`,
  meta: [
    {
      name: 'description',
      content: bill.value
        ? bill.value.案由
        : `第${term}屆第${number}號議案詳細資料`
    },
    {
      name: 'robots',
      content: 'noindex, nofollow' // 由於內容是動態生成且可能非公開，建議使用 noindex, nofollow
    }
  ]
}))

// 定義顯示欄位
const displayFields = computed(() => [
  { label: '編號', key: '編號', originalKey: '編號' },
  { label: '提案時間', key: '提案時間', originalKey: '時間戳記' },
  { label: '提案機關/議員', key: '提案機關/議員', originalKey: '提案機關/議員' },
  { label: '機關主管/\n議員姓名', key: '提案機關主管/提案議員姓名', originalKey: '提案機關主管/提案議員姓名' },
  { label: '聯絡人', key: '提案聯絡人姓名', originalKey: '提案聯絡人姓名' },
  { label: '類型', key: '提案類型', originalKey: '提案類型' },
  { label: '案由', key: '案由', originalKey: '案由', isMultiline: true },
  { label: '說明', key: '說明', originalKey: '說明', isMultiline: true },
  { label: '辦法', key: '辦法', originalKey: '辦法', isMultiline: true },
  { label: '附件', key: 'attachments', originalKey: 'attachments' }
])

// 方法
const formatDate = (dateString) => {
  if (!dateString) return '無'
  try {
    const date = new Date(dateString)
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch (e) {
    return dateString
  }
}

// 獲取附件的函數
const getAttachments = (billData) => {
  if (!billData || !billData.附件) return [];
  try {
    return billData.附件.split(';').map(item => {
      const parts = item.split(':');
      if (parts.length >= 2) {
        const url = parts.slice(1).join(':');
        return { name: parts[0], url: url.startsWith('http') ? url : `https://${url}` };
      }
      return { name: item, url: null };
    }).filter(attachment => attachment.name);
  } catch (e) {
    console.error("Error parsing attachments:", e);
    return [];
  }
};

// 複製連結功能
const copyUrl = () => {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showCopySuccess.value = true;
    setTimeout(() => {
      showCopySuccess.value = false;
    }, 2000);
  }).catch(err => {
    console.error('Failed to copy URL:', err);
    alert('複製連結失敗，請手動複製。');
  });
};

// 列印功能
const printPage = () => {
  window.print();
};
</script>