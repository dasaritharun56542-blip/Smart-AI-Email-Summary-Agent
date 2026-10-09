# Windows PowerShell Script to start FastAPI Backend in Development Mode

Set-Location -Path "$PSScriptRoot\..\backend"

if (-not (Test-Path -Path ".venv")) {
    Write-Host "Creating Python virtual environment..." -ForegroundColor Cyan
    python -m venv .venv
}

Write-Host "Activating virtual environment..." -ForegroundColor Cyan
& ".\.venv\Scripts\Activate.ps1"

Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
pip install -r requirements.txt

Write-Host "Starting FastAPI Backend Server on http://localhost:8000..." -ForegroundColor Green
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
