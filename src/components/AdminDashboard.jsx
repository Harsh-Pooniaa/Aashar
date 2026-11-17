import React, { useState, useEffect } from 'react';
import { 
  Database, 
  RefreshCw, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Phone, 
  User,
  ShieldCheck 
} from 'lucide-react';
import { getAppointments, getEmergencyDispatches } from '../services/firestoreService';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [dispatches, setDispatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [appts, disps] = await Promise.all([
      getAppointments(),
      getEmergencyDispatches()
    ]);
    setAppointments(appts);
    setDispatches(disps);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="dashboard" className="section" style={{ paddingTop: '20px' }}>
      <div className="section-header">
        <span className="section-badge">Live Firebase Sync</span>
        <h2 className="section-title">Operations & Medical Records</h2>
        <p className="section-subtitle">
          Real-time Firestore overview of incoming emergency requests, patient consultations, and unit statuses.
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`btn-secondary ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
            style={{ 
              borderColor: activeTab === 'appointments' ? '#ef4444' : '#272936',
              background: activeTab === 'appointments' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              color: activeTab === 'appointments' ? '#f87171' : '#cbd5e1'
            }}
          >
            <Calendar size={16} /> Appointments ({appointments.length})
          </button>
          <button 
            className={`btn-secondary ${activeTab === 'dispatches' ? 'active' : ''}`}
            onClick={() => setActiveTab('dispatches')}
            style={{ 
              borderColor: activeTab === 'dispatches' ? '#ef4444' : '#272936',
              background: activeTab === 'dispatches' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              color: activeTab === 'dispatches' ? '#f87171' : '#cbd5e1'
            }}
          >
            <AlertTriangle size={16} /> Emergency Dispatches ({dispatches.length})
          </button>
        </div>

        <button 
          onClick={fetchData} 
          disabled={loading}
          className="btn-secondary"
          style={{ padding: '8px 14px', fontSize: '0.85rem' }}
        >
          <RefreshCw size={14} style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          Refresh Cloud Data
        </button>
      </div>

      <div className="dashboard-table-container">
        {activeTab === 'appointments' ? (
          appointments.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
              <Database size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <p>No appointments booked yet. Fill the consultation form above to sync first record to Firestore!</p>
            </div>
          ) : (
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Contact</th>
                  <th>Specialist</th>
                  <th>Date & Time</th>
                  <th>Notes</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>
                      <strong style={{ color: '#fff' }}>{appt.patientName}</strong>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{appt.email}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{appt.phone || 'N/A'}</div>
                    </td>
                    <td>
                      <span style={{ color: '#ef4444', fontWeight: 600 }}>{appt.doctor}</span>
                    </td>
                    <td>
                      <div>{appt.appointmentDate}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{appt.appointmentTime}</div>
                    </td>
                    <td style={{ maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {appt.message || 'General Consultation'}
                    </td>
                    <td>
                      <span style={{ 
                        background: 'rgba(16, 185, 129, 0.15)', 
                        color: '#10b981', 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        border: '1px solid rgba(16, 185, 129, 0.3)'
                      }}>
                        {appt.status || 'Confirmed'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          dispatches.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
              <AlertTriangle size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <p>No emergency dispatches recorded. Click "🚨 Emergency Response" to log a drill or real emergency.</p>
            </div>
          ) : (
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Ticket / Patient</th>
                  <th>Emergency Type</th>
                  <th>Location</th>
                  <th>Contact Phone</th>
                  <th>ETA / Unit</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {dispatches.map((disp) => (
                  <tr key={disp.id}>
                    <td>
                      <strong style={{ color: '#fff' }}>{disp.patientName}</strong>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: {disp.id.substring(0, 8)}</div>
                    </td>
                    <td>
                      <span style={{ color: '#f87171', fontWeight: 600 }}>{disp.emergencyType}</span>
                    </td>
                    <td>{disp.location}</td>
                    <td>{disp.phone}</td>
                    <td>
                      <div style={{ color: '#10b981', fontWeight: 600 }}>{disp.eta || '5-7 mins'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Alpha Unit</div>
                    </td>
                    <td>
                      <span style={{ 
                        background: 'rgba(239, 68, 68, 0.2)', 
                        color: '#f87171', 
                        padding: '4px 10px', 
                        borderRadius: '20px', 
                        fontSize: '0.78rem', 
                        fontWeight: 700,
                        border: '1px solid #ef4444'
                      }}>
                        {disp.status || 'Active Dispatched'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </section>
  );
}
