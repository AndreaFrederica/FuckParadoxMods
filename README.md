<!-- Language Switcher -->
**Languages:** [English](README.md) | [日本語](README.ja.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md)

---

# Paradox Mods Helper

A browser userscript that modernizes the Paradox Mods website experience.  
**[OpenJS](https://openuserjs.org/scripts/AndreaFrederica/Paradox_Mods_Helper_(Auto_Load_%2B_Search_Fix_%2B_Hide_Loader_%2B_Mini_Spinner))**
**[GreasyFork](https://greasyfork.org/zh-CN/scripts/558905-paradox-mods-helper-auto-load-search-fix-hide-loader-mini-spinner)**
**Current Version:** 1.2

## 📝 About

This is a Tampermonkey userscript designed to improve the user experience of the official Paradox Mods website, making it behave more like a modern web application.

Paradox Mods is the official mod platform for Paradox Interactive games (such as Hearts of Iron IV, Europa Universalis IV, Stellaris, and more). While fully functional, its web interface has room for improvement. This script enhances the browsing experience through various optimizations.

**Script Name:** Paradox Mods Helper (Auto Load + Search Fix + Hide Loader + Mini Spinner)

## ✨ Features

- 🔄 **Auto Load More**: Automatically clicks the "LOAD MORE" button when it approaches the viewport, enabling continuous browsing without manual clicks
- 🔓 **Unlock Search Results**: Removes the overlay during searches, making search results immediately visible and interactive without waiting for loading to complete
- 🎭 **Hide Loading Overlay**: Hides the global loading overlay to prevent frequent full-screen blocking, providing a smoother browsing experience
- 🔄 **Mini Loading Indicator**: Displays a small loading indicator in the bottom-right corner, keeping you informed of loading status without interfering with page usage
- ⚙️ **Feature Toggles**: Supports individual enable/disable switches for each feature by modifying the script

## 📦 Installation

### Prerequisites

First, install a userscript manager in your browser:

- **Chrome/Edge/Brave**: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) or [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)
- **Safari**: [Tampermonkey](https://apps.apple.com/app/tampermonkey/id1482490089)
- **Opera**: [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)

### Installing the Script

#### Method 1: Direct Installation (Recommended)

Click the link below, and Tampermonkey will automatically recognize and prompt you to install:

[**[Click to Install Script](https://openuserjs.org/install/AndreaFrederica/Paradox_Mods_Helper_(Auto_Load_+_Search_Fix_+_Hide_Loader_+_Mini_Spinner).user.js)**]  
**[OpenJS](https://openuserjs.org/scripts/AndreaFrederica/Paradox_Mods_Helper_(Auto_Load_%2B_Search_Fix_%2B_Hide_Loader_%2B_Mini_Spinner))**

#### Method 2: Manual Installation

1. Download or copy the contents of [script.user.js](https://github.com/AndreaFrederica/FuckParadoxMods/blob/main/script.user.js)
2. In the Tampermonkey management panel, select "Add new script"
3. Paste the script content and save

After installation, visit [Paradox Mods](https://mods.paradoxplaza.com/) and the script will activate automatically.

> 💡 **Auto-updates**: If you use Method 1 for installation, Tampermonkey will automatically detect and update the script to the latest version

## 🎮 Supported Games

This script works with all games using the Paradox Mods platform, including but not limited to:

- Hearts of Iron IV
- Europa Universalis IV
- Crusader Kings III
- Stellaris
- Cities: Skylines
- Victoria 3

## 🔧 Usage

After installation, the script runs automatically when you visit the Paradox Mods website. No additional configuration is needed.

### Feature Configuration

If you need to customize feature toggles, edit the script file and find the following configuration options at the beginning (comments shown here are translated for clarity):

```javascript
const ENABLE_AUTO_LOAD_MORE = true;              // Auto load more
const ENABLE_STRIP_IS_SEARCHING = true;          // Unlock search results
const ENABLE_CSS_UNLOCK_AND_HIDE_LOADER = true;  // Hide overlay + mini indicator
```

Change the corresponding `true` to `false` to disable a feature.

### Applicable Pages

- **Auto Load More**: `https://mods.paradoxplaza.com/games/*` (game mod list pages)
- **Search and Loading Optimizations**: All Paradox Mods domains
  - `mods.paradoxplaza.com`
  - `mods.paradoxinteractive.com`

## 🤝 Contributing

Issues and Pull Requests are welcome to help improve this project!

## 📄 License

This project is licensed under the [Mozilla Public License 2.0](LICENSE).

## ⚠️ Disclaimer

This script is solely for improving user experience and does not involve any cracking, cheating, or other violations. By using this script, you agree to assume all risks at your own discretion.

## 🔗 Related Links

- [Paradox Mods Official Site](https://mods.paradoxplaza.com/)
- [Paradox Interactive Official Site](https://www.paradoxinteractive.com/)
- [Tampermonkey Official Site](https://www.tampermonkey.net/)
