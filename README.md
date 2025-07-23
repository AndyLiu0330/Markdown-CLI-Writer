# 🖋️ Markdown CLI Writer

A Node.js CLI tool that converts custom syntax to Markdown format quickly and efficiently.

## 🚀 Quick Start

```bash
# Run the CLI tool
npm start

# Run tests
npm test
```

## 📝 Supported Syntax

| Input Format | Markdown Output | Description |
|--------------|-----------------|-------------|
| `AAA(text)`  | `# text`        | Heading 1 |
| `BBB(text)`  | `## text`       | Heading 2 |
| `CCC(text)`  | `### text`      | Heading 3 |
| `DDD(text)`  | `- text`        | List item |
| `EEE(text)`  | `> text`        | Quote |

## 💡 Example Usage

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

## ⚙️ Features

- ✅ **Zero Dependencies**: Uses only Node.js built-in modules
- ✅ **Multiple Input Methods**: Single line, multi-line, file input, or examples
- ✅ **File Generation**: Save output as `.md` files with custom names
- ✅ **Terminal Display**: View results with syntax highlighting
- ✅ **Error Handling**: Clear validation and error messages
- ✅ **Cross-platform**: Works on Windows, macOS, and Linux

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
  AAA(text) → # Heading 1
  BBB(text) → ## Heading 2
  CCC(text) → ### Heading 3
  DDD(text) → - List item
  EEE(text) → > Quote

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