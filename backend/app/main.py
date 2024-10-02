# app/main.py

from fastapi import FastAPI

from app.routers import competitions, solutions

app = FastAPI()

app.include_router(competitions.router)
app.include_router(solutions.router)

