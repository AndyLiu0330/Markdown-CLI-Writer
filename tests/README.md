# 測試文件夾

這個資料夾包含所有的測試文件，用於驗證 Markdown CLI Writer 的功能。

## 測試文件說明

- `test-simple.js` - 基本功能測試
- `test-comprehensive.js` - 全面功能測試
- `test-guide-functionality.js` - 指南功能測試
- `test-cli-menu.js` - CLI 選單測試
- `test.js` - 通用測試

## 運行測試

從專案根目錄運行以下命令：

```bash
# 運行基本測試
npm test

# 運行全面測試
npm run test-comprehensive

# 運行指南測試
npm run test-guide

# 運行選單測試
npm run show-menu

# 運行所有測試
npm run test-all
```

## 測試結果

所有測試都應該通過並顯示 "🎉 All tests passed!" 訊息。
