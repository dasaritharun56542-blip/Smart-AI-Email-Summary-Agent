# Communication Intelligence Platform — System Architecture

## Overview
The **Communication Intelligence Platform** is an enterprise-grade AI-powered system designed to connect authorized communication services (e.g., Email, Slack, Microsoft Teams), ingest and analyze messages/multimedia using Google Gemini Cloud AI APIs, extract key insights and action items, track tasks and deadlines, and execute permission-controlled automated actions.

---

## High-Level Architectural Diagram

```
+---------------------------------------------------------------------------------+
|                                 USER INTERFACE                                  |
|               React (Vite + JavaScript) Single Page Application                 |
+---------------------------------------------------------------------------------+
                                         |
                                         | REST / JSON (HTTPS / Local CORS)
                                         v
+---------------------------------------------------------------------------------+
|                                BACKEND SERVICES                                 |
|                         FastAPI (Python 3.11+ / Uvicorn)                        |
|                                                                                 |
|  +-------------------+   +--------------------+   +--------------------------+  |
|  |   API Controllers |   |  Core & Config     |   |   Security & Middleware  |  |
|  +-------------------+   +--------------------+   +--------------------------+  |
|                                                                                 |
|  +-------------------+   +--------------------+   +--------------------------+  |
|  | Connector Module  |   | AI Service Layer   |   | Automation Engine        |  |
|  | (Slack/Email/etc) |   | (google-genai SDK) |   | (Permission Managed)    |  |
|  +-------------------+   +--------------------+   +--------------------------+  |
+---------------------------------------------------------------------------------+
          |                                  |                             |
          | SQLAlchemy 2.x / Alembic         | Official SDK                | OAuth2 / APIs
          v                                  v                             v
+-----------------------+     +--------------------------+    +-----------------------+
|  POSTGRESQL DATABASE  |     |    GOOGLE GEMINI API     |    | THIRD-PARTY SERVICES  |
|  Structured Metadata, |     | Multimodal Understanding,|    | Email, Slack, Teams,  |
|  Tasks, Audit Logs    |     | Summarization, Extraction|    | Calendar Providers    |
+-----------------------+     +--------------------------+    +-----------------------+
```

---

## Component Boundaries & Layers

### 1. Frontend Layer (`/frontend`)
* **Technology**: React, JavaScript, Vite.
* **Responsibilities**:
  * Rich user dashboard showing system status, connection states, and communication feeds.
  * Interactive UI components for task tracking, conversation summaries, and automation permissions.
  * Environment configuration via `import.meta.env.VITE_API_BASE_URL`.
  * **Strict Constraint**: Zero sensitive business logic or API keys (e.g., Gemini API keys) are stored or handled in the frontend.

### 2. Backend Layer (`/backend`)
* **Technology**: Python 3.11+, FastAPI, Uvicorn, Pydantic v2.
* **Responsibilities**:
  * High-performance asynchronous REST API handling requests from the React frontend.
  * Environment configuration and validation via `pydantic-settings`.
  * Strict CORS middleware restricting requests to authorized origins.
  * Service layer orchestration between AI processing, DB persistence, and connector integrations.

### 3. AI Processing Engine (Future Phase)
* **Technology**: `google-genai` Python SDK (Google Gemini 2.5/3.x models).
* **Responsibilities**:
  * Ingestion and parsing of text messages, audio transcripts, and visual attachments.
  * Structured output extraction (JSON schemas for action items, deadlines, key takeaways).
  * Context-aware conversation summarization.

### 4. Database & ORM Layer (Future Phase)
* **Technology**: PostgreSQL 15+, SQLAlchemy 2.x (Async ORM), Alembic migrations.
* **Responsibilities**:
  * Relational storage for users, connector OAuth credentials, message metadata, generated tasks, and audit logs.
  * Schema migrations managed via Alembic.

### 5. Third-Party Service Connectors (Future Phase)
* **Responsibilities**:
  * Webhooks and poller tasks for authorized integration with external platforms (Gmail/Outlook, Slack, MS Teams).
  * Rate limiting, token refresh, and event dispatching.
