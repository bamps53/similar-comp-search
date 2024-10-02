# app/routers/competitions.py
from sqlalchemy import or_
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional

from app.database import get_db
from app.models import Competition
from app.schemas import Competition as CompetitionSchema
from app.services.similarity import get_similar_competitions

router = APIRouter()

@router.get("/api/competitions/search", response_model=List[CompetitionSchema])
def search_competitions(
    q: Optional[str] = "",
    domain: Optional[str] = None,
    tags: Optional[str] = None,
    limit: int = Query(10, ge=1),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db),
):
    query = db.query(Competition)
    if q:
        query = query.filter(Competition.title.contains(q))
    if domain:
        query = query.filter(Competition.domain == domain)
    if tags:
        tags_list = tags.split(",")
        tag_filters = [Competition.tags.like(f"%{tag}%") for tag in tags_list]
        query = query.filter(or_(*tag_filters))
    competitions = query.offset(offset).limit(limit).all()
    return competitions

@router.get("/api/competitions/{competition_id}", response_model=CompetitionSchema)
def get_competition(competition_id: int, db: Session = Depends(get_db)):
    competition = db.query(Competition).filter(Competition.id == competition_id).first()
    if competition is None:
        raise HTTPException(status_code=404, detail="Competition not found")
    return competition


@router.get("/api/competitions/{competition_id}/similar", response_model=List[CompetitionSchema])
def get_similar_competitions_endpoint(
    competition_id: int,
    similarity: str = "domain",
    db: Session = Depends(get_db)
):
    competition = db.query(Competition).filter(Competition.id == competition_id).first()
    if competition is None:
        raise HTTPException(status_code=404, detail="Competition not found")
    similar_competitions = get_similar_competitions(competition, similarity, db)
    return similar_competitions
