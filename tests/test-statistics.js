const { MarkdownCLIWriter, MarkdownAnalyzer } = require('../bin/md-cli-enhanced.js');

async function testStatistics() {
    console.log('🧪 Testing Markdown Statistics Analysis...\n');
    
    // Test analyzer directly
    const analyzer = new MarkdownAnalyzer();
    const testMarkdown = `# Test Document
## Introduction
This is a test document with some content.

### Features
- List item 1
- List item 2
- List item 3

> This is a quote

Some **bold text** and *italic text*.

[A link](https://example.com)

![An image](image.jpg)

\`\`\`javascript
console.log('Hello World');
\`\`\`
`;

    console.log('📝 Test Markdown Content:');
    console.log('─'.repeat(40));
    console.log(testMarkdown);
    console.log('─'.repeat(40));
    console.log();
    
    // Analyze the content
    const stats = analyzer.analyzeFile(testMarkdown);
    
    console.log('📊 Analysis Results:');
    console.log(`   Word Count: ${stats.wordCount}`);
    console.log(`   Total Lines: ${stats.totalLines}`);
    console.log(`   Paragraphs: ${stats.paragraphCount}`);
    console.log(`   H1 Headings: ${stats.headingLevels.h1}`);
    console.log(`   H2 Headings: ${stats.headingLevels.h2}`);
    console.log(`   H3 Headings: ${stats.headingLevels.h3}`);
    console.log(`   List Items: ${stats.listItemCount}`);
    console.log(`   Quote Lines: ${stats.quoteCount}`);
    console.log(`   Links: ${stats.linkCount}`);
    console.log(`   Images: ${stats.imageCount}`);
    console.log(`   Code Blocks: ${stats.codeBlockCount}`);
    console.log(`   Bold Text: ${stats.boldTextCount}`);
    console.log(`   Italic Text: ${stats.italicTextCount}`);
    
    console.log('\n📄 Generated Report:');
    console.log(analyzer.generateReport('console'));
    
    console.log('\n✅ Statistics analysis test completed!');
}

testStatistics().catch(console.error);
