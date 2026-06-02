# 4. 画面・機能を依頼する

## 依頼の基本ルール

- **1回の依頼 = 1画面 または 1コンポーネント**
- 複数の画面をまとめて依頼しない（AI が混乱しやすい）

## 画面を依頼する

### テンプレートを記入する

`docs/ai/screen-request-template.md` をコピーして記入します。

記入が必要な主な項目:

| 項目          | 例                              | 説明                      |
| ------------- | ------------------------------- | ------------------------- |
| App           | `admin`                         | どのアプリに追加するか    |
| Route         | `/products/:id`                 | URL パス                  |
| Screen name   | `ProductDetailPage`             | 画面の名前（英語）        |
| Layout        | `full-page`                     | レイアウトの種類          |
| API required  | `yes`                           | バックエンド API が必要か |
| API document  | `backend/rapid-go/docs/api/...` | API ドキュメントの場所    |
| States        | `loading, error, empty`         | 表示すべき状態            |
| Responsive    | `stacked layout on mobile`      | スマートフォン表示の要件  |
| Done criteria | Storybook 追加・pnpm check 通過 | 完了の定義                |

### AI への渡し方

記入した依頼書をそのまま AI（Claude Code / Cursor）に貼り付けます。

参考デザイン（Figma のスクリーンショットや既存画面の URL）があれば一緒に添付すると AI がより精度高く実装できます。

## フォームを依頼する

フォームを含む画面の場合、以下を追加で記入します:

- フォームのフィールド一覧（フィールド名・型・必須か）
- バリデーションのルール
- 送信後の動作（例：成功したら一覧に戻る）

## コンポーネントを依頼する

`docs/ai/component-request-template.md` を使います。画面ではなく、ボタンや入力欄などの部品を追加するときに使います。

## API を追加・変更する

バックエンドの API が追加・変更されたら:

1. バックエンドのサブモジュールを更新する
2. `pnpm api:sync` を実行する

詳しくは `docs/ai/api-sync-request-template.md` を参照してください。

## 依頼後に AI が行うこと

AI は実装後に自動的に以下を行います:

- [x] 画面コンポーネントの作成
- [x] ルートの追加
- [x] Storybook の追加（default / loading / error / empty / mobile）
- [x] ユニットテストの追加
- [x] `pnpm check` の実行
- [x] 問題があれば自動修正

実装結果の報告を受けたら、[03-request-flow.md](03-request-flow.md) のステップ 5（目視確認）に進んでください。
