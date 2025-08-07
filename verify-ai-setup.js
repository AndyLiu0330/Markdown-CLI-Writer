#!/usr/bin/env node

/**
 * 🔍 AI Setup Verification Script
 * Checks if AI functions are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying AI Setup...\n');

let allGood = true;

// Check 1: .env file
console.log('1. Checking .env file...');
if (fs.existsSync('.env')) {
    const envContent = fs.readFileSync('.env', 'utf8');
    if (envContent.includes('OPENROUTER_API_KEY=sk-or-v1-') && !envContent.includes('echo')) {
        console.log('   ✅ .env file correctly formatted');
        console.log('   ✅ API key found');
    } else {
        console.log('   ❌ .env file format issue');
        allGood = false;
    }
} else {
    console.log('   ❌ .env file missing');
    allGood = false;
}

// Check 2: AI files
console.log('\n2. Checking AI module files...');
const aiFiles = ['ai-assistant.js', 'ai-cli.js'];
aiFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`   ✅ ${file} exists`);
    } else {
        console.log(`   ❌ ${file} missing`);
        allGood = false;
    }
});

// Check 3: AI config
console.log('\n3. Checking AI configuration...');
if (fs.existsSync('.ai-config.json')) {
    console.log('   ✅ .ai-config.json exists');
    try {
        const config = JSON.parse(fs.readFileSync('.ai-config.json', 'utf8'));
        console.log('   ✅ Configuration file is valid JSON');
    } catch (error) {
        console.log('   ❌ Configuration file is invalid JSON');
        allGood = false;
    }
} else {
    console.log('   ⚠️  .ai-config.json missing (will be created on first run)');
}

// Check 4: Package.json scripts
console.log('\n4. Checking npm scripts...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const aiScripts = ['ai-suggest', 'ai-grammar', 'ai-expand', 'ai-setup'];
    
    aiScripts.forEach(script => {
        if (packageJson.scripts && packageJson.scripts[script]) {
            console.log(`   ✅ npm run ${script} available`);
        } else {
            console.log(`   ❌ npm run ${script} missing`);
            allGood = false;
        }
    });
} catch (error) {
    console.log('   ❌ Cannot read package.json');
    allGood = false;
}

// Check 5: Test file
console.log('\n5. Checking test file...');
if (fs.existsSync('test.md')) {
    console.log('   ✅ test.md exists - perfect for testing AI functions!');
} else {
    console.log('   ⚠️  No test.md file (you can create one)');
}

// Final verdict
console.log('\n' + '═'.repeat(50));
if (allGood) {
    console.log('🎉 AI Setup is READY! All checks passed.');
    console.log('\n🚀 You can now test AI functions:');
    console.log('   npm run ai-suggest test.md');
    console.log('   npm run ai-grammar test.md');
    console.log('   npm run ai-expand test.md');
    console.log('\n🎮 Or use interactive menu:');
    console.log('   npm start → Select "🤖 AI Assistant"');
} else {
    console.log('⚠️  Some issues found. Please fix the items marked with ❌');
}

console.log('\n📅 Verification completed:', new Date().toLocaleString());
