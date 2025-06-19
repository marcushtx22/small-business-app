#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 MongoDB Setup for Small Business App\n');

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupMongoDB() {
  try {
    console.log('📋 Please provide the following information:\n');
    
    const mongoUri = await question('Enter your MongoDB connection string: ');
    const openaiKey = await question('Enter your OpenAI API key: ');
    const builderKey = await question('Enter your Builder.io API key (or press Enter to use default): ') || '0355fc8dd8574bd582b6401e6e692b5b';
    const builderModelId = await question('Enter your Builder.io Model ID (or press Enter to use default): ') || 'e2a9e0ba558e44e7afcf226de4e8f0bc';
    
    const envContent = `# MongoDB Connection String
MONGODB_URI=${mongoUri}

# OpenAI API Key
OPENAI_API_KEY=${openaiKey}

# Builder.io Configuration
BUILDER_API_KEY=${builderKey}
BUILDER_MODEL_ID=${builderModelId}

# Development Settings
VITE_API_URL=http://localhost:3001
NODE_ENV=development
`;

    // Write .env file
    fs.writeFileSync('.env', envContent);
    
    console.log('\n✅ Environment file (.env) created successfully!');
    console.log('\n📝 Next steps:');
    console.log('1. Install dependencies: npm install');
    console.log('2. Install backend dependencies: cd src/backend && npm install');
    console.log('3. Start development server: npm run dev');
    console.log('\n🌐 For Vercel deployment:');
    console.log('1. Add these environment variables to your Vercel project');
    console.log('2. Deploy with: vercel --prod');
    
  } catch (error) {
    console.error('❌ Error during setup:', error.message);
  } finally {
    rl.close();
  }
}

setupMongoDB(); 