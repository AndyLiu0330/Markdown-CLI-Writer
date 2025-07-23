# 🖋️ Markdown CLI Writer - Usage Guide

## 📌 Quick Start

```bash
# Run the CLI tool
npm start
# or
node md-cli.js
```

## 🎯 How It Works

### 1. Choose Input Method
When you start the tool, you'll see 4 input options:

1. **Single line input** - Enter one syntax at a time
2. **Multi-line input** - Enter multiple lines, type "END" to finish
3. **Load from file** - Read content from a text file
4. **Example mode** - See a quick demonstration

### 2. Enter Your Content
Use the supported syntax format:

| Syntax | Markdown | Example |
|--------|----------|---------|
| `Title1(text)` | `# text` | `Title1(My Project)` → `# My Project` |
| `Title2(text)` | `## text` | `Title2(Features)` → `## Features` |
| `Title3(text)` | `### text` | `Title3(Setup)` → `### Setup` |
| `List(text)` | `- text` | `List(Install npm)` → `- Install npm` |
| `Quote(text)` | `> text` | `Quote(Important note)` → `> Important note` |

### 3. Review Generated Markdown
The tool will show a colored preview of your generated Markdown:
- **Red**: Main headings (h1)
- **Yellow**: Subheadings (h2)
- **Blue**: Small headings (h3)
- **Green**: List items
- **Cyan**: Quotes

### 4. Save or Display
Choose whether to:
- **Save to file**: Creates a `.md` file (default name based on first prefix)
- **Display only**: Just show the result in terminal

## 📝 Example Workflow

### Input:
```
BBB(Health Tips)
DDD(Drink more water)
DDD(Exercise regularly)
DDD(Get enough sleep)
EEE(Small changes lead to big results!)
CCC(Getting Started)
DDD(Start with one habit)
DDD(Track your progress)
```

### Output:
```markdown
## Health Tips
- Drink more water
- Exercise regularly
- Get enough sleep
> Small changes lead to big results!
### Getting Started
- Start with one habit
- Track your progress
```

### File Name:
- Default: `BBB.md` (based on first prefix)
- Custom: You can specify your own name

## 🛠️ Advanced Usage

### Load from File
1. Create a text file with your syntax:
```
AAA(My Documentation)
BBB(Introduction)
DDD(This tool converts custom syntax)
DDD(Into proper Markdown format)
EEE(Perfect for quick documentation!)
```

2. Choose option 3 and provide the file path
3. The tool will process the entire file

### Multi-line Mode
1. Choose option 2
2. Enter each line of syntax
3. Type "END" on a new line to finish
4. Review and save

## ✅ Features

- ✅ **No Dependencies**: Uses only Node.js built-in modules
- ✅ **Color Output**: Syntax-highlighted preview
- ✅ **File Operations**: Read from and save to files
- ✅ **Error Handling**: Clear validation messages
- ✅ **Cross-platform**: Works on Windows, macOS, Linux
- ✅ **Interactive**: User-friendly prompts

## 🔧 Customization

### Adding New Syntax
To add new syntax patterns, edit the `SYNTAX_MAP` in `md-cli.js`:

```javascript
const SYNTAX_MAP = {
    'AAA': '#',      // Heading 1
    'BBB': '##',     // Heading 2
    'CCC': '###',    // Heading 3
    'DDD': '-',      // List item
    'EEE': '>',      // Quote
    'FFF': '**',     // Bold (your addition)
    'GGG': '*',      // Italic (your addition)
};
```

### Changing Colors
Modify the `colors` object to customize the terminal output colors.

## 🎭 Use Cases

### 📋 Quick Notes
```
AAA(Meeting Notes)
BBB(Action Items)
DDD(Review project timeline)
DDD(Update team on progress)
EEE(Next meeting: Friday 2PM)
```

### 📚 Documentation
```
AAA(API Documentation)
BBB(Authentication)
CCC(Basic Auth)
DDD(Username and password required)
CCC(Bearer Token)
DDD(JWT token in Authorization header)
EEE(Always use HTTPS in production)
```

### 📝 Blog Posts
```
AAA(5 Tips for Better Coding)
BBB(1. Write Clean Code)
DDD(Use meaningful variable names)
DDD(Keep functions small and focused)
BBB(2. Test Your Code)
DDD(Write unit tests)
DDD(Use test-driven development)
EEE(Quality code saves time in the long run!)
```

## 🚀 Tips & Tricks

1. **Consistent Prefixes**: Use the same prefix pattern for similar content types
2. **Hierarchical Structure**: Use AAA for main topics, BBB for sections, CCC for subsections
3. **Batch Processing**: Prepare content in a text file for large documents
4. **Template Creation**: Create reusable templates with your common structures
5. **Quick Edits**: Use single-line mode for small additions

## 🤝 Contributing

The tool is designed to be simple and extensible. Feel free to:
- Add new syntax patterns
- Improve error handling
- Add export formats (HTML, PDF)
- Create templates or presets

Happy documenting! 🎉
