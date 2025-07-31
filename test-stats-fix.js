#!/usr/bin/env node

/**
 * 🧪 Test Statistics Function
 * Tests the improved statistics functionality
 */

const { spawn } = require('child_process');

console.log('🧪 Testing Statistics Function...');
console.log('════════════════════════════════════════');

// Create a test that simulates user selecting statistics option
const testProcess = spawn('node', ['md-cli-enhanced.js'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    cwd: process.cwd()
});

// Send keystrokes to navigate to statistics
setTimeout(() => {
    // Send down arrow twice to get to statistics option, then Enter
    testProcess.stdin.write('\u001B[B'); // Down arrow
    testProcess.stdin.write('\u001B[B'); // Down arrow  
    setTimeout(() => {
        testProcess.stdin.write('\r'); // Enter key
    }, 500);
}, 1000);

let output = '';
testProcess.stdout.on('data', (data) => {
    const text = data.toString();
    output += text;
    process.stdout.write(text);
    
    // If we see the statistics menu, that means it's working
    if (text.includes('Available .md files')) {
        console.log('\n✅ SUCCESS: Statistics function now shows available .md files!');
        testProcess.kill('SIGTERM');
    }
    
    // If it asks for file selection, send Ctrl+C to exit gracefully
    if (text.includes('Select a file to analyze') || text.includes('Select file')) {
        console.log('\n✅ SUCCESS: File selection menu is working!');
        testProcess.stdin.write('\u0003'); // Ctrl+C
    }
});

testProcess.stderr.on('data', (data) => {
    console.error('Error:', data.toString());
});

testProcess.on('close', (code) => {
    console.log('\n🎯 Test completed.');
    if (output.includes('Available .md files') || output.includes('Select a file')) {
        console.log('✅ Statistics function is now working properly!');
        console.log('📋 The function now shows available .md files instead of asking for manual input.');
    } else {
        console.log('⚠️  Could not verify the fix - manual testing recommended.');
    }
});

// Kill process after 10 seconds if it doesn't complete
setTimeout(() => {
    if (!testProcess.killed) {
        console.log('\n⏰ Test timeout - killing process');
        testProcess.kill('SIGKILL');
    }
}, 10000);
