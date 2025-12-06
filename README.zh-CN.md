<!-- Language Switcher -->
**语言:** [English](README.md) | [日本語](README.ja.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md)

---

# FuckParadoxMods

让 Paradox Mods 网页版像一个正常的现代网页

**当前版本：1.2**

## 📝 简介

这是一个油猴（Tampermonkey）用户脚本，旨在改善 Paradox Mods 官方网站的用户体验，让它表现得更像一个现代化的网页应用。

Paradox Mods 是 Paradox Interactive 旗下游戏（如《钢铁雄心4》、《欧陆风云4》、《群星》等）的官方模组平台。虽然功能齐全，但其网页版的用户体验有待改进。本脚本通过一系列优化，让浏览和使用 Paradox Mods 网站更加流畅和舒适。

**脚本名称：** Paradox Mods Helper (Auto Load + Search Fix + Hide Loader + Mini Spinner)

## ✨ 功能特性

- 🔄 **自动加载更多**：当 "LOAD MORE" 按钮接近视口时自动点击，无需手动点击即可连续浏览模组列表
- 🔓 **解锁搜索结果**：移除搜索时的遮罩层，让搜索结果立即可见可交互，无需等待加载完成
- 🎭 **隐藏加载遮罩**：隐藏全局加载遮罩层，避免频繁的全屏遮挡，提供更流畅的浏览体验
- 🔄 **迷你加载指示器**：在右下角显示一个小型加载提示，既能了解加载状态又不影响页面使用
- ⚙️ **功能开关**：支持通过修改脚本开关单独启用/禁用各项功能

## 📦 安装方法

### 前置要求

首先，你需要在浏览器中安装一个用户脚本管理器：

- **Chrome/Edge/Brave**：[Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**：[Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) 或 [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)
- **Safari**：[Tampermonkey](https://apps.apple.com/app/tampermonkey/id1482490089)
- **Opera**：[Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)

### 安装脚本

#### 方法一：直接安装（推荐）

点击下面的链接，Tampermonkey 会自动识别并提示安装：

**[点击安装脚本](https://openuserjs.org/install/AndreaFrederica/Paradox_Mods_Helper_(Auto_Load_+_Search_Fix_+_Hide_Loader_+_Mini_Spinner).user.js)**

#### 方法二：手动安装

1. 下载或复制 [script.js](https://github.com/AndreaFrederica/FuckParadoxMods/blob/main/script.user.js) 文件内容
2. 在 Tampermonkey 管理面板中选择"添加新脚本"
3. 粘贴脚本内容并保存

安装完成后，访问 [Paradox Mods](https://mods.paradoxplaza.com/) 即可自动生效。

> 💡 **自动更新**：如果使用方法一安装，Tampermonkey 会自动检测并更新脚本到最新版本

## 🎮 支持的游戏

本脚本适用于所有使用 Paradox Mods 平台的游戏，包括但不限于：

- Hearts of Iron IV (钢铁雄心4)
- Europa Universalis IV (欧陆风云4)
- Crusader Kings III (十字军之王3)
- Stellaris (群星)
- Cities: Skylines (城市：天际线)
- Victoria 3 (维多利亚3)

## 🔧 使用说明

安装完成后，脚本会在你访问 Paradox Mods 网站时自动运行，无需任何额外配置。

### 功能配置

如果需要自定义功能开关，可以编辑脚本文件，在开头找到以下配置项：

```javascript
const ENABLE_AUTO_LOAD_MORE = true;              // 自动加载更多
const ENABLE_STRIP_IS_SEARCHING = true;          // 解锁搜索结果
const ENABLE_CSS_UNLOCK_AND_HIDE_LOADER = true;  // 隐藏遮罩 + 迷你指示器
```

将对应的 `true` 改为 `false` 即可关闭该功能。

### 适用页面

- **自动加载更多**：`https://mods.paradoxplaza.com/games/*`（游戏模组列表页）
- **搜索优化和加载优化**：所有 Paradox Mods 相关域名
  - `mods.paradoxplaza.com`
  - `mods.paradoxinteractive.com`

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来帮助改进这个项目！

## 📄 许可证

本项目采用 [Mozilla Public License 2.0](LICENSE) 许可证。

## ⚠️ 免责声明

本脚本仅用于改善用户体验，不涉及任何破解、作弊或其他违规行为。使用本脚本即表示你同意自行承担使用风险。

## 🔗 相关链接

- [Paradox Mods 官网](https://mods.paradoxplaza.com/)
- [Paradox Interactive 官网](https://www.paradoxinteractive.com/)
- [Tampermonkey 官网](https://www.tampermonkey.net/)
