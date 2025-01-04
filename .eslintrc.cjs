module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:boundaries/recommended',
    '@feature-sliced/eslint-config/rules/layers-slices',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort', 'import', 'boundaries', 'eslint-plugin-react-compiler'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    '@typescript-eslint/no-namespace': 'off',
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'react',
            importNames: ['default'],
            message: 'Do not use React qualifier, use import deconstruction instead',
          },
        ],
        patterns: [
          {
            group: [
              '@/shared/*/*/**',
              '@/entities/*/**',
              '@/features/*/**',
              '@/widgets/*/**',
              '@/pages/*/**',
              '@/app/**',
            ],
            message: 'Direct access to the internal parts of the module is prohibited',
          },
          {
            group: ['../**/shared', '../**/entities', '../**/features', '../**/widgets', '../**/pages', '../**/app'],
            message: 'Prefer absolute imports instead of relatives',
          },
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'all',
        argsIgnorePattern: '^_',
        caughtErrors: 'all',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    'react-compiler/react-compiler': 'error',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [
    {
      files: ['*.stories.ts', '*.stories.tsx'],
      rules: {
        'no-restricted-imports': 'off',
        'boundaries/element-types': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.ts', '**/__tests__/**/*.tsx'],
      rules: {
        'no-restricted-imports': 'off',
        'boundaries/element-types': 'off',
      },
    },
    {
      files: ['**/cypress/**/*.ts', '**/cypress/**/*.tsx', '**/*.cy.ts', '**/*.cy.tsx'],
      rules: {
        'no-restricted-imports': 'off',
        'boundaries/element-types': 'off',
      },
    },
  ],
}
