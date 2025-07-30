# 🖋️ Markdown CLI Writer

A Node.js CLI tool that converts custom syntax to Markdown format quickly and efficiently. Supports both original PRD syntax and enhanced current syntax for maximum compatibility.

## 🚀 Quick Start

```bash
# Run with enhanced interactive menu (recommended)
npm start

# Run the simple/reliable version
npm run start-simple

# Run tests
npm test

# Run comprehensive tests
node test-comprehensive.js
```

## 🎯 Enhanced Features

### Interactive Menu System
Experience our modern, user-friendly interface with:
- 🎨 **Visual enhancements** with emojis and colors
- ⌨️ **Keyboard navigation** with arrow keys
- 💾 **Smart configuration** that remembers your preferences
- 🔄 **Graceful fallback** to simple menu when needed
- 📊 **Statistics analysis** for existing Markdown files

```bash
npm start              # Launch enhanced menu
npm run start-simple   # Launch simple menu
npm run test-stats     # Test statistics functionality
```

## 📝 Supported Syntax

### Current Syntax (Enhanced)
| Input Format     | Markdown Output | Description |
|------------------|-----------------|-------------|
| `Title1(text)`   | `# text`        | Heading 1 |
| `Title2(text)`   | `## text`       | Heading 2 |
| `Title3(text)`   | `### text`      | Heading 3 |
| `List(text)`     | `- text`        | List item |
| `Quote(text)`    | `> text`        | Quote |

### PRD Original Syntax
| Input Format     | Markdown Output | Description |
|------------------|-----------------|-------------|
| `AAA(text)`      | `# text`        | Heading 1 (PRD) |
| `BBB(text)`      | `## text`       | Heading 2 (PRD) |
| `CCC(text)`      | `### text`      | Heading 3 (PRD) |
| `DDD(text)`      | `- text`        | List item (PRD) |
| `EEE(text)`      | `> text`        | Quote (PRD) |

💡 **Both syntax styles are fully supported and can be mixed in the same document!**

## 💡 Example Usage

### Current Syntax Example
**Input:**
```
Title2(Health Tips)
List(Less Sugar)
List(More Veggies)
Quote(Remember to stay hydrated!)
```

**Output:**
```markdown
## Health Tips
- Less Sugar
- More Veggies
> Remember to stay hydrated!
```

### PRD Syntax Example
**Input:**
```
BBB(Health Tips)
DDD(Less Sugar)
DDD(More Veggies)
EEE(Remember to stay hydrated!)
```

**Output:**
```markdown
## Health Tips
- Less Sugar
- More Veggies
> Remember to stay hydrated!
```

### Mixed Syntax Example
**Input:**
```
AAA(Project Documentation)
Title2(Getting Started)
DDD(Install Node.js)
List(Run npm install)
EEE(Both syntaxes work together!)
```

**Output:**
```markdown
# Project Documentation
## Getting Started
- Install Node.js
- Run npm install
> Both syntaxes work together!
```

## ⚙️ Features

- ✅ **Dual Syntax Support**: Both current and PRD syntax styles supported
- ✅ **Backward Compatibility**: Existing syntax continues to work
- ✅ **Mixed Syntax**: Use both styles in the same document
- ✅ **Zero Dependencies**: Uses only Node.js built-in modules (simple version)
- ✅ **Interactive CLI Menu**: Easy-to-use menu system with persistent navigation
- ✅ **Multiple Input Methods**: Single line, multi-line, file input, or examples
- ✅ **Live Help System**: Type `/guide` anytime to see syntax table and examples
- ✅ **File Generation**: Save output as `.md` files with custom names
- ✅ **Terminal Display**: View results with syntax highlighting
- ✅ **Error Handling**: Comprehensive validation and helpful error messages
- ✅ **Cross-Platform**: Works on Windows, macOS, and Linux
- ✅ **Comprehensive Testing**: Full test suite included
- ✅ **Statistics Analysis**: Analyze existing Markdown files for detailed metrics
- ✅ **Multiple Output Formats**: Console table and JSON export

## 🏗️ Installation

```bash
# Clone the repository
git clone https://github.com/AndyLiu0330/NodeJsCLI.git

# Navigate to the directory
cd NodeJsCLI

# Install dependencies (optional)
npm install

# Start using the tool
npm start
# OR run the simple version
node md-cli-simple.js
```

## 📖 Usage Guide

### Interactive Mode
1. Run `npm start` or `node md-cli-simple.js`
2. Choose from the main menu:
   - **Single line input**: Enter one syntax command
   - **Multi-line input**: Enter multiple lines, type "END" to finish
   - **Load from file**: Process a text file with syntax commands
   - **Example mode**: See demo content with different syntax styles
   - **Syntax guide**: View comprehensive help

### File Processing
1. Create a text file with your syntax commands:
```
AAA(My Project)
BBB(Overview)
DDD(Feature 1)
DDD(Feature 2)
EEE(This is a quote)
```

2. Load it through the CLI or process directly:
```bash
node md-cli-simple.js
# Choose option 3 and enter your file path
```

### Command Examples
- `AAA(Main Title)` → `# Main Title`
- `Title2(Section)` → `## Section`
- `CCC(Subsection)` → `### Subsection`
- `List(Item)` → `- Item`
- `EEE(Quote)` → `> Quote`

### Statistics Analysis
Analyze existing Markdown files using the enhanced interactive menu:
```bash
# Launch enhanced menu and select statistics
npm start
# Use arrow keys to select "📊 View statistics report"
# Press Enter and provide file path

# Alternative: Direct command line (simple menu)
node md-cli-simple.js stats README.md

# JSON output with simple menu
node md-cli-simple.js stats README.md json

# Using npm script
npm run stats README.md
```

**Statistics Include:**
- Word count and paragraph count
- Heading levels distribution (H1-H6)
- Links and images count
- List items and quotes count
- Code blocks and formatting ratio
- Content quality metrics

## 🧪 Testing

Run the test suite to verify everything works:

```bash
# Basic tests
npm test

# Comprehensive test suite
node test-comprehensive.js

# Test statistics feature
node md-cli-simple.js stats ./examples/stats-test-sample.md
```

The comprehensive test suite validates:
- ✅ Syntax parsing for both current and PRD formats
- ✅ Multiline document processing
- ✅ Mixed syntax support
- ✅ Error handling and validation
- ✅ Filename generation
- ✅ File operations
- ✅ Statistics analysis accuracy
- ✅ Report generation in multiple formats

## 📁 Project Structure

```
NodeJsCLI/
├── md-cli.js              # Main CLI with dependency support
├── md-cli-simple.js       # Simple version (reliable)
├── test-comprehensive.js  # Full test suite
├── task.md               # Development task list
├── prd.md                # Product requirements
├── README.md             # This file
├── package.json          # Dependencies and scripts
├── .env.example          # Configuration template
└── examples/             # Example files
```
- ✅ **Error Handling**: Clear validation and error messages
- ✅ **Cross-platform**: Works on Windows, macOS, and Linux

## 🎯 CLI Menu Interface

When you run the tool, you'll see an interactive menu:

```
🖋️  Markdown CLI Writer
Convert custom syntax to Markdown format

Type /guide to see syntax table and examples

📋 Main Menu:
══════════════════════════════════════════════════
1. 📝 Single line input
2. 📄 Multi-line input
3. 📂 Load from file
4. 🎯 Example mode
5. 📖 Show syntax guide (/guide)
0. ❌ Exit
══════════════════════════════════════════════════
```

### 🔍 Special Commands

- **`/guide`**: Type this anywhere to see the complete syntax table and examples
- **`5`**: Select option 5 from the main menu to view the syntax guide
- **`0`**: Exit the application

## 🎯 User Flow

1. **Choose Input Method**: 
   - Single line input
   - Multi-line input (type "END" to finish)
   - Load from file
   - Example mode
2. **Enter Content**: Use the supported syntax format (e.g., `AAA(My Title)`)
3. **Preview**: See the generated Markdown with color coding
4. **Save Option**: Choose to save as `.md` file or just display
5. **Continue**: Process more content or exit

## 🛠️ Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd NodeJsCLI

# No additional dependencies needed - uses Node.js built-ins only!

# Run the tool
npm start
```

## 📦 Project Structure

```
NodeJsCLI/
├── md-cli.js             # Main CLI application (no dependencies)
├── test-simple.js        # Test suite
├── package.json          # Project configuration
├── example-input.txt     # Sample input file
├── prd.md               # Product requirements
├── USAGE.md             # Detailed usage guide
└── README.md            # This file
```

## 🧪 Testing

Run the test suite to verify functionality:

```bash
npm test
```

The tests cover:
- ✅ Individual syntax parsing
- ✅ Multi-line input processing
- ✅ Error handling for invalid input
- ✅ Markdown generation

## 🎨 Example Screenshots

### Main Menu
```
🖋️  Markdown CLI Writer
Convert custom syntax to Markdown format

Supported syntax:
  Title1(text) → # Heading 1
  Title2(text) → ## Heading 2
  Title3(text) → ### Heading 3
  List(text) → - List item
  Quote(text) → > Quote

📝 Input Methods:
1. Single line input
2. Multi-line input
3. Load from file
4. Example mode
```

### Generated Output
```markdown
📄 Generated Markdown:
────────────────────────────────────────
## Health Tips
- Less Sugar
- More Veggies
> Remember to stay hydrated!
────────────────────────────────────────
```

## 📖 Documentation

- [Detailed Usage Guide](USAGE.md) - Complete guide with examples
- [Product Requirements](prd.md) - Original specification

## 🎯 Use Cases

- **📋 Quick Documentation**: Meeting notes, project docs
- **📝 Blog Posts**: Structured content creation
- **📚 Technical Writing**: API docs, tutorials
- **📄 Reports**: Structured reporting format

## 🤝 Contributing

This tool is designed to be simple and extensible:

1. Fork the repository
2. Make your changes
3. Run tests: `npm test`
4. Submit a pull request

### Adding New Syntax

Edit the `SYNTAX_MAP` in `md-cli.js`:

```javascript
const SYNTAX_MAP = {
    'AAA': '#',      // Heading 1
    'BBB': '##',     // Heading 2
    'CCC': '###',    // Heading 3
    'DDD': '-',      // List item
    'EEE': '>',      // Quote
    // Add your custom syntax here
};
```

## 📄 License

MIT License - see LICENSE file for details

## 🎯 Roadmap

- [ ] Custom syntax configuration file
- [ ] Batch file processing
- [ ] Template system
- [ ] Export to other formats (HTML, PDF)
- [ ] Plugin system for custom converters
- [ ] Web interface version

---

**Built according to the PRD specification** - A Node.js CLI tool that parses formatted user input (e.g., `AAA(Title)`) and converts it into corresponding Markdown syntax, with options to generate `.md` files or display results in the terminal.