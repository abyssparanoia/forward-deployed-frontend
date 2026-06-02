#!/usr/bin/env tsx
/**
 * API sync script skeleton.
 * Run via: pnpm api:sync
 *
 * Reads the backend API document and syncs:
 * - Type definitions → packages/api-client/src/generated/
 * - API client wrappers → packages/api-client/src/http/
 * - TanStack Query hooks → packages/api-client/src/hooks/
 * - MSW handlers → packages/mock/src/handlers/
 *
 * For OpenAPI: use openapi-typescript to generate types.
 * For custom format: parse the backend docs and generate manually.
 */
import { existsSync, readdirSync } from 'fs'
import * as path from 'path'

const BACKEND_DOC_PATHS = [
  'backend/rapid-go/docs/api',
  'backend/rapid-go/api',
  'backend/rapid-go/openapi.yaml',
  'backend/rapid-go/openapi.json',
  'backend/rapid-go/swagger.yaml',
  'backend/rapid-go/swagger.json',
]

function findApiDoc(): string | null {
  for (const p of BACKEND_DOC_PATHS) {
    if (existsSync(p)) return p
  }
  return null
}

async function main(): Promise<void> {
  console.warn('\n🔄 API Sync\n')

  const docPath = findApiDoc()
  if (!docPath) {
    console.warn('⚠️  No backend API document found.')
    console.warn('   Add a backend submodule first: pnpm project:init')
    console.warn('   Expected locations:')
    BACKEND_DOC_PATHS.forEach((p) => console.warn(`     - ${p}`))
    console.warn('\n   Once the submodule is added, this script will:')
    console.warn('   1. Parse the API document')
    console.warn('   2. Generate types → packages/api-client/src/generated/')
    console.warn('   3. Generate MSW handlers → packages/mock/src/handlers/')
    console.warn('   4. Update TanStack Query hooks → packages/api-client/src/hooks/')
    process.exit(0)
  }

  console.warn(`📄 Found API document: ${docPath}`)

  const ext = path.extname(docPath)
  if (ext === '.yaml' || ext === '.json') {
    console.warn('📦 Generating types from OpenAPI spec...')
    console.warn(
      '   Run: npx openapi-typescript ' + docPath + ' -o packages/api-client/src/generated/api.ts',
    )
    console.warn('   Then update packages/api-client/src/hooks/ to use the generated types.')
  } else {
    const files = readdirSync(docPath)
    console.warn(`📁 Found ${files.length} doc files: ${files.join(', ')}`)
    console.warn('   Implement parsing logic for your specific doc format.')
  }

  console.warn('\n✅ API sync placeholder complete.')
  console.warn('   Implement the actual generation logic above for your backend doc format.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
