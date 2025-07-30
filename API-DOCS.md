# 🔧 API Documentation

## Core Classes and Functions

### MarkdownAnalyzer Class
Located in: `md-cli-enhanced.js`

```javascript
class MarkdownAnalyzer {
    analyzeContent(content)     // Analyze markdown content
    getWordCount(content)       // Get word count statistics
    getHeadingStructure(content) // Extract heading hierarchy
    getLinkAnalysis(content)    // Analyze links and references
    generateStatistics(content) // Generate comprehensive stats
}
```

### CLI Functions

#### Enhanced CLI (`md-cli-enhanced.js`)
- Interactive menu system
- Statistics integration
- Enhanced output formatting
- Configuration management

#### Simple CLI (`md-cli-simple.js`) 
- Streamlined processing
- Basic syntax conversion
- Quick file operations
- Command-line arguments

## Available Endpoints

### Command Line Interface
```bash
# Interactive mode
node md-cli-enhanced.js

# Direct processing
node md-cli-simple.js [input-file] [output-file]

# Statistics mode
node md-cli-simple.js stats [file]
```

### NPM Scripts API
All scripts are defined in `package.json` and can be called via:
```bash
npm run <script-name>
```

## Testing API

### Test Categories
1. **Basic Tests** - Core functionality
2. **Comprehensive Tests** - Full feature coverage  
3. **Statistics Tests** - Analytics validation
4. **Integration Tests** - End-to-end workflows

### Test File Structure
- `tests/test-simple.js` - Basic functionality
- `tests/test-comprehensive.js` - Advanced features
- `tests/test-statistics.js` - Analytics testing
- `tests/test-gemini-menu.js` - Interactive menu testing

---
*Generated on 7/30/2025, 3:13:19 PM*
