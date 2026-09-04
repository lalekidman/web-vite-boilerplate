#!/usr/bin/env node
// Rename the boilerplate. Usage: npm run setup <project-name>
// Defaults to the current directory name if no argument is given.
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { basename } from 'node:path'

const OLD = 'web-boilerplate'
const raw = process.argv[2] || basename(process.cwd())
const name = raw
  .toLowerCase()
  .replace(/[^a-z0-9-]+/g, '-')
  .replace(/^-+|-+$/g, '')

if (!name) {
  console.error('usage: npm run setup <project-name>')
  process.exit(1)
}
if (name === OLD) {
  console.error(`still "${OLD}" — pass a new name: npm run setup my-app`)
  process.exit(1)
}

const files = [
  'package.json',
  'package-lock.json',
  'wrangler.json',
  'index.html',
  'CLAUDE.md',
  'README.md',
]

let touched = 0
for (const f of files) {
  if (!existsSync(f)) continue
  const before = readFileSync(f, 'utf8')
  const after = before.replaceAll(OLD, name)
  if (after !== before) {
    writeFileSync(f, after)
    touched++
    console.log(`  ${f}`)
  }
}

console.log(`\nrenamed ${OLD} → ${name} in ${touched} file(s)`)
console.log('next: rm -rf .git && git init && git add -A && git commit -m "init"')
console.log('      then fill in docs/CONTEXT.md and docs/master-prd.md')
