'use strict'

const path = require('path')

/** @type {import('eslint').Linter.Config} */
module.exports = {
  settings: {
    jsdoc: {mode: 'typescript'}
  },
  overrides: [
    {
      files: '**/.eslintrc.cjs',
      extends: [
        '@cherryblossom/eslint-config/js/node/commonjs',
        '@cherryblossom/eslint-config/node/16'
      ],
      rules: {
        'node/no-extraneous-dependencies': 0
      }
    }
  ]
}
