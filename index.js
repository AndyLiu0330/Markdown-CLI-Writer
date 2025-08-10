#!/usr/bin/env node
/**
 * 📝 Markdown CLI Writer - Main Entry Point
 * Professional CLI tool for markdown generation and processing
 */

const path = require('path');

// Main CLI modules
const enhancedCLI = () => require('./bin/md-cli-enhanced');
const simpleCLI = () => require('./bin/md-cli-simple');
const basicCLI = () => require('./bin/md-cli');

// AI modules
const AIAssistant = require('./src/ai/ai-assistant');
const AICLICommands = require('./src/cli/ai-cli');

// Legacy MarkdownCLIWriter class for backward compatibility
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs').promises;
const path = require('path');

// Markdown syntax mapping
const SYNTAX_MAP = {
    'AAA': '#',      // Heading 1
    'BBB': '##',     // Heading 2
    'CCC': '###',    // Heading 3
    'DDD': '-',      // List item
    'EEE': '>'       // Quote
};

class MarkdownCLIWriter {
    constructor() {
        this.parsedContent = [];
        this.filename = null;
    }

    // Display welcome message
    showWelcome() {
        console.clear();
        console.log(chalk.cyan.bold('🖋️  Markdown CLI Writer'));
        console.log(chalk.gray('Convert custom syntax to Markdown format\n'));
        console.log(chalk.yellow('Supported syntax:'));
        console.log(chalk.gray('  AAA(text) → # Heading 1'));
        console.log(chalk.gray('  BBB(text) → ## Heading 2'));
        console.log(chalk.gray('  CCC(text) → ### Heading 3'));
        console.log(chalk.gray('  DDD(text) → - List item'));
        console.log(chalk.gray('  EEE(text) → > Quote'));
        console.log();
    }

    // Parse a single line of input
    parseLine(line) {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // Match pattern: PREFIX(content)
        const match = trimmed.match(/^([A-Z]{3})\((.+)\)$/);
        if (!match) {
            console.log(chalk.red(`⚠️  Invalid format: "${trimmed}"`));
            console.log(chalk.gray('   Expected format: AAA(Your Content)'));
            return null;
        }

        const [, prefix, content] = match;
        
        if (!SYNTAX_MAP[prefix]) {
            console.log(chalk.red(`⚠️  Unknown prefix: "${prefix}"`));
            console.log(chalk.gray(`   Supported: ${Object.keys(SYNTAX_MAP).join(', ')}`));
            return null;
        }

        return {
            prefix,
            content: content.trim(),
            markdown: `${SYNTAX_MAP[prefix]} ${content.trim()}`
        };
    }

    // Parse multiple lines of input
    parseInput(input) {
        const lines = input.split('\n');
        const parsed = [];

        for (const line of lines) {
            const result = this.parseLine(line);
            if (result) {
                parsed.push(result);
            }
        }

        return parsed;
    }

    // Generate markdown content
    generateMarkdown(parsedContent) {
        return parsedContent.map(item => item.markdown).join('\n');
    }

    // Determine filename based on first prefix
    getFilename(parsedContent) {
        if (parsedContent.length === 0) return 'output.md';
        return `${parsedContent[0].prefix}.md`;
    }

    // Save markdown to file
    async saveToFile(content, filename) {
        try {
            await fs.writeFile(filename, content, 'utf8');
            console.log(chalk.green(`✅ File saved: ${chalk.bold(filename)}`));
            
            // Show file stats
            const stats = await fs.stat(filename);
            console.log(chalk.gray(`   Size: ${stats.size} bytes`));
            console.log(chalk.gray(`   Path: ${path.resolve(filename)}`));
        } catch (error) {
            console.log(chalk.red(`❌ Error saving file: ${error.message}`));
        }
    }

    // Display markdown in terminal
    displayMarkdown(content) {
        console.log(chalk.blue('\n📄 Generated Markdown:'));
        console.log(chalk.gray('─'.repeat(40)));
        
        // Color-code different markdown elements
        const lines = content.split('\n');
        lines.forEach(line => {
            if (line.startsWith('# ')) {
                console.log(chalk.red.bold(line));
            } else if (line.startsWith('## ')) {
                console.log(chalk.yellow.bold(line));
            } else if (line.startsWith('### ')) {
                console.log(chalk.blue.bold(line));
            } else if (line.startsWith('- ')) {
                console.log(chalk.green(line));
            } else if (line.startsWith('> ')) {
                console.log(chalk.cyan(line));
            } else {
                console.log(line);
            }
        });
        
        console.log(chalk.gray('─'.repeat(40)));
    }

    // Main input collection method
    async collectInput() {
        const { inputMethod } = await inquirer.prompt([
            {
                type: 'list',
                name: 'inputMethod',
                message: 'How would you like to input your content?',
                choices: [
                    { name: '📝 Single line input', value: 'single' },
                    { name: '📄 Multi-line input', value: 'multi' },
                    { name: '📂 Load from file', value: 'file' },
                    { name: '🎯 Example mode', value: 'example' }
                ]
            }
        ]);

        let input = '';

        switch (inputMethod) {
            case 'single':
                const { singleInput } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'singleInput',
                        message: 'Enter your syntax (e.g., AAA(My Title)):',
                        validate: (input) => input.trim() ? true : 'Please enter some content'
                    }
                ]);
                input = singleInput;
                break;

            case 'multi':
                console.log(chalk.yellow('\n📝 Multi-line input mode'));
                console.log(chalk.gray('Enter your content line by line. Type "END" on a new line to finish.\n'));
                
                const lines = [];
                while (true) {
                    const { line } = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'line',
                            message: `Line ${lines.length + 1}:`
                        }
                    ]);
                    
                    if (line.trim().toUpperCase() === 'END') break;
                    if (line.trim()) lines.push(line);
                }
                input = lines.join('\n');
                break;

            case 'file':
                const { filepath } = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'filepath',
                        message: 'Enter file path:',
                        validate: async (path) => {
                            try {
                                await fs.access(path);
                                return true;
                            } catch {
                                return 'File does not exist';
                            }
                        }
                    }
                ]);
                
                try {
                    input = await fs.readFile(filepath, 'utf8');
                } catch (error) {
                    console.log(chalk.red(`❌ Error reading file: ${error.message}`));
                    return await this.collectInput();
                }
                break;

            case 'example':
                console.log(chalk.yellow('\n🎯 Using example content:'));
                input = `BBB(Health Tips)\nDDD(Less Sugar)\nDDD(More Veggies)\nEEE(Remember to stay hydrated!)`;
                console.log(chalk.gray(input));
                break;
        }

        return input;
    }

    // Ask user whether to save to file
    async askSaveFile() {
        const { saveFile } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'saveFile',
                message: 'Do you want to save this as a .md file?',
                default: true
            }
        ]);

        return saveFile;
    }

    // Ask for custom filename
    async askCustomFilename(defaultName) {
        const { useCustomName } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'useCustomName',
                message: `Use default filename "${defaultName}"?`,
                default: true
            }
        ]);

        if (useCustomName) return defaultName;

        const { customName } = await inquirer.prompt([
            {
                type: 'input',
                name: 'customName',
                message: 'Enter custom filename (without .md extension):',
                validate: (input) => {
                    if (!input.trim()) return 'Filename cannot be empty';
                    if (input.includes('/') || input.includes('\\')) return 'Invalid filename';
                    return true;
                }
            }
        ]);

        return `${customName.trim()}.md`;
    }

    // Main application flow
    async run() {
        try {
            this.showWelcome();

            while (true) {
                // Collect input
                const input = await this.collectInput();
                if (!input.trim()) {
                    console.log(chalk.yellow('⚠️  No content provided'));
                    continue;
                }

                // Parse input
                console.log(chalk.blue('\n🔄 Parsing input...'));
                const parsedContent = this.parseInput(input);

                if (parsedContent.length === 0) {
                    console.log(chalk.red('❌ No valid content to process'));
                    
                    const { retry } = await inquirer.prompt([
                        {
                            type: 'confirm',
                            name: 'retry',
                            message: 'Would you like to try again?',
                            default: true
                        }
                    ]);
                    
                    if (!retry) break;
                    continue;
                }

                // Generate markdown
                const markdownContent = this.generateMarkdown(parsedContent);
                
                // Display preview
                this.displayMarkdown(markdownContent);

                // Ask about saving
                const shouldSave = await this.askSaveFile();

                if (shouldSave) {
                    const defaultFilename = this.getFilename(parsedContent);
                    const filename = await this.askCustomFilename(defaultFilename);
                    await this.saveToFile(markdownContent, filename);
                } else {
                    console.log(chalk.gray('\n📄 Markdown content displayed above'));
                }

                // Ask to continue
                const { continueApp } = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'continueApp',
                        message: 'Would you like to process more content?',
                        default: false
                    }
                ]);

                if (!continueApp) break;
                console.clear();
                this.showWelcome();
            }

            console.log(chalk.green('\n👋 Thank you for using Markdown CLI Writer!'));

        } catch (error) {
            if (error.name === 'ExitPromptError') {
                console.log(chalk.yellow('\n👋 Goodbye!'));
            } else {
                console.log(chalk.red(`\n❌ An error occurred: ${error.message}`));
            }
        }
    }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
    console.log(chalk.yellow('\n\n👋 Goodbye!'));
    process.exit(0);
});

// Run the application
if (require.main === module) {
    const app = new MarkdownCLIWriter();
    app.run();
}

// Export main functionality and legacy class
module.exports = {
    // CLI interfaces
    enhancedCLI,
    simpleCLI,
    basicCLI,
    
    // AI functionality
    AIAssistant,
    AICLICommands,
    
    // Legacy class
    MarkdownCLIWriter,
    
    // Utility functions
    version: () => {
        const pkg = require('./package.json');
        return pkg.version;
    },
    
    // Main CLI entry point
    run: () => {
        require('./bin/md-cli-enhanced');
    }
};
