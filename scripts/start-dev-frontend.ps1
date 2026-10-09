# Windows PowerShell Script to start React + Vite Frontend in Development Mode

Set-Location -Path "$PSScriptRoot\..\frontend"

if (-not (Test-Path -Path "node_modules")) {
    Write-Host "Installing frontend node dependencies..." -ForegroundColor Cyan
    npm install
}

Write-Host "Starting Vite Development Server..." -ForegroundColor Green
npm run dev
