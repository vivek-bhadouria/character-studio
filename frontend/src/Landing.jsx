import { useNavigate } from 'react-router-dom';

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
    }}>

      {/* Header */}
      <div style={{
        padding: '20px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #eee'
      }}>
        <div style={{ fontWeight: '700', fontSize: '20px', color: '#0070f3' }}>
          Character Studio
        </div>
        <button
          onClick={() => navigate('/chat')}
          style={{
            padding: '8px 20px',
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600'
          }}
        >
          Try Demo
        </button>
      </div>

      {/* Hero */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        padding: '80px 40px',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-block',
          backgroundColor: '#eff6ff',
          color: '#0070f3',
          padding: '6px 16px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600',
          marginBottom: '24px'
        }}>
          Built for Indian B2B SaaS teams
        </div>

        <h1 style={{
          fontSize: '48px',
          fontWeight: '800',
          lineHeight: '1.1',
          color: '#111',
          marginBottom: '20px'
        }}>
          Give your business an
          <span style={{ color: '#0070f3' }}> AI personality</span>
        </h1>

        <p style={{
          fontSize: '18px',
          color: '#555',
          lineHeight: '1.6',
          marginBottom: '40px',
          maxWidth: '500px',
          margin: '0 auto 40px'
        }}>
          Create a custom AI support agent with your brand's voice,
          your product knowledge, and your tone — deployed in minutes,
          not months.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/chat')}
            style={{
              padding: '14px 32px',
              backgroundColor: '#0070f3',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Talk to Priya — Live Demo
          </button>
        </div>

        <p style={{ marginTop: '12px', fontSize: '13px', color: '#999' }}>
          No signup required. See it working in 30 seconds.
        </p>
      </div>

      {/* 3 value props */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        padding: '0 40px 80px',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '32px'
      }}>
        {[
          {
            icon: '🎭',
            title: 'Your brand, not a generic bot',
            desc: "Define your agent's name, personality, and tone. It sounds like your team, not like every other chatbot."
          },
          {
            icon: '🧠',
            title: 'Knows your product deeply',
            desc: 'Feed it your FAQs, pricing, policies, and product docs. It answers accurately from your knowledge, nothing else.'
          },
          {
            icon: '⚡',
            title: 'Live in minutes',
            desc: 'No developers needed. Fill a form, get a deployable AI agent. Embed on your website or WhatsApp.'
          }
        ].map((item, i) => (
          <div key={i} style={{
            padding: '28px',
            backgroundColor: '#fafafa',
            borderRadius: '12px',
            border: '1px solid #eee'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
            <div style={{ fontWeight: '700', fontSize: '16px', marginBottom: '8px', color: '#111' }}>
              {item.title}
            </div>
            <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>
              {item.desc}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{
        backgroundColor: '#0070f3',
        padding: '60px 40px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#fff', fontSize: '28px', fontWeight: '700', marginBottom: '16px' }}>
          See it working right now
        </h2>
        <p style={{ color: '#bfdbfe', fontSize: '16px', marginBottom: '28px' }}>
          Priya is a demo agent for a SaaS billing platform. Talk to her.
        </p>
        <button
          onClick={() => navigate('/chat')}
          style={{
            padding: '14px 32px',
            backgroundColor: '#fff',
            color: '#0070f3',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '700'
          }}
        >
          Talk to Priya →
        </button>
      </div>

    </div>
  );
}

export default Landing;
