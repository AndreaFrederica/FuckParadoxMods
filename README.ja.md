<!-- Language Switcher -->
**言語:** [English](README.md) | [日本語](README.ja.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md)

---

# Paradox Mods Helper

Paradox ModsウェブサイトのUXを改善するブラウザユーザースクリプトです。

**現在のバージョン:** 1.2

## 📝 概要

これは、Paradox Mods公式ウェブサイトのユーザーエクスペリエンスを向上させ、より現代的なウェブアプリケーションのように動作させるためのTampermonkeyユーザースクリプトです。

Paradox Modsは、Paradox Interactiveのゲーム（Hearts of Iron IV、Europa Universalis IV、Stellarisなど）向けの公式Modプラットフォームです。機能は充実していますが、ウェブインターフェースには改善の余地があります。本スクリプトは、様々な最適化を通じてブラウジング体験を向上させます。

**スクリプト名:** Paradox Mods Helper (Auto Load + Search Fix + Hide Loader + Mini Spinner)

## ✨ 機能

- 🔄 **自動ロード**: "LOAD MORE"ボタンがビューポート近くに表示されると自動的にクリックし、手動クリックなしで連続的にModリストを閲覧できます
- 🔓 **検索結果のアンロック**: 検索中のオーバーレイを削除し、読み込み完了を待たずに検索結果をすぐに表示して操作可能にします
- 🎭 **ローディングオーバーレイを非表示**: グローバルローディングオーバーレイを非表示にし、頻繁な全画面ブロックを防ぎ、スムーズなブラウジング体験を提供します
- 🔄 **ミニローディングインジケーター**: 右下隅に小さなローディングインジケーターを表示し、ページの使用を妨げることなくローディング状態を把握できます
- ⚙️ **機能トグル**: スクリプトを変更することで、各機能を個別に有効化/無効化できます

## 📦 インストール

### 前提条件

まず、ブラウザにユーザースクリプトマネージャーをインストールしてください：

- **Chrome/Edge/Brave**: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Tampermonkey](https://addons.mozilla.org/firefox/addon/tampermonkey/) または [Greasemonkey](https://addons.mozilla.org/firefox/addon/greasemonkey/)
- **Safari**: [Tampermonkey](https://apps.apple.com/app/tampermonkey/id1482490089)
- **Opera**: [Tampermonkey](https://addons.opera.com/extensions/details/tampermonkey-beta/)

### スクリプトのインストール

#### 方法1: 直接インストール（推奨）

以下のリンクをクリックすると、Tampermonkeyが自動的に認識してインストールを促します：

**[スクリプトをインストール](https://raw.githubusercontent.com/AndreaFrederica/FuckParadoxMods/main/script.user.js)**

#### 方法2: 手動インストール

1. [script.user.js](https://github.com/AndreaFrederica/FuckParadoxMods/blob/main/script.user.js)の内容をダウンロードまたはコピー
2. Tampermonkey管理パネルで「新しいスクリプトを追加」を選択
3. スクリプトの内容を貼り付けて保存

インストール後、[Paradox Mods](https://mods.paradoxplaza.com/)にアクセスすると、スクリプトが自動的に有効になります。

> 💡 **自動アップデート**: 方法1でインストールした場合、Tampermonkeyが自動的にスクリプトを最新バージョンに更新します

## 🎮 対応ゲーム

このスクリプトは、Paradox Modsプラットフォームを使用するすべてのゲームに対応しています。以下を含みますが、これらに限定されません：

- Hearts of Iron IV（ハーツ オブ アイアン IV）
- Europa Universalis IV（ヨーロッパ・ユニバーサリス IV）
- Crusader Kings III（クルセイダーキングス III）
- Stellaris（ステラリス）
- Cities: Skylines（シティーズ：スカイライン）
- Victoria 3（ヴィクトリア3）

## 🔧 使用方法

インストール後、Paradox Modsウェブサイトにアクセスすると、スクリプトが自動的に実行されます。追加の設定は不要です。

### 機能設定

機能トグルをカスタマイズする必要がある場合は、スクリプトファイルを編集し、冒頭の次の設定オプションを見つけてください（コメントは分かりやすくするために翻訳されています）：

```javascript
const ENABLE_AUTO_LOAD_MORE = true;              // 自動ロード
const ENABLE_STRIP_IS_SEARCHING = true;          // 検索結果のアンロック
const ENABLE_CSS_UNLOCK_AND_HIDE_LOADER = true;  // オーバーレイを非表示 + ミニインジケーター
```

対応する `true` を `false` に変更すると、その機能を無効にできます。

### 適用ページ

- **自動ロード**: `https://mods.paradoxplaza.com/games/*`（ゲームModリストページ）
- **検索とローディング最適化**: すべてのParadox Modsドメイン
  - `mods.paradoxplaza.com`
  - `mods.paradoxinteractive.com`

## 🤝 コントリビューション

このプロジェクトの改善に役立つIssueやPull Requestを歓迎します！

## 📄 ライセンス

このプロジェクトは[Mozilla Public License 2.0](LICENSE)の下でライセンスされています。

## ⚠️ 免責事項

このスクリプトは、ユーザーエクスペリエンスの向上のみを目的としており、クラッキング、チート、その他の違反行為は含まれていません。このスクリプトを使用することにより、すべてのリスクを自己責任で負うことに同意したものとみなされます。

## 🔗 関連リンク

- [Paradox Mods公式サイト](https://mods.paradoxplaza.com/)
- [Paradox Interactive公式サイト](https://www.paradoxinteractive.com/)
- [Tampermonkey公式サイト](https://www.tampermonkey.net/)
