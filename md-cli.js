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
    'AAA': '#',      // Heading 1
    'BBB': '##',     // Heading 2
    'CCC': '###',    // Heading 3
    'DDD': '-',      // List item
    'EEE': '>'       // Quote
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
        console.log(colorize('Supported syntax:', 'yellow'));
        console.log(colorize('  AAA(text) → # Heading 1', 'white'));
        console.log(colorize('  BBB(text) → ## Heading 2', 'white'));
        console.log(colorize('  CCC(text) → ### Heading 3', 'white'));
        console.log(colorize('  DDD(text) → - List item', 'white'));
        console.log(colorize('  EEE(text) → > Quote', 'white'));
        console.log();
    }

    // 解析單行輸入
    parseLine(line) {
        const trimmed = line.trim();
        if (!trimmed) return null;

        // 匹配模式: PREFIX(content)
        const match = trimmed.match(/^([A-Z]{3})\((.+)\)$/);
        if (!match) {
            console.log(colorize(`⚠️  Invalid format: "${trimmed}"`, 'red'));
            console.log(colorize('   Expected format: AAA(Your Content)', 'white'));
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
            this.rl.question(prompt, resolve);
        });
    }

    // 收集輸入
    async collectInput() {
        console.log(colorize('📝 Input Methods:', 'yellow'));
        console.log('1. Single line input');
        console.log('2. Multi-line input');
        console.log('3. Load from file');
        console.log('4. Example mode');
        
        const choice = await this.question('\nChoose input method (1-4): ');
        
        switch (choice.trim()) {
            case '1':
                return await this.question('Enter your syntax (e.g., AAA(My Title)): ');
                
            case '2':
                console.log(colorize('\n📝 Multi-line input mode', 'yellow'));
                console.log(colorize('Enter your content line by line. Type "END" to finish.\n', 'white'));
                
                const lines = [];
                let lineNum = 1;
                while (true) {
                    const line = await this.question(`Line ${lineNum}: `);
                    if (line.trim().toUpperCase() === 'END') break;
                    if (line.trim()) lines.push(line);
                    lineNum++;
                }
                return lines.join('\n');
                
            case '3':
                const filepath = await this.question('Enter file path: ');
                try {
                    return await fs.readFile(filepath, 'utf8');
                } catch (error) {
                    console.log(colorize(`❌ Error reading file: ${error.message}`, 'red'));
                    return await this.collectInput();
                }
                
            case '4':
                console.log(colorize('\n🎯 Using example content:', 'yellow'));
                const example = `BBB(Health Tips)\nDDD(Less Sugar)\nDDD(More Veggies)\nEEE(Remember to stay hydrated!)`;
                console.log(colorize(example, 'white'));
                return example;
                
            default:
                console.log(colorize('Invalid choice. Please try again.', 'red'));
                return await this.collectInput();
        }
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
        try {
            this.showWelcome();

            while (true) {
                // 收集輸入
                const input = await this.collectInput();
                if (!input.trim()) {
                    console.log(colorize('⚠️  No content provided', 'yellow'));
                    continue;
                }

                // 解析輸入
                console.log(colorize('\n🔄 Parsing input...', 'blue'));
                const parsedContent = this.parseInput(input);

                if (parsedContent.length === 0) {
                    console.log(colorize('❌ No valid content to process', 'red'));
                    
                    const retry = await this.question('Would you like to try again? (Y/N): ');
                    if (!retry.toLowerCase().startsWith('y')) break;
                    continue;
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

                // 詢問是否繼續
                const continueApp = await this.question('Would you like to process more content? (Y/N): ');
                if (!continueApp.toLowerCase().startsWith('y')) break;
                
                console.clear();
                this.showWelcome();
            }

            console.log(colorize('\n👋 Thank you for using Markdown CLI Writer!', 'green'));
            this.rl.close();

        } catch (error) {
            console.log(colorize(`\n❌ An error occurred: ${error.message}`, 'red'));
            this.rl.close();
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
