import deprecation from 'eslint-plugin-deprecation';
import prettier from 'eslint-plugin-prettier';
import node from 'eslint-plugin-node';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [...compat.extends('eslint:recommended', 'google', 'prettier'), {
  plugins: {
    deprecation,
    prettier,
    node,
  },

  languageOptions: {
    globals: {
      ...globals.node,
    },

    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    semi: 'warn',
    'comma-dangle': 'warn',
    quotes: ['warn', 'single'],
    curly: ['error', 'all'],
    indent: ['error', 2, { 'SwitchCase': 1 }],


    'object-curly-spacing': ['error', 'always', {
      objectsInObjects: true,
      arraysInObjects: true,
    }],

    'require-jsdoc': ['off'],
    'operator-linebreak': ['error', 'before'],

    'max-len': ['error', {
      code: 120,
      ignoreUrls: true,
      ignoreComments: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
      ignorePattern: '^import.+|test',
    }],

  },
}];
