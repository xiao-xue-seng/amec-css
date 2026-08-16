將 CSS 格式化、統一屬性的順序，就可以很方便的比對、維護。

# CSS 屬性自動排序整合指南： Stylelint + clean-order

在大型或團隊協作的專案中，保持 CSS 屬性順序的一致性不僅能提升程式碼的可讀性，還能避免重複撰寫相同的屬性。本文件將介紹如何透過 **Stylelint** 搭配 **`stylelint-config-clean-order`** 規範，實現撰寫 CSS 時的自動化排序與排版。

---

## 1. 什麼是 Stylelint？

**Stylelint** 是目前前端開發中最主流的 CSS/SCSS/Less 程式碼檢查工具（Linter），相當於 JavaScript 領域的 ESLint。

- **語法與規範檢查**：捕捉無效的 CSS 語法、重複的選擇器或未使用的變數。
- **自動修復（Auto-fix）**：可透過指令或編輯器設定，在儲存檔案時自動修復排版與屬性順序錯誤。
- **高度可擴充**：支援社群提供的多種共享規範（Configs）與外掛（Plugins）。

---

## 2. 常見的 CSS 屬性排序策略比較

CSS 屬性的排序方式主要分為 **邏輯分組排序** 與 **字母排序** 兩大類：

| 排序風格                                                  | 核心邏輯                                                                                            | 優點                                            | 缺點                                                             |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------------------------------- |
| **Recess / Bootstrap**<br>`stylelint-config-recess-order` | 依 **定位 $\rightarrow$ 盒模型 $\rightarrow$ 排版 $\rightarrow$ 視覺** 分組                         | 廣為接受、極符合視覺構圖與開發直覺              | 屬性全部緊貼在一起，無分組間隔                                   |
| **Concentric CSS**<br>`stylelint-config-concentric-order` | 由外而內像同心圓包裹（**Margin $\rightarrow$ Border $\rightarrow$ Padding $\rightarrow$ Content**） | 盒模型幾何結構明確                              | 排版與視覺屬性容易混雜在一起                                     |
| **Alphabetical**<br>`order/properties-alphabetical-order` | 純字典 **A 到 Z 字母順序**                                                                          | 客觀無爭議、搜尋特定屬性快速                    | 破壞邏輯關聯（如 `top` 與 `left` 或 `width` 與 `height` 被拆開） |
| **Clean Order**<br>`stylelint-config-clean-order`         | 邏輯分組，並在**群組之間自動插入空行**                                                              | 程式碼視覺層次分明、呼吸感強、支援現代 CSS 語法 | 檔案垂直總行數會因空行而增加                                     |

---

## 3. 本專案採用規範：`stylelint-config-clean-order`

本指南選用 **`stylelint-config-clean-order`** 作為排序規範，主要優勢包含：

1. **自動插入分組空行**：自動在不同屬性類別（如「佈局」與「視覺」）之間補上 1 行空行，讓程式碼結構清晰、易於閱讀。
2. **現代 CSS 良好支援**：針對 CSS Grid、Flexbox、CSS 變數（Custom Properties）與邏輯屬性（如 `margin-inline`）皆有合理的排序歸類。
3. **開箱即用**：不需要手動自訂幾百個屬性的詳細規則，直接繼承即可獲得極佳的視覺排版效果。

---

## 4. 環境安裝與設定步驟

### 步驟一：安裝 NPM 套件

在專案根目錄下開啟終端機，安裝 Stylelint、標準規範以及 clean-order 套件：

```bash
npm install --save-dev stylelint stylelint-config-standard stylelint-config-clean-order

```

---

### 步驟二：設定 Stylelint 配置檔 (`.stylelintrc.json`)

在專案根目錄建立 `.stylelintrc.json` 檔案。

> **重要注意事項**：`stylelint-config-clean-order` 必須放在 `extends` 陣列的**最後一項**，以確保其空行與排序規則能正確覆蓋基礎規範。

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-clean-order"]
}
```

---

### 步驟三：安裝 VS Code 擴充套件

1. 開啟 VS Code 擴充套件商店（`Ctrl+Shift+X` 或 `Cmd+Shift+X`）。
2. 搜尋並安裝官方套件：**Stylelint**（識別碼：`stylelint.vscode-stylelint`）。

---

### 步驟四：設定 VS Code 存檔自動修正 (`.vscode/settings.json`)

為了讓開發體驗更順暢，建議在專案中建立 `.vscode/settings.json`，設定儲存檔案時自動執行 Stylelint 排序：

```json
{
  // 停用 VS Code 內建的 CSS 檢查，避免與 Stylelint 重複警告或衝突
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,

  // 設定存檔時自動執行 Stylelint 自動修正 (Auto-fix)
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": "explicit"
  }
}
```

---

## 5. 實際使用與操作

### VS Code 自動修復

完成上述設定後，在編輯 CSS/SCSS 檔案並存檔（`Ctrl+S` / `Cmd+S`）時，VS Code 就會自動將屬性重新排列，並在不同的屬性群組之間插入空行。

### 透過 CLI 執行檢查與修正

如果你需要對全專案進行批量處理，或是加入 CI/CD 流程，可以使用以下命令列指令：

- **檢查專案中所有 CSS 檔案的順序與語法：**

```bash
npx stylelint "**/*.css"

```

- **自動排版並修正專案中所有 CSS 檔案：**

```bash
npx stylelint "**/*.css" --fix

```
