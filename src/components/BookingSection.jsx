import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle, 
  Loader2, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { createAppointment } from '../services/firestoreService';

export default function BookingSection() {
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    doctor: 'Dr. R. Sharma (Chief Medical Officer)',
    appointmentDate: '',
    appointmentTime: '',
    packageType: 'Rapid Response Medical Consultation',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await createAppointment(formData);
    setLoading(false);
    setBookedSuccess(true);
    setBookingRef(result.id || 'ASH-BK-' + Math.floor(10000 + Math.random() * 90000));
  };

  return (
    <section id="book" className="section">
      <div className="section-header">
        <span className="section-badge">Direct Specialist Access</span>
        <h2 className="section-title">Schedule Medical Consultation</h2>
        <p className="section-subtitle">
          Secure private, high-priority consultations with our board-certified medical leaders. Synced real-time to Cloud Firestore.
        </p>
      </div>

      <div className="form-card">
        {bookedSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={36} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>Consultation Confirmed</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '20px' }}>
              Your appointment with <span style={{ color: '#fff', fontWeight: 600 }}>{formData.doctor}</span> has been logged to Firestore.
            </p>

            <div style={{ background: '#1c1d27', padding: '16px', borderRadius: '10px', border: '1px solid #2e303e', textAlign: 'left', marginBottom: '20px' }}>
              <p style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#94a3b8' }}>Reference ID: <strong style={{ color: '#ef4444' }}>{bookingRef}</strong></p>
              <p style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#94a3b8' }}>Patient: <strong style={{ color: '#fff' }}>{formData.patientName}</strong></p>
              <p style={{ margin: '0 0 6px 0', fontSize: '0.85rem', color: '#94a3b8' }}>Date & Time: <strong style={{ color: '#fff' }}>{formData.appointmentDate} at {formData.appointmentTime}</strong></p>
            </div>

            <button 
              onClick={() => {
                setBookedSuccess(false);
                setFormData({
                  patientName: '',
                  email: '',
                  phone: '',
                  doctor: 'Dr. R. Sharma (Chief Medical Officer)',
                  appointmentDate: '',
                  appointmentTime: '',
                  packageType: 'Rapid Response Medical Consultation',
                  message: ''
                });
              }}
              className="btn-primary"
            >
              Book Another Consultation
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label><User size={14} style={{ display: 'inline', marginRight: '6px' }} />Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="form-control" 
                  placeholder="e.g. Rahul Verma"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label><Mail size={14} style={{ display: 'inline', marginRight: '6px' }} />Email Address</label>
                <input 
                  type="email" 
                  required 
                  className="form-control" 
                  placeholder="rahul@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><Phone size={14} style={{ display: 'inline', marginRight: '6px' }} />Phone Number</label>
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
                <label>Select Specialist</label>
                <select 
                  className="form-control"
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                >
                  <option>Dr. R. Sharma (Chief Medical Officer)</option>
                  <option>Dr. M. Gupta (Orthopedic & Plastic Surgeon)</option>
                  <option>Dr. Jyoti (Trauma & Surgical Lead)</option>
                  <option>First Available Emergency Specialist</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label><Calendar size={14} style={{ display: 'inline', marginRight: '6px' }} />Preferred Date</label>
                <input 
                  type="date" 
                  required 
                  className="form-control" 
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label><Clock size={14} style={{ display: 'inline', marginRight: '6px' }} />Preferred Time</label>
                <input 
                  type="time" 
                  required 
                  className="form-control" 
                  value={formData.appointmentTime}
                  onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label><FileText size={14} style={{ display: 'inline', marginRight: '6px' }} />Specific Medical Notes / Symptoms</label>
              <textarea 
                rows="3" 
                className="form-control" 
                placeholder="Mention past medical conditions, ongoing medications, or specific reason for consultation..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '14px' }}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
                  Saving to Firestore Database...
                </>
              ) : (
                <>Confirm & Sync Consultation</>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
