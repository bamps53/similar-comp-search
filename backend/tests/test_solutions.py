# tests/test_solutions.py
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
import pytest

from tests.conftest import (
    create_competition,
    create_solution,
    cleanup_data,
)


@pytest.fixture(scope="function")
def test_solutions(db_session: Session):
    # 関連するコンペを作成
    comp1 = create_competition(
        db_session,
        slug="comp1",
        title="First Competition",
        subtitle="This is the first test competition",
        deadline_date="2022-01-01",
        tags="tag1,tag2",
        domain="NLP",
    )
    # ソリューションを作成
    sol1 = create_solution(
        db_session,
        competition_id=comp1.id,
        link="http://example.com/solution1",
        repository_link="http://github.com/repo1",
        description="First solution",
    )
    sol2 = create_solution(
        db_session,
        competition_id=comp1.id,
        link="http://example.com/solution2",
        repository_link="http://github.com/repo2",
        description="Second solution",
    )
    yield [sol1, sol2]
    # クリーンアップ
    cleanup_data(db_session)


def test_get_solutions_search(client: TestClient, test_solutions):
    # キーワード検索のテスト
    response = client.get("/api/solutions/search", params={"q": "First"})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["description"] == "First solution"


def test_get_solutions_by_competition(client: TestClient, test_solutions):
    # コンペIDでの検索
    competition_id = test_solutions[0].competition_id
    response = client.get("/api/solutions/search", params={"competition_id": competition_id})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2


def test_get_solution_detail(client: TestClient, test_solutions):
    solution_id = test_solutions[0].id
    response = client.get(f"/api/solutions/{solution_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == solution_id
    assert data["description"] == "First solution"


def test_get_solution_detail_not_found(client: TestClient):
    response = client.get("/api/solutions/9999")
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Solution not found"
