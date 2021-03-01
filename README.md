# unnotech-frontend-recruit

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```

### 說明

- 如何執行專案
  - 依照上述執行npm install, npm run serve 啟動本機測試端口。


- 專案的架構、邏輯說明
  - 使用 Vue Cli 生成主要專案結構，並用 Vue Router 控制 books 頁面與 books/:bookId 頁面 (簡稱:bookId) 前端路由控制，:bookId 頁面由<router-view />形式存在於 books 頁面中，並用 axios 藉由提供之 API 取得後端資料並注入到迴圈渲染。

  - 使用布林值 detail，作為簡單頁面顯示 flag 使用，books 頁面使用 props 將 detail 布林值傳送往 :bookId 頁面，作為控制是否顯示出此頁面到畫面可視區塊的依據，:bookId 頁面使用 $emit 呼叫 books 頁面 changeDetail function，改變 detail 布林值進而隱藏至畫面可視區塊外。


- 使用到的第三方 library 的理解，及為何使用它
  - "animate.css"　css 為主的簡易動畫樣板，可以引用並自行修改 keyframes 改變動畫特性，透過直接對元素插入 class name，就能快速地取得不錯的動畫效果。

  - "wow.js"　用以輔助 animate.css ，主要讓動畫並非載入即觸發，而是控制動畫元素進入畫面可視範圍才觸發，並能透過設定　offset 數值調整可視範圍觸發的偏移值。

  - "axios"　將非同步行為進行封裝，使非同步行為的請求撰寫變得簡潔俐落。

  - "bootstrap"　常見的 css / scss 為主的設計框架，藉由引入並修改 _variables.scss 檔案來改變樣式及提供元件的設定，這裡使用 bootstrap 的 Grid system 控制 Layout 及 RWD，以及元素樣式的套用。


- 專案中遇到的困難、問題、解決方法
  - 此專案要求的內容難度不高，沒有明顯碰到困難的部分，真要說困難的部分，應該是沒有藝術上的美感，不瞟竊別人的網頁或有美術設計稿，很難自己憑空生出有美感的設計。另外，時間上有多個公司發面試前專案擠在這一週，因此本次未嘗試使用 Vue 3 及 tailwind，改使用較熟悉的 bootstrap 4 但提昇版本至 5 Beta-2。
  