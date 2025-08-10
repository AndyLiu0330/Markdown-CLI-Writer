# 📄 PRD – Markdown CLI Writer

## 📌 Project Name
**Markdown CLI Writer (md-cli)**

## 🧠 Overview
A Node.js CLI tool that parses formatted user input (e.g., `AAA(Title)`) and converts it into corresponding Markdown syntax. It prompts the user to choose whether to generate a `.md` file or just display the result in the terminal.

## 🎯 Goal
Help users quickly generate Markdown content through simple commands and structured syntax. Ideal for quick documentation, reports, and structured note-taking.

## ⚙️ Functionality

### Input Format
User types something like:
```
AAA(My Title)
```

### Behavior
- If the user chooses "Yes", generate a `.md` file with content:
  ```md
  # My Title
  ```
- If the user chooses "No", print:
  ```md
  # My Title
  ```

## 💡 Supported Syntax Table

| Prefix | Markdown | Output Example     |
|--------|----------|--------------------|
| AAA    | `#`      | `# Heading 1`      |
| BBB    | `##`     | `## Heading 2`     |
| CCC    | `###`    | `### Heading 3`    |
| DDD    | `-`      | `- List item`      |
| EEE    | `>`      | `> Quote`          |

## 📦 Dependencies

- `inquirer` – for CLI prompts  
- `chalk` – for colored terminal output  
- `fs` – to write `.md` files  
- `dotenv` (optional) – future-proof for config  
- `commander` (optional) – for future CLI flags  

## 🧰 Technologies

- Node.js  
- JavaScript  
- Markdown  

## 🚀 User Flow

1. CLI asks user for input string like `AAA(Welcome)`
2. Parses the string to Markdown format
3. Prompts the user:
   ```
   Do you want to generate a .md file? (Y/N)
   ```
4. If yes → creates a file named after prefix (`AAA.md`) with proper markdown
5. If no → shows markdown in terminal

## ✨ Sample Input/Output

**Input:**
```
BBB(Health Tips)
DDD(Less Salt)
DDD(More Veggies)
```

**Output in `.md` file or terminal:**
```md
## Health Tips
- Less Salt
- More Veggies
```

## 🧾 Resume Bullet (for reference)
```
🛠 Markdown CLI Writer – Node.js CLI Tool
- Built a command-line tool that parses custom-tagged input into structured Markdown format.
- Included .md file generation option using Node fs and Inquirer prompts.
- Supports heading, list, and quote syntax with clean output and CLI interaction.
```

## 📁 File Output Example

**Filename**: `BBB.md`

```md
## Health Tips
```
