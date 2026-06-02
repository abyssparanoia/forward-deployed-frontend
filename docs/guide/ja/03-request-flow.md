# 3. 開発の流れ

## 全体のステップ

```
1. 依頼書を書く
2. AI に渡す
3. AI が実装する
4. pnpm check を実行する
5. 画面・Storybook を目視で確認する
6. PR を作成してマージする
```

## 1. 依頼書を書く

`docs/ai/` にある依頼書テンプレートを使います。

| テンプレート                                                            | 用途                           |
| ----------------------------------------------------------------------- | ------------------------------ |
| [screen-request-template.md](../../ai/screen-request-template.md)       | 新しい画面を作る               |
| [component-request-template.md](../../ai/component-request-template.md) | 新しい共通コンポーネントを作る |
| [api-sync-request-template.md](../../ai/api-sync-request-template.md)   | バックエンド API を FE に同期  |

依頼書の書き方は [04-screen-request.md](04-screen-request.md) を参照してください。

## 2. AI に渡す

Claude Code または Cursor に依頼書の内容をそのまま貼り付けます。

- **Claude Code** なら `claude` コマンドを起動してチャットに貼り付けます。
- **Cursor** なら Composer に貼り付けます。

## 3. AI が実装する

AI は自動的に以下を行います:

- 画面コンポーネントの作成
- ルーティングの追加
- Storybook の追加
- ユニットテストの追加
- MSW モックハンドラーの追加（API がある場合）

実装中にエラーが出た場合は、AI が自動的に原因を調べて修正します。

## 4. `pnpm check` を実行する

実装が終わったら、以下を実行して問題がないか確認します:

```bash
pnpm check
```

これは次の6つをまとめて実行します:

1. コードの書式確認（Prettier）
2. コード品質確認（ESLint）
3. 型チェック（TypeScript）
4. ユニットテスト（Vitest）
5. ビルド（Vite）
6. 禁止変更チェック

エラーが出た場合は、AI に「pnpm check でこのエラーが出た」と伝えて修正を依頼します。

## 5. 画面・Storybook を目視で確認する

`pnpm check` が通ったら、実際に画面を開いて確認します:

- mock モードで正常に表示されるか
- 読み込み中・エラー・空の状態が表示されるか
- スマートフォンサイズで見たときのレイアウトが問題ないか
- Storybook の各 story が正しく表示されるか

Storybook の確認方法は [05-storybook.md](05-storybook.md) を参照してください。

## 6. PR を作成してマージする

確認が終わったら PR を作成します。マージ前に [06-pr-checklist.md](06-pr-checklist.md) を確認してください。

AI に「PR を作成して」と伝えると自動でドラフトを作成します。
