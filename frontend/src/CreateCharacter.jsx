import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PERSONALITY_OPTIONS = [
  'friendly', 'professional', 'patient', 'empathetic',
  'enthusiastic', 'calm', 'direct', 'knowledgeable',
  'formal', 'casual', 'witty', 'supportive'
];

const TONE_OPTIONS = [
  'warm and professional',
  'formal and precise',
  'casual and friendly',
  'enthusiastic and energetic',
  'calm and reassuring'
];

function CreateCharacter() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [created, setCreated] = useState(null);

  const [form, setForm] = useState({
    name: '',
    personality_traits: [],
    tone: 'warm and professional',
    knowledge: '',
    restrictions: ''
  });

  const toggleTrait = (trait) => {
    setForm(prev => ({
      ...prev,
      personality_traits: prev.personality_traits.includes(trait)
        ? prev.personality_traits.filter(t => t !== trait)
        : prev.personality_traits.length < 5
          ? [...prev.personality_traits, trait]
          : prev.personality_traits
    }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim()) return setError('Character name is required');
    if (form.personality_traits.length === 0) return setError('Select at least one personality trait');
    if (!form.knowledge.trim()) return setError('Knowledge base is required');

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/character`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.detail || 'Something went wrong');
      }

      const data = await response.json();
      setCreated(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (created) {
    return (
      <div style={{
        maxWidth: '600px', margin: '60px auto',
        padding: '40px', textAlign: 'center',
        fontFamily: '-apple-system, sans-serif'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ color: '#111', marginBottom: '8px' }}>
          {form.name} is ready!
        </h2>
        <p style={{ color: '#666', marginBottom: '32px' }}>
          Your AI character has been created. Share the link below
          with your customers or embed it on your website.
        </p>
        <div style={{
          backgroundColor: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '24px',
          wordBreak: 'break-all',
          fontSize: '14px',
          color: '#0369a1'
        }}>
          {window.location.origin}/chat/{created.id}
        </div>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate(`/chat/${created.id}`)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Talk to {form.name}
          </button>
          <button
            onClick={() => {
              setCreated(null);
              setForm({
                name: '', personality_traits: [],
                tone: 'warm and professional',
                knowledge: '', restrictions: ''
              });
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#f3f4f6',
              color: '#111',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '700px', margin: '0 auto',
      padding: '40px 20px',
      fontFamily: '-apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#111', marginBottom: '8px' }}>
        Create your AI character
      </h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>
        Define your agent's personality and knowledge. Takes 5 minutes.
      </p>

      {/* Character Name */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
          Character Name *
        </label>
        <input
          value={form.name}
          onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
          placeholder="e.g. Priya, Alex, Maya"
          style={{
            width: '100%', padding: '12px',
            border: '1px solid #ddd', borderRadius: '8px',
            fontSize: '16px', boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Personality Traits */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
          Personality Traits * (pick up to 5)
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {PERSONALITY_OPTIONS.map(trait => (
            <button
              key={trait}
              onClick={() => toggleTrait(trait)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid',
                borderColor: form.personality_traits.includes(trait) ? '#0070f3' : '#ddd',
                backgroundColor: form.personality_traits.includes(trait) ? '#eff6ff' : '#fff',
                color: form.personality_traits.includes(trait) ? '#0070f3' : '#666',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: form.personality_traits.includes(trait) ? '600' : '400'
              }}
            >
              {trait}
            </button>
          ))}
        </div>
      </div>

      {/* Tone */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
          Response Tone *
        </label>
        <select
          value={form.tone}
          onChange={e => setForm(prev => ({ ...prev, tone: e.target.value }))}
          style={{
            width: '100%', padding: '12px',
            border: '1px solid #ddd', borderRadius: '8px',
            fontSize: '16px', backgroundColor: '#fff',
            boxSizing: 'border-box'
          }}
        >
          {TONE_OPTIONS.map(tone => (
            <option key={tone} value={tone}>{tone}</option>
          ))}
        </select>
      </div>

      {/* Knowledge Base */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
          Knowledge Base *
        </label>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
          Paste your FAQs, pricing, product info, policies — anything your agent should know.
          The more detail you provide, the better your agent performs.
        </p>
        <textarea
          value={form.knowledge}
          onChange={e => setForm(prev => ({ ...prev, knowledge: e.target.value }))}
          placeholder={`Example:\nOur product is a project management tool for remote teams.\nPricing: Basic ₹999/month, Pro ₹2999/month\nFree trial: 14 days, no credit card required\nSupport: support@yourcompany.com`}
          rows={10}
          style={{
            width: '100%', padding: '12px',
            border: '1px solid #ddd', borderRadius: '8px',
            fontSize: '14px', lineHeight: '1.6',
            resize: 'vertical', boxSizing: 'border-box'
          }}
        />
      </div>

      {/* Restrictions */}
      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#333' }}>
          Restrictions (optional)
        </label>
        <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>
          What should your agent never say or do?
        </p>
        <textarea
          value={form.restrictions}
          onChange={e => setForm(prev => ({ ...prev, restrictions: e.target.value }))}
          placeholder="Example: Don't discuss competitor pricing. Don't make promises about delivery dates."
          rows={3}
          style={{
            width: '100%', padding: '12px',
            border: '1px solid #ddd', borderRadius: '8px',
            fontSize: '14px', resize: 'vertical',
            boxSizing: 'border-box'
          }}
        />
      </div>

      {error && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '8px',
          color: '#dc2626',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%', padding: '14px',
          backgroundColor: loading ? '#93c5fd' : '#0070f3',
          color: '#fff', border: 'none',
          borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '16px', fontWeight: '700'
        }}
      >
        {loading ? 'Creating your character...' : 'Create Character →'}
      </button>
    </div>
  );
}

export default CreateCharacter;
