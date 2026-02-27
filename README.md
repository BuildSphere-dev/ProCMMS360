# Odoo-hackathon

# 🚧 ProCMMS360 — Intelligent Maintenance Management System

A professional, full-stack maintenance tracking application built for the **Odoo x Adani 2025 Hackathon**. FixTrack streamlines industrial equipment management with a premium dark UI, real-time workflows, and deep backend integration.

## ✨ Visual Highlights

- **Industrial Design System**: A premium dark theme built on a charcoal + amber color palette, conveying industrial strength and clarity.
- **Kanban Workflow Board**: Drag-and-drop-ready maintenance request board with status columns — New, In Progress, Repaired, Scrap.
- **Live Dashboard**: Real-time stats cards, interactive Area Charts for activity trends, and a system-wide alert panel.
- **Glassmorphism UI**: Auth pages and cards use backdrop-blur and semi-transparent borders for a premium feel.
- **Collapsible Sidebar**: A responsive, icon-only collapsible navigation shell.
- **Equipment Inventory**: Searchable, filterable grid of industrial assets with status badges and service history.

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + Vite 7
- **Styling**: Vanilla CSS3 with custom design tokens and utility classes
- **Routing**: React Router DOM v7
- **State Management**: Zustand (persistent auth store)
- **Charts**: Recharts
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **HTTP Client**: Axios with JWT interceptors

### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLAlchemy ORM (SQLite / PostgreSQL)
- **Auth**: JWT (OAuth2 Password Flow)
- **API Docs**: Swagger UI at `/docs`

## 📁 Project Structure

```
Odoo-hackathon-FixTrack/
├── Backend/
│   ├── app/
│   │   ├── main.py             # FastAPI app entrypoint
│   │   ├── models/             # SQLAlchemy models
│   │   ├── routers/            # API route handlers
│   │   ├── schemas/            # Pydantic request/response schemas
│   │   └── core/               # Auth, JWT, security utils
│   └── .env                    # Environment variables
└── Frontend/
    └── FixTrack/
        ├── src/
        │   ├── api/            # Axios API service layer
        │   ├── components/     # Sidebar, Navbar, Layout, UI components
        │   ├── pages/          # Dashboard, Equipment, Maintenance, Teams, Auth
        │   ├── store/          # Zustand auth store
        │   └── index.css       # Core design system
        └── index.html
```

## 🚀 Usage

### Backend
```bash
cd Backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
API runs at **http://localhost:8000** · Docs at **http://localhost:8000/docs**

### Frontend
```bash
cd Frontend/FixTrack
npm install
npm run dev
```
App runs at **http://localhost:5173**

## 🔑 Key Features

| Module | Description |
|---|---|
| **Auth** | JWT-based login & signup with protected routes |
| **Dashboard** | Live stats, trend charts, system alerts, recent requests |
| **Equipment** | Asset inventory with search, filter, status tracking |
| **Maintenance** | Kanban board + list view for service request lifecycle |
| **Teams** | Department and maintenance team management |

## 🧑‍💻 Developers

**Avinash Rout**
**Ishaan Ray**
**Pritam Sharma**
**Nilanchal Pradhan**

---
*Built for the **Odoo x Adani 2025 Hackathon** by Team OPTIBOTS.*