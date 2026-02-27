# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Factory Inventory Management System — full-stack demo app with Vue 3 frontend and Python FastAPI backend. All data is in-memory from JSON files (no database).

## Commands

```bash
# Start both servers (macOS/Linux only)
./scripts/start.sh          # Backend :8001 + Frontend :3000
./scripts/stop.sh           # Stop both

# Backend (from server/)
cd server && uv venv && uv sync    # First time setup
uv run python main.py              # Runs on :8001, docs at :8001/docs

# Frontend (from client/)
cd client && npm install           # First time setup
npm run dev                        # Runs on :3000
npm run build                      # Production build → client/dist/

# Tests (from tests/)
cd tests && uv run pytest -v                                    # All tests
uv run pytest backend/test_inventory.py -v                      # Single file
uv run pytest backend/test_inventory.py::TestInventoryEndpoints::test_get_all_inventory -v  # Single test
uv run pytest --cov=../server --cov-report=html                 # Coverage
```

## Architecture

**Stack**: Vue 3 (Composition API) + vue-router + axios → FastAPI + Pydantic → JSON files in `server/data/`

**Data flow**: Vue composable filters (`useFilters`) → `client/src/api.js` builds query params → FastAPI endpoints apply `apply_filters()`/`filter_by_month()` on in-memory lists → Pydantic validation → JSON response → Vue computed properties derive display data.

**Routing**: Defined in `client/src/main.js` — `/` (Dashboard), `/inventory`, `/orders`, `/spending`, `/demand`, `/reports`.

**Filter system**: 4 global filters (Time Period, Warehouse, Category, Order Status) managed as singleton refs in `useFilters` composable. `FilterBar` component binds to them. Every view watches filters and re-fetches. Inventory endpoints don't support month filtering (no time dimension on inventory items).

**i18n**: Custom composable (`useI18n`) with locale files in `client/src/locales/` (English and Japanese).

**Auth**: Mock auth via `useAuth` composable — no real authentication.

**Backend data loading**: `server/mock_data.py` loads all JSON at import time. Data is read-only in memory; changes don't persist across restarts.

## API Endpoints

- `GET /api/inventory` — filters: warehouse, category
- `GET /api/inventory/{item_id}` — single item (404 if missing)
- `GET /api/orders` — filters: warehouse, category, status, month (supports `Q1-2025` quarter format)
- `GET /api/orders/{order_id}` — single order
- `GET /api/dashboard/summary` — all filters, returns computed stats
- `GET /api/demand` — no filters
- `GET /api/backlog` — enriched with `has_purchase_order` flag
- `GET /api/spending/summary`, `/monthly`, `/categories`, `/transactions` — no filters
- `GET /api/reports/quarterly`, `/monthly-trends` — computed from orders

## Key Patterns

- All filter params treat `'all'` as "no filter" (both client and server)
- Category matching is case-insensitive on backend
- Pydantic models are defined inline in `server/main.py`
- Tests use FastAPI `TestClient` via fixture in `tests/backend/conftest.py` (adds `server/` to sys.path)
- Global styles live in `App.vue` `<style>` (not scoped); component styles use `<style scoped>`
- Charts are custom SVG, no charting library
- Revenue goals: $800K/month single, $9.6M YTD all months

## Subagents

- **vue-expert**: Delegate when creating or significantly modifying `.vue` files
- **code-reviewer**: Use after writing significant code
- **backend-api-test** skill: Use when writing tests in `tests/backend/`

## MCP Tools

- Use `mcp__github__*` for all GitHub operations (except local-only branches: use `git checkout -b`)
- Use `mcp__playwright__*` for browser testing against `:3000` (frontend) and `:8001` (API)

## Code Style

- Always document non-obvious logic changes with comments

## Common Pitfalls

- Use unique keys in `v-for` (use `sku`, `id`, etc. — not array index)
- Validate dates before calling `.getMonth()`
- Update Pydantic models in `server/main.py` when changing JSON data structure
- Don't mutate global data lists in filter functions — filter on copies
- Use emojis in the UI to enhance visual clarity and scannability
