import { defineConfig } from '@tarojs/cli'

export default defineConfig({
  projectName: 'wechat-user-directory',
  date: '2026-10-24',
  designWidth: 375,
  deviceRatio: { 375: 2 },
  sourceRoot: 'src',
  outputRoot: 'dist',
  framework: 'react',
  compiler: 'webpack5',
  plugins: [],
  defineConstants: {},
  copy: { patterns: [], options: {} },
  mini: {}
})
