#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');

// Try to use inquirer if available, fallback to readline
let inquirer;
try {
    inquirer = require('inquirer');
} catch (error) {
    console.log('📦 Inquirer not available, using fallback menu system...');
    inquirer = null;
}

// Simple color functions (fallback)
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

// Enhanced color functions for better styling
function styled(text, style = {}) {
    let result = text;
    if (style.color) result = colorize(result, style.color);
    if (style.bold) result = colorize(result, 'bold');
    if (style.dim) result = colorize(result, 'dim');
    return result;
}

// Markdown syntax mapping - supports both current and PRD syntax
const SYNTAX_MAP = {
    // Current syntax (backward compatibility)
    'Title1': '#',      // Heading 1
    'Title2': '##',     // Heading 2
    'Title3': '###',    // Heading 3
    'List': '-',        // List item
    'Quote': '>',       // Quote
    
    // PRD original syntax (AAA, BBB, CCC, DDD, EEE)
    'AAA': '#',         // Heading 1 (PRD)
    'BBB': '##',        // Heading 2 (PRD)
    'CCC': '###',       // Heading 3 (PRD)
    'DDD': '-',         // List item (PRD)
    'EEE': '>'          // Quote (PRD)
};

// Configuration management for user preferences
class ConfigManager {
    constructor() {
        this.configPath = path.join(process.cwd(), '.md-cli-config.json');
        this.defaultConfig = {
            lastUsedMenuItem: null,
            defaultOutputDir: './',
            preferredSyntax: 'mixed',
            showWelcomeMessage: true
        };
    }

    async loadConfig() {
        try {
            const configData = await fs.readFile(this.configPath, 'utf8');
            return { ...this.defaultConfig, ...JSON.parse(configData) };
        } catch (error) {
            return this.defaultConfig;
        }
    }

    async saveConfig(config) {
        try {
            await fs.writeFile(this.configPath, JSON.stringify(config, null, 2));
        } catch (error) {
            // Silently fail if can't save config
        }
    }
}

// Markdown Statistics Analyzer (same as before)
class MarkdownAnalyzer {
    constructor() {
        this.stats = {
            wordCount: 0,
            paragraphCount: 0,
            headingLevels: { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 },
            linkCount: 0,
            imageCount: 0,
            listItemCount: 0,
            quoteCount: 0,
            codeBlockCount: 0,
            tableCount: 0,
            boldTextCount: 0,
            italicTextCount: 0,
            totalLines: 0,
            emptyLines: 0
        };
    }

    analyzeFile(markdownContent) {
        const lines = markdownContent.split('\n');
        this.stats.totalLines = lines.length;
        
        for (const line of lines) {
            if (line.trim() === '') {
                this.stats.emptyLines++;
                continue;
            }
            
            // Count words
            const words = line.trim().split(/\s+/).filter(word => word.length > 0);
            this.stats.wordCount += words.length;
            
            // Count headings
            const headingMatch = line.match(/^(#{1,6})\s+/);
            if (headingMatch) {
                const level = headingMatch[1].length;
                this.stats.headingLevels[`h${level}`]++;
            }
            
            // Count list items
            if (line.match(/^\s*[-*+]\s+/) || line.match(/^\s*\d+\.\s+/)) {
                this.stats.listItemCount++;
            }
            
            // Count quotes
            if (line.match(/^\s*>/)) {
                this.stats.quoteCount++;
            }
            
            // Count links
            const linkMatches = line.match(/\[([^\]]+)\]\([^)]+\)/g);
            if (linkMatches) {
                this.stats.linkCount += linkMatches.length;
            }
            
            // Count images
            const imageMatches = line.match(/!\[([^\]]*)\]\([^)]+\)/g);
            if (imageMatches) {
                this.stats.imageCount += imageMatches.length;
            }
            
            // Count code blocks
            if (line.match(/^```/)) {
                this.stats.codeBlockCount++;
            }
            
            // Count bold text
            const boldMatches = line.match(/\*\*[^*]+\*\*/g);
            if (boldMatches) {
                this.stats.boldTextCount += boldMatches.length;
            }
            
            // Count italic text
            const italicMatches = line.match(/\*[^*]+\*/g);
            if (italicMatches) {
                this.stats.italicTextCount += italicMatches.length;
            }
        }
        
        // Count paragraphs (groups of non-empty lines)
        let inParagraph = false;
        for (const line of lines) {
            if (line.trim() === '') {
                inParagraph = false;
            } else if (!inParagraph && !line.match(/^#|^\s*[-*+]|^\s*\d+\.|^\s*>/)) {
                this.stats.paragraphCount++;
                inParagraph = true;
            }
        }
        
        return this.stats;
    }

    generateReport(format = 'console') {
        if (format === 'json') {
            return JSON.stringify(this.stats, null, 2);
        }
        
        const report = [];
        report.push(styled('📊 Markdown Statistics Report', { color: 'cyan', bold: true }));
        report.push(styled('═'.repeat(50), { color: 'white' }));
        report.push('');
        
        report.push(styled('📝 Content Overview:', { color: 'yellow', bold: true }));
        report.push(`   Word Count: ${styled(this.stats.wordCount.toString(), { color: 'green' })}`);
        report.push(`   Total Lines: ${styled(this.stats.totalLines.toString(), { color: 'green' })}`);
        report.push(`   Paragraphs: ${styled(this.stats.paragraphCount.toString(), { color: 'green' })}`);
        report.push(`   Empty Lines: ${styled(this.stats.emptyLines.toString(), { color: 'green' })}`);
        report.push('');
        
        report.push(styled('📋 Structure Analysis:', { color: 'blue', bold: true }));
        report.push(`   H1 Headings: ${styled(this.stats.headingLevels.h1.toString(), { color: 'green' })}`);
        report.push(`   H2 Headings: ${styled(this.stats.headingLevels.h2.toString(), { color: 'green' })}`);
        report.push(`   H3 Headings: ${styled(this.stats.headingLevels.h3.toString(), { color: 'green' })}`);
        report.push(`   List Items: ${styled(this.stats.listItemCount.toString(), { color: 'green' })}`);
        report.push(`   Quote Lines: ${styled(this.stats.quoteCount.toString(), { color: 'green' })}`);
        report.push('');
        
        report.push(styled('🔗 Links & Media:', { color: 'magenta', bold: true }));
        report.push(`   Links: ${styled(this.stats.linkCount.toString(), { color: 'green' })}`);
        report.push(`   Images: ${styled(this.stats.imageCount.toString(), { color: 'green' })}`);
        report.push('');
        
        report.push(styled('💻 Code & Formatting:', { color: 'cyan', bold: true }));
        report.push(`   Code Blocks: ${styled(this.stats.codeBlockCount.toString(), { color: 'green' })}`);
        report.push(`   Bold Text: ${styled(this.stats.boldTextCount.toString(), { color: 'green' })}`);
        report.push(`   Italic Text: ${styled(this.stats.italicTextCount.toString(), { color: 'green' })}`);
        
        return report.join('\n');
    }
}

// Enhanced Markdown CLI Writer with interactive menu
class MarkdownCLIWriter {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.configManager = new ConfigManager();
        this.config = null;
        
        // Handle Ctrl+C gracefully
        this.rl.on('SIGINT', () => {
            console.log(styled('\n\n👋 Goodbye! Thanks for using Markdown CLI Writer', { color: 'cyan' }));
            process.exit(0);
        });
    }

    // Main menu options configuration
    getMenuOptions() {
        return [
            {
                name: '📝 Create new markdown file',
                value: 'create',
                description: 'Convert custom syntax to Markdown format'
            },
            {
                name: '👀 Preview existing markdown',
                value: 'preview',
                description: 'View and analyze existing Markdown files'
            },
            {
                name: '🔄 Convert from custom syntax',
                value: 'convert',
                description: 'Input methods: single line, multi-line, or file'
            },
            {
                name: '📊 View statistics report',
                value: 'stats',
                description: 'Analyze Markdown file statistics and metrics'
            },
            {
                name: '📖 Help / Guide',
                value: 'help',
                description: 'Show syntax guide and usage examples'
            },
            {
                name: '⚙️  Settings',
                value: 'settings',
                description: 'Configure preferences and default options'
            },
            {
                name: '❌ Exit',
                value: 'exit',
                description: 'Close the application'
            }
        ];
    }

    // Display enhanced welcome banner
    showWelcome() {
        console.clear();
        console.log(styled('🖋️  Markdown CLI Writer', { color: 'cyan', bold: true }));
        console.log(styled('Convert custom syntax to beautiful Markdown', { color: 'white', dim: true }));
        console.log();
    }

    // Enhanced Enhanced interactive menu using inquirer
    async showEnhancedMenu() {
        if (!inquirer) {
            return this.showFallbackMenu();
        }

        const menuOptions = this.getMenuOptions();
        
        try {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: styled('What would you like to do?', { color: 'cyan', bold: true }),
                    choices: menuOptions.map(option => ({
                        name: `${option.name}\n  ${styled(option.description, { color: 'white', dim: true })}`,
                        value: option.value,
                        short: option.name
                    })),
                    default: this.config?.lastUsedMenuItem || 'create',
                    pageSize: 10,
                    prefix: '🎯',
                    suffix: ''
                }
            ]);

            // Save last used menu item
            if (this.config) {
                this.config.lastUsedMenuItem = answers.action;
                await this.configManager.saveConfig(this.config);
            }

            return answers.action;
        } catch (error) {
            // Fallback to simple menu if inquirer fails
            return this.showFallbackMenu();
        }
    }

    // Fallback menu for when inquirer is not available
    async showFallbackMenu() {
        const menuOptions = this.getMenuOptions();
        
        console.log(styled('🎯 Main Menu:', { color: 'cyan', bold: true }));
        console.log(styled('═'.repeat(60), { color: 'white' }));
        
        menuOptions.forEach((option, index) => {
            const number = styled(`${index + 1}.`, { color: 'yellow' });
            const name = styled(option.name, { color: 'white' });
            const desc = styled(`   ${option.description}`, { color: 'white', dim: true });
            console.log(`${number} ${name}`);
            console.log(desc);
        });
        
        console.log(styled('═'.repeat(60), { color: 'white' }));
        
        const choice = await this.question(styled('Choose an option (1-7): ', { color: 'cyan' }));
        const optionIndex = parseInt(choice) - 1;
        
        if (optionIndex >= 0 && optionIndex < menuOptions.length) {
            return menuOptions[optionIndex].value;
        }
        
        console.log(styled('❌ Invalid option. Please try again.', { color: 'red' }));
        await this.question(styled('Press Enter to continue...', { color: 'yellow' }));
        return this.showFallbackMenu();
    }

    // Menu action handlers
    async handleMenuAction(action) {
        switch (action) {
            case 'create':
                await this.handleCreateNewFile();
                break;
            case 'preview':
                await this.handlePreviewFile();
                break;
            case 'convert':
                await this.handleConvertSyntax();
                break;
            case 'stats':
                await this.handleStatisticsAnalysis();
                break;
            case 'help':
                await this.handleShowHelp();
                break;
            case 'settings':
                await this.handleSettings();
                break;
            case 'exit':
                return false; // Exit the application
            default:
                console.log(styled('❌ Unknown action. Please try again.', { color: 'red' }));
        }
        return true; // Continue running
    }

    // Handler: Create new markdown file
    async handleCreateNewFile() {
        console.clear();
        console.log(styled('📝 Create New Markdown File', { color: 'cyan', bold: true }));
        console.log(styled('─'.repeat(50), { color: 'white' }));
        console.log();
        
        if (inquirer) {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'inputMethod',
                    message: 'How would you like to input your content?',
                    choices: [
                        { name: '📝 Single line input', value: 'single' },
                        { name: '📄 Multi-line input', value: 'multi' },
                        { name: '📂 Load from file', value: 'file' },
                        { name: '🎯 Use example', value: 'example' }
                    ]
                }
            ]);
            
            switch (answers.inputMethod) {
                case 'single': await this.handleSingleLineInput(); break;
                case 'multi': await this.handleMultiLineInput(); break;
                case 'file': await this.handleFileInput(); break;
                case 'example': await this.runExample(); break;
            }
        } else {
            // Fallback to simple input selection
            console.log('1. Single line input');
            console.log('2. Multi-line input');
            console.log('3. Load from file');
            console.log('4. Use example');
            
            const choice = await this.question('Select input method (1-4): ');
            switch (choice) {
                case '1': await this.handleSingleLineInput(); break;
                case '2': await this.handleMultiLineInput(); break;
                case '3': await this.handleFileInput(); break;
                case '4': await this.runExample(); break;
                default:
                    console.log(styled('❌ Invalid choice', { color: 'red' }));
            }
        }
    }

    // Handler: Preview existing file
    async handlePreviewFile() {
        console.clear();
        console.log(styled('👀 Preview Existing Markdown', { color: 'cyan', bold: true }));
        console.log(styled('─'.repeat(50), { color: 'white' }));
        console.log();
        
        const filePath = await this.question('Enter path to Markdown file: ');
        
        try {
            const content = await fs.readFile(filePath, 'utf8');
            const stats = await fs.stat(filePath);
            
            console.log();
            console.log(styled('📄 File Information:', { color: 'yellow', bold: true }));
            console.log(`   Path: ${styled(filePath, { color: 'green' })}`);
            console.log(`   Size: ${styled((stats.size / 1024).toFixed(2) + ' KB', { color: 'green' })}`);
            console.log(`   Modified: ${styled(stats.mtime.toLocaleDateString(), { color: 'green' })}`);
            console.log();
            
            console.log(styled('📖 Content Preview:', { color: 'yellow', bold: true }));
            console.log(styled('─'.repeat(50), { color: 'white' }));
            
            // Show first 20 lines or full content if shorter
            const lines = content.split('\n');
            const previewLines = lines.slice(0, 20);
            
            previewLines.forEach(line => {
                if (line.startsWith('#')) {
                    console.log(styled(line, { color: 'cyan', bold: true }));
                } else if (line.startsWith('-') || line.startsWith('*')) {
                    console.log(styled(line, { color: 'green' }));
                } else if (line.startsWith('>')) {
                    console.log(styled(line, { color: 'yellow' }));
                } else {
                    console.log(line);
                }
            });
            
            if (lines.length > 20) {
                console.log(styled(`\n... and ${lines.length - 20} more lines`, { color: 'white', dim: true }));
            }
            
        } catch (error) {
            console.log(styled(`❌ Error reading file: ${error.message}`, { color: 'red' }));
        }
    }

    // Handler: Convert syntax
    async handleConvertSyntax() {
        // This delegates to the create new file handler with different messaging
        console.clear();
        console.log(styled('🔄 Convert Custom Syntax', { color: 'cyan', bold: true }));
        console.log(styled('─'.repeat(50), { color: 'white' }));
        console.log();
        
        await this.handleCreateNewFile();
    }

    // Handler: Show help and guide
    async handleShowHelp() {
        console.clear();
        this.showSyntaxGuide();
        
        if (inquirer) {
            await inquirer.prompt([
                {
                    type: 'input',
                    name: 'continue',
                    message: styled('Press Enter to continue...', { color: 'yellow' })
                }
            ]);
        } else {
            await this.question(styled('Press Enter to continue...', { color: 'yellow' }));
        }
    }

    // Handler: Settings configuration
    async handleSettings() {
        console.clear();
        console.log(styled('⚙️  Settings & Preferences', { color: 'cyan', bold: true }));
        console.log(styled('─'.repeat(50), { color: 'white' }));
        console.log();
        
        if (inquirer) {
            const currentConfig = await this.configManager.loadConfig();
            
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'preferredSyntax',
                    message: 'Preferred syntax style:',
                    choices: [
                        { name: 'Mixed (Title1/AAA both supported)', value: 'mixed' },
                        { name: 'Current syntax (Title1, Title2, etc.)', value: 'current' },
                        { name: 'PRD syntax (AAA, BBB, etc.)', value: 'prd' }
                    ],
                    default: currentConfig.preferredSyntax
                },
                {
                    type: 'input',
                    name: 'defaultOutputDir',
                    message: 'Default output directory:',
                    default: currentConfig.defaultOutputDir
                },
                {
                    type: 'confirm',
                    name: 'showWelcomeMessage',
                    message: 'Show welcome message on startup?',
                    default: currentConfig.showWelcomeMessage
                }
            ]);
            
            const newConfig = { ...currentConfig, ...answers };
            await this.configManager.saveConfig(newConfig);
            this.config = newConfig;
            
            console.log(styled('✅ Settings saved successfully!', { color: 'green' }));
        } else {
            console.log('Settings configuration requires inquirer package.');
            console.log('Current settings are using defaults.');
        }
    }

    // Core parsing methods
    parseLine(line) {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // 匹配模式: PREFIX(content)
        const match = trimmed.match(/^([A-Za-z0-9]+)\((.+)\)$/);
        if (!match) {
            console.log(styled(`⚠️  Invalid format: "${trimmed}"`, { color: 'red' }));
            console.log(styled('   Expected format: Title1(Your Content) or AAA(Your Content)', { color: 'white' }));
            return null;
        }

        const [, prefix, content] = match;
        
        if (!SYNTAX_MAP[prefix]) {
            console.log(styled(`⚠️  Unknown prefix: "${prefix}"`, { color: 'red' }));
            console.log(styled(`   Supported: ${Object.keys(SYNTAX_MAP).join(', ')}`, { color: 'white' }));
            return null;
        }

        return {
            prefix,
            content: content.trim(),
            markdown: `${SYNTAX_MAP[prefix]} ${content.trim()}`
        };
    }

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

    generateMarkdown(parsedContent) {
        return parsedContent.map(item => item.markdown).join('\n');
    }

    getFilename(parsedContent) {
        if (parsedContent.length === 0) return 'output.md';
        return `${parsedContent[0].prefix}.md`;
    }

    async saveToFile(content, filename) {
        try {
            await fs.writeFile(filename, content, 'utf8');
            console.log(styled(`✅ File saved: ${filename}`, { color: 'green' }));
            
            const stats = await fs.stat(filename);
            console.log(styled(`   Size: ${stats.size} bytes`, { color: 'white' }));
            console.log(styled(`   Path: ${path.resolve(filename)}`, { color: 'white' }));
        } catch (error) {
            console.log(styled(`❌ Error saving file: ${error.message}`, { color: 'red' }));
        }
    }

    displayMarkdown(content) {
        console.log(styled('\n📄 Generated Markdown:', { color: 'blue', bold: true }));
        console.log(styled('─'.repeat(40), { color: 'white' }));
        
        const lines = content.split('\n');
        lines.forEach(line => {
            if (line.startsWith('# ')) {
                console.log(styled(line, { color: 'red', bold: true }));
            } else if (line.startsWith('## ')) {
                console.log(styled(line, { color: 'yellow', bold: true }));
            } else if (line.startsWith('### ')) {
                console.log(styled(line, { color: 'blue', bold: true }));
            } else if (line.startsWith('- ')) {
                console.log(styled(line, { color: 'green' }));
            } else if (line.startsWith('> ')) {
                console.log(styled(line, { color: 'cyan' }));
            } else {
                console.log(line);
            }
        });
    }

    showSyntaxGuide() {
        console.clear();
        console.log(styled('📖 Markdown CLI Writer - Syntax Guide', { color: 'cyan', bold: true }));
        console.log(styled('═'.repeat(60), { color: 'white' }));
        console.log();
        
        console.log(styled('📝 Supported Syntax:', { color: 'yellow', bold: true }));
        console.log(styled('┌─────────────────┬──────────────┬───────────────────────────────────┐', { color: 'white' }));
        console.log(styled('│     Syntax      │   Markdown   │             Example               │', { color: 'white' }));
        console.log(styled('├─────────────────┼──────────────┼───────────────────────────────────┤', { color: 'white' }));
        console.log(styled('│ Title1(text)    │ # text       │ Title1(My Project) → # My Project │', { color: 'white' }));
        console.log(styled('│ Title2(text)    │ ## text      │ Title2(Features) → ## Features   │', { color: 'white' }));
        console.log(styled('│ Title3(text)    │ ### text     │ Title3(Setup) → ### Setup        │', { color: 'white' }));
        console.log(styled('│ List(text)      │ - text       │ List(Install) → - Install        │', { color: 'white' }));
        console.log(styled('│ Quote(text)     │ > text       │ Quote(Note) → > Note             │', { color: 'white' }));
        console.log(styled('├─────────────────┼──────────────┼───────────────────────────────────┤', { color: 'white' }));
        console.log(styled('│ AAA(text)       │ # text       │ AAA(My Title) → # My Title       │', { color: 'cyan' }));
        console.log(styled('│ BBB(text)       │ ## text      │ BBB(Section) → ## Section        │', { color: 'cyan' }));
        console.log(styled('│ CCC(text)       │ ### text     │ CCC(Subsection) → ### Subsection │', { color: 'cyan' }));
        console.log(styled('│ DDD(text)       │ - text       │ DDD(Item) → - Item               │', { color: 'cyan' }));
        console.log(styled('│ EEE(text)       │ > text       │ EEE(Quote) → > Quote             │', { color: 'cyan' }));
        console.log(styled('└─────────────────┴──────────────┴───────────────────────────────────┘', { color: 'white' }));
        console.log();
        
        console.log(styled('💡 Quick Tips:', { color: 'yellow', bold: true }));
        console.log('• Use Title1/AAA for main headings');
        console.log('• Use Title2/BBB for section headings');
        console.log('• Use Title3/CCC for subsection headings');
        console.log('• Use List/DDD for list items');
        console.log('• Use Quote/EEE for important quotes');
        console.log('• Both syntax styles work interchangeably');
        console.log();
    }

    // Process input and handle the full workflow
    async processInput(input) {
        const parsedContent = this.parseInput(input);
        
        if (parsedContent.length === 0) {
            console.log(styled('❌ No valid syntax found in input', { color: 'red' }));
            return;
        }

        const markdownContent = this.generateMarkdown(parsedContent);
        this.displayMarkdown(markdownContent);

        const shouldSave = await this.askSaveFile();

        if (shouldSave) {
            const defaultFilename = this.getFilename(parsedContent);
            const filename = await this.askCustomFilename(defaultFilename);
            await this.saveToFile(markdownContent, filename);
        } else {
            console.log(styled('\n📄 Markdown content displayed above', { color: 'white' }));
        }
    }

    async askSaveFile() {
        if (inquirer) {
            const answer = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'save',
                    message: 'Do you want to save this as a .md file?',
                    default: true
                }
            ]);
            return answer.save;
        } else {
            const answer = await this.question('Do you want to save this as a .md file? (Y/N): ');
            return answer.toLowerCase().startsWith('y');
        }
    }

    async askCustomFilename(defaultName) {
        if (inquirer) {
            const answers = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'useDefault',
                    message: `Use default filename "${defaultName}"?`,
                    default: true
                }
            ]);
            
            if (answers.useDefault) {
                return defaultName;
            }
            
            const filenameAnswer = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'filename',
                    message: 'Enter custom filename (without .md extension):',
                    validate: (input) => {
                        if (!input.trim()) {
                            return 'Please enter a valid filename';
                        }
                        return true;
                    }
                }
            ]);
            
            return `${filenameAnswer.filename.trim()}.md`;
        } else {
            const useDefault = await this.question(`Use default filename "${defaultName}"? (Y/N): `);
            
            if (useDefault.toLowerCase().startsWith('y')) {
                return defaultName;
            }
            
            const customName = await this.question('Enter custom filename (without .md extension): ');
            return `${customName.trim()}.md`;
        }
    }

    // Input handling methods
    async handleSingleLineInput() {
        console.clear();
        console.log(styled('📝 Single Line Input Mode', { color: 'cyan', bold: true }));
        console.log(styled('─'.repeat(40), { color: 'white' }));
        console.log('Format: PREFIX(content)');
        console.log('Example: Title1(My Title) or AAA(My Title)');
        console.log();
        
        const input = await this.question('Enter your syntax: ');
        await this.processInput(input);
    }

    async handleMultiLineInput() {
        console.clear();
        console.log(styled('📄 Multi-Line Input Mode', { color: 'cyan', bold: true }));
        console.log(styled('─'.repeat(40), { color: 'white' }));
        console.log('Enter multiple lines. Type "END" to finish.');
        console.log();
        
        const lines = [];
        while (true) {
            const line = await this.question('> ');
            if (line.toUpperCase() === 'END') break;
            lines.push(line);
        }
        
        await this.processInput(lines.join('\n'));
    }

    async handleFileInput() {
        console.clear();
        console.log(styled('📂 File Input Mode', { color: 'cyan', bold: true }));
        console.log(styled('─'.repeat(40), { color: 'white' }));
        
        const filepath = await this.question('Enter file path: ');
        try {
            const content = await fs.readFile(filepath, 'utf8');
            console.log(styled(`✅ File loaded: ${filepath}`, { color: 'green' }));
            await this.processInput(content);
        } catch (error) {
            console.log(styled(`❌ Error reading file: ${error.message}`, { color: 'red' }));
        }
    }

    async runExample() {
        console.clear();
        console.log(styled('🎯 Example Mode', { color: 'cyan', bold: true }));
        console.log(styled('─'.repeat(40), { color: 'white' }));
        
        const examples = [
            {
                name: 'Current Syntax',
                content: `Title1(Sample Documentation)
Title2(Getting Started)
Title3(Prerequisites)
List(Node.js installed)
List(Basic CLI knowledge)
Title2(Features)
List(Convert syntax to Markdown)
List(Save as .md files)
Quote(Perfect for quick documentation!)`
            },
            {
                name: 'PRD Syntax',
                content: `AAA(Sample Documentation)
BBB(Getting Started)
CCC(Prerequisites)
DDD(Node.js installed)
DDD(Basic CLI knowledge)
BBB(Features)
DDD(Convert syntax to Markdown)
DDD(Save as .md files)
EEE(Perfect for quick documentation!)`
            },
            {
                name: 'Mixed Syntax',
                content: `AAA(Mixed Example)
Title2(Current and PRD Together)
CCC(Subsection)
List(Current list item)
DDD(PRD list item)
Quote(Current quote)
EEE(PRD quote)`
            }
        ];
        
        if (inquirer) {
            const answer = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'example',
                    message: 'Choose an example:',
                    choices: examples.map((ex, i) => ({
                        name: ex.name,
                        value: i
                    }))
                }
            ]);
            
            await this.processInput(examples[answer.example].content);
        } else {
            console.log('Available examples:');
            examples.forEach((ex, i) => {
                console.log(`${i + 1}. ${ex.name}`);
            });
            
            const choice = await this.question('Choose example (1-3): ');
            const index = parseInt(choice) - 1;
            
            if (index >= 0 && index < examples.length) {
                await this.processInput(examples[index].content);
            } else {
                console.log(styled('❌ Invalid choice', { color: 'red' }));
            }
        }
    }

    async handleStatisticsAnalysis() {
        console.clear();
        console.log(styled('📊 Markdown Statistics Analysis', { color: 'cyan', bold: true }));
        console.log(styled('─'.repeat(50), { color: 'white' }));
        
        const filepath = await this.question('Enter path to Markdown file: ');
        
        try {
            const content = await fs.readFile(filepath, 'utf8');
            const analyzer = new MarkdownAnalyzer();
            const stats = analyzer.analyzeFile(content);
            const filename = path.basename(filepath);
            
            console.log(analyzer.generateReport('console'));
            
            if (inquirer) {
                const answer = await inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'saveJson',
                        message: 'Save statistics as JSON file?',
                        default: false
                    }
                ]);
                
                if (answer.saveJson) {
                    const jsonReport = analyzer.generateReport('json');
                    const jsonFilename = `${filename.replace('.md', '')}-stats.json`;
                    await fs.writeFile(jsonFilename, jsonReport, 'utf8');
                    console.log(styled(`✅ JSON report saved: ${jsonFilename}`, { color: 'green' }));
                }
            }
            
        } catch (error) {
            console.log(styled(`❌ Error analyzing file: ${error.message}`, { color: 'red' }));
        }
    }

    // Question helper for readline
    question(prompt) {
        return new Promise((resolve) => {
            this.rl.question(prompt, (answer) => {
                resolve(answer.trim());
            });
        });
    }
    
    // Updated main run method with enhanced menu
    async run() {
        // Load configuration
        this.config = await this.configManager.loadConfig();
        
        // Show welcome message if configured
        if (this.config.showWelcomeMessage) {
            this.showWelcome();
        }
        
        // Main application loop with enhanced menu
        while (true) {
            try {
                const action = await this.showEnhancedMenu();
                const shouldContinue = await this.handleMenuAction(action);
                
                if (!shouldContinue) {
                    console.log(styled('\n👋 Thanks for using Markdown CLI Writer!', { color: 'cyan', bold: true }));
                    console.log(styled('Have a great day! ✨', { color: 'white', dim: true }));
                    break;
                }
                
                // Pause before returning to menu (except for exit)
                if (action !== 'exit') {
                    if (inquirer) {
                        await inquirer.prompt([
                            {
                                type: 'input',
                                name: 'continue',
                                message: styled('\nPress Enter to return to main menu...', { color: 'yellow' })
                            }
                        ]);
                    } else {
                        await this.question(styled('\nPress Enter to return to main menu...', { color: 'yellow' }));
                    }
                    
                    if (this.config.showWelcomeMessage) {
                        this.showWelcome();
                    }
                }
            } catch (error) {
                console.error(styled(`\n❌ An error occurred: ${error.message}`, { color: 'red' }));
                await this.question(styled('Press Enter to continue...', { color: 'yellow' }));
            }
        }
        
        this.rl.close();
    }

    // ... (Include all remaining methods from the original file - parsing, validation, file operations, etc.)
    // (For brevity, I'm not including all the existing methods here, but they should be copied over)
}

// ... (Include all remaining classes and functions from the original file)

// Start the application
if (require.main === module) {
    const args = process.argv.slice(2);
    
    // Handle CLI commands
    if (args.includes('--version') || args.includes('-v')) {
        const packageJson = require('./package.json');
        console.log(`Markdown CLI Writer v${packageJson.version}`);
        process.exit(0);
    }
    
    if (args.includes('--help') || args.includes('-h')) {
        console.log(`
🖋️  Markdown CLI Writer - Help

Usage:
  cli start           Start the interactive menu
  cli --version       Show version
  cli --help          Show this help

Examples:
  cli start           # Launch enhanced menu
  npm start           # Alternative way to launch
  npm run start-simple # Simple menu
        `);
        process.exit(0);
    }
    
    // If 'start' argument or no arguments, run the app
    if (args.includes('start') || args.length === 0) {
        const app = new MarkdownCLIWriter();
        app.run().catch(error => {
            console.error(styled('💥 Fatal error:', { color: 'red', bold: true }), error);
            process.exit(1);
        });
    } else {
        console.log(styled('❌ Unknown command. Use "cli --help" for usage information.', { color: 'red' }));
        process.exit(1);
    }
}

module.exports = { MarkdownCLIWriter, MarkdownAnalyzer };
