#!/usr/bin/env node

/**
 * 🤖 AI Assistant Module
 * Provides free LLM-powered features for markdown enhancement
 */

const fs = require('fs').promises;
const path = require('path');
const https = require('https');

class AIAssistant {
    constructor() {
        this.config = {
            // Default to free OpenRouter API
            provider: 'openrouter',
            model: 'mistralai/mistral-7b-instruct:free',
            apiUrl: 'https://openrouter.ai/api/v1/chat/completions',
            maxTokens: 1000,
            temperature: 0.7
        };
        this.apiKey = null;
        this.configLoaded = false;
    }

    async ensureConfigLoaded() {
        if (!this.configLoaded) {
            await this.loadConfig();
            this.configLoaded = true;
        }
    }

    async loadConfig() {
        try {
            // Try to load .env file
            if (await this.fileExists('.env')) {
                const envContent = await fs.readFile('.env', 'utf8');
                const envLines = envContent.split('\n');
                for (const line of envLines) {
                    if (line.startsWith('OPENROUTER_API_KEY=')) {
                        this.apiKey = line.split('=')[1].trim();
                    }
                    if (line.startsWith('AI_PROVIDER=')) {
                        this.config.provider = line.split('=')[1].trim();
                    }
                    if (line.startsWith('AI_MODEL=')) {
                        this.config.model = line.split('=')[1].trim();
                    }
                }
            }

            // Try to load AI config
            if (await this.fileExists('.ai-config.json')) {
                const configContent = await fs.readFile('.ai-config.json', 'utf8');
                const config = JSON.parse(configContent);
                this.config = { ...this.config, ...config };
            }
        } catch (error) {
            console.log('⚠️  No AI configuration found, using defaults');
        }
    }

    async fileExists(filePath) {
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }

    async setupApiKey() {
        await this.ensureConfigLoaded();
        
        if (!this.apiKey) {
            console.log('\n🔑 AI Assistant Setup');
            console.log('════════════════════════════════════════');
            console.log('To use AI features, you need a free API key from OpenRouter.');
            console.log('');
            console.log('🆓 Get your FREE API key:');
            console.log('   1. Visit: https://openrouter.ai/');
            console.log('   2. Sign up for free account');
            console.log('   3. Go to API Keys section');
            console.log('   4. Create a new API key');
            console.log('');
            console.log('💡 The free tier includes models like:');
            console.log('   • Mistral-7B (fast, good quality)');
            console.log('   • Mixtral-8x7B (higher quality)');
            console.log('   • Meta-Llama models');
            console.log('');

            // Create .env template
            const envTemplate = `# AI Assistant Configuration
# Get your free API key from: https://openrouter.ai/
OPENROUTER_API_KEY=your_api_key_here

# AI Provider Settings (optional)
AI_PROVIDER=openrouter
AI_MODEL=mistralai/mistral-7b-instruct:free

# Local LLM Settings (alternative to OpenRouter)
# OLLAMA_BASE_URL=http://localhost:11434
# LOCAL_MODEL=llama2:7b
`;

            await fs.writeFile('.env.example', envTemplate);
            console.log('✅ Created .env.example file with configuration template');
            console.log('');
            console.log('📝 To enable AI features:');
            console.log('   1. Copy .env.example to .env');
            console.log('   2. Add your OpenRouter API key');
            console.log('   3. Run the AI commands again');
            
            return false;
        }
        return true;
    }

    async callOpenRouter(prompt, systemPrompt = '') {
        if (!this.apiKey) throw new Error('API key not configured. Run setup first.');
        if (typeof prompt !== 'string' || !prompt.trim()) throw new Error('Prompt must be a non-empty string');
        if (prompt.length > 8000) throw new Error('Prompt too large (limit 8000 characters)');

        const payload = {
            model: this.config.model,
            messages: [
                ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
                { role: 'user', content: prompt }
            ],
            max_tokens: this.config.maxTokens,
            temperature: this.config.temperature
        };

        return new Promise((resolve, reject) => {
            const data = JSON.stringify(payload);
            const options = {
                hostname: 'openrouter.ai',
                port: 443,
                path: '/api/v1/chat/completions',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`,
                    'HTTP-Referer': 'https://github.com/AndyLiu0330/Markdown-CLI-Writer',
                    'X-Title': 'Markdown CLI Writer',
                    'Content-Length': data.length,
                    'User-Agent': 'markdown-cli-writer/1.0 (+https://npmjs.com/package/markdown-cli-writer)'
                },
                timeout: 30000
            };
            const req = https.request(options, (res) => {
                let responseData = '';
                res.on('data', (chunk) => { responseData += chunk; });
                res.on('end', () => {
                    try {
                        const response = JSON.parse(responseData);
                        if (response.choices && response.choices[0] && response.choices[0].message) {
                            resolve(response.choices[0].message.content);
                        } else {
                            reject(new Error('Invalid response format'));
                        }
                    } catch (error) {
                        reject(new Error(`Failed to parse response: ${error.message}`));
                    }
                });
            });
            req.on('timeout', () => { req.destroy(); reject(new Error('OpenRouter request timed out')); });
            req.on('error', (error) => reject(new Error(`Request failed: ${error.message}`)));
            req.write(data);
            req.end();
        });
    }

    async callOllama(prompt, systemPrompt = '') {
        const ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
        const model = process.env.LOCAL_MODEL || 'llama2:7b';
        if (typeof prompt !== 'string' || !prompt.trim()) throw new Error('Prompt must be a non-empty string');
        if (prompt.length > 16000) throw new Error('Prompt too large (limit 16000 characters)');
        const payload = {
            model,
            prompt: systemPrompt ? `${systemPrompt}\n\n${prompt}` : prompt,
            stream: false
        };
        return new Promise((resolve, reject) => {
            const data = JSON.stringify(payload);
            const url = new URL(`${ollamaUrl}/api/generate`);
            const options = {
                hostname: url.hostname,
                port: url.port || 11434,
                path: url.pathname,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': data.length,
                    'User-Agent': 'markdown-cli-writer/1.0'
                },
                timeout: 60000
            };
            const req = https.request(options, (res) => {
                let responseData = '';
                res.on('data', (chunk) => { responseData += chunk; });
                res.on('end', () => {
                    try {
                        const response = JSON.parse(responseData);
                        if (response.response) {
                            resolve(response.response);
                        } else {
                            reject(new Error('Invalid Ollama response format'));
                        }
                    } catch (error) {
                        reject(new Error(`Failed to parse Ollama response: ${error.message}`));
                    }
                });
            });
            req.on('timeout', () => { req.destroy(); reject(new Error('Ollama request timed out')); });
            req.on('error', (error) => reject(new Error(`Ollama request failed: ${error.message}`)));
            req.write(data);
            req.end();
        });
    }

    async generateResponse(prompt, systemPrompt = '') {
        try {
            if (this.config.provider === 'ollama') return await this.callOllama(prompt, systemPrompt);
            return await this.callOpenRouter(prompt, systemPrompt);
        } catch (error) {
            throw new Error(`AI generation failed: ${error.message}`);
        }
    }

    async suggestImprovements(content) {
        await this.ensureConfigLoaded();
        const systemPrompt = `You are a helpful writing assistant. Analyze the given markdown content and suggest improvements for titles, headings, and overall structure. Focus on:
1. Better, more engaging titles
2. Clearer headings hierarchy
3. Content organization improvements
4. Brief summary suggestions

Provide concise, actionable suggestions in markdown format.`;
        const prompt = `Please analyze this markdown content and suggest improvements:\n\n\`\`\`markdown\n${content}\n\`\`\`\n\nProvide specific suggestions for better titles, headings, and organization.`;
        return await this.generateResponse(prompt, systemPrompt);
    }

    async fixGrammar(content) {
        await this.ensureConfigLoaded();
        const systemPrompt = `You are a professional editor. Fix grammar, spelling, and improve sentence structure in the given markdown content. Maintain the original meaning and markdown formatting. Only fix language issues, don't change the content structure.`;
        const prompt = `Please fix grammar and improve the writing in this markdown content:\n\n\`\`\`markdown\n${content}\n\`\`\`\n\nReturn the corrected markdown with the same structure but improved language.`;
        return await this.generateResponse(prompt, systemPrompt);
    }

    async expandContent(content) {
        await this.ensureConfigLoaded();
        const systemPrompt = `You are a content expansion expert. Take the given markdown headings and brief content, then expand them into more detailed sections with examples, explanations, and additional context. Maintain the original structure but add substantial value.`;
        const prompt = `Please expand this markdown content by adding more detail, examples, and explanations to each section:\n\n\`\`\`markdown\n${content}\n\`\`\`\n\nAdd practical examples, detailed explanations, and helpful context while maintaining the original structure.`;
        return await this.generateResponse(prompt, systemPrompt);
    }
}

module.exports = AIAssistant;
