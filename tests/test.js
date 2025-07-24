const MarkdownCLIWriter = require('../index.js');

// Test the parser functionality
function testParser() {
    console.log('🧪 Running parser tests...\n');
    
    const writer = new MarkdownCLIWriter();
    
    const testCases = [
        {
            input: 'AAA(My Title)',
            expected: '# My Title'
        },
        {
            input: 'BBB(Subtitle)',
            expected: '## Subtitle'
        },
        {
            input: 'CCC(Small Heading)',
            expected: '### Small Heading'
        },
        {
            input: 'DDD(List Item)',
            expected: '- List Item'
        },
        {
            input: 'EEE(This is a quote)',
            expected: '> This is a quote'
        }
    ];
    
    let passed = 0;
    let failed = 0;
    
    testCases.forEach((testCase, index) => {
        const parsed = writer.parseLine(testCase.input);
        if (parsed && parsed.markdown === testCase.expected) {
            console.log(`✅ Test ${index + 1}: PASSED`);
            console.log(`   Input: ${testCase.input}`);
            console.log(`   Output: ${parsed.markdown}\n`);
            passed++;
        } else {
            console.log(`❌ Test ${index + 1}: FAILED`);
            console.log(`   Input: ${testCase.input}`);
            console.log(`   Expected: ${testCase.expected}`);
            console.log(`   Got: ${parsed ? parsed.markdown : 'null'}\n`);
            failed++;
        }
    });
    
    // Test multi-line input
    console.log('🔄 Testing multi-line input...');
    const multiLineInput = `BBB(Health Tips)
DDD(Less Sugar)
DDD(More Veggies)
EEE(Stay hydrated!)`;
    
    const parsedMulti = writer.parseInput(multiLineInput);
    const expectedMulti = [
        '## Health Tips',
        '- Less Sugar',
        '- More Veggies',
        '> Stay hydrated!'
    ].join('\n');
    
    const actualMulti = writer.generateMarkdown(parsedMulti);
    
    if (actualMulti === expectedMulti) {
        console.log('✅ Multi-line test: PASSED');
        console.log(`   Output:\n${actualMulti}\n`);
        passed++;
    } else {
        console.log('❌ Multi-line test: FAILED');
        console.log(`   Expected:\n${expectedMulti}`);
        console.log(`   Got:\n${actualMulti}\n`);
        failed++;
    }
    
    // Test error cases
    console.log('🔄 Testing error cases...');
    const errorCases = [
        'Invalid input',
        'AAA()',
        'XYZ(Unknown prefix)',
        'AAA Missing parentheses'
    ];
    
    errorCases.forEach((errorCase, index) => {
        const parsed = writer.parseLine(errorCase);
        if (parsed === null) {
            console.log(`✅ Error test ${index + 1}: PASSED (correctly rejected "${errorCase}")`);
            passed++;
        } else {
            console.log(`❌ Error test ${index + 1}: FAILED (should have rejected "${errorCase}")`);
            failed++;
        }
    });
    
    console.log(`\n📊 Test Results: ${passed} passed, ${failed} failed`);
    console.log(failed === 0 ? '🎉 All tests passed!' : '⚠️  Some tests failed');
}

// Run tests if this file is executed directly
if (require.main === module) {
    testParser();
}

module.exports = { testParser };
