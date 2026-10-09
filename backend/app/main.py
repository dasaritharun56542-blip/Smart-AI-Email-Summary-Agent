from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.health import router as health_router
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="AI-powered communication intelligence platform connecting services, understanding messages, and supporting permission-controlled automation.",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS restricted to configured origins (local frontend during dev)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include health router under root and v1 API prefix for versatility
app.include_router(health_router, prefix=settings.API_V1_STR)
app.include_router(health_router)


@app.get("/", tags=["System"])
def root():
    return {
        "message": f"Welcome to {settings.PROJECT_NAME} API",
        "docs": "/docs",
        "health": f"{settings.API_V1_STR}/health",
    }
