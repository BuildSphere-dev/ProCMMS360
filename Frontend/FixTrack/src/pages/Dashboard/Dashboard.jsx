import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./dashboard.css"; // Ensure you create this file

/* ------------------ Calendar Setup ------------------ */
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
});

/* ------------------ Icons ------------------ */
const Icons = {
  Kanban: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>,
  Calendar: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  Chart: () => <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Tech: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  Warning: () => <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#f87171" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
};

/* ------------------ Data ------------------ */
const initialKanban = {
  New: [
    { id: "1", title: "Motor Failure", priority: "High", technician: "Alex M.", overdue: true },
    { id: "2", title: "Oil Leakage", priority: "Medium", technician: "Sarah J.", overdue: false },
  ],
  "In Progress": [
    { id: "3", title: "Belt Replacement", priority: "Low", technician: "Mike R.", overdue: false },
  ],
  Repaired: [],
  Scrap: [],
};

const calendarEvents = [
  { title: "Preventive Check - Conveyor", start: new Date(), end: new Date() },
];

const reportData = [
  { name: "Team A", requests: 24 },
  { name: "Team B", requests: 15 },
  { name: "Team C", requests: 30 },
  { name: "Team D", requests: 12 },
  { name: "Team E", requests: 45 },
];

/* ------------------ Main Component ------------------ */
export default function Dashboard() {
  const [kanban, setKanban] = useState(initialKanban);
  const [view, setView] = useState("kanban");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const sourceCol = [...kanban[source.droppableId]];
    const destCol = [...kanban[destination.droppableId]];
    const [moved] = sourceCol.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceCol.splice(destination.index, 0, moved);
      setKanban({ ...kanban, [source.droppableId]: sourceCol });
    } else {
      destCol.splice(destination.index, 0, moved);
      setKanban({ ...kanban, [source.droppableId]: sourceCol, [destination.droppableId]: destCol });
    }
  };

  return (
    <div className="dashboard-app">
      {/* Background Elements */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">F</div>
          <h2>FixTrack</h2>
        </div>

        <nav className="nav-menu">
          <SidebarButton 
            label="Kanban Board" 
            icon={<Icons.Kanban />} 
            active={view === "kanban"} 
            onClick={() => setView("kanban")} 
          />
          <SidebarButton 
            label="Calendar" 
            icon={<Icons.Calendar />} 
            active={view === "calendar"} 
            onClick={() => setView("calendar")} 
          />
          <SidebarButton 
            label="Reports" 
            icon={<Icons.Chart />} 
            active={view === "reports"} 
            onClick={() => setView("reports")} 
          />
        </nav>

        <div className="user-profile">
          <div className="avatar"></div>
          <div className="user-info">
            <p className="name">Admin User</p>
            <p className="role">Maintenance Lead</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="top-header">
          <div>
            <h1>{view === "kanban" ? "Maintenance Kanban" : view === "calendar" ? "Schedule" : "Analytics"}</h1>
            <p className="date-sub">{format(new Date(), "EEEE, d MMMM yyyy")}</p>
          </div>
          <button className="add-btn">+ New Request</button>
        </header>

        <div className="content-body">
          {view === "kanban" && (
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="kanban-board">
                {Object.keys(kanban).map((col) => (
                  <Droppable droppableId={col} key={col}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} className="kanban-column">
                        <div className="column-header">
                          <h3>{col}</h3>
                          <span className="count-badge">{kanban[col].length}</span>
                        </div>
                        <div className="column-body">
                          {kanban[col].map((task, index) => (
                            <Draggable draggableId={task.id} index={index} key={task.id}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`kanban-card ${snapshot.isDragging ? "dragging" : ""} ${task.overdue ? "card-overdue" : "card-normal"}`}
                                  style={{ ...provided.draggableProps.style }}
                                >
                                  <div className="card-top">
                                    <span className={`priority-tag ${task.priority.toLowerCase()}`}>{task.priority}</span>
                                    {task.overdue && <Icons.Warning />}
                                  </div>
                                  <p className="card-title">{task.title}</p>
                                  <div className="card-footer">
                                    <div className="tech-info">
                                      <Icons.Tech />
                                      <span>{task.technician}</span>
                                    </div>
                                    <span className="task-id">#{task.id}</span>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      </div>
                    )}
                  </Droppable>
                ))}
              </div>
            </DragDropContext>
          )}

          {view === "calendar" && (
            <div className="glass-panel calendar-wrapper">
              <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                selectable
                style={{ height: 600 }}
              />
            </div>
          )}

          {view === "reports" && (
            <div className="glass-panel chart-wrapper">
              <h3>Requests per Team</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={reportData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="requests" fill="url(#colorView)" radius={[6, 6, 0, 0]} barSize={50} />
                  <defs>
                    <linearGradient id="colorView" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#2563eb" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function SidebarButton({ label, icon, active, onClick }) {
  return (
    <button onClick={onClick} className={`sidebar-btn ${active ? "active" : ""}`}>
      {icon}
      <span>{label}</span>
      {active && <div className="active-indicator" />}
    </button>
  );
}