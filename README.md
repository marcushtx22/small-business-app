# AI Agent Platform for Small Businesses

A full-stack platform that provides small businesses with access to 8 specialized AI agents. The platform allows users to select 5 active agents for direct interaction while 3 agents work in "Strategy Mode" to generate business insights.

## Features

- 8 specialized AI agents for different business functions
- Interactive chat interface with selected agents
- Strategy Mode for generating business insights
- PDF report generation with insights, predictions, and new business ideas
- Modern, responsive UI built with Builder.io
- MongoDB database for data persistence
- Deployable on Vercel

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key
- MongoDB Atlas account (free tier available)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-agent-platform
```

2. Install dependencies:
```bash
npm install
cd src/backend && npm install
```

3. Set up MongoDB Atlas:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free account and cluster
   - Create a database user with read/write permissions
   - Allow network access from anywhere (0.0.0.0/0)
   - Get your connection string

4. Create a `.env` file in the root directory:
```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority

# OpenAI API Key
OPENAI_API_KEY=your-openai-api-key-here

# Builder.io Configuration
BUILDER_API_KEY=0355fc8dd8574bd582b6401e6e692b5b
BUILDER_MODEL_ID=e2a9e0ba558e44e7afcf226de4e8f0bc

# Development Settings
VITE_API_URL=http://localhost:3001
NODE_ENV=development
```

5. Start the development server:
```bash
npm run dev
```

## MongoDB Setup Guide

### Step 1: Create MongoDB Atlas Account
1. Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project

### Step 2: Create a Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider and region
4. Click "Create"

### Step 3: Configure Database Access
1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and strong password
5. Set privileges to "Read and write to any database"
6. Click "Add User"

### Step 4: Configure Network Access
1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<username>` and `<password>` with your actual credentials

## Vercel Deployment

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy to Vercel
```bash
vercel
```

### Step 4: Set Environment Variables in Vercel
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the following variables:
   - `MONGODB_URI`: Your MongoDB connection string
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `BUILDER_API_KEY`: Your Builder.io API key
   - `BUILDER_MODEL_ID`: Your Builder.io model ID

### Step 5: Redeploy
```bash
vercel --prod
```

## API Endpoints

### Start a Session
```http
POST /api/sessions/start
Content-Type: application/json

{
  "userId": "user123",
  "selectedAgents": ["OpsBot", "FinanceFix", "SalesGenie", "SupportX", "BrandBuilder"]
}
```

### Get Agent Response
```http
POST /api/messages/send
Content-Type: application/json

{
  "sessionId": "session123",
  "agent": "FinanceFix",
  "message": "Review these expenses"
}
```

### Get Strategy Report
```http
GET /api/reports/strategy?sessionId=session123
```

## Available Agents

1. OpsBot: Administrative tasks and operations management
2. FinanceFix: Financial analysis and expense management
3. SalesGenie: Sales optimization and customer acquisition
4. SupportX: Customer support and service
5. BrandBuilder: Branding and marketing copy
6. MarketMind: Market analysis and competitor research
7. GrowthGuru: Business growth strategies
8. Visionary: Strategic foresight and innovation

## Development

- Frontend: React with TypeScript and Builder.io
- Backend: Node.js with Express and TypeScript
- Database: MongoDB with Mongoose ODM
- AI Integration: OpenAI GPT-4 API
- Deployment: Vercel

## Database Schema

The application uses the following MongoDB collections:
- `sessions`: User sessions and agent selections
- `messages`: Chat messages between users and agents
- `reports`: Generated strategy reports

## License

MIT 