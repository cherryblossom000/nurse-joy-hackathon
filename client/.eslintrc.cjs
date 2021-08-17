'use strict'

const path = require('path')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  overrides: [
    {
      files: 'vite.config.ts',
      extends: [
        '@cherryblossom/eslint-config/ts/node/esm',
        '@cherryblossom/eslint-config/node/16'
      ],
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.vite.config.json')
      },
      rules: {
        'import/no-unused-modules': 0,
        'node/no-unpublished-import': 0
      }
    },
    {
      files: 'src/main.ts',
      rules: {
        'import/no-unused-modules': 0
      }
    }
  ]
}
