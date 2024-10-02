# app/services/similarity.py
from sqlalchemy.orm import Session
from app.models import Competition

def get_similar_competitions(competition: Competition, similarity: str, db: Session):
    if similarity == "domain":
        return db.query(Competition).filter(
            Competition.domain == competition.domain,
            Competition.id != competition.id
        ).all()
    elif similarity == "tags":
        competition_tags = set(competition.tags.split(","))
        competitions = db.query(Competition).filter(Competition.id != competition.id).all()
        # タグの共通数でソート（簡易的な類似度）
        competitions.sort(key=lambda comp: len(competition_tags & set(comp.tags.split(","))), reverse=True)
        return competitions
    else:
        # デフォルトはタイトルの部分一致（簡易版）
        return db.query(Competition).filter(
            Competition.title.contains(competition.title),
            Competition.id != competition.id
        ).all()
