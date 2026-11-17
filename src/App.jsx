import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  Ambulance, 
  Clock, 
  Users, 
  Calendar, 
  PhoneCall, 
  ChevronRight, 
  Sparkles,
  Award,
  Lock,
  HeartPulse,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import BookingSection from './components/BookingSection';
import ChatWidget from './components/ChatWidget';
import EmergencyModal from './components/EmergencyModal';
import AdminDashboard from './components/AdminDashboard';
import SymptomChecker from './components/SymptomChecker';
import FirstAidGuides from './components/FirstAidGuides';

export default function App() {
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [externalPrompt, setExternalPrompt] = useState(null);

  const handleTriggerAiPrompt = (prompt) => {
    setExternalPrompt(prompt);
  };

  return (
    <div className="app-container">
      {/* Background decoration layers */}
      <div className="bg-layer"></div>
      <div className="bg-radial"></div>

      {/* Navigation */}
      <nav className="navbar">
        <a href="#" className="nav-brand">
          <div style={{ background: '#ef4444', width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <HeartPulse size={22} color="#fff" />
          </div>
          <div>
            <span>Aashar</span>
            <span style={{ color: '#ef4444', marginLeft: '4px' }}>International</span>
          </div>
          <span className="brand-badge">Elite Response</span>
        </a>

        <ul className="nav-links">
          <li><a href="#services">Response Services</a></li>
          <li><a href="#triage-tool">Risk Evaluator</a></li>
          <li><a href="#specialists">Specialists</a></li>
          <li><a href="#book">Consultation</a></li>
          <li><a href="#dashboard">Live Operations</a></li>
        </ul>

        <div className="nav-actions">
          <button 
            className="btn-emergency"
            onClick={() => setIsEmergencyOpen(true)}
          >
            <Ambulance size={18} />
            <span>Emergency Dispatch</span>
          </button>
        </div>
      </nav>

      {/* Hero Header */}
      <header className="hero">
        <div className="hero-pill">
          <Sparkles size={14} />
          Next-Gen AI Emergency Triage • Powered by Groq AI (120B Model)
        </div>

        <h1>
          Elite Medical Response.<br />
          <span>Anytime. Anywhere.</span>
        </h1>

        <p>
          World-class trauma intervention, executive medical protection, and rapid specialist consultations. 
          Integrated with instantaneous AI dispatch triage and cloud synchronization.
        </p>

        <div className="hero-actions">
          <button 
            className="btn-emergency"
            onClick={() => setIsEmergencyOpen(true)}
            style={{ fontSize: '1.05rem', padding: '14px 30px' }}
          >
            <Ambulance size={20} />
            Request Immediate Dispatch (5-7m ETA)
          </button>

          <a href="#triage-tool" className="btn-secondary" style={{ padding: '14px 26px' }}>
            <Activity size={18} />
            Start Clinical Triage
          </a>

          <a href="#book" className="btn-secondary" style={{ padding: '14px 26px' }}>
            <Calendar size={18} />
            Book Specialist Consultation
          </a>
        </div>

        {/* Stats ribbon */}
        <div className="stats-ribbon">
          <div className="stat-item">
            <div className="stat-val">5.4<span>m</span></div>
            <div className="stat-label">Avg Rapid Dispatch ETA</div>
          </div>
          <div className="stat-item">
            <div className="stat-val">100<span>%</span></div>
            <div className="stat-label">Board-Certified Specialists</div>
          </div>
          <div className="stat-item">
            <div className="stat-val">24<span>/7</span></div>
            <div className="stat-label">Critical Trauma Coverage</div>
          </div>
          <div className="stat-item">
            <div className="stat-val">&lt;0.8<span>s</span></div>
            <div className="stat-label">AI Triage Response (Groq)</div>
          </div>
        </div>
      </header>

      {/* Response Services Section */}
      <section id="services" className="section">
        <div className="section-header">
          <span className="section-badge">Response Capabilities</span>
          <h2 className="section-title">Specialized Protection Packages</h2>
          <p className="section-subtitle">
            Engineered for high-threat scenarios, urgent acute medical requirements, and full organizational protection.
          </p>
        </div>

        <div className="cards-grid">
          <div className="glass-card">
            <div className="card-icon">
              <Ambulance size={28} />
            </div>
            <h3 className="card-title">Rapid Medical Response</h3>
            <p className="card-desc">
              Immediate deployment of high-tier life-support medical transport equipped with advanced defibrillators, telemetry, and trauma surgeons on standby.
            </p>
          </div>

          <div className="glass-card">
            <div className="card-icon">
              <Shield size={28} />
            </div>
            <h3 className="card-title">Corporate Executive Coverage</h3>
            <p className="card-desc">
              Bespoke occupational emergency protocols, round-the-clock priority telemedicine access, and dedicated on-site trauma response for enterprises.
            </p>
          </div>

          <div className="glass-card">
            <div className="card-icon">
              <Lock size={28} />
            </div>
            <h3 className="card-title">VIP Protection & Transit</h3>
            <p className="card-desc">
              Specialized close-protection paramedic teams providing confidential medical escorts for international travel, VIP summits, and high-profile events.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Symptom Risk Evaluator */}
      <SymptomChecker 
        onEmergencyTrigger={() => setIsEmergencyOpen(true)}
        onAskAi={handleTriggerAiPrompt}
      />

      {/* Emergency First-Aid Life-saving Protocols */}
      <FirstAidGuides onAskAi={handleTriggerAiPrompt} />

      {/* Specialists Section */}
      <section id="specialists" className="section">
        <div className="section-header">
          <span className="section-badge">Medical Leadership</span>
          <h2 className="section-title">Meet Our Elite Responders</h2>
          <p className="section-subtitle">
            Internationally accredited clinicians and trauma surgeons dedicated to rapid clinical decision-making.
          </p>
        </div>

        <div className="cards-grid">
          {/* Doctor 1 */}
          <div className="glass-card doctor-card">
            <div className="doctor-avatar-wrapper">
              <img 
                src="/doctor1.jpg" 
                alt="Dr. R. Sharma" 
                className="doctor-avatar-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                style={{ display: 'none', width: '100%', height: '100%', borderRadius: '50%', background: '#1c1d27', border: '3px solid #ef4444', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}
              >
                👨‍⚕️
              </div>
              <span className="doctor-status" title="Active on Duty"></span>
            </div>
            <h4 className="doctor-name">Dr. R. Sharma</h4>
            <div className="doctor-role">Chief Medical Officer (CMO)</div>
            <p className="doctor-bio">
              20+ years commanding emergency medical divisions and air-ambulance tactical evacuations worldwide.
            </p>
            <a href="#book" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              Consult Dr. Sharma
            </a>
          </div>

          {/* Doctor 2 */}
          <div className="glass-card doctor-card">
            <div className="doctor-avatar-wrapper">
              <img 
                src="/doctor2.png" 
                alt="Dr. M. Gupta" 
                className="doctor-avatar-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                style={{ display: 'none', width: '100%', height: '100%', borderRadius: '50%', background: '#1c1d27', border: '3px solid #ef4444', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}
              >
                👩‍⚕️
              </div>
              <span className="doctor-status" title="Active on Duty"></span>
            </div>
            <h4 className="doctor-name">Dr. M. Gupta</h4>
            <div className="doctor-role">Orthopedic & Reconstructive Surgeon</div>
            <p className="doctor-bio">
              Expert in acute trauma management, microsurgery, complex skeletal fractures, and emergency intervention.
            </p>
            <a href="#book" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              Consult Dr. Gupta
            </a>
          </div>

          {/* Doctor 3 */}
          <div className="glass-card doctor-card">
            <div className="doctor-avatar-wrapper">
              <img 
                src="/doctor3.png" 
                alt="Dr. Jyoti" 
                className="doctor-avatar-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                style={{ display: 'none', width: '100%', height: '100%', borderRadius: '50%', background: '#1c1d27', border: '3px solid #ef4444', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}
              >
                👨‍⚕️
              </div>
              <span className="doctor-status" title="Active on Duty"></span>
            </div>
            <h4 className="doctor-name">Dr. Jyoti</h4>
            <div className="doctor-role">Trauma & Critical Surgical Lead</div>
            <p className="doctor-bio">
              Specialized in battlefield resuscitation, acute cardiac stabilization, and high-velocity injury procedures.
            </p>
            <a href="#book" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem' }}>
              Consult Dr. Jyoti
            </a>
          </div>
        </div>
      </section>

      {/* AI Triage Feature Showcase */}
      <section className="section" style={{ background: 'rgba(239, 68, 68, 0.03)', borderRadius: '24px', border: '1px solid rgba(239, 68, 68, 0.15)', margin: '40px auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', alignItems: 'center' }}>
          <div>
            <span className="section-badge" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BrainCircuit size={16} /> Intelligent AI Triage Engine
            </span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '10px 0 16px' }}>
              Live Groq Inference<br />
              Ultra-Fast Clinical Triage
            </h2>
            <p style={{ color: '#94a3b8', marginBottom: '20px', fontSize: '1rem', lineHeight: '1.7' }}>
              Powered by Groq's 120B parameter inference engine. Analyzes patient symptoms in milliseconds, provides clinical first-aid steps, detects life-threatening warnings, and connects directly to dispatch protocols.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => {
                  const el = document.querySelector('.chat-fab');
                  if (el) el.click();
                }}
                className="btn-primary"
              >
                <MessageSquare size={18} />
                Open Live AI Dispatch Chat
              </button>
            </div>
          </div>

          <div style={{ background: '#11121a', border: '1px solid #272936', borderRadius: '16px', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px', borderBottom: '1px solid #272936', paddingBottom: '10px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#eab308' }}></div>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', marginLeft: 'auto' }}>Groq AI gpt-oss-120b</span>
            </div>
            <div style={{ fontSize: '0.88rem', color: '#cbd5e1', lineHeight: '1.6' }}>
              <p style={{ color: '#f87171', fontWeight: 600, marginBottom: '6px' }}>User: "Severe sudden chest pressure radiating to left arm"</p>
              <p style={{ color: '#10b981', fontWeight: 600, marginBottom: '6px' }}>
                🚨 AI Triage: RED PROTOCOL ACTIVATED
              </p>
              <p style={{ color: '#94a3b8', fontSize: '0.82rem' }}>
                &bull; Immediate dispatch protocol recommended<br />
                &bull; Rest upright, avoid exertion<br />
                &bull; Logging critical alert into Cloud Firestore for paramedic prep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Consultation Section */}
      <BookingSection />

      {/* Admin / Live Operations Records */}
      <AdminDashboard />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <HeartPulse size={24} color="#ef4444" />
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>Aashar International</span>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '400px', lineHeight: '1.7' }}>
              Elite Medical Response and global medical evacuation networks. Committed to sub-10 minute tactical deployment and advanced clinical outcomes.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" title="Facebook">
                <img src="/facebook.png" alt="FB" style={{ width: '18px', height: '18px', objectFit: 'contain' }} onError={(e) => { e.target.outerHTML = '📘'; }} />
              </a>
              <a href="#" className="social-link" title="Instagram">
                <img src="/instagram.png" alt="IG" style={{ width: '18px', height: '18px', objectFit: 'contain' }} onError={(e) => { e.target.outerHTML = '📷'; }} />
              </a>
              <a href="#" className="social-link" title="Twitter">
                <img src="/twitter.webp" alt="TW" style={{ width: '18px', height: '18px', objectFit: 'contain' }} onError={(e) => { e.target.outerHTML = '🐦'; }} />
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>Command Center</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '8px' }}>📍 Global Response HQ, Sector 24</p>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '8px' }}>📞 Hotline: +91 98765 43210</p>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>✉️ dispatch@aashar-response.org</p>
          </div>

          <div>
            <h4 style={{ color: '#fff', fontSize: '1rem', fontWeight: 700, marginBottom: '16px' }}>Mobile Units</h4>
            <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginBottom: '12px' }}>Download the emergency telemetry client:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <img src="/appstore.jpg" alt="App Store" style={{ height: '36px', width: '120px', objectFit: 'contain', cursor: 'pointer' }} onError={(e) => e.target.style.display = 'none'} />
              <img src="/playstore.jpg" alt="Google Play" style={{ height: '36px', width: '120px', objectFit: 'contain', cursor: 'pointer' }} onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '30px', color: '#64748b', fontSize: '0.82rem' }}>
          &copy; {new Date().getFullYear()} Aashar International Medical Response. Built with React Vite + Firebase Firestore + Groq AI.
        </div>
      </footer>

      {/* Floating Chatbot Widget with Groq */}
      <ChatWidget 
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        externalPrompt={externalPrompt}
        onClearExternalPrompt={() => setExternalPrompt(null)}
      />

      {/* Emergency Dispatch Modal */}
      <EmergencyModal 
        isOpen={isEmergencyOpen} 
        onClose={() => setIsEmergencyOpen(false)} 
      />
    </div>
  );
}
