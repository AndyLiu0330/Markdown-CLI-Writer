#!/usr/bin/env node

const args = process.argv.slice(2);

// Handle CLI commands
if (args.includes('--version') || args.includes('-v')) {
    const packageJson = require('../package.json');
    console.log(`Markdown CLI Writer v${packageJson.version}`);
    process.exit(0);
}

if (args.includes('--help') || args.includes('-h')) {
    console.log(`
🖋️  Markdown CLI Writer - Help

Usage:
  cli start           Start the interactive menu
  cli --version       Show version
  cli --help          Show this help

Examples:
  cli start           # Launch enhanced menu
  npm start           # Alternative way to launch
  npm run start-simple # Simple menu
    `);
    process.exit(0);
}

// If 'start' argument or no arguments, run the app
if (args.includes('start') || args.length === 0) {
    const { MarkdownCLIWriter } = require('./md-cli-gemini.js');
    const app = new MarkdownCLIWriter();
    app.run().catch(error => {
        console.error('💥 Fatal error:', error);
        process.exit(1);
    });
} else {
    console.log('❌ Unknown command. Use "cli --help" for usage information.');
    process.exit(1);
}
