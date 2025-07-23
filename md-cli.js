#!/usr/bin/env node

const readline = require('readline');
const fs = require('fs').promises;
const path = require('path');

// ANSI 顏色代碼
const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    bold: '\x1b[1m'
};

// 顏色輔助函數
function colorize(text, color) {
    return `${colors[color]}${text}${colors.reset}`;
}

// Markdown syntax mapping
const SYNTAX_MAP = {
    'Title1': '#',      // Heading 1
    'Title2': '##',     // Heading 2
    'Title3': '###',    // Heading 3
    'List': '-',        // List item
    'Quote': '>'        // Quote
};

class MarkdownCLIWriter {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // 顯示歡迎訊息
    showWelcome() {
        console.clear();
        console.log(colorize('🖋️  Markdown CLI Writer', 'cyan'));
        console.log(colorize('Convert custom syntax to Markdown format\n', 'white'));
        console.log(colorize('Type /guide to see syntax table and examples', 'yellow'));
        console.log();
    }

    // 顯示主選單
    showMainMenu() {
        console.log(colorize('📋 Main Menu:', 'blue'));
        console.log(colorize('═'.repeat(50), 'white'));
        console.log('1. 📝 Single line input');
        console.log('2. 📄 Multi-line input');
        console.log('3. 📂 Load from file');
        console.log('4. 🎯 Example mode');
        console.log('5. 📖 Show syntax guide (/guide)');
        console.log('0. ❌ Exit');
        console.log(colorize('═'.repeat(50), 'white'));
        console.log();
    }

    // 顯示語法指南
    showSyntaxGuide() {
        console.clear();
        console.log(colorize('📖 Markdown CLI Writer - Syntax Guide', 'cyan'));
        console.log(colorize('═'.repeat(60), 'white'));
        console.log();
        
        // 語法表格
        console.log(colorize('📝 Supported Syntax:', 'yellow'));
        console.log(colorize('┌─────────────────┬──────────────┬───────────────────────────────────┐', 'white'));
        console.log(colorize('│     Syntax      │   Markdown   │             Example               │', 'white'));
        console.log(colorize('├─────────────────┼──────────────┼───────────────────────────────────┤', 'white'));
        console.log(colorize('│ Title1(text)    │ # text       │ Title1(My Project) → # My Project │', 'white'));
        console.log(colorize('│ Title2(text)    │ ## text      │ Title2(Features) → ## Features   │', 'white'));
        console.log(colorize('│ Title3(text)    │ ### text     │ Title3(Setup) → ### Setup        │', 'white'));
        console.log(colorize('│ List(text)      │ - text       │ List(Install) → - Install        │', 'white'));
        console.log(colorize('│ Quote(text)     │ > text       │ Quote(Note) → > Note             │', 'white'));
        console.log(colorize('└─────────────────┴──────────────┴───────────────────────────────────┘', 'white'));
        console.log();

        // 完整範例
        console.log(colorize('🎯 Complete Example:', 'yellow'));
        console.log(colorize('─'.repeat(30), 'white'));
        console.log(colorize('Input:', 'blue'));
        console.log('Title1(My Project Documentation)');
        console.log('Title2(Getting Started)');
        console.log('Title3(Prerequisites)');
        console.log('List(Node.js version 14+)');
        console.log('List(Basic CLI knowledge)');
        console.log('Title2(Features)');
        console.log('List(Convert custom syntax)');
        console.log('List(Save as .md files)');
        console.log('Quote(Perfect for quick docs!)');
        console.log();
        
        console.log(colorize('Output:', 'blue'));
        console.log(colorize('# My Project Documentation', 'red'));
        console.log(colorize('## Getting Started', 'yellow'));
        console.log(colorize('### Prerequisites', 'blue'));
        console.log(colorize('- Node.js version 14+', 'green'));
        console.log(colorize('- Basic CLI knowledge', 'green'));
        console.log(colorize('## Features', 'yellow'));
        console.log(colorize('- Convert custom syntax', 'green'));
        console.log(colorize('- Save as .md files', 'green'));
        console.log(colorize('> Perfect for quick docs!', 'cyan'));
        console.log();

        // 使用提示
        console.log(colorize('💡 Quick Tips:', 'yellow'));
        console.log('• Use Title1 for main headings');
        console.log('• Use Title2 for section headings');
        console.log('• Use Title3 for subsection headings');
        console.log('• Use List for list items');
        console.log('• Use Quote for important quotes');
        console.log();
        console.log(colorize('═'.repeat(60), 'white'));
    }

    // 解析單行輸入
    parseLine(line) {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // 匹配模式: PREFIX(content)
        const match = trimmed.match(/^([A-Za-z0-9]+)\((.+)\)$/);
        if (!match) {
            console.log(colorize(`⚠️  Invalid format: "${trimmed}"`, 'red'));
            console.log(colorize('   Expected format: Title1(Your Content)', 'white'));
            return null;
        }

        const [, prefix, content] = match;
        
        if (!SYNTAX_MAP[prefix]) {
            console.log(colorize(`⚠️  Unknown prefix: "${prefix}"`, 'red'));
            console.log(colorize(`   Supported: ${Object.keys(SYNTAX_MAP).join(', ')}`, 'white'));
            return null;
        }

        return {
            prefix,
            content: content.trim(),
            markdown: `${SYNTAX_MAP[prefix]} ${content.trim()}`
        };
    }

    // 解析多行輸入
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

    // 生成 Markdown 內容
    generateMarkdown(parsedContent) {
        return parsedContent.map(item => item.markdown).join('\n');
    }

    // 根據第一個前綴決定檔名
    getFilename(parsedContent) {
        if (parsedContent.length === 0) return 'output.md';
        return `${parsedContent[0].prefix}.md`;
    }

    // 儲存 Markdown 到檔案
    async saveToFile(content, filename) {
        try {
            await fs.writeFile(filename, content, 'utf8');
            console.log(colorize(`✅ File saved: ${filename}`, 'green'));
            
            // 顯示檔案資訊
            const stats = await fs.stat(filename);
            console.log(colorize(`   Size: ${stats.size} bytes`, 'white'));
            console.log(colorize(`   Path: ${path.resolve(filename)}`, 'white'));
        } catch (error) {
            console.log(colorize(`❌ Error saving file: ${error.message}`, 'red'));
        }
    }

    // 在終端顯示 Markdown
    displayMarkdown(content) {
        console.log(colorize('\n📄 Generated Markdown:', 'blue'));
        console.log(colorize('─'.repeat(40), 'white'));
        
        // 為不同的 Markdown 元素上色
        const lines = content.split('\n');
        lines.forEach(line => {
            if (line.startsWith('# ')) {
                console.log(colorize(line, 'red'));
            } else if (line.startsWith('## ')) {
                console.log(colorize(line, 'yellow'));
            } else if (line.startsWith('### ')) {
                console.log(colorize(line, 'blue'));
            } else if (line.startsWith('- ')) {
                console.log(colorize(line, 'green'));
            } else if (line.startsWith('> ')) {
                console.log(colorize(line, 'cyan'));
            } else {
                console.log(line);
            }
        });
        
        console.log(colorize('─'.repeat(40), 'white'));
    }

    // 提問函數
    async question(prompt) {
        return new Promise((resolve) => {
            this.rl.question(prompt, (answer) => {
                // 檢查特殊命令
                if (answer.toLowerCase() === '/guide') {
                    console.log();
                    this.showSyntaxGuide();
                    console.log(colorize('\n按 Enter 鍵繼續...', 'yellow'));
                    this.rl.question('', () => {
                        resolve(this.question(prompt));
                    });
                } else {
                    resolve(answer);
                }
            });
        });
    }

    // 詢問是否儲存檔案
    async askSaveFile() {
        const answer = await this.question('Do you want to save this as a .md file? (Y/N): ');
        return answer.toLowerCase().startsWith('y');
    }

    // 詢問自定義檔名
    async askCustomFilename(defaultName) {
        const useDefault = await this.question(`Use default filename "${defaultName}"? (Y/N): `);
        
        if (useDefault.toLowerCase().startsWith('y')) {
            return defaultName;
        }
        
        const customName = await this.question('Enter custom filename (without .md extension): ');
        return `${customName.trim()}.md`;
    }

    // 主要應用程式流程
    async run() {
        this.showWelcome();
        
        while (true) {
            this.showMainMenu();
            
            const choice = await this.question(colorize('請選擇選項 (0-5): ', 'cyan'));
            
            // 檢查特殊命令
            if (choice.toLowerCase() === '/guide' || choice === '5') {
                this.showSyntaxGuide();
                await this.question(colorize('\n按 Enter 鍵回到主選單...', 'yellow'));
                console.clear();
                this.showWelcome();
                continue;
            }
            
            switch (choice) {
                case '1':
                    await this.handleSingleLineInput();
                    break;
                case '2':
                    await this.handleMultiLineInput();
                    break;
                case '3':
                    await this.handleFileInput();
                    break;
                case '4':
                    await this.runExample();
                    break;
                case '0':
                    console.log(colorize('\n👋 感謝使用 Markdown CLI Writer！', 'cyan'));
                    this.rl.close();
                    return;
                default:
                    console.log(colorize('❌ 無效的選項，請選擇 0-5', 'red'));
                    await this.question(colorize('按 Enter 鍵繼續...', 'yellow'));
                    console.clear();
                    this.showWelcome();
            }
            
            if (choice !== '0') {
                await this.question(colorize('\n按 Enter 鍵回到主選單...', 'yellow'));
                console.clear();
                this.showWelcome();
            }
        }
    }

    // 處理單行輸入
    async handleSingleLineInput() {
        console.clear();
        console.log(colorize('📝 Single Line Input Mode', 'cyan'));
        console.log(colorize('─'.repeat(40), 'white'));
        console.log('Format: PREFIX(content)');
        console.log('Example: Title1(My Title)');
        console.log();
        
        const input = await this.question('Enter your syntax: ');
        await this.processInput(input);
    }

    // 處理多行輸入
    async handleMultiLineInput() {
        console.clear();
        console.log(colorize('📄 Multi-Line Input Mode', 'cyan'));
        console.log(colorize('─'.repeat(40), 'white'));
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

    // 處理檔案輸入
    async handleFileInput() {
        console.clear();
        console.log(colorize('📂 File Input Mode', 'cyan'));
        console.log(colorize('─'.repeat(40), 'white'));
        
        const filepath = await this.question('Enter file path: ');
        try {
            const content = await fs.readFile(filepath, 'utf8');
            console.log(colorize(`✅ File loaded: ${filepath}`, 'green'));
            await this.processInput(content);
        } catch (error) {
            console.log(colorize(`❌ Error reading file: ${error.message}`, 'red'));
        }
    }

    // 運行範例
    async runExample() {
        console.clear();
        console.log(colorize('🎯 Example Mode', 'cyan'));
        console.log(colorize('─'.repeat(40), 'white'));
        
        const example = `Title1(Sample Documentation)
Title2(Getting Started)
Title3(Prerequisites)
List(Node.js installed)
List(Basic CLI knowledge)
Title2(Features)
List(Convert syntax to Markdown)
List(Save as .md files)
Quote(Perfect for quick documentation!)`;
        
        console.log(colorize('Using example content:', 'yellow'));
        console.log(example);
        console.log();
        
        await this.processInput(example);
    }

    // 處理輸入並生成 Markdown
    async processInput(input) {
        if (!input.trim()) {
            console.log(colorize('⚠️  No content provided', 'yellow'));
            return;
        }

        // 解析輸入
        console.log(colorize('\n🔄 Parsing input...', 'blue'));
        const parsedContent = this.parseInput(input);

        if (parsedContent.length === 0) {
            console.log(colorize('❌ No valid content to process', 'red'));
            return;
        }

        // 生成 Markdown
        const markdownContent = this.generateMarkdown(parsedContent);
        
        // 顯示預覽
        this.displayMarkdown(markdownContent);

        // 詢問是否儲存
        const shouldSave = await this.askSaveFile();

        if (shouldSave) {
            const defaultFilename = this.getFilename(parsedContent);
            const filename = await this.askCustomFilename(defaultFilename);
            await this.saveToFile(markdownContent, filename);
        } else {
            console.log(colorize('\n📄 Markdown content displayed above', 'white'));
        }
    }
}

// 優雅處理 Ctrl+C
process.on('SIGINT', () => {
    console.log(colorize('\n\n👋 Goodbye!', 'yellow'));
    process.exit(0);
});

// 執行應用程式
if (require.main === module) {
    const app = new MarkdownCLIWriter();
    app.run();
}

module.exports = MarkdownCLIWriter;
