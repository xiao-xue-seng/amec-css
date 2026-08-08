import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import { JSDOM } from "jsdom";
import prettier from "prettier"; // 1. 引入 Prettier

const __dirname = import.meta.dirname;

// 1. 初始化 JSDOM 取得原生 CSSStyleSheet 解析能力
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const document = dom.window.document;

function normalizeCSS(cssText) {
  const styleEl = document.createElement("style");
  styleEl.textContent = cssText;
  document.head.appendChild(styleEl);
  const sheet = styleEl.sheet;

  function processRules(cssRules) {
    const rulesList = Array.from(cssRules);
    const processedRules = [];

    for (const rule of rulesList) {
      if (rule.type === 1) {
        // CSSRule.STYLE_RULE
        const sortedSelector = rule.selectorText
          .split(",")
          .map((s) => s.trim())
          .sort()
          .join(", ");
        const props = [];
        for (let i = 0; i < rule.style.length; i++) {
          const propName = rule.style[i];
          const val = rule.style.getPropertyValue(propName).trim();
          const priority = rule.style.getPropertyPriority(propName);
          props.push(`${propName}: ${val}${priority ? " !important" : ""};`);
        }
        props.sort();
        processedRules.push({
          key: sortedSelector,
          text: `${sortedSelector} { ${props.join(" ")} }`,
        });
      } else if (rule.type === 4) {
        // CSSRule.MEDIA_RULE
        const innerContent = processRules(rule.cssRules);
        processedRules.push({
          key: `@media ${rule.conditionText}`,
          text: `@media ${rule.conditionText} {\n${innerContent
            .split("\n")
            .map((l) => "  " + l)
            .join("\n")}\n}`,
        });
      }
    }
    processedRules.sort((a, b) => a.key.localeCompare(b.key));
    return processedRules.map((r) => r.text).join("\n");
  }

  const result = processRules(sheet.cssRules);
  document.head.removeChild(styleEl);
  return result;
}

// 2. 封裝一個融合「正規化 + Prettier 格式化」的函式
async function processAndFormatCSS(cssText) {
  // 第一步：先進行選擇器與屬性排序的正規化
  const normalizedCSS = normalizeCSS(cssText);

  // 第二步：送交 Prettier 進行排版美化
  // 注意：傳入字串時必須明確指定 parser: "css"
  const formattedCSS = await prettier.format(normalizedCSS, {
    parser: "css",
    // 這裡可以依個人喜好增加設定，例如：
    // printWidth: 80,
    // tabWidth: 2,
  });

  return formattedCSS;
}

// 3. 主程式：讀取命令列輸入的兩個檔案
const [file1, file2] = process.argv.slice(2);

if (!file1 || !file2) {
  console.error("請提供兩個 CSS 檔案路徑，例如: node diff-css.js a.css b.css");
  process.exit(1);
}

// 建立 .tmp 暫存目錄
const tmpDir = path.join(__dirname, ".tmp");
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);

const normFile1 = path.join(tmpDir, `norm1_${path.basename(file1)}`);
const normFile2 = path.join(tmpDir, `norm2_${path.basename(file2)}`);

try {
  // 讀取檔案內容
  const cssText1 = fs.readFileSync(file1, "utf8");
  const cssText2 = fs.readFileSync(file2, "utf8");

  // 非同步執行正規化與 Prettier 格式化
  const finalCss1 = await processAndFormatCSS(cssText1);
  const finalCss2 = await processAndFormatCSS(cssText2);

  // 寫入暫存檔
  fs.writeFileSync(normFile1, finalCss1);
  fs.writeFileSync(normFile2, finalCss2);

  // 4. 自動呼叫 VS Code 原生 Diff 命令開啟畫面！
  exec(`code --diff "${normFile1}" "${normFile2}"`, (err) => {
    if (err) {
      console.error(
        "無法喚起 VS Code Diff，請確認已在 VS Code 註冊 `code` 指令。",
      );
    } else {
      console.log("已自動在 VS Code 中開啟比對視窗！");
    }
  });
} catch (err) {
  console.error("處理 CSS 檔案時發生錯誤:", err);
  process.exit(1);
}
