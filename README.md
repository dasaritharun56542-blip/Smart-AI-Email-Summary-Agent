# Communication Intelligence Platform

AI-powered platform that connects authorized communication services, understands messages and multimedia using Google Gemini AI, summarizes conversations, tracks tasks and deadlines, and supports permission-controlled automation.

---

## Technical Architecture

* **Frontend**: React 18, JavaScript, Vite
* **Backend**: Python 3.11+, FastAPI, Uvicorn
* **Primary AI Provider**: Google Gemini API via official `google-genai` SDK
* **Database & ORM**: PostgreSQL, SQLAlchemy 2.x, Alembic
* **Testing**: Pytest (Backend)
* **Environment**: Windows 10/11 Development Environment

---

## Directory Structure

```
communication-ai-platform/
├── frontend/             # React + JavaScript + Vite Single Page Application
│   ├── src/              # React UI components & styling
│   ├── index.html        # HTML shell & font definitions
│   ├── vite.config.js    # Vite build & server configuration
│   ├── package.json      # Frontend npm dependencies
│   └── .env.example      # Example frontend environment variables
├── backend/              # FastAPI Python backend application
│   ├── app/
│   │   ├── api/          # API router endpoints (health check, API v1)
│   │   ├── core/         # Settings & pydantic configuration management
│   │   └── main.py       # FastAPI application entrypoint & CORS middleware
│   ├── tests/            # Pytest suite for backend health & endpoint validation
│   ├── requirements.txt  # Python package dependencies
│   └── .env.example      # Example backend environment variables
├── docs/                 # Platform architecture, roadmap, and security design
│   ├── architecture.md           # System architecture overview & component diagrams
│   ├── implementation-roadmap.md # Phased implementation schedule
│   └── security.md               # Secrets isolation, CORS & safety policies
├── scripts/              # Windows PowerShell dev startup helpers
│   ├── start-dev-backend.ps1     # Automated backend startup script
│   └── start-dev-frontend.ps1    # Automated frontend startup script
├── .gitignore            # Git ignore rule specifications
└── README.md             # Project documentation & execution guide
```

---

## Development Setup & Windows Startup Guide

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **Python**: v3.11 or higher
* **Git**

---

### Step 1: Backend Setup & Launch (Terminal 1)

1. Open a PowerShell terminal and navigate to the backend directory:
   ```powershell
   cd backend
   ```

2. Create a Python virtual environment:
   ```powershell
   python -m venv .venv
   ```

3. Activate the virtual environment:
   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

4. Install backend dependencies:
   ```powershell
   pip install -r requirements.txt
   ```

5. (Optional) Create local `.env` configuration:
   ```powershell
   Copy-Item .env.example .env
   ```

6. Start the FastAPI backend server:
   ```powershell
   uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
   ```
   * **API Documentation**: [http://localhost:8000/docs](http://localhost:8000/docs)
   * **Health Check**: [http://localhost:8000/api/v1/health](http://localhost:8000/api/v1/health)

---

### Step 2: Frontend Setup & Launch (Terminal 2)

1. Open a second PowerShell terminal and navigate to the frontend directory:
   ```powershell
   cd frontend
   ```

2. Install npm dependencies:
   ```powershell
   npm install
   ```

3. (Optional) Create local `.env` configuration:
   ```powershell
   Copy-Item .env.example .env
   ```

4. Start the Vite development server:
   ```powershell
   npm run dev
   ```
   * **Web App UI**: [http://localhost:5173](http://localhost:5173)

---

### Running Verification Tests & Production Build

* **Backend Tests**:
  ```powershell
  cd backend
  .\.venv\Scripts\Activate.ps1
  pytest
  ```

* **Frontend Production Build**:
  ```powershell
  cd frontend
  npm run build
  ```
