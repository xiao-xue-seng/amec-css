# 學習及撰寫CSS一定要參考的權威資源

學習與撰寫 CSS 時，建議將資源分為「**官方權威字典**」、「**相容性查詢**」、「**深度觀念與教學**」以及「**趨勢與實戰影音**」四大類。以下是前端業界公認最權威、最具參考價值的核心網站：

---

### 一、 官方標準與權威字典（查語法、屬性必備）

#### 1. [MDN Web Docs (Mozilla Developer Network)](https://developer.mozilla.org/)

- **地位**：前端開發者的「聖經」，也是目前公認最完整、更新最即時的 Web 技術文件。
- **特色**：
  - 詳細解構每個 CSS 屬性的語法、預設值、繼承性與適用元素。
  - 提供即時互動的程式碼編輯器（Interactive Editor），可直接在網頁上測試效果。
  - 附帶權威的瀏覽器相容性表格（BCD, Browser Compatibility Data）。
- **使用情境**：忘記某個屬性的合法參數、想了解新語法定義、快速查閱相容性。

#### 2. [W3C CSS Working Group (CSSWG)](https://drafts.csswg.org/)

- **地位**：CSS 規格的制定源頭與官方組織。
- **特色**：
  - 包含所有 CSS Module（如 CSS Color 4、CSS Grid 2 等）的正式規格書（Editor's Draft）。
  - 內容非常硬核、底層，定義了瀏覽器引擎如何計算盒模型、層疊（Cascade）與排版機制。
- **使用情境**：想徹底搞懂某個屬性在底層是怎麼被解析與渲染的，或是追蹤尚未實作的下一代 CSS 特性。

---

### 二、 相容性與現代標準查詢（跨瀏覽器開發必備）

#### 3. [Can I use...](https://caniuse.com/)

- **地位**：全球最知名的瀏覽器特性支援度查詢工具。
- **特色**：
  - 清楚標示 Desktop / Mobile 各大瀏覽器版本對特定 CSS 特性的支援情況（如 `@layer`, `:has()`, `oklch` 等）。
  - 顯示全球與地區性的使用者覆蓋率（Usage %），幫助判斷該特性是否能在正式專案中安全使用。
- **使用情境**：決定是否可以在專案中引入某個現代 CSS 新功能時。

#### 4. [web.dev (Google Chrome 團隊)](https://web.dev/)

- **地位**：Google Chrome 團隊維護的現代網頁技術指南。
- **特色**：
  - **Learn CSS 系列**：由專家撰寫的循序漸進 CSS 入門與進階教學。
  - 深度專題文章：如 Adam Argyle、Una Kravets 等 CSSWG 成員撰寫的現代 CSS 技巧（GUI Challenges、現代色彩、動畫等）。
  - 追蹤 **Baseline** 標準（各大主流瀏覽器皆已普及支援的安全功能）。
- **使用情境**：學習現代 CSS 的最佳實踐、架構思維與效能優化。

---

### 三、 深度解析、觀念建立與實用手冊

#### 5. [Josh W. Comeau 的個人技術部落格](https://www.joshwcomeau.com/)

- **地位**：當代最受歡迎的 CSS 觀念深度剖析網站之一。
- **特色**：
  - 文章搭配大量**互動式視覺化元件**，幫助讀者建立正確的「心智模型（Mental Model）」。
  - 代表作包括《The Joy of React》、《An Interactive Guide to Flexbox / CSS Grid》以及現代著名的《Custom CSS Reset》。
- **使用情境**：想徹底搞懂 Flexbox、Grid、層疊上下文（Stacking Context）等難以直觀理解的抽象觀念。

#### 6. [Ahmad Shadeed Blog (ishadeed.com)](https://ishadeed.com/)

- **地位**：頂尖 CSS/UI 專家，著有《Defensive CSS》。
- **特色**：
  - 主打「防禦性 CSS（Defensive CSS）」思維，教你如何寫出在極端內容、斷行、多語系或超大文字縮放下都不會破版的強健樣式。
  - 大量精美的圖解與實際案例對比。
- **使用情境**：想提升切版品質，解決邊界情況（Edge Cases）與複雜響應式排版問題。

#### 7. [CSS-Tricks](https://css-tricks.com/)

- **地位**：CSS 領域歷史悠久且極富盛名的經典網站。
- **特色**：
  - 經典的 **《A Complete Guide to Flexbox》** 與 **《A Complete Guide to CSS Grid》** 是全球前端工程師必備的書籤。
  - 擁有豐富的 CSS Almanac（語法索引）與實務技巧文章。
- **使用情境**：快速查找 Flexbox / Grid 的父子屬性對照表與經典切版模式。

#### 8. [Smashing Magazine](https://www.smashingmagazine.com/)

- **地位**：涵蓋前端工程、無障礙網頁（a11y）與 UI/UX 設計的高品質期刊。
- **特色**：
  - 邀請 CSSWG 核心成員（如 Rachel Andrew、Miriam Suzanne 等）撰寫深度長文。
  - 內容著重於架構、無障礙標準與前瞻技術探討。
- **使用情境**：想跨足網頁無障礙性（A11y）、大型專案樣式架構與設計系統。

---

### 四、 影音學習與年度趨勢

#### 9. [Kevin Powell (YouTube 頻道)](https://www.youtube.com/@KevinPowell)

- **地位**：被社群譽為「King of CSS」的教育家。
- **特色**：專注於用淺顯易懂的方式拆解現代 CSS 的盲點與新語法（如 Subgrid, Anchor Positioning, Container Queries）。每週更新高質量的實戰示範。
- **使用情境**：偏好影片學習、想掌握最新 CSS 語法在真實頁面中的應用手法。

#### 10. [State of CSS](https://stateofcss.com/)

- **地位**：每年舉辦的全球 CSS 生態系大型問卷調查報告。
- **特色**：統計全球數萬名開發者最常用的新特性、框架、預處理器、工具及認知度排行。
- **使用情境**：了解目前前端社群的技術趨勢走向，評估未來該學習哪些新技術。

---

### 💡 學習建議與使用習慣

1. **日常查屬性與語法**：設 `MDN` 為第一優先。
2. **評估新功能是否可用**：查 `Can I use` 與 `web.dev Baseline`。
3. **遇到排版破版或想搞懂底層邏輯**：閱讀 `Josh W. Comeau` 與 `Ahmad Shadeed` 的圖解文章。
4. **掌握新世代功能實戰**：訂閱 `Kevin Powell` 與 `web.dev` 的更新。
