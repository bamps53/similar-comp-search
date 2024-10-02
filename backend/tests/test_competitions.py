# tests/test_competitions.py
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session
import pytest

from tests.conftest import (
    create_competition,
    cleanup_data,
)


@pytest.fixture(scope="function")
def test_competitions(db_session: Session):
    # テストデータを作成
    comp1 = create_competition(
        db_session,
        slug="comp1",
        title="First Competition",
        subtitle="This is the first test competition",
        deadline_date="2022-01-01",
        tags="tag1,tag2",
        domain="NLP",
    )
    comp2 = create_competition(
        db_session,
        slug="comp2",
        title="Second Competition",
        subtitle="This is the second test competition",
        deadline_date="2022-02-01",
        tags="tag2,tag3",
        domain="Computer Vision",
    )
    comp3 = create_competition(
        db_session,
        slug="comp3",
        title="Third Competition",
        subtitle="This is the third test competition",
        deadline_date="2022-03-01",
        tags="tag1,tag3",
        domain="NLP",
    )
    yield [comp1, comp2, comp3]
    # クリーンアップ
    cleanup_data(db_session)


def test_get_competitions_search(client: TestClient, test_competitions):
    # キーワード検索のテスト
    response = client.get("/api/competitions/search", params={"q": "First"})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["title"] == "First Competition"


def test_get_competitions_filtering(client: TestClient, test_competitions):
    # ドメインでフィルタリングのテスト
    response = client.get("/api/competitions/search", params={"domain": "NLP"})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert all(comp["domain"] == "NLP" for comp in data)

    # タグでフィルタリングのテスト
    response = client.get("/api/competitions/search", params={"tags": "tag3"})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert any(comp["slug"] == "comp2" for comp in data)
    assert any(comp["slug"] == "comp3" for comp in data)


def test_get_competitions_pagination(client: TestClient, test_competitions):
    # ページネーションのテスト（1ページあたり2件）
    response = client.get("/api/competitions/search", params={"limit": 2, "offset": 0})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2

    response = client.get("/api/competitions/search", params={"limit": 2, "offset": 2})
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1


def test_get_competition_detail(client: TestClient, test_competitions):
    competition_id = test_competitions[0].id
    response = client.get(f"/api/competitions/{competition_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == competition_id
    assert data["title"] == "First Competition"


def test_get_competition_detail_not_found(client: TestClient):
    response = client.get("/api/competitions/9999")
    assert response.status_code == 404
    data = response.json()
    assert data["detail"] == "Competition not found"


def test_get_similar_competitions(client: TestClient, test_competitions):
    competition_id = test_competitions[0].id
    response = client.get(f"/api/competitions/{competition_id}/similar", params={"similarity": "domain"})
    assert response.status_code == 200
    data = response.json()
    # 類似ドメインのコンペが返されることを確認
    assert len(data) >= 1
    assert all(comp["domain"] == "NLP" for comp in data)


def test_search_competitions_invalid_params(client: TestClient):
    # 不正なパラメータ
    response = client.get("/api/competitions/search", params={"limit": -1})
    assert response.status_code == 422  # Unprocessable Entity
