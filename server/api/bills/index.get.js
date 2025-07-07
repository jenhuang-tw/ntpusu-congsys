import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    
    // 設定 Google Sheets API 認證
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    })

    const sheets = google.sheets({ version: 'v4', auth })

    // 從 Google Sheets 獲取資料
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'A1:O1000', // 調整範圍以包含所有資料
    })

    const rows = response.data.values
    if (!rows || rows.length === 0) {
      return {
        bills: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0
      }
    }

    // 第一行是標題
    const headers = rows[0]
    const dataRows = rows.slice(1)

    // 將資料轉換為物件陣列
    const bills = dataRows.map(row => {
      const bill = {}
      headers.forEach((header, index) => {
        bill[header] = row[index] || ''
      })
      return bill
    }).filter(bill => bill.編號) // 過濾掉沒有編號的空行

    // 套用篩選條件
    let filteredBills = bills
    
    // 套用各種篩選條件
    if (query.編號) {
      filteredBills = filteredBills.filter(bill => 
        bill.編號.includes(query.編號)
      )
    }
    
    if (query.提案類型) {
      filteredBills = filteredBills.filter(bill => 
        bill.提案類型 === query.提案類型
      )
    }
    
    if (query['提案機關/議員']) {
      filteredBills = filteredBills.filter(bill => 
        bill['提案機關/議員'].includes(query['提案機關/議員'])
      )
    }
    
    if (query['提案機關主管/提案議員姓名']) {
      filteredBills = filteredBills.filter(bill => 
        bill['提案機關主管/提案議員姓名'].includes(query['提案機關主管/提案議員姓名'])
      )
    }
    
    if (query.案由) {
      filteredBills = filteredBills.filter(bill => 
        bill.案由.includes(query.案由)
      )
    }
    
    if (query.說明) {
      filteredBills = filteredBills.filter(bill => 
        bill.說明.includes(query.說明)
      )
    }
    
    if (query.辦法) {
      filteredBills = filteredBills.filter(bill => 
        bill.辦法.includes(query.辦法)
      )
    }

    // 日期篩選
    if (query.dateFrom || query.dateTo) {
      filteredBills = filteredBills.filter(bill => {
        const billDate = new Date(bill.時間戳記)
        const fromDate = query.dateFrom ? new Date(query.dateFrom) : null
        const toDate = query.dateTo ? new Date(query.dateTo) : null
        
        if (fromDate && billDate < fromDate) return false
        if (toDate && billDate > toDate) return false
        
        return true
      })
    }

    // 按時間排序（最新的在前）
    filteredBills.sort((a, b) => {
      const dateA = new Date(a.時間戳記)
      const dateB = new Date(b.時間戳記)
      return dateB - dateA
    })

    // 分頁處理
    const page = parseInt(query.page) || 1
    const pageSize = parseInt(query.pageSize) || 10
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedBills = filteredBills.slice(startIndex, endIndex)

    const totalPages = Math.ceil(filteredBills.length / pageSize)

    return {
      bills: paginatedBills,
      total: filteredBills.length,
      page,
      pageSize,
      totalPages
    }

  } catch (error) {
    console.error('Error fetching bills:', error)
    
    // 錯誤處理
    throw createError({
      statusCode: 500,
      statusMessage: '獲取議案資料時發生錯誤',
      data: {
        error: error.message,
        timestamp: new Date().toISOString()
      }
    })
  }
})