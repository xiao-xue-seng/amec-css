# 認識 oklab、oklch 色彩空間

在 CSS Color Module Level 4 中，**`oklab()`** 與 **`oklch()`** 被視為現代網頁色彩的重大升級。它們由色彩科學家 Björn Ottosson 於 2020 年提出，旨在解決傳統色彩空間（如 sRGB、HSL、甚至是舊版 CIELAB）在人類視覺感知上的缺陷。

---

### 一、 什麼是 OKLab 與 OKLCH？

兩者本質上是同一套色彩空間的兩種不同表示法（就像 RGB 與 HSL 的關係）：

1. **`oklab(L a b [/ alpha])`（直角座標系）**
   - **`L` (Lightness)**：感知明度（`0%` 到 `100%` 或 `0` 到 `1`）。
   - **`a`**：綠到紅軸（負值偏綠，正值偏紅，約 `-0.4` 到 `+0.4`）。
   - **`b`**：藍到黃軸（負值偏藍，正值偏黃，約 `-0.4` 到 `+0.4`）。
   - **特點**：適合電腦內部進行顏色混合、計算與漸層插值。

2. **`oklch(L C H [/ alpha])`（極座標系，對人類更直覺）**
   - **`L` (Lightness)**：感知明度（`0%` 到 `100%` 或 `0` 到 `1`）。
   - **`C` (Chroma)**：彩度/鮮豔度（`0` 為無彩色灰，理論上無上限，一般螢幕常在 `0` 到 `0.4` 之間）。
   - **`H` (Hue)**：色相環角度（`0` 到 `360` 度）。
   - **特點**：概念類似 `hsl()`，但**修復了 HSL 所有不均勻的缺陷**，是目前最推薦手寫與建立設計系統的格式。

---

### 二、 核心特色與優點

#### 1. 真實的人類感知均勻性（Perceptual Uniformity）

在傳統 **HSL** 中，數值上的「50% 明度」在不同色相下肉眼看起來完全不同：

- `hsl(60, 100%, 50%)`（純黃色）看起來極其刺眼明亮。
- `hsl(240, 100%, 50%)`（純藍色）看起來非常暗。

而在 **OKLCH** 中，**只要 `L` 數值相同，無論色相 `H` 怎麼轉，肉眼感受到的明度都是完全一致的**。

#### 2. 解決漸層中的「色偏（Hue Shift）」與「髒色」

- **sRGB 漸層**：從藍色過渡到黃色時，中間常會經過一段沉悶、發灰的「髒綠色」。
- **CIELAB 漸層**：藍色增加彩度時會莫名其妙「偏紫」（Abney effect）。
- **OKLab / OKLCH**：漸層過渡非常自然純淨，保持色相純粹，不會出現中間發灰或意外變色的情況。

#### 3. 支援廣色域（Wide Gamut）

傳統 `hex` 或 `rgb()` 僅限於 sRGB 色域。而 OKLab/OKLCH **不受 sRGB 色域限制**，能直接利用現代手機、Mac 或高階顯示器支援的 **Display P3** 與 **Rec.2020** 廣色域，呈現更鮮豔飽和的色彩（只要調高 `C` 值）。

#### 4. 可預測的色彩調整（無障礙友好）

因為明度（L）與彩度（C）是獨立且均勻的，你可以只改動一個維度而不影響另一個維度：

- 想要按鈕的 Hover 狀態？只需微調 `L`。
- 想要 Disabled 狀態？只需將 `C` 降為 `0`。

---

### 三、 OKLab vs OKLCH：何時用哪一個？

| 比較維度       | `oklab()`                                    | `oklch()`                          |
| :------------- | :------------------------------------------- | :--------------------------------- |
| **結構**       | 直角座標 (L, a, b)                           | 圓柱極座標 (L, C, H)               |
| **人類可讀性** | 較差（難以直觀想像 `a`、`b` 數值是什麼顏色） | 極高（像 HSL 一樣好理解）          |
| **最佳用途**   | CSS 漸層插值、顏色混合計算 (`color-mix`)     | 設計系統、手寫色彩變數、調色盤生成 |

---

### 四、 適用的場合與範例

#### 1. 建立設計系統（Design Tokens & Palettes）

建立主題色票時，只要固定 `L` 與 `C`，只改變 `H`（色相），就能保證所有輔助色具備完全相同的視覺份量與對比度：

```css
:root {
  /* 基礎彩度與明度（確保全站對比度一致） */
  --primary-lightness: 65%;
  --primary-chroma: 0.2;

  /* 只改色相，視覺對比度完全不變 */
  --brand-blue: oklch(var(--primary-lightness) var(--primary-chroma) 250);
  --brand-green: oklch(var(--primary-lightness) var(--primary-chroma) 140);
  --brand-purple: oklch(var(--primary-lightness) var(--primary-chroma) 300);
}
```

#### 2. 無障礙（Accessibility / WCAG）與深淺主題切換

在設計暗色模式（Dark Mode）或確保文字與背景對比度時，OKLCH 的 `L` 值是可靠的依據。

```css
.card {
  background-color: oklch(95% 0.02 240); /* 淺色底 */
  color: oklch(20% 0.05 240); /* 高對比文字 */
}

/* 深色模式只需對稱翻轉 L */
.dark .card {
  background-color: oklch(20% 0.02 240);
  color: oklch(95% 0.05 240);
}
```

#### 3. 自然、高品質的漸層效果（Gradients）

CSS 漸層支援指定色彩空間插值（Color Interpolation），使用 `in oklch` 或 `in oklab` 可以消除傳統漸層的灰暗過渡帶：

```css
.hero-banner {
  /* 使用 in oklch 讓過渡色極為乾淨明亮 */
  background: linear-gradient(
    in oklch to right,
    oklch(60% 0.25 240),
    oklch(85% 0.2 90)
  );
}
```

#### 4. 顏色混合運算 (`color-mix()`)

搭配現代 CSS 的 `color-mix()`，在 OKLCH 下混色效果比 sRGB 更接近現實顏料的混合感受：

```css
.button {
  background: var(--brand-blue);
}

.button:hover {
  /* 在 oklch 空間中混入 15% 的白色，不會造成彩度怪異突變 */
  background: color-mix(in oklch, var(--brand-blue), white 15%);
}
```

---

### 五、 瀏覽器支援度

- **支援現狀**：Chrome 111+、Safari 15.4+、Firefox 113+、Edge 111+ 均已全面支援 `oklab()` 與 `oklch()`（各大主流瀏覽器自 2023 年起已具備 **Baseline** 廣泛支援）。
- **建議**：若無需相容極舊版本的瀏覽器，新專案建議**優先使用 `oklch()` 作為主要的色彩表示法**。
