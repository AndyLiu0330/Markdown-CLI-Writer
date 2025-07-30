# Markdown Cli Writer

A Node.js CLI tool that converts custom syntax to Markdown

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](package.json)
[![Node](https://img.shields.io/badge/node->=14.0.0-green.svg)](package.json)
[![License](https://img.shields.io/badge/license-MIT-orange.svg)](LICENSE)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run health check
npm run health

# Start interactive CLI
npm start

# Run demo
npm run demo
```

## 📁 Project Structure

```
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
```

## 🎯 Available Commands

### Core Scripts
| Command | Description |
|---------|-------------|
| `npm start` | 🚀 Launch interactive menu |
| `npm run demo` | 🎪 Run working demonstration |
| `npm run health` | 🏥 Check project health status |

### CLI Variants
| Command | Description |
|---------|-------------|
| `npm run start-simple` | ⚡ Launch simple CLI version |
| `npm run start-full` | 💎 Launch full-featured CLI |
| `npm run start-gemini` | 🤖 Launch Gemini-enhanced CLI |

### Testing
| Command | Description |
|---------|-------------|
| `npm test` | 🧪 Run basic functionality tests |
| `npm run test-comprehensive` | 🔍 Run full test suite |
| `npm run test-stats` | 📊 Test statistics analysis |
| `npm run test-all` | 🎯 Run all available tests |

### Development
| Command | Description |
|---------|-------------|
| `npm run dev` | 🔄 Development mode with file watching |
| `npm run version` | 📋 Show current version |
| `npm run lint` | 🔍 Code quality check |
| `npm run build` | 📦 Prepare for distribution |

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
```bash
# Interactive mode
npm start

# Direct CLI usage
node md-cli-enhanced.js
```

### Custom Syntax Examples

**Simple Format:**
```
AAA This is a heading
BBB This is content under the heading
CCC This is a subheading
BBB More content
```

**Advanced Format:**
```
AAA# Project Overview
BBB This project creates markdown from custom syntax
CCC## Features
BBB- Interactive menus
BBB- Statistics analysis
BBB- Multiple output formats
```

## 🔍 Health Check

Run the health check to verify everything is working:

```bash
npm run health
```

This will verify:
- ✅ Core files exist and are accessible
- ✅ Test directory is properly organized
- ✅ Dependencies are installed correctly
- ✅ Documentation is available
- ✅ Examples are in place

## 🛠️ Development

### Prerequisites
- Node.js >=14.0.0
- npm or yarn package manager

### Setup
1. Clone or download the project
2. Install dependencies: `npm install`
3. Run health check: `npm run health`
4. Start development: `npm run dev`

### Testing Strategy
The project includes multiple testing approaches:
- **Basic Tests**: Core functionality validation
- **Comprehensive Tests**: Full feature coverage
- **Statistics Tests**: Analytics accuracy
- **Integration Tests**: End-to-end workflows

## 📚 Documentation Files

- `README.md` - This comprehensive guide
- `USAGE.md` - Detailed usage instructions
- `task.md` - Project tasks and requirements
- `tests/README.md` - Testing documentation
- `CLI-MENU-EXAMPLES.md` - Interactive menu examples

## 🤝 Contributing

1. Run `npm run health` to ensure your environment is ready
2. Make your changes
3. Run `npm test` to verify functionality
4. Run `npm run test-comprehensive` for full validation

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues or questions:
1. Check the health status: `npm run health`
2. Review the test results: `npm test`
3. Consult the usage guide: `USAGE.md`

---
*Generated by Documentation Generator on 7/30/2025, 3:13:19 PM*
