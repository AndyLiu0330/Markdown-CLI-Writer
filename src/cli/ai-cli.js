#!/usr/bin/env node
/**
 * 🤖 AI CLI Commands (moved from project root)
 */
const fs = require('fs').promises;
const path = require('path');
const AIAssistant = require('../ai/ai-assistant');

function colorize(text, color){
	const colors={red:'\x1b[31m',green:'\x1b[32m',yellow:'\x1b[33m',blue:'\x1b[34m',magenta:'\x1b[35m',cyan:'\x1b[36m',white:'\x1b[37m',bold:'\x1b[1m',dim:'\x1b[2m',reset:'\x1b[0m'};return `${colors[color]||''}${text}${colors.reset}`;}
function styled(text,style={}){ let r=text; if(style.color) r=colorize(r,style.color); if(style.bold) r=colorize(r,'bold'); if(style.dim) r=colorize(r,'dim'); return r; }

class AICLICommands {
	constructor(){ this.ai=new AIAssistant(); }
	async ensureFileExists(fp){ try{ await fs.access(fp); return true;}catch{ console.log(styled(`❌ File not found: ${fp}`,{color:'red'})); return false; } }
	async readMarkdownFile(fp){ if(!await this.ensureFileExists(fp)) return null; try{ return await fs.readFile(fp,'utf8'); }catch(e){ console.log(styled(`❌ Error reading file: ${e.message}`,{color:'red'})); return null;} }
	async writeOutputFile(fp,content,suffix=''){ try{ const ext=path.extname(fp); const base=path.basename(fp,ext); const dir=path.dirname(fp); const out=path.join(dir,`${base}${suffix}${ext}`); await fs.writeFile(out,content,'utf8'); console.log(styled(`✅ Output saved: ${out}`,{color:'green'})); return out;}catch(e){ console.log(styled(`❌ Error saving file: ${e.message}`,{color:'red'})); return null;} }
	async suggest(fp){ console.log(styled('🤖 AI Suggest - Analyze and Improve Content',{color:'cyan',bold:true})); const has=await this.ai.setupApiKey(); if(!has) return; const content=await this.readMarkdownFile(fp); if(!content) return; console.log(styled('🔍 Analyzing content...',{color:'blue'})); try{ const suggestions=await this.ai.suggestImprovements(content); console.log('\n'+styled('💡 AI Suggestions:',{color:'green',bold:true})); console.log(suggestions); await this.writeOutputFile(fp,suggestions,'-suggestions'); }catch(e){ console.log(styled(`❌ AI analysis failed: ${e.message}`,{color:'red'})); } }
	async grammar(fp){ console.log(styled('📝 AI Grammar - Fix Grammar and Style',{color:'cyan',bold:true})); const has=await this.ai.setupApiKey(); if(!has) return; const content=await this.readMarkdownFile(fp); if(!content) return; console.log(styled('🔧 Fixing grammar and style...',{color:'blue'})); try{ const corrected=await this.ai.fixGrammar(content); console.log('\n'+styled('✨ Grammar-corrected content:',{color:'green',bold:true})); console.log(corrected.substring(0,500)+(corrected.length>500?'...':'')); await this.writeOutputFile(fp,corrected,'-corrected'); }catch(e){ console.log(styled(`❌ Grammar correction failed: ${e.message}`,{color:'red'})); } }
	async expand(fp){ console.log(styled('📚 AI Expand - Expand Content with Details',{color:'cyan',bold:true})); const has=await this.ai.setupApiKey(); if(!has) return; const content=await this.readMarkdownFile(fp); if(!content) return; console.log(styled('🚀 Expanding content...',{color:'blue'})); try{ const expanded=await this.ai.expandContent(content); console.log('\n'+styled('📖 Expanded content preview:',{color:'green',bold:true})); console.log(expanded.substring(0,500)+(expanded.length>500?'...':'')); await this.writeOutputFile(fp,expanded,'-expanded'); }catch(e){ console.log(styled(`❌ Content expansion failed: ${e.message}`,{color:'red'})); } }
	async setup(){ console.log(styled('⚙️  AI Assistant Setup',{color:'cyan',bold:true})); await this.ai.setupApiKey(); const template=`{\n  "provider": "openrouter",\n  "model": "mistralai/mistral-7b-instruct:free",\n  "apiUrl": "https://openrouter.ai/api/v1/chat/completions",\n  "maxTokens": 1000,\n  "temperature": 0.7\n}`; await fs.writeFile('.ai-config.json',template); console.log(styled('✅ Created .ai-config.json with configuration options',{color:'green'})); }
	showUsage(){ console.log(styled('🤖 AI Assistant Commands',{color:'cyan',bold:true})); console.log('  node ai-cli.js suggest <file.md>'); console.log('  node ai-cli.js grammar <file.md>'); console.log('  node ai-cli.js expand <file.md>'); console.log('  node ai-cli.js setup'); }
}
async function main(){ const [cmd,fp]=process.argv.slice(2); const cli=new AICLICommands(); switch(cmd){ case 'suggest': if(!fp) return console.log('Usage: node ai-cli.js suggest <file.md>'); await cli.suggest(fp); break; case 'grammar': if(!fp) return console.log('Usage: node ai-cli.js grammar <file.md>'); await cli.grammar(fp); break; case 'expand': if(!fp) return console.log('Usage: node ai-cli.js expand <file.md>'); await cli.expand(fp); break; case 'setup': await cli.setup(); break; default: cli.showUsage(); } }
if(require.main===module){ main().catch(e=>{ console.error('❌ Error:',e.message); process.exit(1); }); }
module.exports = AICLICommands;
