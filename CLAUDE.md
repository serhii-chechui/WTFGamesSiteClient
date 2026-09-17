# WTFGames — Public Frontend (`wtfgames-site`)

This repository is the **public-facing website** for WTFGames — the actual
customer-facing site, **not** the admin panel. It is a read-only consumer of
the backend API (games/applications catalog); it has no authentication.

## Related repositories

All live as siblings under `~/Work/web/wtfgames/`:

| Path | Role | Remote |
|------|------|--------|
| `wtfgames-site` | **This repo** — public frontend / customer-facing website | Bitbucket `wtf_games/wtfgamessiteclient` (private, `origin`) + GitHub `serhii-chechui/WTFGamesSiteClient` (public) |
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
- **Dual remote:** `origin` (Bitbucket, the private canonical repo) is configured
  to push to **both** Bitbucket and the public GitHub in one `git push origin main`.
  There is also a separate `github.com` remote pointing at the public GitHub.
  Vercel needs the **public GitHub** `main` to deploy (see below).

## Deployment (production = Vercel)

**This repo is deployed by Vercel**, which builds the CRA app (`npm run build`,
output `build/`) from the **public GitHub** repo's `main` branch on push. Vercel
requires the public GitHub repo; the Bitbucket `origin` is the private canonical
repo (see *Dual remote* above). Because `origin` dual-pushes to both, a single
`git push origin main` both updates the private repo and triggers the Vercel
production deploy.

- No pipeline/Dockerfile/deploy script is committed to the repo — the build runs
  on Vercel, not in CI here.
- Static files in `public/` (favicon, images, the standalone doc pages like
  `bakeneko-manual-en.html` and `ludorama-*`) are copied verbatim into `build/`
  by CRA and served at the site root, reachable by direct URL.
- **Production domains** (all under `wtfgames.com.ua`):
  - public site (this repo, on Vercel) — served under `wtfgames.com.ua`
  - `admin.wtfgames.com.ua` — admin panel
  - `api.wtfgames.com.ua` — the backend API
