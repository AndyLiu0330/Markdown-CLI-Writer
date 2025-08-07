#!/usr/bin/env node

/**
 * 🧪 AI Features Test Suite
 * Tests the AI assistant functionality
 */

const fs = require('fs').promises;
const path = require('path');

console.log('🧪 Testing AI Assistant Features...');
console.log('════════════════════════════════════════');

async function testAIFeatures() {
    // Create a sample markdown file for testing
    const testContent = `# Project Overview

This is basic project.

## Features
- Simple feature
- Another feature

## Installation
Run command.

## Usage
Use the thing.`;

    const testFile = 'test-ai-sample.md';
    
    try {
        await fs.writeFile(testFile, testContent);
        console.log(`✅ Created test file: ${testFile}`);
        
        console.log('\n🎯 Available AI Commands:');
        console.log('  npm run ai-suggest test-ai-sample.md  # Suggest improvements');
        console.log('  npm run ai-grammar test-ai-sample.md  # Fix grammar');
        console.log('  npm run ai-expand test-ai-sample.md   # Expand content');
        console.log('  npm run ai-setup                      # Configure AI');
        
        console.log('\n🚀 To test via interactive menu:');
        console.log('  npm start → Select "🤖 AI Assistant"');
        
        console.log('\n📋 What each feature does:');
        console.log('  💡 Suggest: Analyzes content and suggests better titles, structure');
        console.log('  📝 Grammar: Fixes grammar, spelling, and improves writing style');  
        console.log('  📚 Expand: Adds examples, details, and comprehensive explanations');
        console.log('  ⚙️  Setup: Configures free API keys or local LLM providers');
        
        console.log('\n🆓 Free AI Providers Supported:');
        console.log('  🌐 OpenRouter: Free tier with Mistral-7B, Mixtral models');
        console.log('  🏠 Ollama: Fully local/offline LLMs (llama2, mistral, etc.)');
        console.log('  🖥️  LM Studio: Local with GUI interface');
        
        console.log('\n✨ Integration Features:');
        console.log('  • Auto-detects .md files in directory');
        console.log('  • Interactive file selection menu');
        console.log('  • Saves AI output to separate files (-suggestions, -corrected, -expanded)');
        console.log('  • Fallback support when inquirer not available');
        console.log('  • Comprehensive error handling');
        
        // Clean up
        setTimeout(async () => {
            try {
                await fs.unlink(testFile);
                console.log(`\n🧹 Cleaned up test file: ${testFile}`);
            } catch (error) {
                // File might not exist, ignore
            }
        }, 1000);
        
    } catch (error) {
        console.log(`❌ Error creating test file: ${error.message}`);
    }
}

testAIFeatures();
