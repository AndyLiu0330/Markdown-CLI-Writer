#!/usr/bin/env node

// 快速示範 Markdown CLI Writer
const MarkdownCLIWriter = require('./md-cli.js');

console.log('🎬 Markdown CLI Writer Demo\n');

// 建立示範內容
const demoContent = `AAA(Project Documentation)
BBB(Getting Started)
CCC(Prerequisites)
DDD(Node.js version 14 or higher)
DDD(Basic command line knowledge)
CCC(Installation)
DDD(Clone the repository)
DDD(Run npm start)
BBB(Features)
DDD(Convert custom syntax to Markdown)
DDD(Save as .md files)
DDD(Multiple input methods)
EEE(This tool makes documentation writing faster!)
AAA(Conclusion)
EEE(Happy documenting!)`;

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
