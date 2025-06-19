let sessions = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { userId, agents } = req.body;
    if (!userId || !Array.isArray(agents) || agents.length !== 5) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    const session = {
      id: 'session-' + Date.now(),
      userId,
      activeAgents: agents,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    sessions.push(session);
    return res.status(201).json(session);
  } else if (req.method === 'GET') {
    return res.status(200).json(sessions);
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 