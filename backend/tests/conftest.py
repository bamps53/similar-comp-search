# tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database import Base, get_db
from app.models import Competition, Solution

# テスト用データベースのURL
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"

# テスト用エンジンとセッションを作成
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# テスト用のDBセッションを取得するDependency
def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()


# 依存関係をオーバーライド
app.dependency_overrides[get_db] = override_get_db


# テストクライアントのフィクスチャ
@pytest.fixture(scope="module")
def client():
    # テスト用データベースを初期化
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c
    # テスト用データベースを削除
    Base.metadata.drop_all(bind=engine)


# テスト用データベースセッションのフィクスチャ
@pytest.fixture(scope="function")
def db_session():
    session = TestingSessionLocal()
    yield session
    session.close()


# テストデータ作成のヘルパー関数
def create_competition(db, **kwargs):
    competition = Competition(**kwargs)
    db.add(competition)
    db.commit()
    db.refresh(competition)
    return competition


def create_solution(db, **kwargs):
    solution = Solution(**kwargs)
    db.add(solution)
    db.commit()
    db.refresh(solution)
    return solution


# テストデータのクリーンアップ関数
def cleanup_data(db):
    db.query(Solution).delete()
    db.query(Competition).delete()
    db.commit()
