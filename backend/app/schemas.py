# app/schemas.py
from pydantic import BaseModel

class CompetitionBase(BaseModel):
    slug: str
    title: str
    subtitle: str
    deadline_date: str
    tags: str
    domain: str

class Competition(CompetitionBase):
    id: int

    model_config = {
        "from_attributes": True
    }

class SolutionBase(BaseModel):
    competition_id: int
    link: str
    repository_link: str
    description: str

class Solution(SolutionBase):
    id: int

    model_config = {
        "from_attributes": True
    }
