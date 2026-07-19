# WTFGames — Public Frontend (`wtfgames-site`)

This repository is the **public-facing website** for WTFGames — the actual
customer-facing site, **not** the admin panel. It is a read-only consumer of
the backend API (games/applications catalog); it has no authentication.

## Related repositories

All live as siblings under `~/Work/web/wtfgames/`:

| Path | Role | Remote |
|------|------|--------|
| `wtfgames-site` | **This repo** — public frontend / customer-facing website | GitHub `serhii-chechui/WTFGamesSiteClient` |
| `wtfgames-site-admin` | Admin panel / management UI | Bitbucket `wtf_games/wtfgamessiteadmin` |
| `wtfgames-site-api` | Backend — REST API (Express + MongoDB) | GitHub `serhii-chechui/wtfgames-api` |

Do not confuse this repo (public frontend) with `wtfgames-site-admin` (admin
panel). Backend changes belong in `wtfgames-site-api`, not here.

## Stack (this repo)

- Create React App 5 (`react-scripts` 5), React 19, **plain JavaScript** (no TypeScript)
- Redux Toolkit (`src/store/` — `gamesSlice`, `applicationsSlice`)
- axios client (`src/api/client.js`), React Router 7, Bootstrap 5 + SCSS
- Scripts: `npm start` / `npm run build` / `npm test` (`react-scripts`)

## API & auth

- Base URL from `REACT_APP_API_URL`, falling back to the production API
  `https://api.wtfgames.com.ua/api` (`src/api/client.js`). To point at a local
  backend, set `REACT_APP_API_URL=http://127.0.0.1:3156/api` in a `.env` file
  (see `.env.example`). There is **no CRA `proxy`** here (unlike the admin repo).
- axios timeout is 8000ms; **no `withCredentials`** — the public site only calls
  **public read endpoints** (`GET /api/games`, `GET /api/applications`) and does
  not authenticate. Auth/cookies are the admin panel's concern.

## Workflow

- **git-flow**: `main` (production) / `develop` (integration) / `feature/*`.
- Releases are tagged `vX.Y.Z` on `main`.
- Commit locally; do not push unless explicitly asked.

## Deployment (production = AWS EC2)

There is **no CI/CD** in the repos — no pipeline, Dockerfile, or deploy script is
committed. Pushing `main` does **not** auto-deploy; the EC2 rollout is a manual
step performed by the maintainer.

- **This repo:** built locally (`npm run build`) and the resulting `build/`
  bundle is uploaded to the EC2 host (served as static files).
- **Production domains** (all under `wtfgames.com.ua`):
  - public site (this repo) — served under `wtfgames.com.ua`
  - `admin.wtfgames.com.ua` — admin panel
  - `api.wtfgames.com.ua` — the backend API
