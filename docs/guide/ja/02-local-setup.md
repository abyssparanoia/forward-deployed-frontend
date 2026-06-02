# 2. ローカルで動かす

## 必要なもの

- Node.js 20 以上
- pnpm 9 以上

インストール済みかどうか確認するには:

```bash
node -v   # v20.x.x 以上
pnpm -v   # 9.x.x 以上
```

## 初回セットアップ

```bash
# リポジトリのクローン
git clone <リポジトリURL>
cd <リポジトリ名>

# 依存関係のインストール
pnpm install

# 環境変数ファイルを作成
cp .env.example .env.local
```

`.env.local` はバックエンドの設定などを入れるファイルです。最初はそのままでも mock モードで動きます。

## アプリを起動する（mock モード）

バックエンドがなくても画面を確認できる **mock モード** で起動できます。

```bash
# 管理画面
VITE_MOCK_API=true pnpm dev:admin

# 一般ユーザー向け画面
VITE_MOCK_API=true pnpm dev:web
```

起動後、ブラウザで以下を開きます:

- 管理画面: http://localhost:3001
- Web 画面: http://localhost:3000

mock モードではどんなメールアドレス・パスワードでもサインインできます。

## Storybook を起動する

Storybook は、画面の各状態（読み込み中・エラー・空など）をブラウザで確認できるツールです。

```bash
pnpm storybook
```

起動後 http://localhost:6007 を開きます。

## よく使うコマンド

| コマンド         | 内容                                                       |
| ---------------- | ---------------------------------------------------------- |
| `pnpm dev:admin` | 管理画面を起動                                             |
| `pnpm dev:web`   | Web 画面を起動                                             |
| `pnpm storybook` | Storybook を起動                                           |
| `pnpm check`     | フォーマット・型チェック・テスト・ビルドを全部まとめて実行 |

詳細は [docs/development/local-setup.md](../../development/local-setup.md) を参照してください。
