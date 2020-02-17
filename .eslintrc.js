// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    "curly": [0, "multi-or-nest"],
    "semi": [2, "always"],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // turn off because we need for postgress - other options to be discussed
    "camelcase": 0,
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    "prefer-promise-reject-errors": ["off", {"allowEmptyReject": true}],
    // id rather this be...
    // "comma-dangle": ["error", "always"]
    // (always dangle)
    // but this will allow both...
    // - being able to comma dangle means you can do things like
    //   comment props in objects and not have to fix commas etc
    "comma-dangle": ["error", {
      "arrays": "ignore",
      "objects": "ignore",
      "imports": "ignore",
      "exports": "ignore",
      "functions": "ignore"
    }],
    "vue/no-use-v-if-with-v-for": "off"
  }
};
