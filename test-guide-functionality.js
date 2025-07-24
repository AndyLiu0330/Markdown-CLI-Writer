#!/usr/bin/env node

// 測試 /guide 功能的腳本
const { spawn } = require('child_process');

console.log('🧪 Testing /guide command functionality...\n');

// 模擬用戶輸入 /guide 然後 Enter，再輸入 0 退出
const testInput = '/guide\n\n0\n';

const child = spawn('node', ['md-cli.js'], {
    stdio: ['pipe', 'pipe', 'pipe']
});

// 發送測試輸入
child.stdin.write(testInput);
child.stdin.end();

let output = '';

child.stdout.on('data', (data) => {
    output += data.toString();
});

child.stderr.on('data', (data) => {
    console.error('Error:', data.toString());
});

child.on('close', (code) => {
    console.log('📄 Output captured:');
    console.log('─'.repeat(60));
    console.log(output);
    console.log('─'.repeat(60));
    
    // 檢查輸出是否包含預期的內容
    const checks = [
        { name: 'Welcome message', test: output.includes('Markdown CLI Writer') },
        { name: 'Main menu', test: output.includes('📋 Main Menu:') },
        { name: 'Syntax guide trigger', test: output.includes('Type /guide to see syntax table') },
        { name: 'Syntax table', test: output.includes('📝 Supported Syntax:') },
        { name: 'Title1 syntax', test: output.includes('Title1(text)') },
        { name: 'Menu restoration', test: (output.match(/📋 Main Menu:/g) || []).length >= 2 },
        { name: 'Exit message', test: output.includes('感謝使用') }
    ];
    
    console.log('\n🔍 Functionality checks:');
    checks.forEach(check => {
        const status = check.test ? '✅' : '❌';
        console.log(`${status} ${check.name}: ${check.test ? 'PASS' : 'FAIL'}`);
    });
    
    const allPassed = checks.every(check => check.test);
    console.log(`\n📊 Overall: ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    
    if (allPassed) {
        console.log('🎉 /guide command works correctly! Menu shows again after guide display.');
    } else {
        console.log('⚠️  Some issues detected. Please check the implementation.');
    }
});
