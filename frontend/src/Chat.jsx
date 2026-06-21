import { useState } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      if (!response.ok) throw new Error('Request failed');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Chat with Priya</h2>
      <div>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.role}:</strong> {msg.text}</p>
        ))}
        {loading && <p><em>Priya is typing...</em></p>}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
        disabled={loading}
      />
      <button onClick={sendMessage} disabled={loading}>Send</button>
    </div>
  );
}

export default Chat;
