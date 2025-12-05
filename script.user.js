// ==UserScript==
// @name         Paradox Mods Helper (Auto Load + Search Fix + Hide Loader + Mini Spinner)
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  自动加载更多、解锁搜索结果、隐藏全局加载遮罩，并在右下角显示小加载指示
// @match        https://mods.paradoxplaza.com/games/*
// @match        *://mods.paradoxinteractive.com/*
// @match        *://mods.paradoxplaza.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /******************************************************************
     * 功能开关：改成 false 可以单独关闭某个功能（默认全开）
     ******************************************************************/
    const ENABLE_AUTO_LOAD_MORE = true;
    const ENABLE_STRIP_IS_SEARCHING = true;
    const ENABLE_CSS_UNLOCK_AND_HIDE_LOADER = true; // 同时控制右下角 mini spinner

    /******************************************************************
     * 通用：检测全局 Loader 是否处于 active 状态
     * 供：功能一（自动加载）和功能三（mini spinner）共用
     ******************************************************************/
    function isGlobalLoaderActive() {
        const el = document.querySelector(
            '[class*="Loader-styles__loader"][class*="Loader-styles__global"]'
        );
        if (!el) return false;
        return String(el.className).includes('Loader-styles__active');
    }

    /******************************************************************
     * 功能一：LOAD MORE 按钮出现在视口上方任意位置到视口下方阈值内时自动点击
     * - 上方：无限上方都算（按钮一旦出现过并在视口上方，也会继续触发）
     * - 下方：只在视口下方 offsetBottom 内触发
     * 作用范围：mods.paradoxplaza.com/games/*
     ******************************************************************/
    if (ENABLE_AUTO_LOAD_MORE) {
        if (location.host === 'mods.paradoxplaza.com' &&
            location.pathname.startsWith('/games/')) {

            function getLoadMoreButton() {
                const buttons = document.querySelectorAll('button');
                for (const btn of buttons) {
                    if (btn.innerText.trim() === 'LOAD MORE') {
                        return btn;
                    }
                }
                return null;
            }

            function isButtonInTriggerZone(btn) {
                const rect = btn.getBoundingClientRect();
                const vh = window.innerHeight;

                const offsetBottom = 600; // 视口下方阈值（可自行调整）

                // 从无限上方到 视口底部 + offsetBottom 都算触发区
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
                // 如果全局 Loader 正在转，就直接退出，不要继续自动加载
                if (isGlobalLoaderActive()) {
                    // console.log('Global loader active, skip auto load');
                    return;
                }

                const btn = getLoadMoreButton();
                if (!btn) return;

                if (isButtonInTriggerZone(btn)) {
                    clickLoadMore(btn);
                }
            }

            window.addEventListener('scroll', checkAndAutoLoad);
            window.addEventListener('load', checkAndAutoLoad);

            console.log('Paradox Mods Auto Load More (top∞ ~ bottom threshold) enabled.');
        }
    }

    /******************************************************************
     * 功能三：CSS 解锁搜索结果 + 隐藏全局 Loader 遮罩 + 右下角 mini spinner
     ******************************************************************/
    if (ENABLE_CSS_UNLOCK_AND_HIDE_LOADER) {
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
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 999px;
        background: rgba(0, 0, 0, 0.70);
        color: #fff;
        font-size: 12px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        pointer-events: none;
        box-sizing: border-box;
        width : 100px
      }

      /* 圆圈：永远在左边，颜色不变，只控制是否旋转 */

      #pmh-loading-indicator-spinner {
        flex: 0 0 auto;
        width: 12px;
        height: 12px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid #fff;
        border-top-color: transparent;
      }

      /* 文本：一个 span，通过 opacity 做淡入淡出 */

      #pmh-loading-text {
        flex: 0 0 auto;
        white-space: nowrap;
        transition: opacity 0.2s ease;
      }

      /* active：圈在转 */

      #pmh-loading-indicator.pmh-active #pmh-loading-indicator-spinner {
        animation: pmh-spin 0.8s linear infinite;
      }

      /* idle：圈不转 */

      #pmh-loading-indicator.pmh-idle #pmh-loading-indicator-spinner {
        animation: none;
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
            box.classList.add('pmh-idle'); // 初始为空闲状态

            const spinner = document.createElement('div');
            spinner.id = 'pmh-loading-indicator-spinner';

            const text = document.createElement('span');
            text.id = 'pmh-loading-text';
            text.textContent = 'Idle';

            box.appendChild(spinner);
            box.appendChild(text);

            (document.body || document.documentElement).appendChild(box);
        }

        // 记录上一次状态，避免没必要的重复动画
        let lastActive = null;

        // 根据 loader 状态更新 spinner 和文字
        function updateMiniSpinner() {
            const box = document.getElementById('pmh-loading-indicator');
            const text = document.getElementById('pmh-loading-text');
            if (!box || !text) return;

            const active = isGlobalLoaderActive();
            if (active === lastActive) return; // 状态没变就不用动

            lastActive = active;

            // 先淡出文本，再切文字，再淡入
            text.style.opacity = '0';
            setTimeout(() => {
                text.textContent = active ? 'Loading…' : 'Idle';
                text.style.opacity = '1';
            }, 50);

            if (active) {
                box.classList.add('pmh-active');
                box.classList.remove('pmh-idle');
            } else {
                box.classList.add('pmh-idle');
                box.classList.remove('pmh-active');
            }
        }

        function initMiniSpinner() {
            ensureMiniSpinner();
            // 先立即同步一下状态
            updateMiniSpinner();
            // 然后定时轮询
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
