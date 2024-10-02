# app/routers/solutions.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models import Solution
from app.schemas import Solution as SolutionSchema

router = APIRouter()

@router.get("/api/solutions/search", response_model=List[SolutionSchema])
def search_solutions(
    q: Optional[str] = "",
    competition_id: Optional[int] = None,
    limit: int = 10,
    offset: int = 0,
    db: Session = Depends(get_db),
):
    query = db.query(Solution)
    if q:
        query = query.filter(Solution.description.contains(q))
    if competition_id:
        query = query.filter(Solution.competition_id == competition_id)
    solutions = query.offset(offset).limit(limit).all()
    return solutions

@router.get("/api/solutions/{solution_id}", response_model=SolutionSchema)
def get_solution(solution_id: int, db: Session = Depends(get_db)):
    solution = db.query(Solution).filter(Solution.id == solution_id).first()
    if solution is None:
        raise HTTPException(status_code=404, detail="Solution not found")
    return solution
