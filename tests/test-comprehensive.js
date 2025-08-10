#!/usr/bin/env node

// Comprehensive test suite for Markdown CLI Writer
const { MarkdownCLIWriter, MarkdownAnalyzer } = require('../bin/md-cli-simple.js');

function testSyntaxParsing() {
    console.log('🧪 Testing Syntax Parsing...');
    
    const app = new MarkdownCLIWriter();
    
    // Test current syntax
    const currentTests = [
        { input: 'Title1(Main Heading)', expected: '# Main Heading' },
        { input: 'Title2(Section)', expected: '## Section' },
        { input: 'Title3(Subsection)', expected: '### Subsection' },
        { input: 'List(Item)', expected: '- Item' },
        { input: 'Quote(Quote text)', expected: '> Quote text' }
    ];
    
    // Test PRD syntax
    const prdTests = [
        { input: 'AAA(Main Heading)', expected: '# Main Heading' },
        { input: 'BBB(Section)', expected: '## Section' },
        { input: 'CCC(Subsection)', expected: '### Subsection' },
        { input: 'DDD(Item)', expected: '- Item' },
        { input: 'EEE(Quote text)', expected: '> Quote text' }
    ];
    
    let passed = 0;
    let total = 0;
    
    [...currentTests, ...prdTests].forEach(test => {
        total++;
        const result = app.parseLine(test.input);
        if (result && result.markdown === test.expected) {
            console.log(`✅ ${test.input} → ${test.expected}`);
            passed++;
        } else {
            console.log(`❌ ${test.input} → Expected: ${test.expected}, Got: ${result?.markdown || 'null'}`);
        }
    });
    
    console.log(`\n📊 Syntax Tests: ${passed}/${total} passed\n`);
    return passed === total;
}

function testMultilineParsing() {
    console.log('🧪 Testing Multiline Parsing...');
    
    const app = new MarkdownCLIWriter();
    
    const input = `AAA(Project Title)
BBB(Section One)
DDD(List item 1)
DDD(List item 2)
EEE(Important note)`;
    
    const expected = `# Project Title
## Section One
- List item 1
- List item 2
> Important note`;
    
    const parsed = app.parseInput(input);
    const result = app.generateMarkdown(parsed);
    
    if (result === expected) {
        console.log('✅ Multiline parsing works correctly');
        console.log('📄 Generated:\n', result);
        console.log();
        return true;
    } else {
        console.log('❌ Multiline parsing failed');
        console.log('Expected:\n', expected);
        console.log('Got:\n', result);
        console.log();
        return false;
    }
}

function testMixedSyntax() {
    console.log('🧪 Testing Mixed Syntax Support...');
    
    const app = new MarkdownCLIWriter();
    
    const input = `Title1(Mixed Example)
BBB(PRD Section)
List(Current list item)
DDD(PRD list item)
Quote(Current quote)
EEE(PRD quote)`;
    
    const expected = `# Mixed Example
## PRD Section
- Current list item
- PRD list item
> Current quote
> PRD quote`;
    
    const parsed = app.parseInput(input);
    const result = app.generateMarkdown(parsed);
    
    if (result === expected) {
        console.log('✅ Mixed syntax works correctly');
        console.log('📄 Generated:\n', result);
        console.log();
        return true;
    } else {
        console.log('❌ Mixed syntax failed');
        console.log('Expected:\n', expected);
        console.log('Got:\n', result);
        console.log();
        return false;
    }
}

function testErrorHandling() {
    console.log('🧪 Testing Error Handling...');
    
    const app = new MarkdownCLIWriter();
    
    const invalidInputs = [
        'InvalidSyntax(content)',
        'Title1content)',
        'Title1(content',
        '',
        '   '
    ];
    
    let passed = 0;
    
    invalidInputs.forEach(input => {
        const result = app.parseLine(input);
        if (result === null) {
            console.log(`✅ Correctly rejected: "${input}"`);
            passed++;
        } else {
            console.log(`❌ Should have rejected: "${input}"`);
        }
    });
    
    console.log(`\n📊 Error Handling Tests: ${passed}/${invalidInputs.length} passed\n`);
    return passed === invalidInputs.length;
}

function testFilenameGeneration() {
    console.log('🧪 Testing Filename Generation...');
    
    const app = new MarkdownCLIWriter();
    
    const tests = [
        { 
            input: 'AAA(Title)', 
            expected: 'AAA.md',
            description: 'PRD syntax filename'
        },
        { 
            input: 'Title1(Title)', 
            expected: 'Title1.md',
            description: 'Current syntax filename'
        }
    ];
    
    let passed = 0;
    
    tests.forEach(test => {
        const parsed = app.parseInput(test.input);
        const filename = app.getFilename(parsed);
        
        if (filename === test.expected) {
            console.log(`✅ ${test.description}: ${filename}`);
            passed++;
        } else {
            console.log(`❌ ${test.description}: Expected ${test.expected}, got ${filename}`);
        }
    });
    
    console.log(`\n📊 Filename Tests: ${passed}/${tests.length} passed\n`);
    return passed === tests.length;
}

function testStatisticsAnalyzer() {
    console.log('🧪 Testing Statistics Analyzer...');
    
    const analyzer = new MarkdownAnalyzer();
    
    const testMarkdown = `# Main Title
## Section One
This is a paragraph with **bold** and *italic* text.

### Subsection
- List item 1
- List item 2
- List item 3

> This is a quote
> With multiple lines

Check out [this link](https://example.com) and ![this image](image.png).

\`\`\`javascript
console.log("Hello World");
\`\`\`

Another paragraph here.`;
    
    const stats = analyzer.analyzeMarkdown(testMarkdown);
    
    let passed = 0;
    const tests = [
        { property: 'wordCount', expected: 43, description: 'Word count' }, // More accurate count
        { property: 'headingLevels.h1', expected: 1, description: 'H1 headings' },
        { property: 'headingLevels.h2', expected: 1, description: 'H2 headings' },
        { property: 'headingLevels.h3', expected: 1, description: 'H3 headings' },
        { property: 'listItemCount', expected: 3, description: 'List items' },
        { property: 'quoteCount', expected: 2, description: 'Quote lines' },
        { property: 'linkCount', expected: 2, description: 'Links' }, // Both link and image link
        { property: 'imageCount', expected: 1, description: 'Images' },
        { property: 'codeBlockCount', expected: 2, description: 'Code blocks' } // Opening and closing ```
    ];
    
    tests.forEach(test => {
        const actual = test.property.includes('.') ? 
            test.property.split('.').reduce((obj, key) => obj[key], stats) : 
            stats[test.property];
            
        if (actual === test.expected) {
            console.log(`✅ ${test.description}: ${actual}`);
            passed++;
        } else {
            console.log(`❌ ${test.description}: Expected ${test.expected}, got ${actual}`);
        }
    });
    
    // Test report generation
    try {
        const consoleReport = analyzer.generateReport('test.md', 'console');
        const jsonReport = analyzer.generateReport('test.md', 'json');
        
        if (consoleReport.includes('📊 Markdown Statistics Report') && 
            JSON.parse(jsonReport).filename === 'test.md') {
            console.log('✅ Report generation works correctly');
            passed++;
        } else {
            console.log('❌ Report generation failed');
        }
    } catch (error) {
        console.log('❌ Report generation error:', error.message);
    }
    
    console.log(`\n📊 Statistics Tests: ${passed}/${tests.length + 1} passed\n`);
    return passed === tests.length + 1;
}

async function runAllTests() {
    console.log('🚀 Starting Comprehensive Test Suite\n');
    console.log('=' .repeat(60));
    
    const results = [
        testSyntaxParsing(),
        testMultilineParsing(),
        testMixedSyntax(),
        testErrorHandling(),
        testFilenameGeneration(),
        testStatisticsAnalyzer()
    ];
    
    const totalPassed = results.filter(r => r).length;
    const totalTests = results.length;
    
    console.log('=' .repeat(60));
    console.log(`\n🏁 Test Suite Complete: ${totalPassed}/${totalTests} test categories passed`);
    
    if (totalPassed === totalTests) {
        console.log('🎉 All tests passed! The implementation is working correctly.');
        return true;
    } else {
        console.log('⚠️  Some tests failed. Please review the implementation.');
        return false;
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runAllTests().then(success => {
        process.exit(success ? 0 : 1);
    });
}

module.exports = { runAllTests };
