# hiraku StackBlitz Examples PRD（簡易版）

ライブラリの GitHub リポジトリ：
https://github.com/HirotoShioi/hiraku

## 1. 目的

* React/TypeScript エンジニアが StackBlitz 例を 1〜2 分眺めるだけで、

  * hiraku の使い方が直感的に分かる
  * 自分のプロジェクトで使いたいユースケースをイメージできる
* hiraku のコア価値を 4 つの現実的なユースケースで示す：

  * 1つの async 関数の中でモーダルフローを完結できる
  * 型安全な戻り値
  * アプリのどこからでもモーダルを開ける

## 2. 対象ユーザー

* React + TypeScript を日常的に書いているフロントエンドエンジニア
* 確認ダイアログ・編集モーダル・フィルターシート・エラーダイアログをよく実装する人
* prop drilling や open/onConfirm 分裂、any な戻り値にストレスを感じている人

## 3. 提供する 4 つの Example

### Example 1: ベーシック情報モーダル（返り値なし）

**目的**

* hiraku 初見ユーザーが 10 秒で "こう使うのね" と理解できるベース。

**要件**

* 単一ボタンから情報モーダルを開き、OK で閉じるだけ。
* `createDialog` / `open` / `close` の最小パターンだけを使用。
* 1 画面・1ファイル内に収まるシンプルな構成。

---

### Example 2: Single-flow Confirm（1 関数に完結する削除フロー）

**目的**

* 従来の `open` + `onConfirm` で分裂していた削除フローが、
  1つの async 関数にまとまる気持ちよさを示す。

**要件**

* 「Delete user」ボタン → 確認モーダル → OK で削除処理・キャンセルで何もしない。
* 削除処理・リロード・通知までを 1 つの関数内で完結させる。
* ログ表示エリアで、操作結果（削除された/キャンセル）が確認できる。
* 冒頭コメントで Before（isOpen + onConfirm 分裂）と After（1 関数）の対比を簡潔に記述。

---

### Example 3: 型付き戻り値付き 編集モーダル（User を返す）

**目的**

* `.returns<User>()` による型安全な戻り値と、その後の処理の書きやすさを示す。

**要件**

* 表示中のユーザー情報と「Edit user」ボタン。
* 編集モーダルでユーザー情報を変更し、保存で画面表示が更新される。
* モーダル定義で `.returns<User>()` を利用し、呼び出し側で `data` が User 型で扱えることを明示。
* ログエリアで role（success/cancel）と戻り値の User を確認できる。

---

### Example 4: API エラーダイアログ（React の外からモーダル）

**目的**

* React コンポーネント外の層（API クライアントなど）からモーダルを開けるユニークさを示す。

**要件**

* 「Load user」ボタン → ダミー API 呼び出し → 意図的にエラー → エラーダイアログ表示。
* API クライアント層のファイルから `errorDialog` を呼び出していることが明確に分かる構成。
* OK でダイアログを閉じ、UI 側ではエラーが処理されたことをログで確認できる。

## 4. 技術・構成方針

* Vite + React + TypeScript。
* hiraku（`@hirotoshioi/hiraku`）。
* UI は Radix UI + shadcn/ui を使用（Dialog/Button など）。
* React Router は使わず、`App` コンポーネント内でローカル state により Example を切り替える。
* ディレクトリ構成（例）：

  * `src/main.tsx`: `App` + `ModalProvider` をレンダリング。
  * `src/App.tsx`: 左サイドメニュー＋右側 Example 表示。
  * `src/examples/01-basic-no-return/…` 〜 `04-api-error-dialog/…`
  * `src/modals/…`: 各 Example 用モーダル定義。
* 各 Example のメインファイルは 1 画面（概ね 40〜60 行）に収まるよう調整。

## 5. 成功条件（簡易）

* 初見のエンジニアが StackBlitz を開いて、

  * 4つの Example のうち 1〜2個を眺めるだけで hiraku の価値を理解できる。
  * 「自分のプロジェクトのこのモーダルも hiraku に置き換えられそう」と具体的なイメージを持てる。
* README からの導線として、"Try on StackBlitz" リンクを貼れる品質になっている。
