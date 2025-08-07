#!/usr/bin/env node

/**
 * 🤖 AI CLI Commands
 * Command-line interface for AI-powered markdown enhancement
 */

const fs = require('fs').promises;
const path = require('path');
const AIAssistant = require('./ai-assistant');

// Simple color functions
function colorize(text, color) {
    const colors = {
        red: '\x1b[31m',
        green: '\x1b[32m', 
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        bold: '\x1b[1m',
        dim: '\x1b[2m',
        reset: '\x1b[0m'
    };
    return `${colors[color] || ''}${text}${colors.reset}`;
}

function styled(text, style = {}) {
    let result = text;
    if (style.color) result = colorize(result, style.color);
    if (style.bold) result = colorize(result, 'bold');
    if (style.dim) result = colorize(result, 'dim');
    return result;
}

class AICLICommands {
    constructor() {
        this.ai = new AIAssistant();
    }

    async ensureFileExists(filepath) {
        try {
            await fs.access(filepath);
            return true;
        } catch {
            console.log(styled(`❌ File not found: ${filepath}`, { color: 'red' }));
            console.log(styled('💡 Make sure the file path is correct and the file exists.', { color: 'yellow' }));
            return false;
        }
    }

    async readMarkdownFile(filepath) {
        if (!await this.ensureFileExists(filepath)) {
            return null;
        }

        try {
            const content = await fs.readFile(filepath, 'utf8');
            return content;
        } catch (error) {
            console.log(styled(`❌ Error reading file: ${error.message}`, { color: 'red' }));
            return null;
        }
    }

    async writeOutputFile(filepath, content, suffix = '') {
        try {
            const ext = path.extname(filepath);
            const base = path.basename(filepath, ext);
            const dir = path.dirname(filepath);
            const outputPath = path.join(dir, `${base}${suffix}${ext}`);
            
            await fs.writeFile(outputPath, content, 'utf8');
            console.log(styled(`✅ Output saved: ${outputPath}`, { color: 'green' }));
            return outputPath;
        } catch (error) {
            console.log(styled(`❌ Error saving file: ${error.message}`, { color: 'red' }));
            return null;
        }
    }

    async suggest(filepath) {
        console.log(styled('🤖 AI Suggest - Analyze and Improve Content', { color: 'cyan', bold: true }));
        console.log(styled('═'.repeat(50), { color: 'white' }));
        
        // Setup API key if needed
        const hasApiKey = await this.ai.setupApiKey();
        if (!hasApiKey) {
            return;
        }

        const content = await this.readMarkdownFile(filepath);
        if (!content) return;

        console.log(styled('🔍 Analyzing content...', { color: 'blue' }));
        
        try {
            const suggestions = await this.ai.suggestImprovements(content);
            
            console.log('\n' + styled('💡 AI Suggestions:', { color: 'green', bold: true }));
            console.log(styled('─'.repeat(30), { color: 'white' }));
            console.log(suggestions);
            
            // Save suggestions to file
            await this.writeOutputFile(filepath, suggestions, '-suggestions');
            
        } catch (error) {
            console.log(styled(`❌ AI analysis failed: ${error.message}`, { color: 'red' }));
            console.log(styled('💡 Check your API configuration and internet connection.', { color: 'yellow' }));
        }
    }

    async grammar(filepath) {
        console.log(styled('📝 AI Grammar - Fix Grammar and Style', { color: 'cyan', bold: true }));
        console.log(styled('═'.repeat(50), { color: 'white' }));
        
        // Setup API key if needed
        const hasApiKey = await this.ai.setupApiKey();
        if (!hasApiKey) {
            return;
        }

        const content = await this.readMarkdownFile(filepath);
        if (!content) return;

        console.log(styled('🔧 Fixing grammar and style...', { color: 'blue' }));
        
        try {
            const corrected = await this.ai.fixGrammar(content);
            
            console.log('\n' + styled('✨ Grammar-corrected content:', { color: 'green', bold: true }));
            console.log(styled('─'.repeat(30), { color: 'white' }));
            console.log(corrected.substring(0, 500) + (corrected.length > 500 ? '...' : ''));
            
            // Save corrected version to file
            await this.writeOutputFile(filepath, corrected, '-corrected');
            
        } catch (error) {
            console.log(styled(`❌ Grammar correction failed: ${error.message}`, { color: 'red' }));
            console.log(styled('💡 Check your API configuration and internet connection.', { color: 'yellow' }));
        }
    }

    async expand(filepath) {
        console.log(styled('📚 AI Expand - Expand Content with Details', { color: 'cyan', bold: true }));
        console.log(styled('═'.repeat(50), { color: 'white' }));
        
        // Setup API key if needed
        const hasApiKey = await this.ai.setupApiKey();
        if (!hasApiKey) {
            return;
        }

        const content = await this.readMarkdownFile(filepath);
        if (!content) return;

        console.log(styled('🚀 Expanding content with examples and details...', { color: 'blue' }));
        
        try {
            const expanded = await this.ai.expandContent(content);
            
            console.log('\n' + styled('📖 Expanded content preview:', { color: 'green', bold: true }));
            console.log(styled('─'.repeat(30), { color: 'white' }));
            console.log(expanded.substring(0, 500) + (expanded.length > 500 ? '...' : ''));
            
            // Save expanded version to file
            await this.writeOutputFile(filepath, expanded, '-expanded');
            
        } catch (error) {
            console.log(styled(`❌ Content expansion failed: ${error.message}`, { color: 'red' }));
            console.log(styled('💡 Check your API configuration and internet connection.', { color: 'yellow' }));
        }
    }

    async setup() {
        console.log(styled('⚙️  AI Assistant Setup', { color: 'cyan', bold: true }));
        console.log(styled('═'.repeat(50), { color: 'white' }));
        
        await this.ai.setupApiKey();
        
        console.log('\n' + styled('🔧 Configuration Options:', { color: 'blue', bold: true }));
        console.log(styled('─'.repeat(30), { color: 'white' }));
        console.log('1. 🌐 OpenRouter (Free tier available)');
        console.log('   • Sign up at: https://openrouter.ai/');
        console.log('   • Free models: Mistral-7B, Mixtral-8x7B');
        console.log('   • Add OPENROUTER_API_KEY to .env file');
        console.log('');
        console.log('2. 🏠 Ollama (Fully local/offline)');
        console.log('   • Install: https://ollama.ai/');
        console.log('   • Run: ollama pull llama2:7b');
        console.log('   • Set AI_PROVIDER=ollama in .env');
        console.log('');
        console.log('3. 🖥️  LM Studio (Local with GUI)');
        console.log('   • Download: https://lmstudio.ai/');
        console.log('   • Compatible with OpenAI API format');
        console.log('');
        
        // Create comprehensive config template
        const configTemplate = `{
  "provider": "openrouter",
  "model": "mistralai/mistral-7b-instruct:free",
  "apiUrl": "https://openrouter.ai/api/v1/chat/completions",
  "maxTokens": 1000,
  "temperature": 0.7,
  "alternativeProviders": {
    "ollama": {
      "baseUrl": "http://localhost:11434",
      "model": "llama2:7b"
    },
    "lmstudio": {
      "baseUrl": "http://localhost:1234",
      "model": "local-model"
    }
  }
}`;
        
        await fs.writeFile('.ai-config.json', configTemplate);
        console.log(styled('✅ Created .ai-config.json with configuration options', { color: 'green' }));
    }

    showUsage() {
        console.log(styled('🤖 AI Assistant Commands', { color: 'cyan', bold: true }));
        console.log(styled('═'.repeat(50), { color: 'white' }));
        console.log('');
        console.log(styled('Available Commands:', { color: 'yellow', bold: true }));
        console.log('  node ai-cli.js suggest <file.md>    📝 Suggest content improvements');
        console.log('  node ai-cli.js grammar <file.md>    🔧 Fix grammar and style');
        console.log('  node ai-cli.js expand <file.md>     📚 Expand content with details');
        console.log('  node ai-cli.js setup                ⚙️  Configure AI providers');
        console.log('');
        console.log(styled('Examples:', { color: 'blue', bold: true }));
        console.log('  node ai-cli.js suggest README.md');
        console.log('  node ai-cli.js grammar task.md');
        console.log('  node ai-cli.js expand project-outline.md');
        console.log('');
        console.log(styled('First Time Setup:', { color: 'green', bold: true }));
        console.log('  1. Run: node ai-cli.js setup');
        console.log('  2. Get free API key from OpenRouter or install Ollama');
        console.log('  3. Configure .env file');
        console.log('  4. Start using AI commands!');
    }
}

// CLI Entry Point
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const filepath = args[1];
    
    const cli = new AICLICommands();
    
    switch (command) {
        case 'suggest':
            if (!filepath) {
                console.log(styled('❌ Please provide a markdown file path', { color: 'red' }));
                console.log('Usage: node ai-cli.js suggest <file.md>');
                return;
            }
            await cli.suggest(filepath);
            break;
            
        case 'grammar':
            if (!filepath) {
                console.log(styled('❌ Please provide a markdown file path', { color: 'red' }));
                console.log('Usage: node ai-cli.js grammar <file.md>');
                return;
            }
            await cli.grammar(filepath);
            break;
            
        case 'expand':
            if (!filepath) {
                console.log(styled('❌ Please provide a markdown file path', { color: 'red' }));
                console.log('Usage: node ai-cli.js expand <file.md>');
                return;
            }
            await cli.expand(filepath);
            break;
            
        case 'setup':
            await cli.setup();
            break;
            
        default:
            cli.showUsage();
            break;
    }
}

if (require.main === module) {
    main().catch(error => {
        console.log(styled(`❌ Error: ${error.message}`, { color: 'red' }));
        process.exit(1);
    });
}

module.exports = AICLICommands;
