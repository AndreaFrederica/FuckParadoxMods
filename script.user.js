// ==UserScript==
// @name         Paradox Mods Helper (Auto Load + Search Fix + Hide Loader + Mini Spinner)
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  自动加载更多、解锁搜索结果、隐藏全局加载遮罩，并在右下角显示小加载指示
// @match        https://mods.paradoxplaza.com/games/*
// @match        *://mods.paradoxinteractive.com/*
// @match        *://mods.paradoxplaza.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /******************************************************************
     * 功能开关：改成 false 可以单独关闭某个功能（默认全开）
     ******************************************************************/
    const ENABLE_AUTO_LOAD_MORE = true;
    const ENABLE_STRIP_IS_SEARCHING = true;
    const ENABLE_CSS_UNLOCK_AND_HIDE_LOADER = true; // 同时控制右下角 mini spinner

    /******************************************************************
 * 功能一：LOAD MORE 按钮出现在视口上方任意位置到视口下方阈值内时自动点击
 * - 上方：无限上方都算（按钮一旦出现过并在视口上方，也会继续触发）
 * - 下方：只在视口下方 offsetBottom (默认 400px) 内触发
 * 作用范围：mods.paradoxplaza.com/games/*
 ******************************************************************/
    if (ENABLE_AUTO_LOAD_MORE) {
        if (location.host === 'mods.paradoxplaza.com' &&
            location.pathname.startsWith('/games/')) {

            // 找到当前页面上的 "LOAD MORE" 按钮
            function getLoadMoreButton() {
                const buttons = document.querySelectorAll('button');
                for (const btn of buttons) {
                    if (btn.innerText.trim() === 'LOAD MORE') {
                        return btn;
                    }
                }
                return null;
            }

            // 按钮是否在触发范围内：
            // 从无限上方到视口下方 offsetBottom 像素
            function isButtonInTriggerZone(btn) {
                const rect = btn.getBoundingClientRect();
                const vh = window.innerHeight;

                const offsetBottom = 600; // 视口下方阈值（可自行调整）

                // 只要按钮顶部不超过 视口底部 + offsetBottom 即算在范围内
                return rect.top <= vh + offsetBottom;
            }

            function clickLoadMore(btn) {
                if (!btn) return;

                // 防止重复点击：按钮禁用或正在加载时不点
                if (btn.disabled || btn.getAttribute('aria-busy') === 'true') {
                    return;
                }

                console.log('Auto clicking Load More...');
                btn.click();
            }

            function checkAndAutoLoad() {
                const btn = getLoadMoreButton();
                if (!btn) return;

                if (isButtonInTriggerZone(btn)) {
                    clickLoadMore(btn);
                }
            }

            // 滚动时检查
            window.addEventListener('scroll', checkAndAutoLoad);

            // 初次加载也检查一次（万一按钮一开始就很靠近）
            window.addEventListener('load', checkAndAutoLoad);

            console.log('Paradox Mods Auto Load More (top∞ ~ bottom threshold) enabled.');
        }
    }

    /******************************************************************
     * 功能二：拦截 React 写 className / classList.add，移除 isSearching
     ******************************************************************/
    if (ENABLE_STRIP_IS_SEARCHING) {
        function stripIsSearching(value) {
            if (typeof value !== 'string') return value;
            return value.replace(
                /\s*[^ \t\n\r]*SearchPage-styles__isSearching[^ \t\n\r]*/g,
                ''
            ).trim();
        }

        function patchClassName(proto) {
            const desc = Object.getOwnPropertyDescriptor(proto, 'className');
            if (!desc || typeof desc.set !== 'function') return;

            Object.defineProperty(proto, 'className', {
                get: desc.get,
                set: function (v) {
                    const newV = stripIsSearching(v);
                    return desc.set.call(this, newV);
                },
                configurable: true,
                enumerable: desc.enumerable,
            });
        }

        patchClassName(HTMLElement.prototype);
        if (HTMLElement.prototype !== Element.prototype) {
            patchClassName(Element.prototype);
        }

        const origAdd = DOMTokenList.prototype.add;
        DOMTokenList.prototype.add = function (...tokens) {
            const filtered = tokens.filter(
                (t) => !t.includes('SearchPage-styles__isSearching')
            );
            if (filtered.length === 0) return;
            return origAdd.apply(this, filtered);
        };

        console.log('Paradox Mods: strip isSearching class enabled.');
    }

    /******************************************************************
     * 功能三：CSS 解锁搜索结果 + 隐藏全局 Loader 遮罩 + 右下角 mini spinner
     ******************************************************************/
    if (ENABLE_CSS_UNLOCK_AND_HIDE_LOADER) {
        // 注入样式：解锁 SearchPage 和隐藏原生遮罩，并定义 mini spinner 的样式
        const style = document.createElement('style');
        style.textContent = `
          /* 1. SearchPage 在 isSearching 时强制把结果区域显示出来 */

          [class*="SearchPage-styles__root"][class*="SearchPage-styles__isSearching"]
          [class*="SearchPage-styles__results"] {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          [class*="SearchPage-styles__root"][class*="SearchPage-styles__isSearching"]
          [class*="SearchPage-styles__content"],
          [class*="SearchPage-styles__root"][class*="SearchPage-styles__isSearching"]
          [class*="SearchPage-styles__header"] {
            display: block !important;
            opacity: 1 !important;
            visibility: visible !important;
          }

          /* 2. 全局 loader 遮罩：保留 DOM，只是让它不可见且可点穿 */

          [class*="Loader-styles__loader"][class*="Loader-styles__global"],
          [class*="Loader-styles__loader--"][class*="Loader-styles__global--"] {
            opacity: 0 !important;
            visibility: hidden !important;
            pointer-events: none !important;
          }

          /* 3. 右下角自定义 mini loading 指示器 */

          #pmh-loading-indicator {
            position: fixed;
            right: 16px;
            bottom: 16px;
            z-index: 99999;
            display: none; /* 初始隐藏，JS 控制显隐 */
            align-items: center;
            gap: 6px;
            padding: 6px 10px;
            border-radius: 999px;
            background: rgba(0, 0, 0, 0.70);
            color: #fff;
            font-size: 12px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            pointer-events: none; /* 不挡点击 */
          }

          #pmh-loading-indicator-spinner {
            width: 12px;
            height: 12px;
            box-sizing: border-box;
            border-radius: 50%;
            border: 2px solid #fff;
            border-top-color: transparent;
            animation: pmh-spin 0.8s linear infinite;
          }

          @keyframes pmh-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `;
        document.documentElement.appendChild(style);

        // 创建右下角 mini spinner 元素
        function ensureMiniSpinner() {
            if (document.getElementById('pmh-loading-indicator')) return;

            const box = document.createElement('div');
            box.id = 'pmh-loading-indicator';

            const spinner = document.createElement('div');
            spinner.id = 'pmh-loading-indicator-spinner';

            const text = document.createElement('span');
            text.textContent = 'Loading…';

            box.appendChild(spinner);
            box.appendChild(text);

            // body 可能还没准备好，优先挂 body，没有就挂 html
            (document.body || document.documentElement).appendChild(box);
        }

        // 检查站点原生全局 loader 是否处于 active 状态
        function isGlobalLoaderActive() {
            const el = document.querySelector(
                '[class*="Loader-styles__loader"][class*="Loader-styles__global"]'
            );
            if (!el) return false;
            return String(el.className).includes('Loader-styles__active');
        }

        // 根据 loader 状态更新 spinner 的显隐
        function updateMiniSpinner() {
            const box = document.getElementById('pmh-loading-indicator');
            if (!box) return;

            if (isGlobalLoaderActive()) {
                box.style.display = 'flex';
            } else {
                box.style.display = 'none';
            }
        }

        // 等 DOM 基本 ready 后创建 spinner，并定时检查 loader 状态
        function initMiniSpinner() {
            ensureMiniSpinner();
            // 300ms 检查一次，足够跟上站点的 loading 状态变化
            setInterval(updateMiniSpinner, 300);
        }

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initMiniSpinner);
        } else {
            initMiniSpinner();
        }

        console.log('Paradox Mods: CSS unlock & hide loader + mini spinner enabled.');
    }
})();
