'use strict'

const path = require('path')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  overrides: [
    {
      files: '**/*.ts',
      extends: ['@cherryblossom/eslint-config/ts'],
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json')
      }
    }
  ]
}
