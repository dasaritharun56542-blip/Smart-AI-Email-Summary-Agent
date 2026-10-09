import { useState, useEffect, useCallback } from 'react';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function App() {
  const [connectionStatus, setConnectionStatus] = useState('checking'); // 'checking' | 'connected' | 'disconnected'
  const [healthData, setHealthData] = useState(null);
  const [latency, setLatency] = useState(null);
  const [lastChecked, setLastChecked] = useState(null);

  const checkHealth = useCallback(async () => {
    setConnectionStatus('checking');
    const startTime = performance.now();
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/health`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      const endTime = performance.now();
      setLatency(Math.round(endTime - startTime));

      if (response.ok) {
        const data = await response.json();
        setHealthData(data);
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('disconnected');
        setHealthData(null);
      }
    } catch (err) {
      console.error('Backend connection error:', err);
      setConnectionStatus('disconnected');
      setHealthData(null);
    } finally {
      setLastChecked(new Date().toLocaleTimeString());
    }
  }, []);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="header">
        <div className="brand">
          <div className="brand-icon">⚡</div>
          <div className="brand-title">Communication Intelligence Platform</div>
        </div>

        <div className="header-actions">
          <div className={`status-badge ${connectionStatus}`}>
            <span className="pulse-dot"></span>
            {connectionStatus === 'connected' && `Backend Connected (${latency}ms)`}
            {connectionStatus === 'disconnected' && 'Backend Disconnected'}
            {connectionStatus === 'checking' && 'Checking Connection...'}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">
          AI-Powered <span className="gradient-text">Communication Intelligence</span>
        </h1>
        <p className="hero-subtitle">
          Connect your authorized email, chat, and voice channels. Unified conversation summarization, task extraction, and permission-controlled automation powered by Google Gemini AI.
        </p>
      </section>

      {/* Grid: Connection Details & System Overview */}
      <div className="grid-two">
        {/* Backend API Connection Status Card */}
        <div className="glass-card card-padding">
          <div className="card-header-flex">
            <h2 className="card-title">🌐 Backend Connection Status</h2>
            <button
              onClick={checkHealth}
              disabled={connectionStatus === 'checking'}
              className="btn-secondary"
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}
            >
              {connectionStatus === 'checking' ? 'Testing...' : 'Test Endpoint'}
            </button>
          </div>

          <ul className="backend-info-list">
            <li className="backend-info-item">
              <span className="backend-info-label">Configured API Base URL:</span>
              <span className="backend-info-value">{API_BASE_URL}</span>
            </li>
            <li className="backend-info-item">
              <span className="backend-info-label">Connection State:</span>
              <span className="backend-info-value" style={{ textTransform: 'capitalize' }}>
                {connectionStatus}
              </span>
            </li>
            <li className="backend-info-item">
              <span className="backend-info-label">Service Name:</span>
              <span className="backend-info-value">{healthData?.app || '—'}</span>
            </li>
            <li className="backend-info-item">
              <span className="backend-info-label">Backend Version:</span>
              <span className="backend-info-value">{healthData?.version || '—'}</span>
            </li>
            <li className="backend-info-item">
              <span className="backend-info-label">Environment:</span>
              <span className="backend-info-value">{healthData?.environment || '—'}</span>
            </li>
            <li className="backend-info-item">
              <span className="backend-info-label">Last Ping Time:</span>
              <span className="backend-info-value">{lastChecked || 'Not checked'}</span>
            </li>
          </ul>
        </div>

        {/* Platform Foundation Overview */}
        <div className="glass-card card-padding">
          <h2 className="card-title" style={{ marginBottom: '1rem' }}>⚙️ Architectural Stack</h2>
          <ul className="backend-info-list">
            <li className="backend-info-item">
              <span className="backend-info-label">Frontend:</span>
              <span className="backend-info-value">React 18 + Vite</span>
            </li>
            <li className="backend-info-item">
              <span className="backend-info-label">Backend Engine:</span>
              <span className="backend-info-value">Python FastAPI</span>
            </li>
            <li className="backend-info-item">
              <span className="backend-info-label">Primary AI Provider:</span>
              <span className="backend-info-value">Google Gemini (`google-genai`)</span>
            </li>
            <li className="backend-info-item">
              <span className="backend-info-label">Database & ORM:</span>
              <span className="backend-info-value">PostgreSQL + SQLAlchemy 2.x</span>
            </li>
            <li className="backend-info-item">
              <span className="backend-info-label">Migrations:</span>
              <span className="backend-info-value">Alembic</span>
            </li>
            <li className="backend-info-item">
              <span className="backend-info-label">Testing Framework:</span>
              <span className="backend-info-value">Pytest + TestClient</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area: Clear Empty State */}
      <section className="empty-state glass-card">
        <div className="empty-state-icon">🔌</div>
        <h3 className="empty-state-title">No Communication Connectors Configured</h3>
        <p className="empty-state-desc">
          The foundation of the platform is running successfully. In subsequent phases, you will be able to link authorized communication services, ingest streams, and trigger Gemini AI automated workflows.
        </p>

        <div className="connector-pills">
          <div className="connector-pill">
            📧 Email (Gmail / Outlook) <span className="badge">Planned</span>
          </div>
          <div className="connector-pill">
            💬 Slack Workspaces <span className="badge">Planned</span>
          </div>
          <div className="connector-pill">
            👥 Microsoft Teams <span className="badge">Planned</span>
          </div>
          <div className="connector-pill">
            🤖 Gemini AI Summarizer <span className="badge">Planned</span>
          </div>
          <div className="connector-pill">
            📋 Task Tracking Engine <span className="badge">Planned</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        Communication Intelligence Platform &bull; Phase 1 Initial Foundation &bull; Running on Windows Dev Environment
      </footer>
    </div>
  );
}

export default App;
