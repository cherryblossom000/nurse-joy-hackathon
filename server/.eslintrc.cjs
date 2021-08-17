'use strict'

const path = require('path')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  overrides: [
    {
      files: 'src/**/*.ts',
      extends: [
        '@cherryblossom/eslint-config/ts/node/esm',
        '@cherryblossom/eslint-config/node/16',
        '../.eslintrc.io-ts.yml'
      ],
      parserOptions: {
        project: path.join(__dirname, 'tsconfig.json')
      }
    }
  ]
}
