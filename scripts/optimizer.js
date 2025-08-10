#!/usr/bin/env node

/**
 * ⚡ Project Optimizer
 * Analyzes and optimizes the project structure and performance
 */

const fs = require('fs');
const path = require('path');

console.log('⚡ Markdown CLI Writer - Project Optimizer');
console.log('════════════════════════════════════════');

let optimizations = [];
let warnings = [];
let suggestions = [];

// 1. Analyze file sizes
console.log('📊 Analyzing file sizes...');
const coreFiles = ['md-cli-enhanced.js', 'md-cli-simple.js', 'cli.js'];
coreFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        const sizeKB = Math.round(stats.size / 1024);
        console.log(`   📄 ${file}: ${sizeKB}KB`);
        
        if (sizeKB > 50) {
            suggestions.push(`Consider splitting ${file} (${sizeKB}KB) into modules`);
        }
    }
});

// 2. Check for redundant files
console.log('\n🔍 Checking for optimization opportunities...');
const rootFiles = fs.readdirSync('.').filter(f => f.endsWith('.js'));
const testFiles = fs.existsSync('tests') ? fs.readdirSync('tests').filter(f => f.endsWith('.js')) : [];

console.log(`   📁 Root JS files: ${rootFiles.length}`);
console.log(`   🧪 Test files: ${testFiles.length}`);

// 3. Package.json analysis
console.log('\n📦 Analyzing package.json...');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const scripts = Object.keys(packageJson.scripts || {});
const dependencies = Object.keys(packageJson.dependencies || {});

console.log(`   📜 Scripts defined: ${scripts.length}`);
console.log(`   📦 Dependencies: ${dependencies.length}`);

// Check for unused dependencies (basic check)
dependencies.forEach(dep => {
    let found = false;
    coreFiles.forEach(file => {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf8');
            if (content.includes(`require('${dep}')`) || content.includes(`import`)) {
                found = true;
            }
        }
    });
    if (!found) {
        warnings.push(`Dependency '${dep}' might be unused`);
    }
});

// 4. Documentation completeness
console.log('\n📚 Checking documentation...');
const docFiles = ['README.md', 'USAGE.md', 'API-DOCS.md', 'CHANGELOG.md'];
let docScore = 0;
docFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const stats = fs.statSync(file);
        if (stats.size > 100) { // At least 100 bytes
            docScore++;
            console.log(`   ✅ ${file} (${Math.round(stats.size/1024)}KB)`);
        } else {
            console.log(`   ⚠️  ${file} (too small)`);
        }
    } else {
        console.log(`   ❌ ${file} (missing)`);
    }
});

// 5. Test coverage estimation
console.log('\n🧪 Estimating test coverage...');
const testCoverage = Math.min(100, (testFiles.length / coreFiles.length) * 30);
console.log(`   📊 Estimated coverage: ${Math.round(testCoverage)}%`);

if (testCoverage < 80) {
    suggestions.push('Consider adding more test files for better coverage');
}

// 6. Performance suggestions
console.log('\n⚡ Performance analysis...');
coreFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        const lines = content.split('\n').length;
        
        // Check for potential optimizations
        if (content.includes('require(') && content.split('require(').length > 10) {
            suggestions.push(`${file}: Consider lazy loading some modules`);
        }
        
        if (content.includes('fs.readFileSync') && content.split('fs.readFileSync').length > 5) {
            suggestions.push(`${file}: Consider async file operations for better performance`);
        }
        
        console.log(`   📄 ${file}: ${lines} lines`);
    }
});

// 7. Security check (basic)
console.log('\n🔒 Basic security check...');
let securityIssues = 0;
coreFiles.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        if (content.includes('eval(')) {
            warnings.push(`${file}: Contains eval() - potential security risk`);
            securityIssues++;
        }
        
        if (content.includes('process.env') && !content.includes('dotenv')) {
            warnings.push(`${file}: Direct process.env usage - consider using dotenv`);
        }
    }
});

console.log(`   🔒 Security issues found: ${securityIssues}`);

// 8. Generate optimization report
console.log('\n📋 Optimization Report');
console.log('════════════════════════════════════════');

console.log(`📊 Project Metrics:`);
console.log(`   📁 Core files: ${coreFiles.length}`);
console.log(`   🧪 Test files: ${testFiles.length}`);
console.log(`   📚 Documentation: ${docScore}/${docFiles.length}`);
console.log(`   📜 NPM scripts: ${scripts.length}`);
console.log(`   📦 Dependencies: ${dependencies.length}`);

// Calculate overall health score
let healthScore = 0;
healthScore += docScore * 20; // Documentation (80 points max)
healthScore += Math.min(20, testFiles.length * 2); // Testing (20 points max)
healthScore -= warnings.length * 5; // Penalties for warnings
healthScore = Math.max(0, Math.min(100, healthScore));

console.log(`\n🎯 Overall Health Score: ${healthScore}/100`);

if (healthScore >= 90) {
    console.log('🏆 Excellent! Your project is well-optimized.');
} else if (healthScore >= 70) {
    console.log('👍 Good project structure with room for improvement.');
} else if (healthScore >= 50) {
    console.log('⚠️  Project needs optimization attention.');
} else {
    console.log('🚨 Project requires significant optimization work.');
}

// Display warnings
if (warnings.length > 0) {
    console.log(`\n⚠️  Warnings (${warnings.length}):`);
    warnings.forEach(warning => console.log(`   • ${warning}`));
}

// Display suggestions
if (suggestions.length > 0) {
    console.log(`\n💡 Suggestions (${suggestions.length}):`);
    suggestions.forEach(suggestion => console.log(`   • ${suggestion}`));
}

// 9. Generate .gitignore if missing
if (!fs.existsSync('.gitignore')) {
    const gitignore = `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE and editor files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Temporary files
*.tmp
*.temp
*.log

# Build outputs
dist/
build/
*.tgz

# Configuration files
.md-cli-config.json
`;
    fs.writeFileSync('.gitignore', gitignore);
    console.log('\n✅ Created: .gitignore');
    optimizations.push('Added .gitignore file');
}

// 10. Optimization summary
console.log('\n🚀 Quick Optimization Commands:');
console.log('   npm run health     # Check project health');
console.log('   npm run docs       # Generate documentation');
console.log('   npm test           # Run test suite');
console.log('   npm run lint       # Code quality check');

console.log(`\n⚡ Optimization completed: ${optimizations.length} improvements made`);
console.log(`📅 Analysis completed: ${new Date().toLocaleString()}`);
