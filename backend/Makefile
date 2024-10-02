# デフォルトターゲット
.PHONY: help
help:
	@echo "利用可能なコマンド:"
	@echo "  make setup        仮想環境の作成と依存関係のインストール"
	@echo "  make run          アプリケーションの起動"
	@echo "  make test         テストの実行"
	@echo "  make coverage     テストの実行とカバレッジレポートの生成"
	@echo "  make lint         コードの静的解析 (mypy, pylint)"
	@echo "  make migrate      データベースマイグレーションの適用"
	@echo "  make makemigrations  新しいマイグレーションの作成"
	@echo "  make clean        一時ファイルとキャッシュの削除"

# 仮想環境のセットアップと依存関係のインストール
.PHONY: setup
setup:
	uv sync

# アプリケーションの起動
.PHONY: run
run:
	uv run uvicorn app.main:app --reload

# テストの実行
.PHONY: test
test:
	uv run pytest tests/

# テストとカバレッジレポートの生成
.PHONY: coverage
coverage:
	uv run pytest --cov=app tests/
	uv run coverage html

# コードの静的解析
.PHONY: lint
lint:
	uv run mypy app/

# データベースマイグレーションの適用
.PHONY: migrate
migrate:
	uv run alembic upgrade head

# 新しいマイグレーションの作成
.PHONY: makemigrations
makemigrations:
	@read -p "Enter migration message: " msg; \
	uv run alembic revision --autogenerate -m "$$msg"

# 一時ファイルとキャッシュの削除
.PHONY: clean
clean:
	find . -type f -name '*.pyc' -delete
	find . -type d -name '__pycache__' -exec rm -r {} +
	rm -rf .venv
	rm -rf .mypy_cache
	rm -rf .pytest_cache
	rm -rf .ruff_cache
	rm -rf htmlcov
	rm -f coverage.xml
	rm -f .coverage
	rm -f test.db

# Dockerコンテナのビルドと起動
.PHONY: docker-up
docker-up:
	docker compose up --build

# Dockerコンテナの停止と削除
.PHONY: docker-down
docker-down:
	docker compose down

# Dockerイメージのクリーンアップ
.PHONY: docker-clean
docker-clean:
	docker compose down --rmi all --volumes --remove-orphans
