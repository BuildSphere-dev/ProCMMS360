import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Plus, Search, Filter, Settings, History, Tag, MapPin, Calendar } from 'lucide-react';

const equipment = [
  { id: 1, name: 'CNC Machine 04', sn: 'SN-99283-X', category: 'Mechanical', location: 'Floor 1, Zone B', status: 'Operational', lastService: '2025-04-10' },
  { id: 2, name: 'Conveyor Belt A2', sn: 'SN-10293-C', category: 'Electrical', location: 'Packing Line', status: 'Under Maintenance', lastService: '2025-05-02' },
  { id: 3, name: 'Laser Cutter X1', sn: 'SN-44567-L', category: 'Mechanical', location: 'R&D Lab', status: 'Operational', lastService: '2025-03-22' },
  { id: 4, name: 'Forklift F-09', sn: 'SN-33982-F', category: 'Vehicle', location: 'Warehouse', status: 'Operational', lastService: '2025-01-15' },
  { id: 5, name: 'Hydraulic Press', sn: 'SN-55678-P', category: 'Mechanical', location: 'Floor 2, Zone A', status: 'Scrapped', lastService: '2024-11-20' },
  { id: 6, name: 'Welding Station B3', sn: 'SN-66734-W', category: 'Electrical', location: 'Workshop', status: 'Operational', lastService: '2025-04-25' },
];

const statusBadge = (s) => ({
  'Operational': 'badge badge-success',
  'Under Maintenance': 'badge badge-info',
  'Scrapped': 'badge badge-error',
}[s] || 'badge badge-neutral');

const EquipmentList = () => {
  const [search, setSearch] = useState('');
  const filtered = equipment.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.sn.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout title="Equipment Inventory">
      <div className="page-sections">
        <div className="toolbar">
          <div className="toolbar-left" style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              className="form-input"
              style={{ paddingLeft: '36px', width: '300px' }}
              placeholder="Search by name or serial..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="toolbar-right">
            <button className="btn btn-secondary"><Filter size={16} /> Filters</button>
            <button className="btn btn-primary"><Plus size={16} /> Add Equipment</button>
          </div>
        </div>

        <div className="equip-grid">
          {filtered.map((item) => (
            <div className="equip-card" key={item.id}>
              <div className="equip-meta">
                <div className="equip-sn"><Tag size={12} /> {item.sn}</div>
                <span className={statusBadge(item.status)}>{item.status}</span>
              </div>
              <div className="equip-name">{item.name}</div>
              <div className="equip-cat">{item.category}</div>
              <div className="equip-info">
                <div className="equip-info-row"><MapPin size={14} style={{ color: 'var(--text-muted)' }} />{item.location}</div>
                <div className="equip-info-row"><Calendar size={14} style={{ color: 'var(--text-muted)' }} />Last service: {item.lastService}</div>
              </div>
              <div className="equip-actions">
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}><History size={14} /> Logs</button>
                <button className="btn btn-secondary btn-sm" style={{ flex: 1 }}><Settings size={14} /> Manage</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default EquipmentList;
