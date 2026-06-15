#!/usr/bin/env tsx
/**
 * Checks for forbidden changes that AI or contributors should not make.
 * Run via: pnpm guard:forbidden-changes
 *
 * In CI: compares against HEAD~1 (last commit).
 * Locally: compares against the merge-base with main/master (unstaged + staged diff).
 */
import { execSync } from 'child_process'

interface Violation {
  rule: string
  details: string
}

function run(cmd: string): string {
  try {
    return execSync(cmd, { encoding: 'utf8' }).trim()
  } catch {
    return ''
  }
}

function getDiff(): string {
  const isCI = !!process.env.CI
  if (isCI) {
    return run('git diff HEAD~1 HEAD --name-only')
  }
  // Local: diff against base branch (main or master)
  const base = run(
    'git merge-base HEAD origin/main 2>/dev/null || git merge-base HEAD origin/master 2>/dev/null || echo HEAD~1',
  )
  return (
    run(`git diff ${base} HEAD --name-only`) +
    '\n' +
    run('git diff --name-only') +
    '\n' +
    run('git diff --cached --name-only')
  )
}

function getDiffContent(): string {
  const isCI = !!process.env.CI
  // Exclude vendor/generated public assets from diff content checks (e.g. mockServiceWorker.js)
  const exclude = '":(exclude)**/public/mockServiceWorker.js"'
  if (isCI) {
    return run(`git diff HEAD~1 HEAD -- . ${exclude}`)
  }
  const base = run(
    'git merge-base HEAD origin/main 2>/dev/null || git merge-base HEAD origin/master 2>/dev/null || echo HEAD~1',
  )
  return (
    run(`git diff ${base} HEAD -- . ${exclude}`) +
    '\n' +
    run(`git diff -- . ${exclude}`) +
    '\n' +
    run(`git diff --cached -- . ${exclude}`)
  )
}

function checkForbiddenChanges(): Violation[] {
  const violations: Violation[] = []
  const changedFiles = getDiff().split('\n').filter(Boolean)
  const diffContent = getDiffContent()

  // 1. backend submodule changes (read-only)
  const submoduleChanges = changedFiles.filter((f) => f.startsWith('backend/rapid-go'))
  if (submoduleChanges.length > 0) {
    violations.push({
      rule: 'BACKEND_SUBMODULE_MODIFIED',
      details: `backend/rapid-go is read-only. Modified files: ${submoduleChanges.join(', ')}`,
    })
  }

  // 2. Generated code manual edits
  const generatedChanges = changedFiles.filter(
    (f) => f.includes('/generated/') && !f.endsWith('.gitkeep') && !f.endsWith('README.md'),
  )
  if (generatedChanges.length > 0) {
    violations.push({
      rule: 'GENERATED_CODE_MANUALLY_EDITED',
      details: `Generated code must not be manually edited. Use pnpm api:sync. Files: ${generatedChanges.join(', ')}`,
    })
  }

  // 3. .env.example key removal
  const envExampleChanged = changedFiles.includes('.env.example')
  if (envExampleChanged) {
    const removedKeys = diffContent
      .split('\n')
      .filter((line) => line.startsWith('-VITE_') && !line.startsWith('---'))
    if (removedKeys.length > 0) {
      violations.push({
        rule: 'ENV_EXAMPLE_KEY_REMOVED',
        details: `Keys removed from .env.example: ${removedKeys.map((l) => l.slice(1).trim()).join(', ')}`,
      })
    }
  }

  // 4. Package manager change
  const pkgManagerChanged = changedFiles.some(
    (f) => f === 'package.json' || f.includes('package.json'),
  )
  if (pkgManagerChanged) {
    const pmChange = diffContent
      .split('\n')
      .find(
        (line) =>
          line.startsWith('+') && line.includes('"packageManager"') && !line.includes('pnpm'),
      )
    if (pmChange) {
      violations.push({
        rule: 'PACKAGE_MANAGER_CHANGED',
        details: 'Package manager must remain pnpm.',
      })
    }
  }

  // 5. ESLint disable added (detect actual code comments, not docs)
  const newEslintDisables = diffContent
    .split('\n')
    .filter(
      (line) =>
        line.startsWith('+') && !line.startsWith('+++') && /\/[/*]\s*eslint-disable/.test(line),
    )
  if (newEslintDisables.length > 0) {
    violations.push({
      rule: 'ESLINT_DISABLE_ADDED',
      details: `New eslint-disable comments detected (${newEslintDisables.length}). Remove them instead of suppressing lint errors.`,
    })
  }

  // 6. TypeScript `any` added
  const newAny = diffContent
    .split('\n')
    .filter(
      (line) =>
        line.startsWith('+') &&
        !line.startsWith('+++') &&
        /:\s*any[\s;,>)]/.test(line) &&
        !line.includes('// no-guard'),
    )
  if (newAny.length > 0) {
    violations.push({
      rule: 'ANY_TYPE_ADDED',
      details: `New \`any\` types detected (${newAny.length} lines). Use explicit types.`,
    })
  }

  // Helper: a file is truly deleted if it existed in HEAD but is no longer in the index.
  // This avoids false positives for newly added files (they don't exist in HEAD either).
  const isDeleted = (f: string) =>
    !!run(`git show HEAD:"${f}" 2>/dev/null`) && !run(`git ls-files -- "${f}"`)

  // 7. Test file deleted
  const deletedTests = changedFiles.filter(
    (f) =>
      (f.endsWith('.test.ts') ||
        f.endsWith('.test.tsx') ||
        f.endsWith('.spec.ts') ||
        f.endsWith('.spec.tsx')) &&
      isDeleted(f),
  )
  if (deletedTests.length > 0) {
    violations.push({
      rule: 'TEST_FILE_DELETED',
      details: `Test files must not be deleted: ${deletedTests.join(', ')}`,
    })
  }

  // 8. Storybook file deleted
  const deletedStories = changedFiles.filter(
    (f) => (f.endsWith('.stories.ts') || f.endsWith('.stories.tsx')) && isDeleted(f),
  )
  if (deletedStories.length > 0) {
    violations.push({
      rule: 'STORY_FILE_DELETED',
      details: `Storybook story files must not be deleted: ${deletedStories.join(', ')}`,
    })
  }

  // 9. CI workflow file deleted
  const deletedCI = changedFiles.filter((f) => f.startsWith('.github/workflows/') && isDeleted(f))
  if (deletedCI.length > 0) {
    violations.push({
      rule: 'CI_FILE_DELETED',
      details: `CI workflow files must not be deleted: ${deletedCI.join(', ')}`,
    })
  }

  return violations
}

const violations = checkForbiddenChanges()

if (violations.length === 0) {
  console.warn('✅ No forbidden changes detected.')
  process.exit(0)
} else {
  console.error('❌ Forbidden changes detected:\n')
  violations.forEach((v) => {
    console.error(`  [${v.rule}] ${v.details}`)
  })
  console.error('\nFix these violations before merging.')
  process.exit(1)
}
