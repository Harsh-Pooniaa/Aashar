import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  Shield,
  Stethoscope,
  Info
} from 'lucide-react';

const QUESTIONS = [
  {
    id: 'symptom_onset',
    question: 'How quickly did the symptoms appear?',
    options: ['Sudden (Within minutes)', 'Gradual (Over hours)', 'Ongoing for several days']
  },
  {
    id: 'pain_level',
    question: 'How would you rate the pain or discomfort severity (1 - 10)?',
    options: ['Mild (1 - 3)', 'Moderate (4 - 6)', 'Severe (7 - 10)']
  },
  {
    id: 'category',
    question: 'What is the primary area of concern?',
    options: [
      'Chest / Breathing / Cardiovascular',
      'Bone / Joint / Physical Trauma',
      'Neurological / Dizziness / Severe Headache',
      'General Fever / Gastrointestinal / Other'
    ]
  },
  {
    id: 'breathing',
    question: 'Are there any difficulties in breathing or speaking?',
    options: ['Yes, severe shortness of breath', 'Slight tightness', 'No difficulty breathing']
  }
];

export default function SymptomChecker({ onEmergencyTrigger, onAskAi }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const handleSelectOption = (option) => {
    const q = QUESTIONS[currentStep];
    const newAnswers = { ...answers, [q.id]: option };
    setAnswers(newAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };

  const calculateRisk = () => {
    let score = 0;
    if (answers.symptom_onset === 'Sudden (Within minutes)') score += 3;
    if (answers.pain_level === 'Severe (7 - 10)') score += 3;
    if (answers.category?.includes('Chest')) score += 4;
    if (answers.category?.includes('Trauma')) score += 2;
    if (answers.breathing?.includes('severe shortness')) score += 5;

    if (score >= 6) {
      return {
        level: 'HIGH EMERGENCY',
        color: '#ef4444',
        badgeClass: 'badge-danger',
        desc: 'Potential critical event detected. Immediate emergency medical intervention or ambulance dispatch strongly recommended.',
        isEmergency: true
      };
    } else if (score >= 3) {
      return {
        level: 'MODERATE URGENCY',
        color: '#f59e0b',
        badgeClass: 'badge-warning',
        desc: 'Symptoms warrant clinical assessment within 1 - 2 hours. Consider scheduling a specialist consultation today.',
        isEmergency: false
      };
    } else {
      return {
        level: 'LOW / ROUTINE',
        color: '#10b981',
        badgeClass: 'badge-success',
        desc: 'Symptoms appear stable for routine evaluation. You may schedule a general consultation or monitor symptoms.',
        isEmergency: false
      };
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setCompleted(false);
  };

  const result = completed ? calculateRisk() : null;

  return (
    <section id="triage-tool" className="section">
      <div className="section-header">
        <span className="section-badge">Interactive Clinical Tool</span>
        <h2 className="section-title">Emergency Risk Evaluator</h2>
        <p className="section-subtitle">
          Answer 4 quick clinical questions for instant triage scoring and tailored dispatch guidance.
        </p>
      </div>

      <div className="form-card" style={{ maxWidth: '720px', border: '1px solid rgba(239, 68, 68, 0.25)' }}>
        {!completed ? (
          <div>
            {/* Progress bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                Question {currentStep + 1} of {QUESTIONS.length}
              </span>
              <span style={{ fontSize: '0.85rem', color: '#ef4444', fontWeight: 600 }}>
                {Math.round(((currentStep + 1) / QUESTIONS.length) * 100)}%
              </span>
            </div>

            <div style={{ height: '6px', background: '#272936', borderRadius: '3px', marginBottom: '28px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #ef4444, #f87171)', 
                  width: `${((currentStep + 1) / QUESTIONS.length) * 100}%`,
                  transition: 'width 0.3s ease'
                }}
              ></div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '22px', color: '#fff' }}>
              {QUESTIONS[currentStep].question}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {QUESTIONS[currentStep].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectOption(opt)}
                  className="interactive-choice-btn"
                >
                  <span>{opt}</span>
                  <ChevronRight size={18} color="#ef4444" />
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button 
                onClick={() => setCurrentStep(currentStep - 1)}
                style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '0.85rem', marginTop: '20px', cursor: 'pointer' }}
              >
                &larr; Previous Question
              </button>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div 
              style={{ 
                width: '70px', 
                height: '70px', 
                borderRadius: '50%', 
                background: `rgba(${result.color === '#ef4444' ? '239, 68, 68' : result.color === '#f59e0b' ? '245, 158, 11' : '16, 185, 129'}, 0.15)`,
                border: `2px solid ${result.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              {result.isEmergency ? <AlertCircle size={38} color={result.color} /> : <CheckCircle2 size={38} color={result.color} />}
            </div>

            <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '20px', background: `rgba(${result.color === '#ef4444' ? '239, 68, 68' : '16, 185, 129'}, 0.2)`, color: result.color, fontWeight: 800, fontSize: '0.88rem', marginBottom: '12px', border: `1px solid ${result.color}` }}>
              TRIAGE RESULT: {result.level}
            </div>

            <p style={{ color: '#e2e8f0', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto 24px', lineHeight: '1.6' }}>
              {result.desc}
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              {result.isEmergency ? (
                <button 
                  onClick={onEmergencyTrigger}
                  className="btn-emergency"
                >
                  🚨 Dispatch Ambulance Now
                </button>
              ) : (
                <a href="#book" className="btn-primary">
                  Book Specialist Consultation
                </a>
              )}

              <button 
                onClick={() => onAskAi(`I completed the risk triage with: Onset: ${answers.symptom_onset}, Severity: ${answers.pain_level}, Category: ${answers.category}. What is your clinical recommendation?`)}
                className="btn-secondary"
              >
                <Sparkles size={16} color="#ef4444" /> Ask Groq AI About This
              </button>

              <button onClick={handleReset} className="btn-secondary">
                Restart Triage
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
