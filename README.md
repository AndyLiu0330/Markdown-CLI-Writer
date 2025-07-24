# 🖋️ Markdown CLI Writer

A Node.js CLI tool that converts custom syntax to Markdown format quickly and efficiently. Supports both original PRD syntax and enhanced current syntax for maximum compatibility.

## 🚀 Quick Start

```bash
# Run the CLI tool (main version)
npm start

# Run the simple/reliable version
node md-cli-simple.js

# Run tests
npm test

# Run comprehensive tests
node test-comprehensive.js
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