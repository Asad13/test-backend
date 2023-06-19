module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard-with-typescript', 'prettier'],
  root: true,
  overrides: [],
  parserOptions: {
    project: ['./tsconfig.json', './frontend/tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {},
};
