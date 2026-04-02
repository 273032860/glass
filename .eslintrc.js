module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier" // 禁用 ESLint 和 Prettier 冲突的规则
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true // 启用 JSX 解析
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react"],
  settings: {
    react: {
      version: "detect" // 自动检测 React 版本
    }
  },
  rules: {
    "react/prop-types": "off" // 可选：关闭 prop-types 检查（TS 项目无需）
  }
};