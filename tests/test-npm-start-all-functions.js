#!/usr/bin/env node

// Comprehensive test of all npm start menu functions
const { MarkdownCLIWriter } = require('../bin/md-cli-enhanced.js');

async function testAllMenuFunctions() {
    console.log('🔍 Testing ALL functions in npm start enhanced menu...');
    console.log('═'.repeat(60));
    
    try {
        const app = new MarkdownCLIWriter();
        app.config = await app.configManager.loadConfig();
        
        // Get all menu options
        const menuOptions = app.getMenuOptions();
        console.log('📋 Available menu options:');
        menuOptions.forEach((option, index) => {
            console.log(`  ${index + 1}. ${option.name} (${option.value})`);
        });
        console.log('');
        
        // Test each function
        let testResults = [];
        
        // Mock user input for automated testing
        app.question = async (prompt) => {
            console.log(`Mock input for: ${prompt}`);
            
            // File path inputs
            if (prompt.includes('Enter path to Markdown file') || 
                prompt.includes('Enter Markdown file path')) {
                return 'README.md';
            }
            
            // Single line input
            if (prompt.includes('Enter your syntax')) {
                return 'Title1(Test Title)';
            }
            
            // Multi-line input
            if (prompt.includes('>') && !prompt.includes('path')) {
                return 'END';
            }
            
            // File input
            if (prompt.includes('Enter file path')) {
                return 'example-input.txt';
            }
            
            // Save options
            if (prompt.includes('save') || prompt.includes('Save')) {
                return 'n';
            }
            
            // Default options
            if (prompt.includes('Choose an option') || prompt.includes('Select')) {
                return '1';
            }
            
            // Continue prompts
            if (prompt.includes('Press Enter') || prompt.includes('continue')) {
                return '';
            }
            
            return 'n';
        };
        
        console.log('🎯 Testing each menu function...\n');
        
        // Test 1: Create new markdown file
        console.log('1️⃣ Testing: Create new markdown file');
        try {
            await app.handleMenuAction('create');
            testResults.push('✅ Create new markdown file - PASSED');
        } catch (error) {
            testResults.push(`❌ Create new markdown file - FAILED: ${error.message}`);
        }
        console.log('');
        
        // Test 2: Preview existing markdown
        console.log('2️⃣ Testing: Preview existing markdown');
        try {
            await app.handleMenuAction('preview');
            testResults.push('✅ Preview existing markdown - PASSED');
        } catch (error) {
            testResults.push(`❌ Preview existing markdown - FAILED: ${error.message}`);
        }
        console.log('');
        
        // Test 3: Convert from custom syntax
        console.log('3️⃣ Testing: Convert from custom syntax');
        try {
            await app.handleMenuAction('convert');
            testResults.push('✅ Convert from custom syntax - PASSED');
        } catch (error) {
            testResults.push(`❌ Convert from custom syntax - FAILED: ${error.message}`);
        }
        console.log('');
        
        // Test 4: View statistics report
        console.log('4️⃣ Testing: View statistics report');
        try {
            await app.handleMenuAction('stats');
            testResults.push('✅ View statistics report - PASSED');
        } catch (error) {
            testResults.push(`❌ View statistics report - FAILED: ${error.message}`);
        }
        console.log('');
        
        // Test 5: Help / Guide
        console.log('5️⃣ Testing: Help / Guide');
        try {
            await app.handleMenuAction('help');
            testResults.push('✅ Help / Guide - PASSED');
        } catch (error) {
            testResults.push(`❌ Help / Guide - FAILED: ${error.message}`);
        }
        console.log('');
        
        // Test 6: Settings
        console.log('6️⃣ Testing: Settings');
        try {
            await app.handleMenuAction('settings');
            testResults.push('✅ Settings - PASSED');
        } catch (error) {
            testResults.push(`❌ Settings - FAILED: ${error.message}`);
        }
        console.log('');
        
        app.rl.close();
        
        // Summary
        console.log('📊 TEST RESULTS SUMMARY');
        console.log('═'.repeat(60));
        testResults.forEach(result => console.log(result));
        console.log('');
        
        const passedCount = testResults.filter(r => r.includes('✅')).length;
        const totalCount = testResults.length;
        
        if (passedCount === totalCount) {
            console.log('🎉 ALL TESTS PASSED! npm start menu is fully functional!');
        } else {
            console.log(`⚠️  ${passedCount}/${totalCount} tests passed. Some functions need attention.`);
        }
        
    } catch (error) {
        console.error('💥 Test suite error:', error.message);
        console.error(error.stack);
    }
}

testAllMenuFunctions();
