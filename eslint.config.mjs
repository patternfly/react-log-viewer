import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import eslintConfigPrettier from 'eslint-config-prettier';
import markdown from '@eslint/markdown';
import globals from 'globals';

export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/public/**',
      '**/coverage/**',
      '**/.cache/**',
      '**/.tmp/**',
      '**/tsc_out/**',
      '**/.out/**',
      '**/.changelog/**',
      '**/generated/**'
    ]
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  {
    plugins: {
      'react-hooks': reactHooksPlugin
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
      'react-hooks/exhaustive-deps': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
      'react-hooks/immutability': 'off'
    }
  },
  eslintConfigPrettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ],
      '@typescript-eslint/prefer-for-of': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/unified-signatures': 'error',
      '@typescript-eslint/no-require-imports': 'off',
      'arrow-body-style': 'error',
      camelcase: [
        'error',
        {
          ignoreDestructuring: true
        }
      ],
      'constructor-super': 'error',
      curly: 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'max-classes-per-file': ['error', 1],
      'no-nested-ternary': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-cond-assign': 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      'no-empty': 'error',
      'no-eval': 'error',
      'no-new-wrappers': 'error',
      'no-undef-init': 'error',
      'no-unsafe-finally': 'error',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowTernary: true,
          allowShortCircuit: true
        }
      ],
      'no-unused-labels': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'one-var': ['error', 'never'],
      'prefer-const': 'error',
      radix: ['error', 'as-needed'],
      'react/prop-types': 0,
      'react/display-name': 0,
      'react/no-unescaped-entities': ['error', { forbid: ['>', '}'] }],
      'spaced-comment': 'error',
      'use-isnan': 'error'
    }
  },
  {
    files: ['**/patternfly-docs/pages/*'],
    rules: {
      'arrow-body-style': 'off'
    }
  },
  ...markdown.configs.processor,
  {
    files: ['**/*.md/*.{js,jsx}'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      'eol-last': 'error',
      'spaced-comment': 'error',
      'no-unused-vars': 'off',
      'no-this-before-super': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/no-unknown-property': 'error',
      'react/jsx-no-undef': 'error'
    }
  }
];
