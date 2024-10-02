# app/models.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class Competition(Base):
    __tablename__ = "competitions"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String, unique=True, index=True)
    title = Column(String, index=True)
    subtitle = Column(String)
    deadline_date = Column(String)
    tags = Column(String)
    domain = Column(String)

    solutions = relationship("Solution", back_populates="competition")


class Solution(Base):
    __tablename__ = "solutions"

    id = Column(Integer, primary_key=True, index=True)
    competition_id = Column(Integer, ForeignKey("competitions.id"))
    link = Column(String)
    repository_link = Column(String)
    description = Column(String)

    competition = relationship("Competition", back_populates="solutions")
