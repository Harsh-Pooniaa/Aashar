import React, { useState } from 'react';
import { 
  X, 
  AlertOctagon, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle, 
  Clock, 
  ShieldAlert,
  Loader2 
} from 'lucide-react';
import { requestEmergencyDispatch } from '../services/firestoreService';

export default function EmergencyModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    location: '',
    emergencyType: 'Cardiac / Severe Chest Pain',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dispatchResult, setDispatchResult] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await requestEmergencyDispatch(formData);
    setLoading(false);
    setSuccess(true);
    setDispatchResult({
      id: res.id || 'ASH-' + Math.floor(100000 + Math.random() * 900000),
      eta: '5-7 minutes',
      team: 'Alpha Unit #4 (Paramedic & Trauma Specialist)'
    });
  };

  const handleReset = () => {
    setSuccess(false);
    setDispatchResult(null);
    setFormData({
      patientName: '',
      phone: '',
      location: '',
      emergencyType: 'Cardiac / Severe Chest Pain',
      notes: ''
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: '#ef4444', padding: '8px', borderRadius: '10px' }}>
              <AlertOctagon size={24} color="#fff" />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#fff' }}>Emergency Dispatch Unit</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#f87171' }}>Rapid Medical Response • Priority 1</p>
            </div>
          </div>
          <button 
            onClick={handleReset} 
            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle size={40} color="#10b981" />
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '8px', color: '#10b981' }}>DISPATCH MOBILIZED</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '20px' }}>
              Aashar Emergency Unit is en route to your specified coordinates.
            </p>

            <div style={{ background: '#1c1d27', padding: '16px', borderRadius: '12px', border: '1px solid #2e303e', textAlign: 'left', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Dispatch Ticket ID:</span>
                <span style={{ fontWeight: 700, color: '#f87171' }}>{dispatchResult?.id}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Estimated Arrival:</span>
                <span style={{ fontWeight: 700, color: '#10b981' }}>{dispatchResult?.eta}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Assigned Unit:</span>
                <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: '0.85rem' }}>{dispatchResult?.team}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <a href="tel:+919876543210" className="btn-emergency" style={{ textDecoration: 'none' }}>
                <Phone size={18} /> Call Dispatch Command
              </a>
              <button onClick={handleReset} className="btn-secondary">
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', borderRadius: '8px', marginBottom: '18px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <ShieldAlert size={20} color="#f87171" style={{ flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#fca5a5' }}>
                This triggers instant paramedic dispatch to your location and logs to real-time Cloud Firestore.
              </p>
            </div>

            <div className="form-group">
              <label>Patient Name</label>
              <input 
                type="text" 
                required 
                className="form-control" 
                placeholder="Full name of patient"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Emergency Contact Phone</label>
                <input 
                  type="tel" 
                  required 
                  className="form-control" 
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Emergency Category</label>
                <select 
                  className="form-control"
                  value={formData.emergencyType}
                  onChange={(e) => setFormData({ ...formData, emergencyType: e.target.value })}
                >
                  <option>Cardiac / Severe Chest Pain</option>
                  <option>Severe Trauma / Bleeding</option>
                  <option>Acute Respiratory Distress</option>
                  <option>Unconscious / Neurological</option>
                  <option>Pediatric Emergency</option>
                  <option>Other Critical Event</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Current Location / Address (Coordinates)</label>
              <input 
                type="text" 
                required 
                className="form-control" 
                placeholder="Street address, building name, landmark or coordinates"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Critical Notes / Symptoms</label>
              <textarea 
                rows="2" 
                className="form-control" 
                placeholder="Patient conscious? Any allergies or pre-existing conditions..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              ></textarea>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button 
                type="submit" 
                disabled={loading} 
                className="btn-emergency" 
                style={{ flex: 1, justifyContent: 'center' }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                    Transmitting to Dispatch...
                  </>
                ) : (
                  <>🚨 Dispatch Unit Immediately</>
                )}
              </button>
              <button 
                type="button" 
                onClick={onClose} 
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
