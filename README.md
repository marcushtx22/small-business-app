# AI Agent Platform for Small Businesses

A full-stack platform that provides small businesses with access to 8 specialized AI agents. The platform allows users to select 5 active agents for direct interaction while 3 agents work in "Strategy Mode" to generate business insights.

## Features

- 8 specialized AI agents for different business functions
- Interactive chat interface with selected agents
- Strategy Mode for generating business insights
- PDF report generation with insights, predictions, and new business ideas
- Modern, responsive UI built with Builder.io

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ai-agent-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
PORT=3000
OPENAI_API_KEY=your_api_key_here
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Start a Session
```http
POST /api/session/start
Content-Type: application/json

{
  "userId": "user123",
  "selectedAgents": ["OpsBot", "FinanceFix", "SalesGenie", "SupportX", "BrandBuilder"]
}
```

### Get Agent Response
```http
POST /api/agent/respond
Content-Type: application/json

{
  "sessionId": "session123",
  "agent": "FinanceFix",
  "message": "Review these expenses"
}
```

### Get Strategy Report
```http
GET /api/strategy/report?sessionId=session123
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

- Frontend: The UI is built with Builder.io and can be customized through their interface
- Backend: Node.js with Express and TypeScript
- AI Integration: OpenAI GPT-4 API

## License

MIT 