除了主導中英文自動加空隙的 `text-autospace` 之外，CSS Text Module Level 4 針對東亞文字排版（CJK：中日韓）推進了多項規範，旨在將傳統印刷排版規範（如 CLREQ 中文排版需求、JLREQ 日本語排版處理）直接內建至瀏覽器渲染引擎中。

---

## 1. `text-spacing-trim`（CJK 全角標點擠壓與間距微調）

在中文與日文排版中，全角標點符號（如 `「` `」` `，` `。`）字型本身帶有半個字寬的預設留白。當兩個標點符號相鄰（例如 `「『` 或 `』。`）或標點出現在行首、行尾時，往往會產生過大的不自然間隙。

`text-spacing-trim` 屬性專門解決這個問題，會自動進行「約物擠壓」（Punctuation Kerning）：

```css
p {
  /* 實務預設推薦：依據語系規範進行標準的相鄰標點擠壓 */
  text-spacing-trim: normal;
}
```

- **`normal`**：**實務首選**。依據語系規範進行標準的標點擠壓（如自動縮減相鄰全形標點的多餘留白）。
- **`trim-start`**：強制將行首標點前方的留白擠壓掉，使文字邊緣絕對對齊版心。
- **`space-all`**：關閉所有擠壓機制，保留文字原本完整的全角字框。
- **優點**：過去需要透過 JS 替換 `<span>` 或寫死負 Margin 的排版技巧徹底走入歷史，確保版面邊緣垂直對齊且無額外 DOM 節點。

---

## 2. `text-spacing`（東亞字距微調速記屬性）

`text-spacing` 是 Level 4 中引入的 Shorthand（簡寫屬性），將控制「盤古之白」的 **`text-autospace`** 與控制「標點擠壓」的 **`text-spacing-trim`** 整合在一起：

```css
body {
  /* 一次啟用中英文自動間距與標點縮排微調 */
  text-spacing: normal;

  /* 亦可精確指定組合：啟用盤古之白 + 行首標點擠壓 */
  text-spacing: ideograph-alpha trim-start;
}
```

> **實務提醒**：由於瀏覽器渲染引擎對長寫屬性（Longhand）的解析與支援速度普遍較快且穩定，現階段建議優先寫獨立的 `text-autospace` 與 `text-spacing-trim`，以獲得最佳的相容性。

---

## 3. `word-break: auto-phrase`（短語/文節智慧斷行）

傳統中文與日文在換行時，預設是「按字斷行（Character-based Wrapping）」。但在手機小螢幕上，這常導致一個完整的詞彙（如「人工智慧」）被拆斷在兩行，降低閱讀流暢度。

`word-break: auto-phrase` 讓瀏覽器底層引入自然語言處理（NLP）或輕量詞庫模型（如 Google BudouX），改以「語義短語（Phrase-based）」進行斷行：

```css
h1,
.hero-title {
  /* 依據語義自然斷行，避免關鍵字詞被半途切斷 */
  word-break: auto-phrase;
}
```

- **優點**：極度適合標題與標語（Hero Banner）。即使在響應式寬度變動時，文字也會在語意斷點處換行，大幅改善行動端閱讀體驗。

---

## 4. `hanging-punctuation`（懸掛標點）

東亞傳統高階排版中，為了維持文字版塊兩側（Margins）的視覺絕對對齊，行首或行尾的標點符號（如逗號、句號、括號）有時會被允許「懸掛」在文字區塊的外側。

```css
article p {
  /* 允許行尾點號與行首括號懸掛於版心外 */
  hanging-punctuation: first last;
}
```

- **`first`**：首行的開頭標點懸掛在左側邊界外。
- **`last`**：末行的結尾標點懸掛在右側邊界外。
- **`allow-end`**：當行尾標點因為強制對齊（Justify）放不下時，允許其擠入右側邊界外而不強制換行。

---

## 5. `line-break`（禁則處理嚴格度升級）

雖然 `line-break` 屬性在 Level 3 就已存在，但在 Level 4 中對 CJK 避首尾字（如「不可在行首出現句號，不可在行尾出現開括號」）進行了更嚴謹的調整：

```css
p {
  /* 嚴格執行東亞避首尾字禁則規則（含小寫假名、特殊符號等） */
  line-break: strict;
}
```

---

## 東亞文字排版屬性總結

| CSS 屬性                      | 主要功能                                                | 解決的排版痛點                                       |
| ----------------------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| **`text-autospace`**          | 中英文/數字間自動加入視覺微小間隔                       | 擺脫手動按空格（盤古之白）與跨語系搜尋匹配失敗的問題 |
| **`text-spacing-trim`**       | 自動壓縮相鄰或行首尾 CJK 全角標點的預留留白             | 解決標點連續出現時間距過大、無法邊緣對齊版心的問題   |
| **`text-spacing`**            | 整合 `text-autospace` 與 `text-spacing-trim` 的簡寫屬性 | 提供單一聲明控管全站東亞字距微調的便利性             |
| **`word-break: auto-phrase`** | 利用 AI/詞義分析將文字依據短語切開換行                  | 避免手機端標題字詞被硬生生切斷在兩行                 |
| **`hanging-punctuation`**     | 將標點符號推至文字外框線之外                            | 實現傳統高級印刷的邊緣極致對齊（Margin Alignment）   |

---

## 🟨Q：您介紹的這些新的東亞文字排版屬性，主流瀏覽器都支援了嗎？

目前各大主流瀏覽器的支援度已邁入「Chromium 核心與 Apple WebKit 核心雙雙支援」的成熟期。

隨著 **Chrome/Edge (120+)** 與 **Safari 18+** 的發布，三大核心已有兩大陣營（覆蓋 Windows、macOS、iOS、Android 全平台裝置）全面支援核心 CJK 排版功能。此外，這些屬性屬於漸進增強（Progressive Enhancement）範疇——在不支援的舊版瀏覽器或 Firefox 上僅是維持傳統排版，絕不破壞頁面結構或功能，極為適合直接導入生產環境。

---

### 各屬性瀏覽器支援度一覽

| CSS 屬性                      | Chrome / Edge | Safari (WebKit)                    | Firefox (Gecko) | 支援度總結                                                 |
| ----------------------------- | ------------- | ---------------------------------- | --------------- | ---------------------------------------------------------- |
| **`text-autospace`**          | Chrome 120+   | Safari 18+                         | **開發中**      | Blink 與 WebKit 雙核心全面開放，行動端與桌面端覆蓋率極高。 |
| **`text-spacing-trim`**       | Chrome 123+   | Safari 18+                         | **開發中**      | 主流瀏覽器皆支援相鄰與行首尾 CJK 標點自動壓縮。            |
| **`word-break: auto-phrase`** | Chrome 119+   | Safari 18+                         | **開發中**      | 短語智慧斷行於 iOS/Android/桌面雙平台皆可正常渲染。        |
| **`hanging-punctuation`**     | **未支援**    | **部分支援** <br>(WebKit 早前規範) | **未支援**      | 僅 Safari 支援部分語意，整體普及度尚低。                   |
| **`line-break: strict`**      | **全面支援**  | **全面支援**                       | **全面支援**    | 屬於 CSS Text Level 3 早期規範，早已跨平台普及。           |

---

### 生產環境實作建議與降級策略 (Fallback)

在實際前端開發中，無需因為 Firefox 仍在實作而放棄使用。建議採納以下策略：

#### 策略 1：直接聲明（漸進增強）

對於改善視覺體驗的排版屬性，直接套用即可。不支援的瀏覽器會自動忽略該 CSS 聲明，保持傳統排版。

```css
article {
  /* 支援的瀏覽器（Chrome/Edge 120+、Safari 18+）自動展現高品質排版 */
  text-autospace: normal;
  text-spacing-trim: normal;

  /* 基礎通用設定 */
  line-break: strict;
}
```

#### 策略 2：利用 `@supports` 條件判斷

若專案中有使用 JavaScript 套件（如 `pangu.js`）作為過渡，可透過 `@supports` 進行功能偵測，確保不重複執行 JS：

```css
/* 預設無支援時的備用設定（或交由 JS 套件動態處理） */
.content {
  letter-spacing: normal;
}

/* 當瀏覽器原生支援 text-autospace 時，套用原生 CSS 並停用 JS 排版 */
@supports (text-autospace: normal) {
  .content {
    text-autospace: normal;
    text-spacing-trim: normal;
  }
}
```
