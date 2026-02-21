# Assets Management System (Next.js + Spring Boot + PostgreSQL)

Complete full-stack project for managing organizational assets with:
- **Frontend:** Next.js (React + TypeScript)
- **Backend:** Java Spring Boot REST API
- **Database:** PostgreSQL

## Project structure

- `frontend/` → Next.js application
- `backend/` → Spring Boot API
- `docker-compose.yml` → run all services together

## Features

- Create, list, edit, and delete assets
- Asset fields: name, tag number, category, location, status, purchase date, purchase cost, notes
- Validation and API-level error responses
- CORS enabled for local frontend/backend integration

## Run with Docker (recommended)

```bash
docker compose up --build
```

Services:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080/api/assets
- PostgreSQL: localhost:5432

## Run locally without Docker

### 1) Start PostgreSQL
Create DB and user:
- DB: `assets_db`
- user: `assets_user`
- password: `assets_pass`

### 2) Run backend

```bash
cd backend
mvn spring-boot:run
```

### 3) Run frontend

```bash
cd frontend
npm install
npm run dev
```

Set optional API URL:

```bash
export NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## API endpoints

- `GET /api/assets`
- `GET /api/assets/{id}`
- `POST /api/assets`
- `PUT /api/assets/{id}`
- `DELETE /api/assets/{id}`

### Example create payload

```json
{
  "name": "MacBook Pro 14",
  "tagNumber": "LAP-2026-001",
  "category": "Laptop",
  "location": "Head Office",
  "status": "IN_USE",
  "purchaseDate": "2026-01-12",
  "purchaseCost": 2450.00,
  "notes": "Assigned to engineering team"
}
```
