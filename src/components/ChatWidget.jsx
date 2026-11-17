import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  AlertTriangle, 
  Loader2,
  Trash2,
  Maximize2,
  Minimize2,
  Copy,
  Check
} from 'lucide-react';
import { askGroqAI } from '../services/groq';
import { logChatMessage } from '../services/firestoreService';

export default function ChatWidget({ onOpenEmergency, externalPrompt, onClearExternalPrompt }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "👋 **Welcome to Aashar AI Medical Triage & Dispatch.**\n\nPowered by Groq's 120B medical intelligence. Ask any health question, injury first-aid, or symptom query below.\n\n> 🚨 **Critical Alert**: If you have crushing chest pain, acute breathing distress, or severe bleeding, please activate **Emergency Dispatch** immediately.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const [sessionId] = useState(() => 'sess_' + Math.random().toString(36).substring(2, 9));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (externalPrompt) {
      setIsOpen(true);
      handleSend(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async (customText = null) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!customText) setInput('');
    setLoading(true);

    logChatMessage(sessionId, userMessage);

    try {
      const botReplyText = await askGroqAI(textToSend, messages);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      logChatMessage(sessionId, botMessage);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: "⚠️ I am unable to connect to the medical dispatch network at this moment. For urgent medical emergencies, please call our 24/7 hotline at **+91 98765 43210**.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickOption = (option) => {
    if (option === 'emergency') {
      onOpenEmergency();
      return;
    }
    const prompts = {
      symptoms: "I have sudden severe headache and dizziness. What triage steps should I take?",
      consultation: "How can I schedule a consultation with Dr. Sharma or Dr. Gupta?",
      dispatch: "What is your emergency dispatch ETA and tactical medical response procedure?"
    };
    handleSend(prompts[option] || option);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: "Conversation cleared. How can our medical response team assist you?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        className="chat-fab pulse-glow" 
        onClick={() => setIsOpen(!isOpen)}
        title="Open AI Medical Dispatch Chat"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`chat-window ${isExpanded ? 'chat-window-expanded' : ''}`}
        >
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <div style={{ background: '#ef4444', padding: '6px', borderRadius: '10px' }}>
                <Bot size={20} color="#fff" />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>Aashar Medical AI</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <span className="chat-badge">Live Groq AI</span>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>120B Model</span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button 
                onClick={handleClearHistory} 
                title="Clear Chat History"
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <Trash2 size={16} />
              </button>
              <button 
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? "Standard Size" : "Expand Size"}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="chat-quick-actions">
            <button 
              className="quick-btn" 
              style={{ background: 'rgba(239, 68, 68, 0.2)', borderColor: '#ef4444', color: '#f87171' }}
              onClick={() => handleQuickOption('emergency')}
            >
              🚨 Emergency Dispatch
            </button>
            <button className="quick-btn" onClick={() => handleQuickOption('symptoms')}>
              🤒 Check Symptoms
            </button>
            <button className="quick-btn" onClick={() => handleQuickOption('consultation')}>
              👨‍⚕️ Specialists
            </button>
            <button className="quick-btn" onClick={() => handleQuickOption('dispatch')}>
              🚑 Dispatch ETA
            </button>
          </div>

          {/* Messages Area */}
          <div className="chat-messages">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`message-bubble ${msg.sender === 'user' ? 'msg-user' : 'msg-bot'}`}
              >
                {msg.sender === 'user' ? (
                  <div style={{ whiteSpace: 'pre-line' }}>{msg.text}</div>
                ) : (
                  <div className="ai-markdown-content">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}

                <div className="msg-meta">
                  <span>{msg.timestamp}</span>
                  {msg.sender === 'bot' && (
                    <button 
                      onClick={() => handleCopy(msg.text, msg.id)}
                      className="copy-btn"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                      <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="message-bubble msg-bot" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                <span style={{ fontSize: '0.88rem', color: '#cbd5e1' }}>AI Triage analyzing symptoms with Groq 120B...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form 
            className="chat-input-bar" 
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
          >
            <input 
              type="text" 
              className="chat-input" 
              placeholder="Ask medical questions, injuries, or symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit" 
              className="chat-send-btn" 
              disabled={loading || !input.trim()}
              style={{ opacity: !input.trim() ? 0.6 : 1 }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
