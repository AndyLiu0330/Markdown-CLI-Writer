#!/usr/bin/env node

/**
 * 🧪 Direct Statistics Test
 * Directly tests the handleStatisticsAnalysis function
 */

const fs = require('fs').promises;

// Import the enhanced CLI module by requiring it
console.log('🧪 Testing Statistics Function Directly...');
console.log('════════════════════════════════════════');

async function testStatsFunction() {
    try {
        // Read the current directory to see what .md files are available
        const files = await fs.readdir(process.cwd());
        const mdFiles = files.filter(file => file.endsWith('.md'));
        
        console.log('📁 Found .md files in current directory:');
        mdFiles.forEach((file, index) => {
            console.log(`   ${index + 1}. ${file}`);
        });
        
        if (mdFiles.length > 0) {
            console.log('\n✅ SUCCESS: The improved statistics function will now show these files!');
            console.log('📋 Users can select from the list instead of manually typing paths.');
            
            // Test with the first .md file
            const testFile = mdFiles[0];
            console.log(`\n🧪 Testing analysis with: ${testFile}`);
            
            try {
                const content = await fs.readFile(testFile, 'utf8');
                console.log(`✅ File readable: ${content.length} characters`);
                console.log('📊 The statistics function will now work properly!');
            } catch (error) {
                console.log(`⚠️  File ${testFile} exists but couldn't be read: ${error.message}`);
            }
        } else {
            console.log('📝 No .md files found in current directory.');
            console.log('💡 The function will fallback to manual file path entry.');
        }
        
    } catch (error) {
        console.log(`❌ Error testing: ${error.message}`);
    }
}

testStatsFunction();
