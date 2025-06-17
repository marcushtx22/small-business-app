import OpenAI from 'openai';
import { AgentType } from '../types.js';
import { getAgentPrompt, getStrategyPrompt } from '../utils/agentHelpers';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export class OpenAIService {
  static async getAgentResponse(
    agentType: AgentType,
    message: string,
    context: string = ''
  ): Promise<string> {
    try {
      const prompt = getAgentPrompt(agentType);
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: `${context}\n\nUser message: ${message}` }
        ],
        temperature: 0.7,
        max_tokens: 500
      });

      return completion.choices[0].message.content || 'No response generated';
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to get response from OpenAI');
    }
  }

  static async generateStrategyReport(
    agentType: AgentType,
    sessionMessages: string[]
  ): Promise<{
    insights: string[];
    predictions: string[];
    newBusinessIdea: string;
  }> {
    try {
      const prompt = getStrategyPrompt(agentType);
      const context = sessionMessages.join('\n');
      
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: `Based on the following conversation, provide:\n1. Three key insights\n2. Two predictions\n3. One new business idea\n\nConversation:\n${context}` }
        ],
        temperature: 0.8,
        max_tokens: 1000
      });

      const response = completion.choices[0].message.content || '';
      
      // Parse the response into structured data
      const sections = response.split('\n\n');
      const insights = sections[0].split('\n').slice(1).map(line => line.replace(/^\d+\.\s*/, ''));
      const predictions = sections[1].split('\n').slice(1).map(line => line.replace(/^\d+\.\s*/, ''));
      const newBusinessIdea = sections[2].split('\n')[1];

      return {
        insights,
        predictions,
        newBusinessIdea
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      throw new Error('Failed to generate strategy report');
    }
  }
}

export async function generateStrategyReport(
  messages: string[],
  agents: AgentType[]
): Promise<string> {
  // TODO: Implement actual OpenAI integration
  // For now, return a mock response
  return `
Strategy Report

Based on the conversation with ${agents.join(', ')}, here are the key insights:

1. Business Growth Opportunity
   - Market expansion potential identified
   - New customer segments to target
   - Product line extension possibilities

2. Customer Engagement Strategy
   - Enhanced social media presence recommended
   - Customer loyalty program suggested
   - Community building initiatives proposed

3. Operational Efficiency
   - Process automation opportunities
   - Resource optimization recommendations
   - Cost reduction strategies

Next Steps:
1. Implement the suggested growth strategies
2. Develop the customer engagement plan
3. Review and optimize operations

This report was generated based on the conversation history and analysis by our AI agents.
`;
} 