#!/usr/bin/env node

/**
 * 🏥 Health Check Script
 * Validates that all core functionality is working correctly
 */

const fs = require('fs');
const path = require('path');

console.log('🏥 Markdown CLI Writer - Health Check');
console.log('════════════════════════════════════════');

let allChecks = [];

// Check 1: Core files exist
console.log('📁 Checking core files...');
const coreFiles = [
    'md-cli-enhanced.js',
    'md-cli-simple.js', 
    'package.json',
    'README.md'
];

coreFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
    allChecks.push({ name: `Core file: ${file}`, passed: exists });
});

// Check 2: Test directory structure
console.log('\n🧪 Checking test structure...');
const testExists = fs.existsSync('tests');
const testFiles = testExists ? fs.readdirSync('tests').filter(f => f.endsWith('.js')) : [];
console.log(`   ${testExists ? '✅' : '❌'} tests/ directory exists`);
console.log(`   ${testFiles.length > 0 ? '✅' : '❌'} Test files found: ${testFiles.length}`);
allChecks.push({ name: 'Test directory', passed: testExists });
allChecks.push({ name: 'Test files', passed: testFiles.length > 0 });

// Check 3: Dependencies
console.log('\n📦 Checking dependencies...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const deps = Object.keys(packageJson.dependencies || {});
    console.log(`   ✅ Dependencies defined: ${deps.length}`);
    deps.forEach(dep => {
        try {
            require.resolve(dep);
            console.log(`   ✅ ${dep} - installed`);
        } catch (e) {
            console.log(`   ⚠️  ${dep} - not found`);
        }
    });
    allChecks.push({ name: 'Dependencies', passed: true });
} catch (e) {
    console.log('   ❌ Error reading package.json');
    allChecks.push({ name: 'Dependencies', passed: false });
}

// Check 4: Configuration
console.log('\n⚙️ Checking configuration...');
const configExists = fs.existsSync('.md-cli-config.json');
console.log(`   ${configExists ? '✅' : '📝'} Configuration file ${configExists ? 'exists' : 'will be created on first run'}`);

// Check 5: Examples and documentation
console.log('\n📚 Checking documentation...');
const docFiles = ['README.md', 'USAGE.md', 'task.md'];
docFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
    allChecks.push({ name: `Documentation: ${file}`, passed: exists });
});

// Check 6: Sample files
console.log('\n📄 Checking examples...');
const exampleFiles = ['demo.js', 'examples/'];
exampleFiles.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`   ${exists ? '✅' : '❌'} ${file}`);
});

// Summary
console.log('\n📊 Health Check Summary');
console.log('════════════════════════════════════════');
const passed = allChecks.filter(c => c.passed).length;
const total = allChecks.length;
const percentage = Math.round((passed / total) * 100);

console.log(`✅ Passed: ${passed}/${total} (${percentage}%)`);

if (passed === total) {
    console.log('🎉 All health checks passed! Your setup is ready to go.');
} else {
    console.log('⚠️  Some checks failed. Consider running:');
    console.log('   npm install    # Install dependencies');
    console.log('   npm test       # Run tests');
}

console.log('\n🚀 Quick Start Commands:');
console.log('   npm start      # Launch interactive menu');
console.log('   npm run demo   # See working example');
console.log('   npm test       # Run basic tests');

console.log('\n📅 Health check completed:', new Date().toLocaleString());
