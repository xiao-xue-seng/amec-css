# CSS 中的 `margin-block` 與 `margin-inline`：為什麼不只用 `margin-top`、`margin-left`？

在學習 CSS 時，我們最早接觸到的 `margin` 通常是這幾種寫法：

```css
margin-top: 10px;
margin-right: 20px;
margin-bottom: 10px;
margin-left: 20px;
```

或者使用簡寫：

```css
margin: 10px 20px;
```

這些寫法非常直觀：

- `top` 就是上面
- `right` 就是右邊
- `bottom` 就是下面
- `left` 就是左邊

那麼，為什麼 CSS 又要提供：

```css
margin-block
margin-inline
margin-block-start
margin-block-end
margin-inline-start
margin-inline-end
```

這一整套看起來比較複雜的寫法？

原因其實很簡單：

> **傳統的 `top / right / bottom / left` 是以「螢幕的上下左右」來描述方向；`block / inline` 則是以「文字與版面排列的方向」來描述方向。**

這個差異在現代網站，尤其是需要支援不同語言、不同書寫方向的網站中，非常重要。

---

## 一、先從最熟悉的 `margin` 開始

假設我們有一個區塊：

```html
<div class="box">Hello</div>
```

設定：

```css
.box {
  margin-top: 20px;
  margin-right: 30px;
  margin-bottom: 40px;
  margin-left: 50px;
}
```

可以想像成：

```text
          ↑
      margin-top
          20px

← 50px   [ BOX ]   30px →

      margin-bottom
          40px
          ↓
```

這裡的方向非常固定：

| CSS             | 意義 |
| --------------- | ---- |
| `margin-top`    | 上   |
| `margin-right`  | 右   |
| `margin-bottom` | 下   |
| `margin-left`   | 左   |

所以傳統的 `margin-*` 有一個很大的優點：

> **非常容易理解。**

只要看到 `margin-left`，幾乎不需要思考，就知道是在控制左邊的外距。

---

# 二、問題來了：網頁不一定永遠「從左到右、從上到下」

CSS 最初的使用情境，很容易讓我們產生一個直覺：

> 網頁就是從上往下排列，文字就是從左往右排列。

但實際上，世界上的文字系統並不只有這一種排列方式。

例如中文、英文通常是：

```text
從上 → 下
從左 → 右
```

但阿拉伯文、希伯來文等語言則主要是：

```text
從上 → 下
從右 → 左
```

另外，有些東亞文字排版還可能採用直排：

```text
↓  ↓  ↓
文  文  文
字  字  字
```

因此，如果 CSS 永遠使用：

```css
margin-left
margin-right
margin-top
margin-bottom
```

就會產生一個問題：

> **我們寫的是「左邊」，但設計上真正想表達的可能不是「左邊」，而是「文字開始的那一側」。**

這就是 CSS Logical Properties（邏輯屬性）出現的原因。

---

# 三、什麼是 `block` 與 `inline`？

要理解：

```css
margin-block
margin-inline
```

首先只需要理解兩個概念：

> **block 方向**

以及：

> **inline 方向**

可以先不要把它想得太複雜。

---

## 1. `block`：內容一行一行排列的方向

以我們最熟悉的中文、英文網頁為例：

```text
第一行文字
第二行文字
第三行文字
```

內容是由上往下增加。

因此：

```text
block direction
      ↓
      ↓
      ↓
```

在這種情況下：

```css
margin-block-start
```

就相當於：

```css
margin-top
```

而：

```css
margin-block-end
```

就相當於：

```css
margin-bottom
```

所以可以暫時記成：

> **block ≈ 上下方向**

但請注意：

**這只是一般中文、英文網頁中的結果。**

它並不是 `block` 永遠代表「上下」。

---

# 四、`inline`：同一行文字延伸的方向

再來看文字：

```text
Hello World
→ → → → →
```

英文與中文一般都是由左往右排列。

因此：

```text
inline direction
→ → → → →
```

在這種情況下：

```css
margin-inline-start
```

相當於：

```css
margin-left
```

而：

```css
margin-inline-end
```

相當於：

```css
margin-right
```

所以對一般中文／英文網站來說，可以先這樣記：

| Logical Property      | 一般中文／英文網站 |
| --------------------- | ------------------ |
| `margin-block-start`  | `margin-top`       |
| `margin-block-end`    | `margin-bottom`    |
| `margin-inline-start` | `margin-left`      |
| `margin-inline-end`   | `margin-right`     |

這張表非常重要。

但真正的重點是：

> **Logical Properties 描述的是「版面的邏輯方向」，而不是固定的螢幕方向。**

---

# 五、那麼 `margin-block` 是什麼？

知道 `block` 方向後，這就很容易理解了。

```css
margin-block: 20px;
```

代表：

> 在 block 方向的起點與終點，各設定 `20px` 的 margin。

在一般中文／英文網站中，它等同於：

```css
margin-top: 20px;
margin-bottom: 20px;
```

也就是：

```text
        20px
         ↑

       [ BOX ]

         ↓
        20px
```

---

## `margin-block` 也可以設定兩個值

例如：

```css
margin-block: 10px 20px;
```

代表：

```css
margin-block-start: 10px;
margin-block-end: 20px;
```

在一般水平書寫的中文／英文環境中，大致相當於：

```css
margin-top: 10px;
margin-bottom: 20px;
```

因此：

```css
margin-block: 10px 20px;
```

可以理解成：

> block 方向的開始是 `10px`，結束是 `20px`。

---

# 六、那麼 `margin-inline` 又是什麼？

同樣的道理：

```css
margin-inline: 20px;
```

代表：

> 在 inline 方向的起點與終點，各設定 `20px` 的 margin。

在一般中文／英文網站中，大致相當於：

```css
margin-left: 20px;
margin-right: 20px;
```

也就是：

```text
       20px
←               →

       [ BOX ]

←               →
       20px
```

也可以使用兩個值：

```css
margin-inline: 10px 30px;
```

代表：

```css
margin-inline-start: 10px;
margin-inline-end: 30px;
```

在一般中文／英文環境中，可以理解成：

```css
margin-left: 10px;
margin-right: 30px;
```

---

# 七、完整對照表

如果目前還不熟悉 Logical Properties，可以先記住這張表：

| 傳統寫法        | Logical Properties    | 一般水平中文／英文 |
| --------------- | --------------------- | ------------------ |
| `margin-top`    | `margin-block-start`  | 上                 |
| `margin-bottom` | `margin-block-end`    | 下                 |
| `margin-left`   | `margin-inline-start` | 左                 |
| `margin-right`  | `margin-inline-end`   | 右                 |

簡寫則是：

| 傳統寫法                       | Logical Properties |
| ------------------------------ | ------------------ |
| `margin-top` + `margin-bottom` | `margin-block`     |
| `margin-left` + `margin-right` | `margin-inline`    |

例如：

```css
margin-top: 20px;
margin-bottom: 30px;
```

可以寫成：

```css
margin-block: 20px 30px;
```

而：

```css
margin-left: 10px;
margin-right: 20px;
```

可以寫成：

```css
margin-inline: 10px 20px;
```

---

# 八、為什麼這樣寫比較好？

最重要的優勢是：

> **CSS 不再描述「畫面上的哪一邊」，而是描述「內容的哪一個方向」。**

這對多語系網站特別有價值。

假設我們有：

```css
.title {
  margin-inline-start: 20px;
}
```

它表達的是：

> 標題與「文字開始方向」保持 20px 距離。

而不是：

> 標題與「左邊」保持 20px 距離。

這兩句話看起來很像，但概念完全不同。

---

# 九、這個差異在 RTL 網站特別明顯

例如阿拉伯文通常是由右往左：

```text
← ← ← ← ←
```

這時候：

```css
margin-inline-start: 20px;
```

就會自動對應到右側。

而：

```css
margin-left: 20px;
```

仍然是左側。

因此：

```css
margin-inline-start: 20px;
```

真正表達的是：

> 「文字開始的那一側」留 20px。

而不是：

> 「左邊」留 20px。

這也是 Logical Properties 最大的價值。

---

# 十、所以 `margin-inline-start` 不等於 `margin-left`

這是一個初學者非常容易誤解的地方。

在一般中文／英文網站：

```css
margin-inline-start
```

看起來很像：

```css
margin-left
```

但兩者的**概念並不相同**。

例如：

```css
margin-left: 20px;
```

意思是：

> 左邊 20px。

而：

```css
margin-inline-start: 20px;
```

意思是：

> inline 方向的起點 20px。

因此，在 RTL 環境下：

```text
margin-left
       ↓

[ BOX ]  ← 20px
```

但：

```text
margin-inline-start
       ↓

20px →  [ BOX ]
```

它會跟著文字的書寫方向改變。

---

# 十一、Logical Properties 不只適用於 margin

理解這個概念之後，你會發現：

```css
margin-block
margin-inline
```

其實只是整套 CSS Logical Properties 的一部分。

例如：

```css
padding-block
padding-inline
```

以及：

```css
border-block
border-inline
```

還有：

```css
inset-block
inset-inline
```

甚至：

```css
block-size
inline-size
```

例如：

```css
width: 300px;
```

在某些情況下可以用：

```css
inline-size: 300px;
```

而：

```css
height: 200px;
```

則可以用：

```css
block-size: 200px;
```

這些寫法背後都是同一個概念：

> **不要把版面直接綁死在「上、下、左、右」，而是使用與書寫模式相關的方向。**

---

# 十二、那傳統 `margin-top` 等寫法是不是過時了？

**不是。**

這一點非常重要。

Logical Properties 並不是要「取代」傳統寫法。

傳統寫法仍然非常有用。

例如：

```css
position: absolute;

top: 0;
left: 0;
```

如果你的設計真的就是：

> 元素必須固定在畫面的左上角。

那麼：

```css
top: 0;
left: 0;
```

其實比：

```css
inset-block-start: 0;
inset-inline-start: 0;
```

更直接。

因為你的需求本來就是「左上角」。

---

# 十三、什麼時候適合使用傳統 `margin-*`？

如果你的版面需求本身就是「物理方向」，傳統寫法往往更直觀。

例如：

```css
.icon {
  margin-right: 8px;
}
```

如果你的設計明確要求：

> 圖示右邊留 8px。

那麼 `margin-right` 就非常清楚。

又例如某些純粹的視覺定位：

```css
margin-top: 5px;
```

如果你真的就是要「往下留 5px」，使用 `margin-top` 完全合理。

---

# 十四、什麼時候適合使用 `margin-block` / `margin-inline`？

如果你的需求描述比較接近：

> 「與文字開始的位置保持距離」

或：

> 「段落之間增加垂直方向的空間」

那麼 Logical Properties 通常更適合。

例如：

```css
.article {
  margin-block: 2rem;
}
```

這個寫法表達的是：

> 文章在 block 方向的前後各留 2rem。

而不是：

> 上面 2rem、下面 2rem。

這種語意在設計系統、元件系統與多語系網站中特別有價值。

---

# 十五、實際開發時，哪一種比較推薦？

可以用一個很簡單的判斷方式：

### 如果你想描述「畫面的哪一邊」

使用：

```css
margin-top
margin-right
margin-bottom
margin-left
```

### 如果你想描述「內容流向的哪一邊」

使用：

```css
margin-block-start
margin-block-end
margin-inline-start
margin-inline-end
```

例如：

```css
/* 「距離左邊 16px」 */
margin-left: 16px;
```

與：

```css
/* 「距離文字開始方向 16px」 */
margin-inline-start: 16px;
```

兩者都沒有錯。

真正的問題是：

> **你的需求到底是在描述「左邊」，還是在描述「開始方向」？**

---

# 十六、對一般中文網站而言，真的有必要嗎？

如果你的網站只有：

- 中文
- 英文
- 水平書寫
- LTR（Left-to-Right）
- 不需要支援其他書寫方向

那麼使用傳統：

```css
margin-top
margin-right
margin-bottom
margin-left
```

完全沒有問題。

甚至對剛開始學 CSS 的人來說，傳統寫法通常更容易閱讀。

例如：

```css
.card {
  margin-top: 16px;
  margin-bottom: 24px;
}
```

任何前端工程師幾乎一眼就能理解。

---

# 十七、但如果是大型、多語系或長期維護的網站

這時候 Logical Properties 的價值就會逐漸增加。

例如：

```css
.navigation-item {
  margin-inline-start: 12px;
}
```

這個元件未來如果需要支援 RTL 語言，不需要把：

```css
margin-left
```

與：

```css
margin-right
```

到處重新檢查。

CSS 已經表達了正確的「邏輯方向」。

這對設計系統尤其有幫助。

---

# 十八、另一個容易忽略的優點：程式碼的語意

比較：

```css
.heading {
  margin-top: 32px;
  margin-bottom: 16px;
}
```

與：

```css
.heading {
  margin-block: 32px 16px;
}
```

兩者在一般水平書寫環境下效果相近。

但：

```css
margin-block
```

告訴讀程式碼的人：

> 這個 spacing 是針對 block 方向設計的。

而不是：

> 這個 spacing 剛好是上面與下面。

因此，Logical Properties 不只是為了「支援 RTL」。

它也可以讓 CSS 更接近設計概念本身。

---

# 十九、它的缺點是什麼？

Logical Properties 當然也不是只有優點。

## 1. 初學者比較不容易理解

看到：

```css
margin-inline-start
```

初學者可能會問：

> inline 是什麼？start 是哪裡？

相較之下：

```css
margin-left
```

幾乎不需要解釋。

---

## 2. 程式碼比較長

例如：

```css
margin-inline-start
```

比：

```css
margin-left
```

長很多。

雖然可以使用：

```css
margin-inline
```

但當你需要指定單一方向時：

```css
margin-inline-start
```

確實比較冗長。

---

## 3. 閱讀 CSS 時需要理解 writing mode

當網站開始大量使用：

```css
block
inline
start
end
```

開發者就必須知道：

- `writing-mode`
- `direction`
- LTR / RTL
- block direction
- inline direction

否則可能會覺得 CSS 「明明寫的是 start，為什麼跑到右邊去了？」

---

# 二十、不要為了「現代」而全部改成 Logical Properties

這也是非常重要的觀念。

不要因為看到：

```css
margin-inline
```

比較新，就認為：

> 所有 `margin-left` 都應該改掉。

這樣反而容易造成不必要的複雜化。

更好的策略是：

> **根據需求的語意選擇寫法。**

例如：

```css
/* 明確描述上下空間 */
.article {
  margin-block: 2rem;
}
```

很合理。

而：

```css
/* 明確描述左側固定位置 */
.badge {
  margin-left: 8px;
}
```

也完全合理。

---

# 二十一、可以用「物理方向」與「邏輯方向」來記

如果只想記住最核心的概念，可以把 CSS 的方向分成兩類。

### 傳統方向：Physical

```text
       top
        ↑
left ← BOX → right
        ↓
      bottom
```

它直接描述螢幕上的位置：

```css
top
right
bottom
left
```

---

### Logical 方向

```text
      block-start
           ↓
           ↓
      [ CONTENT ]
           ↓
      block-end


inline-start → CONTENT → inline-end
```

它描述內容的排列方向：

```css
block-start
block-end

inline-start
inline-end
```

---

# 二十二、最簡單的記憶方式

如果你現在剛開始接觸 Logical Properties，只要先記住：

```text
block  → 一行一行排列的方向
inline → 一行文字延伸的方向
```

對一般中文／英文網站：

```text
block
  ↓
上下

inline
  →
左右
```

所以：

```css
margin-block
```

大致就是：

```css
margin-top + margin-bottom
```

而：

```css
margin-inline
```

大致就是：

```css
margin-left + margin-right
```

但是：

> **「大致」非常重要。**

因為一旦改變書寫方向，這個對應關係也會改變。

---

# 二十三、最後的實務建議

如果你正在建立一個新的網站或設計系統，我會建議不要把問題想成：

> 「到底應該全部使用 `margin-*`，還是全部使用 `margin-block-*`？」

比較好的思考方式是：

> **這個 CSS 規則描述的是「實體方向」，還是「內容方向」？**

如果是實體方向：

```css
margin-left
margin-right
margin-top
margin-bottom
```

很適合。

如果是內容方向：

```css
margin-inline-start
margin-inline-end
margin-block-start
margin-block-end
```

通常更適合。

而當左右兩側是對稱的：

```css
margin-inline: auto;
```

則尤其常見。

例如：

```css
.container {
  max-width: 1200px;
  margin-inline: auto;
}
```

這比：

```css
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
```

更簡潔，也更能表達：

> 「讓這個容器在 inline 方向置中。」

---

# 結語：Logical Properties 不是「比較新的 margin」，而是另一種思考方式

`margin-top`、`margin-right`、`margin-bottom`、`margin-left` 描述的是：

> **東西在畫面的哪一邊？**

而：

```css
margin-block-start
margin-block-end
margin-inline-start
margin-inline-end
```

描述的是：

> **東西在內容排列方向的哪一邊？**

因此，兩套寫法並不是「舊的 vs. 新的」，也不是「錯的 vs. 對的」。

它們解決的是不同層次的問題。

可以用下面這句話作為最終記憶：

> **Physical Properties 描述「上、下、左、右」；Logical Properties 描述「開始、結束、block、inline」。**

對於單純的中文／英文網站，傳統 `margin-*` 仍然非常實用；但對於多語系、RTL、不同 writing mode、設計系統，以及希望 CSS 更貼近版面語意的專案，`margin-block-*` 與 `margin-inline-*` 會提供更好的彈性與可維護性。

因此，最好的做法通常不是「全部改用 Logical Properties」，而是：

> **在真正需要表達「邏輯方向」的地方使用 Logical Properties，在明確需要表達「實體方向」的地方繼續使用傳統 Properties。**
