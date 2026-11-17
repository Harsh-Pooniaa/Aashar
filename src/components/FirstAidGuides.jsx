import React, { useState } from 'react';
import { 
  Heart, 
  Flame, 
  Bone, 
  Zap, 
  HelpCircle, 
  ArrowRight,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

const GUIDES = [
  {
    title: 'Severe Bleeding & Hemorrhage',
    icon: Flame,
    color: '#ef4444',
    steps: [
      'Apply direct, continuous firm pressure using sterile gauze or clean cloth.',
      'Do NOT remove soaked dressings; layer new dressings directly on top.',
      'Keep patient lying flat and elevate the injured limb above heart level if no fracture.',
      'If bleeding does not stop within 3 minutes, activate Tactical Emergency Dispatch immediately.'
    ]
  },
  {
    title: 'Chest Pain / Potential Heart Attack',
    icon: Heart,
    color: '#f87171',
    steps: [
      'Have patient sit comfortably in a semi-reclined position (knees slightly bent).',
      'Loosen restrictive clothing around collar and chest immediately.',
      'Ask if they carry prescribed nitroglycerin or chewable aspirin (325mg) if advised by physician.',
      'Do NOT allow patient to walk or exert themselves. Dispatch ambulance immediately.'
    ]
  },
  {
    title: 'Suspected Bone Fracture / Dislocation',
    icon: Bone,
    color: '#38bdf8',
    steps: [
      'Immobilize the injured area; do NOT attempt to realign or push bones back.',
      'Apply ice wrapped in cloth for 15-minute intervals to reduce swelling.',
      'Check circulation: ensure toes or fingers below the injury remain warm with sensation.',
      'Schedule priority orthopedic evaluation with Dr. M. Gupta.'
    ]
  },
  {
    title: 'Stroke FAST Protocol',
    icon: Zap,
    color: '#eab308',
    steps: [
      'Face: Ask person to smile. Does one side of the face droop?',
      'Arms: Ask person to raise both arms. Does one arm drift downward?',
      'Speech: Ask person to repeat a simple phrase. Is speech slurred or strange?',
      'Time: If any of these signs appear, every second counts. Immediate hospital transport needed.'
    ]
  }
];

export default function FirstAidGuides({ onAskAi }) {
  const [activeGuide, setActiveGuide] = useState(0);

  return (
    <section className="section" style={{ paddingTop: '20px' }}>
      <div className="section-header">
        <span className="section-badge">Life-Saving Protocols</span>
        <h2 className="section-title">Emergency First-Aid Guides</h2>
        <p className="section-subtitle">
          Critical actionable protocols to stabilize patients while emergency response units are en route.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {GUIDES.map((guide, idx) => {
          const Icon = guide.icon;
          const isSelected = activeGuide === idx;
          return (
            <div
              key={idx}
              onClick={() => setActiveGuide(idx)}
              className={`glass-card guide-tab ${isSelected ? 'guide-tab-active' : ''}`}
              style={{
                cursor: 'pointer',
                padding: '20px',
                borderColor: isSelected ? guide.color : '#272936',
                background: isSelected ? 'rgba(239, 68, 68, 0.08)' : 'rgba(18, 19, 25, 0.7)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ background: `rgba(${guide.color === '#ef4444' ? '239, 68, 68' : '56, 189, 248'}, 0.15)`, padding: '10px', borderRadius: '10px' }}>
                  <Icon size={22} color={guide.color} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: isSelected ? '#fff' : '#cbd5e1' }}>
                    {guide.title}
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>4 Key Steps</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guide Details Box */}
      <div className="form-card" style={{ maxWidth: '100%', border: '1px solid #272936' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: GUIDES[activeGuide].color }}>
            Action Steps: {GUIDES[activeGuide].title}
          </h3>
          <button 
            onClick={() => onAskAi(`Give me detailed clinical emergency guidance and first aid instructions for: ${GUIDES[activeGuide].title}`)}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '8px 14px' }}
          >
            <Sparkles size={14} color="#ef4444" /> Ask Groq AI Deep Protocol
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          {GUIDES[activeGuide].steps.map((step, sIdx) => (
            <div 
              key={sIdx}
              style={{ 
                background: '#191a24', 
                border: '1px solid #2a2c3a', 
                borderRadius: '12px', 
                padding: '16px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start'
              }}
            >
              <span style={{ 
                width: '28px', 
                height: '28px', 
                borderRadius: '50%', 
                background: '#ef4444', 
                color: '#fff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                fontWeight: 800,
                fontSize: '0.85rem',
                flexShrink: 0
              }}>
                {sIdx + 1}
              </span>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#e2e8f0', lineHeight: '1.5' }}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
