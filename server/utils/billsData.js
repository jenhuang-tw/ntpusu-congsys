// server/utils/billsData.js
import { google } from 'googleapis';

/**
 * 從 Google Sheets 獲取所有議案資料並解析為物件陣列，同時處理缺少編號的行。
 * - 過濾掉編號和案由都為空的「真正空行」。
 * - 為僅缺少編號但有案由的行賦予臨時編號（格式：最新屆次北大峽議字第TEMP_X號）。
 * @returns {Promise<Array>} 返回一個解析為議案物件陣列的 Promise。
 */
export async function fetchAllBillsFromGoogleSheets() {
  try {
    // 設定 Google Sheets API 認證
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // 從 Google Sheets 獲取資料
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_ID,
      range: 'A1:O1000', // 調整範圍以包含所有資料，確保能讀取到所有數據
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }

    // 第一行是標題
    const headers = rows[0];
    const dataRows = rows.slice(1);

    const processedBills = [];
    let latestTerm = 0; // 用於追蹤從現有資料中找到的最新屆次

    // 第一遍遍歷：解析資料，過濾真正的空行，並找出最新屆次
    dataRows.forEach(row => {
      const bill = {};
      headers.forEach((header, index) => {
        bill[header] = row[index] || '';
      });

      // 檢查是否為「真正的空行」（編號和案由都為空）
      // 您可以根據實際情況增加更多判斷條件，例如檢查多個關鍵欄位
      if (!bill.編號 && !bill.案由) {
        return; // 如果是真正的空行，則跳過此行
      }

      processedBills.push(bill); // 將有效或待處理的行加入

      // 找出所有有效議案中的最大屆次
      if (bill.編號) {
        const match = bill.編號.match(/(\d+)屆/);
        if (match && parseInt(match[1]) > latestTerm) {
          latestTerm = parseInt(match[1]);
        }
      }
    });

    // 如果在整個數據集中都沒有找到任何屆次（例如，都是臨時編號的行，或者數據集為空），
    // 則設定一個預設的「最新屆次」用於臨時編號。
    if (latestTerm === 0) {
        latestTerm = process.env.TERM_NOW;
    }


    // 第二遍遍歷：為缺少編號但有案由的行賦予臨時編號
    let tempCounter = 1; // 臨時編號的計數器
    processedBills.forEach(bill => {
      if (!bill.編號 && bill.案由) { // 判斷條件：缺少編號，但有案由（表示不是真正的空行）
        bill.編號 = `${latestTerm}屆北大峽議字第TEMP_${tempCounter}號`;
        tempCounter++;
      }
    });

    return processedBills;

  } catch (error) {
    console.error('Error fetching all bills from Google Sheets:', error);
    // 統一錯誤處理，拋出 Nuxt 的 createError 以便上層 API 路由捕獲
    throw createError({
      statusCode: 500,
      statusMessage: '無法從 Google 試算表擷取或處理議案。',
      data: {
        error: error.message,
        timestamp: new Date().toISOString(),
      },
    });
  }
}