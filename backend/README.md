## 類似コンペ検索サイト バックエンド

このプロジェクトは、Kaggleの過去のコンペティションやソリューションを様々な観点から検索できるウェブアプリケーションのバックエンド部分です。

### 目次

- [類似コンペ検索サイト バックエンド](#類似コンペ検索サイト-バックエンド)
  - [目次](#目次)
- [プロジェクト概要](#プロジェクト概要)
- [機能](#機能)
- [技術スタック](#技術スタック)
- [環境構築](#環境構築)
  - [前提条件](#前提条件)
  - [セットアップ手順](#セットアップ手順)
- [テストの実行](#テストの実行)
- [アプリケーションの起動](#アプリケーションの起動)
- [Dockerを使用した起動](#dockerを使用した起動)
- [APIエンドポイント](#apiエンドポイント)
  - [コンペティション](#コンペティション)
  - [ソリューション](#ソリューション)
- [データベースの管理](#データベースの管理)
- [コードスタイルと静的解析](#コードスタイルと静的解析)
- [ライセンス](#ライセンス)
- [貢献](#貢献)

---

## プロジェクト概要

このバックエンドアプリケーションは、ユーザーが入力した情報に基づいてKaggleの過去のコンペやソリューションを検索できるAPIを提供します。以下の機能をサポートしています。

## 機能

- コンペティションとソリューションの検索
- 類似コンペティションの検索（名前、データ、ドメインなどの観点から）
- データの種類、タスク、ドメインによるフィルタリング
- ページネーションによる検索結果の制御

## 技術スタック

- **言語**: Python 3.12
- **ウェブフレームワーク**: FastAPI
- **データベース**: SQLite (SQLAlchemy ORM)
- **テストフレームワーク**: Pytest
- **マイグレーションツール**: Alembic
- **依存管理**: uv
- **コンテナ化**: Docker, Docker Compose

---

## 環境構築

### 前提条件

- Gitがインストールされていること
- （オプション）DockerとDocker Composeがインストールされていること

### セットアップ手順

1. **リポジトリのクローン**

   ```bash
   git clone https://github.com/bamps53/similar-comp-search.git
   cd similar-comp-search/backend
   ```

2. **仮想環境の作成**

   ```bash
   # Install uv
   curl -LsSf https://astral.sh/uv/install.sh | sh

   # 同期
   uv sync --dev
   ```

3. **データベースのマイグレーション**

   ```bash
   alembic upgrade head
   ```

---

## テストの実行

1. **テストの実行**

   ```bash
   uv pytest tests/
   ```

2. **テストカバレッジの確認**

   ```bash
   uv pytest --cov=app tests/
   ```

3. **静的解析の実行**

   ```bash
   mypy app/
   ```

---

## アプリケーションの起動

1. **ローカルでの起動**

   ```bash
   uvicorn app.main:app --reload
   ```

   - アプリケーションはデフォルトで `http://localhost:8000` で起動します。
   - 自動的にドキュメントが生成されます。
     - OpenAPIドキュメント: `http://localhost:8000/docs`
     - ReDocドキュメント: `http://localhost:8000/redoc`

---

## Dockerを使用した起動

1. **Dockerイメージのビルド**

   ```bash
   docker compose build
   ```

2. **コンテナの起動**

   ```bash
   docker compose up
   ```

   - バックエンドサービスが `http://localhost:8000` で起動します。

3. **コンテナの停止**

   ```bash
   docker compose down
   ```

---

## APIエンドポイント

### コンペティション

- **検索コンペティション**

  ```
  GET /api/competitions/search
  ```

  - **クエリパラメータ**:
    - `q`: 検索キーワード
    - `domain`: ドメインでのフィルタリング（例: "NLP", "Computer Vision"）
    - `tags`: タグでのフィルタリング（カンマ区切り）
    - `limit`: 取得する件数（デフォルト10）
    - `offset`: オフセット（デフォルト0）

- **コンペティション詳細取得**

  ```
  GET /api/competitions/{competition_id}
  ```

- **類似コンペティション取得**

  ```
  GET /api/competitions/{competition_id}/similar
  ```

  - **クエリパラメータ**:
    - `similarity`: 類似性の観点（"domain", "tags", "title" など）

### ソリューション

- **検索ソリューション**

  ```
  GET /api/solutions/search
  ```

  - **クエリパラメータ**:
    - `q`: 検索キーワード
    - `competition_id`: 関連するコンペティションID
    - `limit`: 取得する件数（デフォルト10）
    - `offset`: オフセット（デフォルト0）

- **ソリューション詳細取得**

  ```
  GET /api/solutions/{solution_id}
  ```

---

## データベースの管理

- **データベースの初期化**

  テスト環境や新しい環境でアプリケーションをセットアップする際に、データベースを初期化します。

  ```bash
  alembic upgrade head
  ```

- **データのインポート**

  `app/services/data_import.py` を使用して、CSVファイルからデータをインポートします。

- **マイグレーションの作成**

  モデルに変更があった場合、マイグレーションファイルを作成します。

  ```bash
  alembic revision --autogenerate -m "メッセージ"
  ```

  その後、マイグレーションを適用します。

  ```bash
  alembic upgrade head
  ```

---

## コードスタイルと静的解析

- **型ヒント**

  - Pythonの型ヒントを徹底的に使用しています。
  - 開発時にエディタやIDEのサポートを受けられます。

- **静的解析ツール**

  - **Mypy** を使用して、型チェックを行います。

    ```bash
    make lint
    ```

  - **Ruff** を使用して、コードスタイルと品質をチェックします。

    ```bash
    ruff --fix
    ```

