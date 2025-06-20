const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: 'Missing messages array' });
    return;
  }
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 500,
    });
    const reply = completion.data.choices[0].message.content;
    res.status(200).json({ reply });
  } catch (error) {
    // Log the full error object for Vercel logs
    console.error('OpenAI API error:', error);
    let details = '';
    if (error.response && error.response.data) {
      details = JSON.stringify(error.response.data);
    } else if (error.message) {
      details = error.message;
    } else {
      details = JSON.stringify(error);
    }
    res.status(500).json({ 
      error: 'Failed to get response from OpenAI',
      details
    });
  }
}; 