import React from 'react';
import Layout from '../../components/Layout';
import { Wrench, AlertTriangle, CheckCircle2, Clock, ClipboardList } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', completed: 4, pending: 2 },
  { name: 'Tue', completed: 7, pending: 5 },
  { name: 'Wed', completed: 5, pending: 8 },
  { name: 'Thu', completed: 10, pending: 3 },
  { name: 'Fri', completed: 8, pending: 4 },
  { name: 'Sat', completed: 3, pending: 1 },
  { name: 'Sun', completed: 2, pending: 1 },
];

const activityData = [
  { id: 1, equipment: 'CNC Machine 04', type: 'Repair', priority: 'High', status: 'In Progress', date: '2025-05-15' },
  { id: 2, equipment: 'Conveyor Belt A2', type: 'Inspection', priority: 'Medium', status: 'Completed', date: '2025-05-15' },
  { id: 3, equipment: 'Laser Cutter X1', type: 'Calibration', priority: 'Critical', status: 'Pending', date: '2025-05-16' },
  { id: 4, equipment: 'Forklift F-09', type: 'Oil Change', priority: 'Low', status: 'Completed', date: '2025-05-13' },
];

const priorityBadge = (p) => ({
  Critical: 'badge badge-error',
  High: 'badge badge-warning',
  Medium: 'badge badge-info',
  Low: 'badge badge-neutral',
}[p] || 'badge badge-neutral');

const Dashboard = () => (
  <Layout title="Operations Overview">
    <div className="page-sections">
      {/* Stat Cards */}
      <div className="grid-4">
        {[
          { label: 'Pending Requests', value: 12, icon: Clock, c: 'var(--brand)', t: '+20% vs last week', up: true },
          { label: 'In Progress', value: 8, icon: Wrench, c: 'var(--info)', t: '+5% vs last week', up: true },
          { label: 'Completed', value: 45, icon: CheckCircle2, c: 'var(--success)', t: '+12% vs last week', up: true },
          { label: 'Critical Alerts', value: 3, icon: AlertTriangle, c: 'var(--error)', t: '-10% vs last week', up: false },
        ].map((s, i) => (
          <div className="stat-card" key={i}>
            <div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-value">{s.value}</div>
              <div className={`stat-trend ${s.up ? 'up' : 'down'}`}>{s.t}</div>
            </div>
            <div className="stat-icon-wrap">
              <s.icon size={24} style={{ color: s.c }} />
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
        <div className="card">
          <div className="card-header">
            <div className="card-icon-wrap"><Wrench size={20} /></div>
            <div>
              <div className="card-title">Activity Trends</div>
              <div className="card-subtitle">Daily maintenance tasks this week</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#14161f', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '8px' }} itemStyle={{ color: '#f8fafc' }} />
              <Area type="monotone" dataKey="completed" stroke="#10b981" fill="url(#grad1)" strokeWidth={2.5} name="Completed" />
              <Area type="monotone" dataKey="pending" stroke="#f59e0b" fill="url(#grad2)" strokeWidth={2.5} name="Pending" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-icon-wrap" style={{ background: 'rgba(239,68,68,0.1)' }}>
              <AlertTriangle size={20} style={{ color: 'var(--error)' }} />
            </div>
            <div><div className="card-title">System Alerts</div></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="alert-card alert-error-card">
              <div className="alert-dot alert-dot-error" />
              <div><p>Critical Overheat</p><span>CNC-04 reached 120°C. Emergency shutdown triggered.</span></div>
            </div>
            <div className="alert-card alert-warning-card">
              <div className="alert-dot alert-dot-warning" />
              <div><p>Warranty Expiry</p><span>Conveyor Belt A2 warranty expires in 14 days.</span></div>
            </div>
            <div className="alert-card alert-warning-card">
              <div className="alert-dot alert-dot-warning" />
              <div><p>Overdue Service</p><span>Forklift F-09 is 5 days past scheduled maintenance.</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Requests Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-icon-wrap"><ClipboardList size={20} /></div>
          <div>
            <div className="card-title">Recent Maintenance Requests</div>
            <div className="card-subtitle">Live service tickets</div>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Equipment</th>
                <th>Type</th>
                <th>Priority</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {activityData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="flex-row">
                      <Wrench size={14} style={{ color: 'var(--brand)' }} />
                      <span style={{ fontWeight: 500 }}>{row.equipment}</span>
                    </div>
                  </td>
                  <td className="text-secondary text-sm">{row.type}</td>
                  <td><span className={priorityBadge(row.priority)}>{row.priority}</span></td>
                  <td>
                    <div className="flex-row">
                      <span className={`status-dot ${row.status === 'Completed' ? 'status-dot-success' : 'status-dot-info'}`} />
                      <span className="text-sm">{row.status}</span>
                    </div>
                  </td>
                  <td className="text-muted text-sm font-mono" style={{ textAlign: 'right' }}>{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Layout>
);

export default Dashboard;
