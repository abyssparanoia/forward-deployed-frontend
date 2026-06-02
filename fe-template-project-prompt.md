# FE Template Project 作成プロンプト

## 0. 目的

このプロンプトは、Claude Code に新規 FE template repository を作らせるための指示です。

この template は、以下のような体制で複数プロジェクトを高速に立ち上げるためのものです。

- BE / Infra はリードエンジニアが担当する
- FE 実装は、Cursor GUI 操作や AI プロンプトベースでしか開発できないデザイナーが担当する
- BE は必ず `abyssparanoia/rapid-go` ベースで構築される
- FE repository には、対象プロジェクトの rapid-go BE repository を git submodule として追加する
- rapid-go 側には API document / Claude rules / development docs が存在するため、FE 側 AI はそれを参照して実装する
- Claude Code を前提に、AI が勝手に安全に開発できる構造・ルール・CI・ドキュメントを最初から整備する

---

## 1. 最重要方針

この template は「人間の FE エンジニア向け」ではなく、**AI と非エンジニア寄りのデザイナーが安全に FE 開発するための template** として設計してください。

そのため、単に React/TypeScript / Vite / Tailwind / shadcn/ui を入れるだけでは不十分です。

以下を重視してください。

1. AI が迷わない directory structure
2. AI が勝手に破壊的変更をしない rules
3. デザイナーが画面単位で依頼しやすい feature structure
4. BE API document から型・API client・mock を生成/同期しやすい仕組み
5. Firebase Auth / Cognito Auth の両方に対応できる signin flow
6. CI で AI の雑な変更を止める
7. 新規 project 開始時の初期設定を Claude Code skill として実行できる
8. 複数アプリケーションを monorepo で管理できる
9. template 自体を別 project に流用しやすい
10. UI 実装と business logic を分離し、AI が UI 変更で domain logic を壊しにくい

---

## 2. 採用技術

必須で採用してください。

- TypeScript
- React
- Vite
- pnpm
- monorepo
- Tailwind CSS
- shadcn/ui
- Firebase Auth
- Amazon Cognito Auth
- Zod
- React Hook Form
- TanStack Query
- React Router
- Storybook
- MSW
- Vitest
- Testing Library
- Playwright
- ESLint
- Prettier
- GitHub Actions
- Claude Code 用の `CLAUDE.md`
- Claude Code rules
- Claude Code skills

補足:

- ユーザー入力フォームは `react-hook-form + zod` を標準にする
- API 通信は `TanStack Query` を標準にする
- API mock は MSW を標準にする
- UI catalog / visual check 用に Storybook を用意する
- E2E は Playwright を用意する
- `any` の利用は原則禁止
- Auth provider は `firebase` / `cognito` を env で切り替え可能にする
- shadcn/ui の component は template 側で最低限 install 済みにする

---

## 3. monorepo 構成

以下のような構成にしてください。

```txt
.
├── apps/
│   ├── admin/
│   └── web/
├── packages/
│   ├── api-client/
│   ├── auth/
│   ├── config/
│   ├── design-system/
│   ├── eslint-config/
│   ├── mock/
│   ├── tsconfig/
│   └── utils/
├── backend/
│   └── rapid-go/              # git submodule
├── docs/
│   ├── ai/
│   ├── architecture/
│   ├── development/
│   ├── project-init/
│   └── ui/
├── .claude/
│   ├── CLAUDE.md
│   ├── rules/
│   └── skills/
├── .github/
│   ├── workflows/
│   └── pull_request_template.md
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

### apps/admin

管理画面用アプリケーション。

最低限、以下を入れてください。

- signin page
- dashboard page
- protected route
- auth callback/error page
- sample list page
- sample detail page
- sample form page

### apps/web

一般ユーザー向けアプリケーション。

最低限、以下を入れてください。

- signin page
- top page
- my page
- protected route
- auth callback/error page

### packages/design-system

AI が画面を作るときに最初に参照する UI package にしてください。

含めるもの:

- shadcn/ui components
- shared layout
- page shell
- form components
- loading state
- error state
- empty state
- confirm dialog
- toast
- table
- pagination
- breadcrumb
- side navigation
- top navigation

### packages/auth

Firebase Auth / Cognito Auth を provider adapter として分離してください。

```ts
export type AuthProvider = 'firebase' | 'cognito'

export interface AuthAdapter {
  signIn(input: SignInInput): Promise<AuthSession>
  signOut(): Promise<void>
  getCurrentSession(): Promise<AuthSession | null>
  onAuthStateChanged(callback: (session: AuthSession | null) => void): () => void
}
```

実装方針:

- `firebaseAuthAdapter`
- `cognitoAuthAdapter`
- `createAuthAdapter`
- `AuthProvider`
- `AuthProviderContext`
- `useAuth`
- `RequireAuth`

を用意してください。

### packages/api-client

rapid-go の API document を参照して API client を生成/管理する package にしてください。

最低限、以下を用意してください。

- generated client の置き場
- handwritten client wrapper の置き場
- TanStack Query hooks の置き場
- API error normalizer
- API response schema validator
- mock handler との接続口

例:

```txt
packages/api-client/src/
├── generated/
├── http/
├── hooks/
├── schemas/
├── errors/
└── index.ts
```

### packages/mock

MSW handler を管理してください。

- local dev で API mock を起動できる
- Storybook で mock を使える
- Playwright で mock を使える
- API document から handler skeleton を作れる前提にする

---

## 4. rapid-go submodule 前提

この FE template は、project 開始時点で対象の BE repository を submodule として追加します。

場所:

```txt
backend/rapid-go
```

template 側に以下の script を用意してください。

```bash
pnpm project:init
```

この script は対話形式または env 指定で以下を実行できるようにしてください。

- project name の設定
- app name の設定
- backend repository URL の指定
- backend repository を `backend/rapid-go` に submodule 追加
- `.env.example` から `.env.local` を作成
- auth provider の選択
- Firebase / Cognito の env placeholder 設定
- API base URL の設定
- README の project 名差し替え
- package name の差し替え
- GitHub Actions badge などの placeholder 差し替え
- `pnpm install`
- `pnpm check`
- 初期 commit 用の checklist 出力

submodule 関連コマンドも README に記載してください。

```bash
git submodule add <backend_repo_url> backend/rapid-go
git submodule update --init --recursive
git submodule update --remote backend/rapid-go
```

---

## 5. Claude Code 用 rules

`.claude/CLAUDE.md` と `.claude/rules/*.md` を整備してください。

rules は「何をするべきか」よりも「何をしてはいけないか」を明確にしてください。

最低限、以下の rule files を作ってください。

```txt
.claude/
├── CLAUDE.md
├── rules/
│   ├── 00-project-overview.md
│   ├── 01-ai-safety.md
│   ├── 02-directory-boundary.md
│   ├── 03-ui-implementation.md
│   ├── 04-api-client.md
│   ├── 05-auth.md
│   ├── 06-form.md
│   ├── 07-testing.md
│   ├── 08-ci.md
│   ├── 09-designer-workflow.md
│   └── 10-forbidden-changes.md
└── skills/
    ├── project-init/
    ├── screen-create/
    ├── api-sync/
    ├── form-create/
    ├── story-create/
    └── pr-review/
```

### 5.1 AI Safety rule

以下を必ず含めてください。

- 関係ない file を変更しない
- 依頼されていない refactor をしない
- 既存 API 型を勝手に変更しない
- auth 処理を画面 component に直書きしない
- API request を page component に直書きしない
- env 名を勝手に変更しない
- design-system を bypass しない
- `any` を使わない
- disabled lint を勝手に追加しない
- test を削除して通すのは禁止
- snapshot を安易に更新しない
- backend submodule 内を勝手に編集しない
- generated code を手書きで編集しない
- package manager を pnpm 以外に変更しない
- 認証・課金・権限・個人情報まわりは必ず既存 pattern を踏襲する
- 大きな変更では、最初に plan を作ってから実装する

### 5.2 Directory boundary rule

AI が守るべき責務分離を明確化してください。

例:

- page component は composition のみ
- business logic は hooks / services
- API 型は `packages/api-client`
- auth は `packages/auth`
- UI primitive は `packages/design-system`
- mock は `packages/mock`
- app 固有 UI は `apps/*/src/features`
- 共通化は 3 回以上重複してから検討
- backend submodule は read-only

### 5.3 Designer workflow rule

デザイナーが AI に依頼するときの単位を決めてください。

例:

- 1 request = 1 screen or 1 component
- 依頼には必ず以下を含める
  - 対象 app
  - 対象 route
  - 参考画面
  - 使用する component
  - API の有無
  - loading / error / empty state
  - responsive 条件
  - 完了条件
- AI は実装後に Storybook と test を追加する
- AI は実装後に `pnpm check` を実行する

---

## 6. Claude Code skills

Claude Code skill は、非エンジニア寄りのデザイナーがコマンド的に使えるようにしてください。

各 skill には以下を含めてください。

- 目的
- 入力項目
- 実行手順
- 変更してよい file
- 変更してはいけない file
- 完了条件
- 実行後の確認コマンド

### 6.1 project-init skill

目的:

新規 project 開始時に template を project 用に初期化する。

入力:

- project name
- app list
- backend repository URL
- auth provider
- API base URL
- Firebase config or Cognito config
- GitHub repository name

実行内容:

- backend repo を submodule として追加
- package name 変更
- README 更新
- env 作成
- auth provider 設定
- app 有効/無効設定
- `pnpm install`
- `pnpm check`

### 6.2 screen-create skill

目的:

新しい画面を安全に追加する。

入力:

- app name
- route
- screen name
- layout type
- API usage
- form usage
- required states
- reference design

実行内容:

- route 追加
- feature directory 作成
- page component 作成
- Storybook 作成
- test 作成
- mock 必要なら追加
- navigation 必要なら追加

### 6.3 api-sync skill

目的:

rapid-go の API document から FE 側 API client / mock / schema を同期する。

入力:

- backend document path
- target API group
- generation mode

実行内容:

- backend submodule の API document を読む
- API 型生成または更新
- API client wrapper 更新
- TanStack Query hook 更新
- MSW handler 更新
- API contract test 更新

### 6.4 form-create skill

目的:

フォーム画面を標準 pattern で作る。

含めるもの:

- zod schema
- react-hook-form
- field components
- validation message
- submit loading
- API error handling
- optimistic update 可否
- success toast
- cancel/back navigation
- Storybook
- test

### 6.5 story-create skill

目的:

既存 component / screen に Storybook story を追加する。

含める state:

- default
- loading
- error
- empty
- disabled
- mobile
- long text
- permission denied

### 6.6 pr-review skill

目的:

AI が作った PR を merge 前に自己レビューする。

確認項目:

- 関係ない file を変更していないか
- backend submodule を変更していないか
- generated code を手修正していないか
- env 名を変更していないか
- design-system を bypass していないか
- API 型を勝手に変更していないか
- test を削除していないか
- lint disable を追加していないか
- Storybook があるか
- loading/error/empty state があるか
- mobile 表示を考慮しているか
- `pnpm check` が通るか

---

## 7. CI 要件

GitHub Actions を堅牢にしてください。

最低限、以下の workflow を用意してください。

```txt
.github/workflows/
├── ci.yml
├── e2e.yml
├── storybook.yml
├── dependency-review.yml
└── codeql.yml
```

### ci.yml

実行内容:

- pnpm install
- format check
- lint
- typecheck
- unit test
- build
- dependency dedupe check
- forbidden changes check

### e2e.yml

実行内容:

- Playwright install
- app 起動
- mock mode で E2E
- signin flow
- protected route
- sample CRUD flow

### storybook.yml

実行内容:

- Storybook build
- Storybook test
- visual regression の placeholder

### forbidden changes check

script として以下を用意してください。

```bash
pnpm guard:forbidden-changes
```

検出対象:

- `backend/rapid-go` 配下の変更
- generated code の手書き変更
- `.env.example` の key 削除
- package manager 変更
- lockfile 不整合
- eslint disable 増加
- `any` 増加
- test file 削除
- Storybook file 削除
- CI file 削除

---

## 8. package scripts

root `package.json` に最低限以下を用意してください。

```json
{
  "scripts": {
    "dev": "turbo dev",
    "dev:admin": "pnpm --filter @template/admin dev",
    "dev:web": "pnpm --filter @template/web dev",
    "build": "turbo build",
    "lint": "turbo lint",
    "typecheck": "turbo typecheck",
    "test": "turbo test",
    "test:e2e": "turbo test:e2e",
    "storybook": "turbo storybook",
    "storybook:build": "turbo storybook:build",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "check": "pnpm format:check && pnpm lint && pnpm typecheck && pnpm test && pnpm build && pnpm guard:forbidden-changes",
    "project:init": "tsx scripts/project-init.ts",
    "api:sync": "tsx scripts/api-sync.ts",
    "guard:forbidden-changes": "tsx scripts/guard-forbidden-changes.ts"
  }
}
```

---

## 9. env 設計

`.env.example` を用意してください。

最低限:

```env
VITE_APP_NAME=
VITE_APP_ENV=local
VITE_API_BASE_URL=http://localhost:8080
VITE_AUTH_PROVIDER=firebase

# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=

# Cognito
VITE_COGNITO_REGION=
VITE_COGNITO_USER_POOL_ID=
VITE_COGNITO_CLIENT_ID=
VITE_COGNITO_DOMAIN=
VITE_COGNITO_REDIRECT_SIGN_IN=
VITE_COGNITO_REDIRECT_SIGN_OUT=

# Mock
VITE_MOCK_API=false
```

`packages/config` で zod による env validation を行ってください。

---

## 10. UI / screen template

AI が画面を作るときに迷わないよう、feature template を用意してください。

```txt
apps/admin/src/features/sample/
├── components/
├── hooks/
├── pages/
├── schemas/
├── stories/
├── tests/
└── index.ts
```

画面 component は以下の state を標準実装してください。

- loading
- error
- empty
- permission denied
- success
- validation error
- mobile layout

---

## 11. 認証設計

Signin flow は Firebase / Cognito の両方で切り替え可能にしてください。

必要な画面:

- `/signin`
- `/auth/callback`
- `/auth/error`
- `/signout`
- protected dashboard

必要な機能:

- email/password signin
- signout
- session restore
- protected route
- auth loading
- auth error
- unauthorized display
- token 取得
- API request header への token injection

注意:

- auth 実装を app の page component に直書きしない
- provider 差し替えは `packages/auth` 内で完結させる
- app 側は `useAuth()` と `RequireAuth` のみ利用する

---

## 12. API client 設計

rapid-go の API document を読む前提で、以下の構造を作ってください。

- API document path は project ごとに設定可能
- OpenAPI がある場合は OpenAPI から生成
- OpenAPI がない場合でも handwritten client wrapper を置ける
- API response は zod schema で validation 可能
- API error は UI に直接出さず normalizer を通す
- TanStack Query hooks を標準化
- MSW handler と API client の型を揃える

---

## 13. README に入れる内容

README は、非エンジニア寄りのデザイナーでも読めるようにしてください。

最低限:

- この template の目的
- project 初期化方法
- backend submodule の扱い
- local development
- env 設定
- auth provider 切り替え
- screen 作成方法
- API sync 方法
- Storybook の見方
- PR 作成前 checklist
- AI への依頼テンプレート
- よくある失敗
- やってはいけないこと

---

## 14. AI への依頼テンプレート

docs/ai に以下を作ってください。

### docs/ai/screen-request-template.md

```md
# Screen Request Template

## Target

- App:
- Route:
- Screen name:

## Design

- Reference:
- Layout:
- Responsive:

## Data/API

- API required: yes/no
- API document:
- Mock data:

## States

- Loading:
- Error:
- Empty:
- Permission denied:
- Success:

## Form

- Form required: yes/no
- Fields:
- Validation:
- Submit behavior:

## Done Criteria

- Storybook added
- Unit test added
- E2E updated if needed
- Mobile checked
- `pnpm check` passed
```

### docs/ai/component-request-template.md

```md
# Component Request Template

## Target

- Package/App:
- Component name:
- Usage location:

## Props

-

## States

-

## Design Notes

-

## Done Criteria

- Story added
- Test added
- No app-specific logic inside shared component
```

### docs/ai/api-sync-request-template.md

```md
# API Sync Request Template

## Target

- Backend document path:
- API group:
- Target app:

## Required output

- Type
- API client
- Query hooks
- MSW handler
- Contract test

## Done Criteria

- Mock works
- Typecheck passes
- API errors normalized
```

---

## 15. 実装順序

Claude Code は以下の順で実装してください。

1. root workspace / pnpm / turbo / tsconfig
2. apps/admin と apps/web の Vite setup
3. Tailwind CSS / shadcn/ui setup
4. packages/design-system
5. packages/config
6. packages/auth
7. packages/api-client
8. packages/mock
9. sample screens
10. Storybook
11. Vitest / Testing Library
12. Playwright
13. CI
14. guard scripts
15. `.claude/CLAUDE.md`
16. `.claude/rules`
17. `.claude/skills`
18. docs
19. README
20. final `pnpm check`

---

## 16. 完了条件

以下を満たしたら完了です。

- `pnpm install` が通る
- `pnpm check` が通る
- `pnpm dev:admin` が起動する
- `pnpm dev:web` が起動する
- `pnpm storybook` が起動する
- Firebase Auth mock / real config の切り替えができる
- Cognito Auth mock / real config の切り替えができる
- protected route が動く
- signin / signout が動く
- MSW mock が local / Storybook / Playwright で使える
- GitHub Actions workflow が存在する
- AI rules が存在する
- skills が存在する
- backend submodule は read-only として扱われる
- README にデザイナー向け workflow が書かれている

---

## 17. 追加で実装してよいもの

余力があれば以下も追加してください。

- Changesets
- commitlint
- lint-staged
- Husky
- Chromatic placeholder
- bundle size check
- accessibility test
- `pnpm ui:add` wrapper
- `pnpm feature:create` generator
- `pnpm app:create` generator
- `docs/architecture/decision-records`
- ADR template
- PR risk checklist

---

## 18. 作業時の注意

以下は絶対に守ってください。

- 最初に実装 plan を出す
- 大きな変更は小さな step に分ける
- 途中で `pnpm check` を何度も実行する
- error が出たら原因を説明してから修正する
- template として不要な business domain を作らない
- sample は sample と分かる名前にする
- backend submodule 内を編集しない
- rapid-go の API document を勝手に作り替えない
- Firebase / Cognito の secret を repository に含めない
- `.env.local` を commit しない
- generated code は generated と明示する
- AI が理解しやすいコメントは歓迎するが、冗長なコメントは避ける
- README と rules を実装内容に合わせて更新する

---

## 19. 最初に Claude Code に渡す実行文

以下を Claude Code にそのまま渡してください。

```md
あなたは、AI と非エンジニア寄りのデザイナーが安全に FE 開発するための React / TypeScript / Vite monorepo template を作る senior frontend architect です。

この repository を新規 FE template として構築してください。

前提:

- BE は必ず rapid-go ベースです
- project 開始時には対象 BE repository を `backend/rapid-go` に git submodule として追加します
- rapid-go 側には API document / development docs / Claude rules があります
- FE は Claude Code / Cursor 等の AI coding assistant による開発が多くなります
- FE を触る主担当は Cursor GUI 操作やプロンプトベース開発が中心のデザイナーです

目的:

- AI が安全に画面追加・フォーム追加・API client 更新・Storybook 追加・test 追加を行える template を作る
- デザイナーが画面単位で AI に依頼しやすい workflow を作る
- CI と rules で破壊的変更を止める
- Firebase Auth / Cognito Auth の signin flow を template に含める
- 複数アプリケーションを monorepo で管理できるようにする

必須技術:

- TypeScript
- React
- Vite
- pnpm
- monorepo
- Tailwind CSS
- shadcn/ui
- Firebase Auth
- Amazon Cognito Auth
- Zod
- React Hook Form
- TanStack Query
- React Router
- Storybook
- MSW
- Vitest
- Testing Library
- Playwright
- ESLint
- Prettier
- GitHub Actions
- Claude Code 用 CLAUDE.md / rules / skills

まず実装計画を出し、その後に実装してください。
作業完了時には `pnpm check` が通る状態にしてください。
```
