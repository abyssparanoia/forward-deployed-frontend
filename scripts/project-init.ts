#!/usr/bin/env tsx
/**
 * Interactive project initialization script.
 * Run via: pnpm project:init
 *
 * Sets up this template for a specific project:
 * - Sets project/app name
 * - Adds backend repository as git submodule
 * - Creates .env.local from .env.example
 * - Configures auth provider
 * - Updates README placeholder
 * - Runs pnpm install + check
 */
import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'fs'
import * as readline from 'readline'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(`${question} `, (answer) => resolve(answer.trim()))
  })
}

function run(cmd: string, opts?: { silent?: boolean }): void {
  try {
    execSync(cmd, { stdio: opts?.silent ? 'pipe' : 'inherit' })
  } catch (e) {
    console.error(`Command failed: ${cmd}`)
    throw e
  }
}

async function main(): Promise<void> {
  console.warn('\n🚀 FE Template Project Initialization\n')

  const projectName = await ask('Project name (e.g. my-project):')
  const appName = await ask('App display name (e.g. My App):')
  const backendRepoUrl = await ask('Backend repository URL (leave blank to skip submodule setup):')
  const authProvider =
    (await ask('Auth provider [firebase/cognito] (default: firebase):')) || 'firebase'
  const apiBaseUrl =
    (await ask('API base URL (default: http://localhost:8080):')) || 'http://localhost:8080'

  rl.close()

  console.warn('\n📦 Updating package names...')
  const files = [
    'package.json',
    'apps/admin/package.json',
    'apps/web/package.json',
    'packages/api-client/package.json',
    'packages/auth/package.json',
    'packages/config/package.json',
    'packages/design-system/package.json',
    'packages/eslint-config/package.json',
    'packages/mock/package.json',
    'packages/tsconfig/package.json',
    'packages/utils/package.json',
  ]
  files.forEach((file) => {
    if (!existsSync(file)) return
    const content = readFileSync(file, 'utf8').replace(/@template\//g, `@${projectName}/`)
    writeFileSync(file, content)
  })

  if (backendRepoUrl) {
    console.warn('\n🔗 Adding backend submodule...')
    if (!existsSync('backend/rapid-go')) {
      run(`git submodule add ${backendRepoUrl} backend/rapid-go`)
      run('git submodule update --init --recursive')
    } else {
      console.warn('  backend/rapid-go already exists, skipping.')
    }
  }

  console.warn('\n📝 Creating .env.local...')
  if (!existsSync('.env.local')) {
    copyFileSync('.env.example', '.env.local')
    let envContent = readFileSync('.env.local', 'utf8')
    envContent = envContent
      .replace(/VITE_APP_NAME=.*/, `VITE_APP_NAME=${appName}`)
      .replace(/VITE_AUTH_PROVIDER=.*/, `VITE_AUTH_PROVIDER=${authProvider}`)
      .replace(/VITE_API_BASE_URL=.*/, `VITE_API_BASE_URL=${apiBaseUrl}`)
    writeFileSync('.env.local', envContent)
    console.warn('  .env.local created. Fill in your Firebase/Cognito values.')
  } else {
    console.warn('  .env.local already exists, skipping.')
  }

  console.warn('\n📖 Updating README...')
  if (existsSync('README.md')) {
    let readme = readFileSync('README.md', 'utf8')
    readme = readme.replace(/forward-deployed-frontend/g, projectName)
    writeFileSync('README.md', readme)
  }

  console.warn('\n📦 Installing dependencies...')
  run('pnpm install')

  console.warn('\n✅ Project initialized!\n')
  console.warn('Next steps:')
  console.warn(
    `  1. Fill in .env.local with your ${authProvider === 'firebase' ? 'Firebase' : 'Cognito'} config`,
  )
  console.warn('  2. Run: pnpm dev:admin  or  pnpm dev:web')
  console.warn('  3. Run: pnpm check  (when ready to verify everything passes)')
  if (backendRepoUrl) {
    console.warn('  4. Update backend submodule: pnpm run git:submodule:update')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
