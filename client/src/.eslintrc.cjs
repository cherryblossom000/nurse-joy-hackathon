'use strict'

const path = require('path')
const typescript = require('typescript')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  overrides: [
    {
      files: ['**/*.ts', '**/*.svelte'],
      extends: ['@cherryblossom/eslint-config/ts/browser'],
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json')
      },
      rules: {
        // Kind of broken for Svelte
        'import/no-unused-modules': 0
      }
    },
    {
      files: '**/*.svelte',
      plugins: ['svelte3'],
      processor: 'svelte3/svelte3',
      settings: {
        'svelte3/typescript': () => typescript
      }
    },
    {
      files: 'main.ts',
      rules: {
        'import/no-unused-modules': 0
      }
    }
  ]
}
