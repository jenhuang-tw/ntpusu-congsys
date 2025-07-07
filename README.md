# 臺北大學學生會 三峽校區議事系統

## 專案簡介

本專案旨在為國立臺北大學學生自治會三峽校區學生議會（下稱：本會）建立一個現代化的議事服務網站。此平台提供以下主要功能：

* **議案查詢**：整合 Google Sheets API，實現議案資料的即時查詢與瀏覽。
* **提案系統**：使用第 23 屆迄今既有、熟悉的 Google Forms 表單，方便議員與各單位提案。
* **會議紀錄**：連結至學生自治會共用網站，方便查閱歷次會議紀錄。
* **其他服務**：提供提案附件範本、邀請備詢系統與預算變更系統等實用工具連結。
* **響應式設計**：支援淺色/暗色模式自動切換與手動切換功能。

本專案採用 **Nuxt 3** 框架開發，結合 **Tailwind CSS** 進行快速且美觀的 UI 設計，並透過 **Google Sheets API** 實現資料的動態載入。

## 技術

* **框架**：Nuxt 3 (Vue 3)
* **樣式**：Tailwind CSS
* **API 串接**：Google Sheets API (透過 `googleapis` 函式庫)
* **圖標**：Heroicons
* **部署**：Vercel
* **版本控制**：Git / GitHub

本專案使用 Claude.ai, ChatGPT, Gemini 等服務生成，再由開發者微調。

## 網站預覽

`https://sxcong.ntpusu.org`

![本系統之截圖](/public/screenshot.png)

## 功能一覽

* **首頁**：以區塊形式呈現主要服務連結。
* **頭部導覽列**：包含網站標題與導覽選單，並提供夜間模式切換按鈕。
* **議案查詢頁面 (`/bill`)**：
    * 顯示所有議案的列表。
    * 提供多種篩選條件（例如：屆次、提案類型、提案機關/議員、案由等）。
    * 支援日期範圍篩選與分頁功能。
    * 議案詳細頁面 (`/bill/:term/:number`)：顯示單一議案的完整資訊與附件連結。
* **底部頁腳**：顯示單位名稱及 GitHub Repository 連結。

## 開發環境設置

### 前置準備

1.  **Node.js**: 建議使用 Node.js v18.0.0 或更高版本。
2.  **npm**: Node.js 安裝時會一併安裝。
3.  **VS Code**: 建議使用的程式碼編輯器。

### 專案啟動

1.  **複製專案**：
    ```bash
    git clone [https://github.com/ntpusu-sxcong/ntpusu-congsys.git](https://github.com/ntpusu-sxcong/ntpusu-congsys.git)
    cd ntpusu-congsys
    ```

2.  **安裝依賴**：
    ```bash
    npm install
    ```

3.  **Google Sheets API 設定**：

    * **建立 Google Cloud Project**：
        1.  前往 [Google Cloud Console](https://console.cloud.google.com/)。
        2.  建立新專案或選擇現有專案。
        3.  啟用 `Google Sheets API`。
    * **建立服務帳戶金鑰**：
        1.  在 Google Cloud Console 中，前往「API 和服務」>「憑證」。
        2.  點選「建立憑證」>「服務帳戶」。
        3.  填寫服務帳戶資訊並建立。
        4.  下載 JSON 金鑰檔案。
    * **設定 Google Sheets 權限**：
        1.  開啟您的 Google Sheets。
        2.  點選「共用」。
        3.  新增您的服務帳戶電子郵件地址（在下載的 JSON 檔案中的 `client_email` 欄位）。
        4.  給予「檢視者」或「編輯者」權限（依您的需求）。
    * **設定環境變數**：
        在專案根目錄創建一個 `.env` 檔案，並填入以下內容，這些值來自您下載的 JSON 金鑰檔案和您的 Google Sheets ID：
        ```env
        # .env
        GOOGLE_SERVICE_ACCOUNT_EMAIL="your-service-account-email@your-project-id.iam.gserviceaccount.com"
        GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
        GOOGLE_SHEETS_ID="your_google_sheets_spreadsheet_id_here"
        ```
        **注意：** `GOOGLE_PRIVATE_KEY` 務必將其中的換行符號 `\n` 替換為真實的換行。在部署到 Vercel 時，直接粘貼原始的私鑰內容即可，Vercel 會自動處理換行。

4.  **啟動開發伺服器**：
    ```bash
    npx nuxi dev
    ```
    應用程式將在 `http://localhost:3000` 啟動。

## 部署

本專案建議使用 [Vercel](https://vercel.com/) 進行部署。

### 部署步驟

1.  **建立 GitHub Repository**：
    如果您尚未建立，請在專案根目錄執行：
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    git branch -M main
    git remote add origin [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git) # 替換為您的 repo URL
    git push -u origin main
    ```

2.  **Vercel 部署**：
    1.  前往 [Vercel](https://vercel.com/) 並登入。
    2.  選擇「New Project」，然後連接您的 GitHub 帳戶並匯入本專案的 Repository。
    3.  在專案設定步驟中，找到「Environment Variables」區塊。
    4.  將 `.env` 檔案中的 `GOOGLE_SERVICE_ACCOUNT_EMAIL`、`GOOGLE_PRIVATE_KEY` 和 `GOOGLE_SHEETS_ID` 這三個變數及其值加入到 Vercel 的環境變數中。**請確保 `GOOGLE_PRIVATE_KEY` 在 Vercel 中是單行完整且包含所有換行符號的字串。**
    5.  點擊「Deploy」。

3.  **自定義域名設定**：
    部署完成後，您可以在 Vercel 專案設定中，前往「Domains」區塊，新增您的自定義域名 `sxcong.ntpusu.org`，並依照 Vercel 提供的指示設定 DNS 記錄。

## 貢獻

歡迎對本專案提出任何建議或貢獻。如果您發現任何問題或有改進想法，請隨時提出 Issue 或 Pull Request。

## 聯絡方式

國立臺北大學學生自治會 三峽校區學生議會
Sanxia Campus Student Congress, NTPUSU

## 授權

本專案依據 [MIT License](LICENSE) 開源。