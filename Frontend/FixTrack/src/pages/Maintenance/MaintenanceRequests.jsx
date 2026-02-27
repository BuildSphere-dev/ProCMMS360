import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Wrench, Clock, MessageSquare } from 'lucide-react';

const requests = [
  { id: 1, title: 'Motor Vibration Issue', equipment: 'CNC Machine 04', priority: 'High', status: 'In Progress', technician: 'Alice Chen', date: '2025-05-15' },
  { id: 2, title: 'Annual Calibration', equipment: 'Laser Cutter X1', priority: 'Medium', status: 'New', technician: 'Unassigned', date: '2025-05-16' },
  { id: 3, title: 'Oil Leakage Repair', equipment: 'Conveyor Belt A2', priority: 'Critical', status: 'In Progress', technician: 'Bob Smith', date: '2025-05-14' },
  { id: 4, title: 'Sensor Replacement', equipment: 'Forklift F-09', priority: 'Low', status: 'Repaired', technician: 'Alice Chen', date: '2025-05-12' },
  { id: 5, title: 'Annual Inspection', equipment: 'Welding Station B3', priority: 'Medium', status: 'New', technician: 'Unassigned', date: '2025-05-17' },
];

const columns = ['New', 'In Progress', 'Repaired', 'Scrap'];

const priorityBadge = (p) => ({
  Critical: 'badge badge-error',
  High: 'badge badge-warning',
  Medium: 'badge badge-info',
  Low: 'badge badge-neutral',
}[p] || 'badge badge-neutral');

const MaintenanceRequests = () => {
  const [view, setView] = useState('kanban');

  return (
    <Layout title="Maintenance Workflow">
      <div className="page-sections">
        <div className="toolbar">
          <div className="view-toggle">
            <button className={`view-btn${view === 'kanban' ? ' active' : ''}`} onClick={() => setView('kanban')}>
              ◫ Kanban
            </button>
            <button className={`view-btn${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')}>
              ☰ List
            </button>
          </div>
          <button className="btn btn-primary"><Plus size={16} /> New Request</button>
        </div>

        {view === 'kanban' ? (
          <div className="kanban-board">
            {columns.map((col) => (
              <div key={col}>
                <div className="kanban-col-header">
                  <h3>{col}</h3>
                  <span className="kanban-count">{requests.filter(r => r.status === col).length}</span>
                </div>
                <div className="kanban-col-body">
                  {requests.filter(r => r.status === col).map((req) => (
                    <div className="kanban-card" key={req.id}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <span className={priorityBadge(req.priority)}>{req.priority}</span>
                        <MessageSquare size={14} style={{ color: 'var(--text-muted)' }} />
                      </div>
                      <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{req.title}</div>
                      <div className="kanban-card-meta">
                        <Wrench size={12} /> {req.equipment}
                      </div>
                      <div className="kanban-card-footer">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div className="avatar-xs">{req.technician[0]}</div>
                          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{req.technician}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                          <Clock size={10} /> {req.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Equipment</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Technician</th>
                    <th style={{ textAlign: 'right' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 500 }}>{r.title}</td>
                      <td className="text-secondary text-sm">{r.equipment}</td>
                      <td><span className={priorityBadge(r.priority)}>{r.priority}</span></td>
                      <td className="text-sm">{r.status}</td>
                      <td className="text-sm">{r.technician}</td>
                      <td className="text-muted text-sm font-mono" style={{ textAlign: 'right' }}>{r.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MaintenanceRequests;
