module.exports = {
  env: {
    es6: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'react-app',
    'standard',
    'plugin:import/errors',
    'plugin:import/react',
    'plugin:import/warnings',
    'plugin:promise/recommended',
    'plugin:react/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: [],
  rules: {
    'array-callback-return': 'error',
    'arrow-body-style': 'error',
    'arrow-parens': 'error',
    'arrow-spacing': 'error',
    'computed-property-spacing': 'warn',
    'consistent-return': 'warn',
    curly: 'warn',
    'default-case': 'error',
    'dot-location': 'error',
    'dot-notation': 'warn',
    'func-names': 'error',
    'func-style': [
      'warn',
      'declaration',
      {
        allowArrowFunctions: true
      }
    ],
    'generator-star-spacing': 'error',
    'jsx-quotes': 'warn',
    'linebreak-style': ['error', 'unix'],
    'max-len': [
      'off',
      {
        code: 80,
        comments: 80
      }
    ],
    'max-params': 'warn',
    'no-alert': 'error',
    'no-confusing-arrow': 'error',
    'no-console': [
      'warn',
      {
        allow: ['error', 'warn']
      }
    ],
    'no-delete-var': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': 'error',
    'no-empty-function': 'error',
    'no-lonely-if': 'error',
    'no-negated-condition': 'error',
    'no-path-concat': 'error',
    'no-return-assign': 'warn',
    'no-shadow': 'error',
    'no-ternary': 'warn',
    'no-useless-computed-key': 'error',
    'no-useless-concat': 'warn',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'warn',
    'no-var': 'error',
    'object-curly-spacing': ['warn', 'always'],
    'object-shorthand': 'error',
    'prefer-const': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'quote-props': ['warn', 'as-needed'],
    'react/forbid-component-props': 'off',
    'react/jsx-handler-names': 'error',
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-max-props-per-line': [
      'warn',
      {
        maximum: 5
      }
    ],
    'react/jsx-no-bind': 'error',
    'react/jsx-no-comment-textnodes': 'error',
    'react/jsx-no-target-blank': 'error',
    'react/jsx-pascal-case': 'error',
    'react/jsx-sort-props': 'error',
    'react/jsx-tag-spacing': [
      'error',
      {
        closingSlash: 'never',
        beforeSelfClosing: 'never',
        afterOpening: 'never'
      }
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-wrap-multilines': 'error',
    'react/no-children-prop': 'warn',
    'react/no-unknown-property': 'warn',
    'react/no-multi-comp': [
      'error',
      {
        ignoreStateless: true
      }
    ],
    'react/no-string-refs': 'error',
    'react/no-unescaped-entities': 'error',
    'react/no-unused-prop-types': 'warn',
    'react/prefer-es6-class': 'error',
    'react/prefer-stateless-function': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/require-optimization': 'off', // TODO: Enable
    'react/self-closing-comp': 'error',
    'react/sort-comp': 'warn',
    'react/sort-prop-types': 'warn',
    'react/style-prop-object': 'error',
    'rest-spread-spacing': 'error',
    'sort-imports': 'off', // TODO: Enable (with pull request)
    'sort-keys': ['error', 'asc', { caseSensitive: true, natural: true }],
    'sort-vars': 'error',
    'standard/computed-property-even-spacing': 'off',
    'spaced-comment': 'error',
    'template-curly-spacing': 'error'
  }
}
