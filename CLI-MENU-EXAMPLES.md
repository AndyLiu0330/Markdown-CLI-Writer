# 📋 CLI Menu Usage Examples

## 🚀 How to Start

```bash
# Start the interactive CLI menu
npm start
# or
node md-cli.js
```

## 📖 Using the /guide Command

You can type `/guide` **anywhere** in the application to see the syntax help:

### Example 1: In the Main Menu
```
請選擇選項 (0-5): /guide
```
This will show the complete syntax table and examples.

### Example 2: During Input
```
Enter your syntax: /guide
```
This will show the syntax guide and then return to the input prompt.

### Example 3: Using BBB(text) Format

As shown in USAGE.md line 28, the `BBB(text)` syntax converts to `## text`:

**Input:**
```
BBB(My Section Title)
```

**Output:**
```markdown
## My Section Title
```

## 🎯 Complete Workflow Example

1. **Start the CLI:**
   ```bash
   npm start
   ```

2. **Choose Single Line Input (Option 1):**
   ```
   請選擇選項 (0-5): 1
   ```

3. **Enter BBB syntax:**
   ```
   Enter your syntax: BBB(My Project Features)
   ```

4. **View colored output:**
   ```markdown
   ## My Project Features
   ```

5. **Save to file:**
   ```
   Do you want to save this as a .md file? (Y/N): Y
   Enter filename (default: BBB.md) or press Enter: my-features.md
   ✅ File saved: my-features.md
   ```

6. **Return to main menu:**
   ```
   按 Enter 鍵回到主選單...
   ```

## 💡 Pro Tips

- Type `/guide` at **any input prompt** to get help
- Use option 5 from the main menu for the full syntax guide
- The CLI remembers your place and returns to the main menu after each operation
- Press 0 to exit the application cleanly
- All syntax from USAGE.md (AAA, BBB, CCC, DDD, EEE) is supported

## 🔄 Menu Navigation Flow

```
Main Menu (0-5)
├── 1. Single Line → Input → Process → Save/Display → Back to Menu
├── 2. Multi-Line → Input (END to finish) → Process → Save/Display → Back to Menu  
├── 3. File Input → File Path → Process → Save/Display → Back to Menu
├── 4. Example → Auto Process → Save/Display → Back to Menu
├── 5. Syntax Guide → Show Guide → Back to Menu
└── 0. Exit → Goodbye Message
```

The `/guide` command works at any input step and returns you to where you were!
