// ==UserScript==
// @name         Paradox Mods Helper (Auto Load + Search Fix + Hide Loader + Mini Spinner)
// @namespace    http://tampermonkey.net/
// @version      1.8
// @description  Automatically load more, unlock search results, hide the global loading overlay, and display a small loading indicator in the bottom right corner. Add a button to clear all filters.  自动加载更多、解锁搜索结果、隐藏全局加载遮罩，并在右下角显示小加载指示， 添加一个清除所有过滤器按钮
// @match        https://mods.paradoxplaza.com/games/*
// @match        *://mods.paradoxinteractive.com/*
// @match        *://mods.paradoxplaza.com/*
// @license      MPL-2.0
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    /******************************************************************
     * 功能开关
     ******************************************************************/
    const ENABLE_AUTO_LOAD_MORE = true;          // 只在 /games/* 列表页生效
    const ENABLE_CLEAR_FILTERS_BUTTON = true;    // 只在 /games/* 列表页生效
    const ENABLE_CSS_UNLOCK_AND_HIDE_LOADER = true; // 所有页面都生效（含 mini spinner）

    /******************************************************************
     * 工具函数：当前是否在 mods.paradoxplaza.com 的 /games/* 列表页
     ******************************************************************/
    function isGamesModsListPage() {
        return (
            location.host === 'mods.paradoxplaza.com' &&
            location.pathname.startsWith('/games/')
        );
    }

    /******************************************************************
     * 通用：检测全局 Loader 是否处于 active 状态
     ******************************************************************/
    function isGlobalLoaderActive() {
        const el = document.querySelector(
            '[class*="Loader-styles__loader"][class*="Loader-styles__global"]'
        );
        if (!el) return false;
        return String(el.className).includes('Loader-styles__active');
    }

    /******************************************************************
     * 功能一：LOAD MORE 自动点击（仅 /games/*）
     ******************************************************************/
    let autoLoadTimerId = null;
    let autoLoadScrollBound = false;

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

        const offsetBottom = 600; // 视口下方阈值

        return rect.top <= vh + offsetBottom;
    }

    function clickLoadMore(btn) {
        if (!btn) return;
        if (btn.disabled || btn.getAttribute('aria-busy') === 'true') {
            return;
        }
        console.log('PMH: Auto clicking Load More...');
        btn.click();
    }

    function checkAndAutoLoad() {
        if (!ENABLE_AUTO_LOAD_MORE) return;
        if (!isGamesModsListPage()) return;

        if (isGlobalLoaderActive()) {
            return;
        }

        const btn = getLoadMoreButton();
        if (!btn) return;

        if (isButtonInTriggerZone(btn)) {
            clickLoadMore(btn);
        }
    }

    function ensureAutoLoadSetup() {
        if (!ENABLE_AUTO_LOAD_MORE) return;
        if (!isGamesModsListPage()) return;

        if (!autoLoadScrollBound) {
            window.addEventListener('scroll', checkAndAutoLoad);
            autoLoadScrollBound = true;
        }

        if (autoLoadTimerId == null) {
            autoLoadTimerId = setInterval(checkAndAutoLoad, 500);
        }

        checkAndAutoLoad();
    }

    /******************************************************************
     * 功能二：清除过滤器按钮（仅 /games/*）
     ******************************************************************/
    let clearBtnStyleInjected = false;

    function injectClearFiltersButtonStyle() {
        if (clearBtnStyleInjected || !ENABLE_CLEAR_FILTERS_BUTTON) return;

        const style = document.createElement('style');
        style.textContent = `
      #pmh-clear-filters-btn {
        position: fixed;
        left: 16px;
        bottom: 16px;
        z-index: 99998;
        padding: 10px 16px;
        border-radius: 8px;
        background: rgba(100, 150, 255, 0.85);
        color: #fff;
        border: none;
        font-size: 14px;
        font-weight: 500;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        cursor: grab;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: background 0.2s ease;
        user-select: none;
      }

      #pmh-clear-filters-btn:hover {
        background: rgba(80, 130, 255, 0.95);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
      }

      #pmh-clear-filters-btn:active {
        cursor: grabbing;
      }

      #pmh-clear-filters-btn.dragging {
        opacity: 0.9;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
      }
    `;
        document.documentElement.appendChild(style);
        clearBtnStyleInjected = true;
    }

    function ensureClearFiltersButton() {
        if (!ENABLE_CLEAR_FILTERS_BUTTON) return;
        if (!isGamesModsListPage()) return;

        injectClearFiltersButtonStyle();

        if (document.getElementById('pmh-clear-filters-btn')) return;

        const btn = document.createElement('button');
        btn.id = 'pmh-clear-filters-btn';
        btn.textContent = 'Clear Filters';

        const savedPos = localStorage.getItem('pmh-button-pos');
        if (savedPos) {
            try {
                const pos = JSON.parse(savedPos);
                if (typeof pos.left === 'number') {
                    btn.style.left = pos.left + 'px';
                }
                if (typeof pos.bottom === 'number') {
                    btn.style.bottom = pos.bottom + 'px';
                }
            } catch (e) {
                console.warn('PMH: failed to parse saved button position', e);
            }
        }

        let isDragging = false;
        let startX, startY, startLeft, startBottom;

        btn.addEventListener('mousedown', (e) => {
            e.preventDefault();
            isDragging = true;
            btn.classList.add('dragging');

            startX = e.clientX;
            startY = e.clientY;
            startLeft = btn.offsetLeft;
            startBottom = window.innerHeight - btn.offsetTop - btn.offsetHeight;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });

        function onMouseMove(e) {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const newLeft = Math.max(0, Math.min(startLeft + deltaX, window.innerWidth - btn.offsetWidth));
            const newBottom = Math.max(0, Math.min(startBottom - deltaY, window.innerHeight - btn.offsetHeight));

            btn.style.left = newLeft + 'px';
            btn.style.bottom = newBottom + 'px';
        }

        function onMouseUp() {
            if (!isDragging) return;
            isDragging = false;
            btn.classList.remove('dragging');

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);

            const pos = {
                left: btn.offsetLeft,
                bottom: window.innerHeight - btn.offsetTop - btn.offsetHeight
            };
            localStorage.setItem('pmh-button-pos', JSON.stringify(pos));
            console.log('PMH: Button position saved:', pos);
        }

        btn.addEventListener('click', () => {
            if (isDragging) return;

            const inputs = document.querySelectorAll(
                '.src-components-SearchPage-styles__filters--\\[fullhash\\] input'
            );
            let clickedCount = 0;
            inputs.forEach(input => {
                if ((input.type === 'checkbox' || input.type === 'radio') && input.checked === true) {
                    input.click();
                    clickedCount++;
                }
            });
            console.log(`PMH: Clicked ${clickedCount} checked filter inputs.`);
        });

        (document.body || document.documentElement).appendChild(btn);
        console.log('PMH: Clear Filters button added.');
    }

    /******************************************************************
     * 功能三：CSS 解锁 + 隐藏全局 Loader + mini spinner（所有页面）
     ******************************************************************/
    let unlockStyleInjected = false;
    let miniSpinnerTimerId = null;
    let lastActive = null;

    function injectUnlockAndSpinnerCSS() {
        if (unlockStyleInjected || !ENABLE_CSS_UNLOCK_AND_HIDE_LOADER) return;

        const style = document.createElement('style');
        style.textContent = `
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

      [class*="Loader-styles__loader"][class*="Loader-styles__global"],
      [class*="Loader-styles__loader--"][class*="Loader-styles__global--"] {
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }

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
        width: 100px;
      }

      #pmh-loading-indicator-spinner {
        flex: 0 0 auto;
        width: 12px;
        height: 12px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 2px solid #fff;
        border-top-color: transparent;
      }

      #pmh-loading-text {
        flex: 0 0 auto;
        white-space: nowrap;
        transition: opacity 0.2s ease;
      }

      #pmh-loading-indicator.pmh-active #pmh-loading-indicator-spinner {
        animation: pmh-spin 0.8s linear infinite;
      }

      #pmh-loading-indicator.pmh-idle #pmh-loading-indicator-spinner {
        animation: none;
      }

      @keyframes pmh-spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
      }
    `;
        document.documentElement.appendChild(style);
        unlockStyleInjected = true;
    }

    function ensureMiniSpinner() {
        if (!ENABLE_CSS_UNLOCK_AND_HIDE_LOADER) return;

        injectUnlockAndSpinnerCSS();

        if (document.getElementById('pmh-loading-indicator')) return;

        const box = document.createElement('div');
        box.id = 'pmh-loading-indicator';
        box.classList.add('pmh-idle');

        const spinner = document.createElement('div');
        spinner.id = 'pmh-loading-indicator-spinner';

        const text = document.createElement('span');
        text.id = 'pmh-loading-text';
        text.textContent = 'Idle';

        box.appendChild(spinner);
        box.appendChild(text);

        (document.body || document.documentElement).appendChild(box);
    }

    function updateMiniSpinner() {
        if (!ENABLE_CSS_UNLOCK_AND_HIDE_LOADER) return;

        const box = document.getElementById('pmh-loading-indicator');
        const text = document.getElementById('pmh-loading-text');
        if (!box || !text) return;

        const active = isGlobalLoaderActive();
        if (active === lastActive) return;

        lastActive = active;

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
        if (!ENABLE_CSS_UNLOCK_AND_HIDE_LOADER) return;

        ensureMiniSpinner();
        updateMiniSpinner();

        if (miniSpinnerTimerId == null) {
            miniSpinnerTimerId = setInterval(updateMiniSpinner, 300);
        }
    }

    /******************************************************************
     * URL 变化监听：SPA + 前进后退 + bfcache
     ******************************************************************/
    function handleLocationChange() {
        if (isGamesModsListPage()) {
            ensureAutoLoadSetup();
            ensureClearFiltersButton();
        }

        initMiniSpinner();
    }

    function setupLocationWatcher() {
        const origPushState = history.pushState;
        history.pushState = function (...args) {
            const ret = origPushState.apply(this, args);
            window.dispatchEvent(new Event('pmh-locationchange'));
            return ret;
        };

        const origReplaceState = history.replaceState;
        history.replaceState = function (...args) {
            const ret = origReplaceState.apply(this, args);
            window.dispatchEvent(new Event('pmh-locationchange'));
            return ret;
        };

        window.addEventListener('popstate', () => {
            window.dispatchEvent(new Event('pmh-locationchange'));
        });

        window.addEventListener('hashchange', () => {
            window.dispatchEvent(new Event('pmh-locationchange'));
        });

        window.addEventListener('pageshow', (event) => {
            if (event.persisted) {
                window.dispatchEvent(new Event('pmh-locationchange'));
            }
        });

        window.addEventListener('pmh-locationchange', handleLocationChange);
    }

    /******************************************************************
     * 初始挂载
     ******************************************************************/
    setupLocationWatcher();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            handleLocationChange();
        });
    } else {
        handleLocationChange();
    }

    console.log('Paradox Mods Helper v1.8 (SPA-aware, global mini spinner) loaded.');
})();
