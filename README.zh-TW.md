<!-- Language Switcher -->
**語言:** [English](README.md) | [日本語](README.ja.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md)

---

# FuckParadoxMods

讓 Paradox Mods 網頁版像一個正常的現代網頁

**當前版本：1.2**

## 📝 簡介

這是一個油猴（Tampermonkey）使用者腳本，旨在改善 Paradox Mods 官方網站的使用者體驗，讓它表現得更像一個現代化的網頁應用程式。

Paradox Mods 是 Paradox Interactive 旗下遊戲（如《鋼鐵雄心4》、《歐陸風雲4》、《群星》等）的官方模組平台。雖然功能齊全，但其網頁版的使用者體驗有待改進。本腳本透過一系列最佳化，讓瀏覽和使用 Paradox Mods 網站更加流暢和舒適。

**腳本名稱：** Paradox Mods Helper (Auto Load + Search Fix + Hide Loader + Mini Spinner)

## ✨ 功能特性

- 🔄 **自動載入更多**：當 "LOAD MORE" 按鈕接近視口時自動點選，無需手動點選即可連續瀏覽模組清單
- 🔓 **解鎖搜尋結果**：移除搜尋時的遮罩層，讓搜尋結果立即可見可互動，無需等待載入完成
- 🎭 **隱藏載入遮罩**：隱藏全域載入遮罩層，避免頻繁的全螢幕遮擋，提供更流暢的瀏覽體驗
- 🔄 **迷你載入指示器**：在右下角顯示一個小型載入提示，既能瞭解載入狀態又不影響頁面使用
- ⚙️ **功能開關**：支援透過修改腳本開關單獨啟用/停用各項功能

## 📦 安裝方法

### 前置要求

首先，你需要在瀏覽器中安裝一個使用者腳本管理器：

- **Chrome/Edge/Brave**：[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**：[Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) 或 [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)
- **Safari**：[Tampermonkey](https://apps.apple.com/app/tampermonkey/id1482490089)
- **Opera**：[Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)

### 安裝腳本

#### 方法一：直接安裝（推薦）

點選下面的連結，Tampermonkey 會自動識別並提示安裝：

**[點選安裝腳本](https://openuserjs.org/install/AndreaFrederica/Paradox_Mods_Helper_(Auto_Load_+_Search_Fix_+_Hide_Loader_+_Mini_Spinner).user.js)**

#### 方法二：手動安裝

1. 下載或複製 [script.js](https://github.com/AndreaFrederica/FuckParadoxMods/blob/main/script.user.js) 檔案內容
2. 在 Tampermonkey 管理面板中選擇「新增指令碼」
3. 貼上腳本內容並儲存

安裝完成後，訪問 [Paradox Mods](https://mods.paradoxplaza.com/) 即可自動生效。

> 💡 **自動更新**：如果使用方法一安裝，Tampermonkey 會自動檢測並更新腳本到最新版本

## 🎮 支援的遊戲

本腳本適用於所有使用 Paradox Mods 平台的遊戲，包括但不限於：

- Hearts of Iron IV (鋼鐵雄心4)
- Europa Universalis IV (歐陸風雲4)
- Crusader Kings III (十字軍之王3)
- Stellaris (群星)
- Cities: Skylines (城市：天際線)
- Victoria 3 (維多利亞3)

## 🔧 使用說明

安裝完成後，腳本會在你訪問 Paradox Mods 網站時自動執行，無需任何額外設定。

### 功能設定

如果需要自訂功能開關，可以編輯腳本檔案，在開頭找到以下設定項：

```javascript
const ENABLE_AUTO_LOAD_MORE = true;              // 自動載入更多
const ENABLE_STRIP_IS_SEARCHING = true;          // 解鎖搜尋結果
const ENABLE_CSS_UNLOCK_AND_HIDE_LOADER = true;  // 隱藏遮罩 + 迷你指示器
```

將對應的 `true` 改為 `false` 即可關閉該功能。

### 適用頁面

- **自動載入更多**：`https://mods.paradoxplaza.com/games/*`（遊戲模組清單頁）
- **搜尋最佳化和載入最佳化**：所有 Paradox Mods 相關域名
  - `mods.paradoxplaza.com`
  - `mods.paradoxinteractive.com`

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來幫助改進這個專案！

## 📄 授權條款

本專案採用 [Mozilla Public License 2.0](LICENSE) 授權條款。

## ⚠️ 免責宣告

本腳本僅用於改善使用者體驗，不涉及任何破解、作弊或其他違規行為。使用本腳本即表示你同意自行承擔使用風險。

## 🔗 相關連結

- [Paradox Mods 官網](https://mods.paradoxplaza.com/)
- [Paradox Interactive 官網](https://www.paradoxinteractive.com/)
- [Tampermonkey 官網](https://www.tampermonkey.net/)
