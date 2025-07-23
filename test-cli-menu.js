#!/usr/bin/env node

const MarkdownCLIWriter = require('./md-cli.js');

async function testCLI() {
    console.log('🧪 Testing the new CLI Menu Interface...\n');
    
    // 創建一個模擬的測試
    const mockApp = new MarkdownCLIWriter();
    
    console.log('📋 1. Testing Welcome Message:');
    console.log('─'.repeat(40));
    // 顯示歡迎訊息
    mockApp.showWelcome();
    
    console.log('\n📋 2. Testing Main Menu:');
    console.log('─'.repeat(40));
    // 顯示主選單
    mockApp.showMainMenu();
    
    console.log('\n📋 3. Testing Syntax Guide:');
    console.log('─'.repeat(40));
    // 顯示語法指南
    mockApp.showSyntaxGuide();
    
    console.log('\n✅ CLI Menu interface loaded successfully!');
    console.log('\n🎯 Available features:');
    console.log('• Interactive menu system');
    console.log('• /guide command for syntax help (works anywhere)');
    console.log('• Single line input mode');
    console.log('• Multi-line input mode'); 
    console.log('• File input mode');
    console.log('• Example mode');
    console.log('• Persistent menu navigation');
    console.log('• Exit option');
    
    console.log('\n� How to use:');
    console.log('1. Run: node md-cli.js');
    console.log('2. Choose from options 0-5');
    console.log('3. Type "/guide" anytime to see syntax help');
    console.log('4. Use BBB(text) format as shown in USAGE.md');
    
    // 關閉 readline
    mockApp.rl.close();
}

testCLI().catch(console.error);
