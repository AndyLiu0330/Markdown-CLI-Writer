#!/usr/bin/env node

/**
 * 📚 Documentation Generator
 * Automatically generates comprehensive project documentation
 */

const fs = require('fs');
const path = require('path');

console.log('📚 Generating Enhanced Documentation...');
console.log('════════════════════════════════════════');

// Read package.json for project info
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Generate enhanced README
const enhancedReadme = `# ${packageJson.name.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}

${packageJson.description}

[![Version](https://img.shields.io/badge/version-${packageJson.version}-blue.svg)](package.json)
[![Node](https://img.shields.io/badge/node-${packageJson.engines.node}-green.svg)](package.json)
[![License](https://img.shields.io/badge/license-${packageJson.license}-orange.svg)](LICENSE)

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Run health check
npm run health

# Start interactive CLI
npm start

# Run demo
npm run demo
\`\`\`

## 📁 Project Structure

\`\`\`
├── md-cli-enhanced.js      # 🎯 Main enhanced CLI with interactive menus
├── md-cli-simple.js        # ⚡ Simple CLI version for quick operations
├── cli.js                  # 🔧 Command-line interface entry point
├── demo.js                 # 🎪 Demo script showing functionality
├── health-check.js         # 🏥 Health check and validation script
├── package.json            # 📦 Project configuration
├── tests/                  # 🧪 Test suite directory
│   ├── README.md          # 📋 Test documentation
│   ├── test-simple.js     # ⚡ Basic functionality tests
│   ├── test-comprehensive.js  # 🔍 Comprehensive test suite
│   ├── test-statistics.js # 📊 Statistics analysis tests
│   └── ...more tests...   # 🧬 Additional test files
└── examples/              # 📖 Example files and samples
    ├── current-syntax-example.txt
    ├── mixed-syntax-example.txt
    └── prd-syntax-example.txt
\`\`\`

## 🎯 Available Commands

### Core Scripts
| Command | Description |
|---------|-------------|
| \`npm start\` | 🚀 Launch interactive menu |
| \`npm run demo\` | 🎪 Run working demonstration |
| \`npm run health\` | 🏥 Check project health status |

### CLI Variants
| Command | Description |
|---------|-------------|
| \`npm run start-simple\` | ⚡ Launch simple CLI version |
| \`npm run start-full\` | 💎 Launch full-featured CLI |
| \`npm run start-gemini\` | 🤖 Launch Gemini-enhanced CLI |

### Testing
| Command | Description |
|---------|-------------|
| \`npm test\` | 🧪 Run basic functionality tests |
| \`npm run test-comprehensive\` | 🔍 Run full test suite |
| \`npm run test-stats\` | 📊 Test statistics analysis |
| \`npm run test-all\` | 🎯 Run all available tests |

### Development
| Command | Description |
|---------|-------------|
| \`npm run dev\` | 🔄 Development mode with file watching |
| \`npm run version\` | 📋 Show current version |
| \`npm run lint\` | 🔍 Code quality check |
| \`npm run build\` | 📦 Prepare for distribution |

## 🌟 Features

### ✨ Interactive Menus
- Multiple CLI variants with different feature sets
- Interactive inquirer.js-based navigation
- User-friendly prompts and feedback

### 📊 Advanced Analytics
- Word count and character analysis
- Heading structure analysis
- Link and reference detection
- Custom statistics reporting

### 🔧 Multiple Input Formats
- Custom syntax parsing (AAA/BBB/CCC)
- Mixed syntax support
- PRD (Product Requirements Document) format
- Flexible content processing

### 🧪 Comprehensive Testing
- 10+ specialized test files
- Error handling validation
- Syntax parsing verification
- Statistics accuracy testing

## 🎮 Usage Examples

### Basic Usage
\`\`\`bash
# Interactive mode
npm start

# Direct CLI usage
node md-cli-enhanced.js
\`\`\`

### Custom Syntax Examples

**Simple Format:**
\`\`\`
AAA This is a heading
BBB This is content under the heading
CCC This is a subheading
BBB More content
\`\`\`

**Advanced Format:**
\`\`\`
AAA# Project Overview
BBB This project creates markdown from custom syntax
CCC## Features
BBB- Interactive menus
BBB- Statistics analysis
BBB- Multiple output formats
\`\`\`

## 🔍 Health Check

Run the health check to verify everything is working:

\`\`\`bash
npm run health
\`\`\`

This will verify:
- ✅ Core files exist and are accessible
- ✅ Test directory is properly organized
- ✅ Dependencies are installed correctly
- ✅ Documentation is available
- ✅ Examples are in place

## 🛠️ Development

### Prerequisites
- Node.js ${packageJson.engines.node}
- npm or yarn package manager

### Setup
1. Clone or download the project
2. Install dependencies: \`npm install\`
3. Run health check: \`npm run health\`
4. Start development: \`npm run dev\`

### Testing Strategy
The project includes multiple testing approaches:
- **Basic Tests**: Core functionality validation
- **Comprehensive Tests**: Full feature coverage
- **Statistics Tests**: Analytics accuracy
- **Integration Tests**: End-to-end workflows

## 📚 Documentation Files

- \`README.md\` - This comprehensive guide
- \`USAGE.md\` - Detailed usage instructions
- \`task.md\` - Project tasks and requirements
- \`tests/README.md\` - Testing documentation
- \`CLI-MENU-EXAMPLES.md\` - Interactive menu examples

## 🤝 Contributing

1. Run \`npm run health\` to ensure your environment is ready
2. Make your changes
3. Run \`npm test\` to verify functionality
4. Run \`npm run test-comprehensive\` for full validation

## 📄 License

This project is licensed under the ${packageJson.license} License.

## 📞 Support

For issues or questions:
1. Check the health status: \`npm run health\`
2. Review the test results: \`npm test\`
3. Consult the usage guide: \`USAGE.md\`

---
*Generated by Documentation Generator on ${new Date().toLocaleString()}*
`;

// Write the enhanced README
fs.writeFileSync('README-ENHANCED.md', enhancedReadme);
console.log('✅ Created: README-ENHANCED.md');

// Generate API documentation
const apiDocs = `# 🔧 API Documentation

## Core Classes and Functions

### MarkdownAnalyzer Class
Located in: \`md-cli-enhanced.js\`

\`\`\`javascript
class MarkdownAnalyzer {
    analyzeContent(content)     // Analyze markdown content
    getWordCount(content)       // Get word count statistics
    getHeadingStructure(content) // Extract heading hierarchy
    getLinkAnalysis(content)    // Analyze links and references
    generateStatistics(content) // Generate comprehensive stats
}
\`\`\`

### CLI Functions

#### Enhanced CLI (\`md-cli-enhanced.js\`)
- Interactive menu system
- Statistics integration
- Enhanced output formatting
- Configuration management

#### Simple CLI (\`md-cli-simple.js\`) 
- Streamlined processing
- Basic syntax conversion
- Quick file operations
- Command-line arguments

## Available Endpoints

### Command Line Interface
\`\`\`bash
# Interactive mode
node md-cli-enhanced.js

# Direct processing
node md-cli-simple.js [input-file] [output-file]

# Statistics mode
node md-cli-simple.js stats [file]
\`\`\`

### NPM Scripts API
All scripts are defined in \`package.json\` and can be called via:
\`\`\`bash
npm run <script-name>
\`\`\`

## Testing API

### Test Categories
1. **Basic Tests** - Core functionality
2. **Comprehensive Tests** - Full feature coverage  
3. **Statistics Tests** - Analytics validation
4. **Integration Tests** - End-to-end workflows

### Test File Structure
- \`tests/test-simple.js\` - Basic functionality
- \`tests/test-comprehensive.js\` - Advanced features
- \`tests/test-statistics.js\` - Analytics testing
- \`tests/test-gemini-menu.js\` - Interactive menu testing

---
*Generated on ${new Date().toLocaleString()}*
`;

fs.writeFileSync('API-DOCS.md', apiDocs);
console.log('✅ Created: API-DOCS.md');

// Generate changelog
const changelog = `# 📅 Changelog

## Version ${packageJson.version} - ${new Date().toLocaleDateString()}

### ✨ New Features
- 🏥 Added comprehensive health check system
- 📚 Enhanced documentation generator
- 🔧 Improved package.json scripts organization
- 📊 Advanced statistics analysis integration

### 🧹 Project Cleanup
- 🗂️ Organized all test files in \`tests/\` directory
- 🗑️ Removed 15+ temporary test files from root
- 📝 Updated test documentation to English
- 🏗️ Improved project structure organization

### 🧪 Testing Improvements
- ✅ All core functionality validated
- 🔍 Comprehensive test suite execution
- 📊 Statistics analysis testing added
- 🎪 Demo script functionality confirmed

### 🛠️ Development Experience
- 🚀 Quick start commands added
- 🔧 Development scripts enhanced
- 📋 Version and build utilities added
- 🏥 Health monitoring implemented

### 📚 Documentation
- 📖 Enhanced README with comprehensive guides
- 🔧 API documentation generated
- 📋 Usage examples expanded
- 🎯 Quick reference guides added

### 🔧 Technical Improvements
- 🎯 Error handling validation
- 📊 Statistics accuracy verification
- 🔄 Interactive menu enhancements
- ⚡ Performance optimizations

---
*Auto-generated changelog*
`;

fs.writeFileSync('CHANGELOG.md', changelog);
console.log('✅ Created: CHANGELOG.md');

console.log('\n📊 Documentation Generation Summary');
console.log('════════════════════════════════════════');
console.log('✅ README-ENHANCED.md - Comprehensive project guide');
console.log('✅ API-DOCS.md - Technical API documentation');
console.log('✅ CHANGELOG.md - Version history and updates');
console.log('\n🎉 Documentation generation completed!');
console.log('\n📖 Next steps:');
console.log('   cat README-ENHANCED.md  # View enhanced README');
console.log('   cat API-DOCS.md         # View API documentation');
console.log('   cat CHANGELOG.md        # View changelog');
