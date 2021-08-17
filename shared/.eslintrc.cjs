'use strict'

const path = require('path')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  overrides: [
    {
      files: '**/*.ts',
      extends: ['@cherryblossom/eslint-config/ts', '../.eslintrc.io-ts.yml'],
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json')
      }
    },
    {
      files: 'index.ts',
      rules: {
        'import/no-unused-modules': 0
      }
    }
  ]
}
