# 📁 Project Structure

This document outlines the organized folder structure of the Markdown CLI Writer project.

## 🗂️ Root Directory

```
Markdown-CLI-Writer/
├── 📁 bin/                    # Executable CLI files
├── 📁 config/                 # Configuration files
├── 📁 docs/                   # Documentation
├── 📁 examples/               # Example files and templates
├── 📁 scripts/                # Utility and maintenance scripts
├── 📁 src/                    # Source code modules
├── 📁 tests/                  # Test files
├── 📄 index.js                # Main entry point
├── 📄 package.json            # Project configuration
└── 📄 README.md               # Project overview
```

## 📂 Detailed Structure

### `/bin/` - Executable Files
Contains all CLI entry points and executable scripts:
- `cli.js` - Basic CLI entry point
- `md-cli.js` - Basic markdown CLI
- `md-cli-simple.js` - Simple CLI interface
- `md-cli-enhanced.js` - Enhanced CLI with full features
- `md-cli-gemini.js` - Gemini AI integration CLI
- `cli.bat` - Windows batch file

### `/config/` - Configuration
Houses all configuration files:
- `.ai-config.json` - AI service configuration
- `.md-cli-config.json` - CLI tool configuration

### `/docs/` - Documentation
Contains all project documentation:
- `API-DOCS.md` - API documentation
- `CLI-MENU-EXAMPLES.md` - CLI usage examples
- `USAGE.md` - User guide
- `prd.md` - Product requirements document
- `task.md` - Task and feature tracking

### `/examples/` - Sample Files
Example inputs and outputs:
- `current-syntax-example.txt`
- `mixed-syntax-example.txt` 
- `prd-syntax-example.txt`
- `stats-test-sample.md`

### `/scripts/` - Utility Scripts
Development and maintenance tools:
- `demo.js` - Demo application
- `docs-generator.js` - Documentation generator
- `health-check.js` - System health checker
- `optimizer.js` - Code optimizer
- `verify-ai-setup.js` - AI setup verification

### `/src/` - Source Code Modules
Core application logic:
- `ai/` - AI-related modules
  - `ai-assistant.js` - AI assistant functionality
- `cli/` - CLI-related modules
  - `ai-cli.js` - AI CLI commands

### `/tests/` - Test Suite
Comprehensive test files:
- `test.js` - Main test runner
- `test-simple.js` - Basic functionality tests
- `test-comprehensive.js` - Full feature tests
- `test-cli-menu.js` - CLI interface tests
- `test-ai-features.js` - AI functionality tests
- And more specialized test files...

## 🎯 Benefits of This Structure

1. **Clear Separation**: Each directory has a specific purpose
2. **Professional Layout**: Follows Node.js best practices
3. **Easy Navigation**: Logical grouping of related files
4. **Scalability**: Easy to add new features in appropriate directories
5. **Maintainability**: Clear organization aids development and debugging

## 🔧 Usage After Reorganization

All npm scripts have been updated to reflect the new structure:
- `npm start` - Runs the enhanced CLI from `/bin/`
- `npm test` - Executes tests from `/tests/`
- `npm run docs` - Generates documentation using `/scripts/`
- And more...

The main entry point (`index.js`) provides access to all modules while maintaining backward compatibility.
