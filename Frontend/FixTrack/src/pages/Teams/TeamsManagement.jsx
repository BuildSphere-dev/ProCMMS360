import React from 'react';
import Layout from '../../components/Layout';
import { Users, Briefcase, Plus, MoreHorizontal } from 'lucide-react';

const departments = [
  { id: 1, name: 'Operations', head: 'John Miller', teams: 4, staff: 24 },
  { id: 2, name: 'Engineering', head: 'Sarah Connor', teams: 2, staff: 12 },
  { id: 3, name: 'Logistics', head: 'Mike Ross', teams: 3, staff: 18 },
];

const teams = [
  { id: 1, name: 'Mechanical Team A', department: 'Operations', lead: 'David Smith', members: 6, status: 'Active' },
  { id: 2, name: 'Electrical Team X', department: 'Engineering', lead: 'Elena Rodriguez', members: 4, status: 'Active' },
  { id: 3, name: 'Safety & Quality', department: 'Operations', lead: 'Tom Hardy', members: 3, status: 'On Leave' },
  { id: 4, name: 'Logistics Unit C', department: 'Logistics', lead: 'Priya Sharma', members: 7, status: 'Active' },
];

const TeamsManagement = () => (
  <Layout title="Teams & Personnel">
    <div className="page-sections">

      {/* Departments */}
      <section>
        <div className="section-header">
          <div>
            <h3>Departments</h3>
            <p>High-level organizational units</p>
          </div>
          <button className="btn btn-secondary btn-sm"><Plus size={14} /> New Dept</button>
        </div>
        <div className="dept-grid">
          {departments.map((dept) => (
            <div className="dept-card" key={dept.id}>
              <div className="dept-actions">
                <div className="dept-icon"><Briefcase size={20} /></div>
                <button style={{ color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <MoreHorizontal size={18} />
                </button>
              </div>
              <div style={{ fontWeight: 700, fontSize: '17px' }}>{dept.name}</div>
              <div className="text-secondary text-sm" style={{ marginTop: 4 }}>Head: {dept.head}</div>
              <div className="dept-stats">
                <div>
                  <div className="dept-stat-label">Teams</div>
                  <div className="dept-stat-value">{dept.teams}</div>
                </div>
                <div>
                  <div className="dept-stat-label">Staff</div>
                  <div className="dept-stat-value">{dept.staff}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Teams Table */}
      <section>
        <div className="section-header">
          <div>
            <h3>Maintenance Teams</h3>
            <p>Direct service groups and leads</p>
          </div>
          <button className="btn btn-primary btn-sm"><Plus size={14} /> Create Team</button>
        </div>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Team Name</th>
                  <th>Department</th>
                  <th>Lead</th>
                  <th>Members</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <div className="flex-row">
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--brand)' }}>
                          <Users size={16} />
                        </div>
                        <span style={{ fontWeight: 500 }}>{t.name}</span>
                      </div>
                    </td>
                    <td className="text-secondary text-sm">{t.department}</td>
                    <td style={{ fontWeight: 500, fontSize: 14 }}>{t.lead}</td>
                    <td className="text-sm">{t.members} Personnel</td>
                    <td>
                      <span className={t.status === 'Active' ? 'badge badge-success' : 'badge badge-warning'}>
                        {t.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="btn btn-ghost btn-sm">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  </Layout>
);

export default TeamsManagement;
