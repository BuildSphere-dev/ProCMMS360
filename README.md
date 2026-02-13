# Odoo-hackathon
# 🚧 ProCMMS360 — Intelligent Maintenance Management System

FixSphere is a modern, full-stack **Computerized Maintenance Management System (CMMS)** designed to help organizations efficiently track equipment, manage maintenance teams, and coordinate repair workflows in a structured and scalable way. :contentReference[oaicite:1]{index=1}

This project was initially started during a hackathon and aims to streamline asset management and maintenance operations for teams of all sizes.

---

## 🔍 Features

- 📦 **Equipment & Asset Tracking**  
- 🛠️ **Work Order Scheduling & Assignment**  
- 👷 **Maintenance Team Coordination**  
- 📆 **Task Status & Repair Workflow History**  
- 📊 **Dashboard for Overview of Maintenance Activities**  
- 🔐 **User Authentication & Role Control**

---

## 🧠 Why FixSphere?

Modern maintenance teams struggle with:
- Manual work order tracking
- Dispersed asset information
- Lack of workflow transparency
- Inefficient team task allocation

FixSphere brings all maintenance tasks into one place, providing clarity, reliability, and more proactive asset upkeep.

---

## 📦 Tech Stack

| Layer       | Technology            |
|-------------|-----------------------|
| Backend     | Python (FastAPI)      |
| Frontend    | React / SPA UI        |
| Database    | SQL (Relational)      |
| Authentication | JWT / Role Based   |

---

## 🚀 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/BuildSphere-dev/ProCMMS360
cd ProCMMS360
```

2. Install Dependencies

Backend:
```
cd Backend
pip install -r requirements.txt
```

Frontend:
```
cd Frontend/my-react-app
npm install
```
3. Run Locally

Backend:
```
uvicorn app.main:app --reload --port 8000
```

Frontend:
```
npm start
```
📁 Project Structure
```
FixSphere/
├── Backend/
│   ├── app/
│   ├── models.py
│   └── main.py
├── Frontend/
│   ├── my-react-app/
│   └── components/
├── README.md
└── requirements.txt
```
🤝 Contributing

This project is a work-in-progress and open for collaboration.
We welcome contributors interested in improving features like:

Preventive maintenance schedules

Notifications & alerts

Richer analytics dashboards

Mobile UI support

Feel free to fork and submit PRs!

