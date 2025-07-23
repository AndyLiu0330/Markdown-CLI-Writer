#!/usr/bin/env node

// 快速示範 Markdown CLI Writer
const MarkdownCLIWriter = require('./md-cli.js');

console.log('🎬 Markdown CLI Writer Demo\n');

// 建立示範內容
const demoContent = `Title1(Project Documentation)
Title2(Getting Started)
Title3(Prerequisites)
List(Node.js version 14 or higher)
List(Basic command line knowledge)
Title3(Installation)
List(Clone the repository)
List(Run npm start)
Title2(Features)
List(Convert custom syntax to Markdown)
List(Save as .md files)
List(Multiple input methods)
Quote(This tool makes documentation writing faster!)
Title1(Conclusion)
Quote(Happy documenting!)`;

console.log('📝 Demo Input:');
console.log('─'.repeat(50));
console.log(demoContent);
console.log('─'.repeat(50));

// 建立工具實例並解析
const writer = new MarkdownCLIWriter();
const parsed = writer.parseInput(demoContent);
const markdown = writer.generateMarkdown(parsed);

console.log('\n📄 Generated Markdown:');
console.log('─'.repeat(50));
writer.displayMarkdown(markdown);

// 儲存示範檔案
const fs = require('fs').promises;

async function saveDemo() {
    try {
        await fs.writeFile('demo-output.md', markdown, 'utf8');
        console.log('\n✅ Demo file saved as: demo-output.md');
        console.log('🎯 Try running: npm start');
    } catch (error) {
        console.log(`❌ Error saving demo: ${error.message}`);
    }
}

saveDemo();
