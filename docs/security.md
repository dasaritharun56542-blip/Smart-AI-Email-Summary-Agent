# Security Architecture & Safety Policies — Communication Intelligence Platform

## Core Principles
The **Communication Intelligence Platform** handles enterprise communication data, AI interactions, and automated workflows. Security and safety are enforced by design across all system layers.

---

## 1. Secrets & Environment Management
* **Zero Secrets in Code**: No API keys, passwords, DB credentials, or tokens are committed to source control.
* **Strict `.gitignore` Enforcement**: `.env`, `.venv`, `node_modules`, build output, private uploads, logs, and secret files are explicitly ignored.
* **Gemini API Key Isolation**:
  * The Google Gemini API key (`GEMINI_API_KEY`) resides **exclusively on the backend server**.
  * The frontend code and client browsers **never receive or transmit** the Gemini API key. All AI operations are proxied through authenticated backend FastAPI endpoints.

---

## 2. CORS & Network Security
* **Restricted Development Origins**: CORS middleware is strictly configured via `CORS_ORIGINS` environment variables to allow only authorized client origins (e.g., `http://localhost:5173` in local development).
* **Wildcard Origins Prohibited**: Production setups require explicit domain whitelisting; `*` wildcard origins are forbidden.

---

## 3. Database & Credential Safety
* **No Speculative / Unverified Connections**: Database ORM configurations do not claim active database connectivity until PostgreSQL service is installed, verified, and configured with credentials.
* **Encrypted Storage for Service Connectors**: External OAuth tokens (Slack, Email, Teams) must be encrypted at rest using AES-256 before storing in the PostgreSQL database.

---

## 4. Permission-Controlled Automation
* **Human-in-the-Loop Safeguards**: Automated actions (sending emails, posting Slack messages, modifying external calendars) require explicit user approval or granular scope permission toggles.
* **Comprehensive Audit Trail**: Every automated action and AI generation step is logged to an immutable audit log table.
