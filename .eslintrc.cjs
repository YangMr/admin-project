/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'standard',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'no-undef': ['off'],
    'vue/multi-word-component-names': ['off'],
    eqeqeq: ['off'],
    camelcase: ['off'],
    'no-use-before-define': ['off'],
    'vue/valid-v-for': ['off']
  }
}
