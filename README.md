# WTFGames Site

Official website of WTFGames — an indie game studio. Built with React (Create React App), React Router, Redux Toolkit, and Bootstrap.

## Getting Started

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production build into ./build
```

## Configuration

The games/applications API base URL is read from the `REACT_APP_API_URL`
environment variable (see `src/api/client.js`). Copy `.env.example` to `.env`
(gitignored, not committed) to override it, e.g. to point at a local or
staging backend:

```bash
cp .env.example .env
```

If `.env` is absent or the variable isn't set, the app falls back to the
current production API, so `npm start` / `npm run build` work out of the box
without any local configuration.

## Static policy pages

Store-facing policy pages live in `public/` and are served as plain HTML at the site root:

- `/ludorama-privacy-policy.html`
- `/lumascope-privacy-policy.html`

## Git Flow

This repository follows the [git flow](https://nvie.com/posts/a-successful-git-branching-model/) branching model.

### Branches

| Branch | Purpose |
| --- | --- |
| `main` | Production. Every commit here is a release. |
| `develop` | Integration branch. All day-to-day work lands here. |
| `feature/*` | New features, branched from `develop`, merged back to `develop`. |
| `release/*` | Release preparation, branched from `develop`, merged to `main` and `develop`. |
| `hotfix/*` | Urgent production fixes, branched from `main`, merged to `main` and `develop`. |

### Remotes

The project lives in two repositories that must be kept in sync:

| Remote | Host |
| --- | --- |
| `origin` | Bitbucket (`wtf_games/wtfgamessiteclient`) |
| `github.com` | GitHub (`serhii-chechui/WTFGamesSiteClient`) |

`origin` is configured with two push URLs, so a regular `git push origin <branch>` delivers to **both** Bitbucket and GitHub at once (fetch still comes from Bitbucket only). To restore this setup on a fresh clone:

```bash
git remote set-url --add --push origin git@bitbucket.org:wtf_games/wtfgamessiteclient.git
git remote set-url --add --push origin git@github.com-serhii-chechui:serhii-chechui/WTFGamesSiteClient.git
```

### Daily workflow

The [git-flow CLI](https://github.com/nvie/gitflow) is configured for this repo (`main`/`develop`, `v` tag prefix):

```bash
# feature
git flow feature start my-feature
# ...commit work...
git flow feature finish my-feature   # merges into develop
git push origin develop              # goes to Bitbucket + GitHub

# release
git flow release start 1.1.0
# ...bump version, final fixes...
git flow release finish 1.1.0        # merges into main + develop, tags v1.1.0
git push origin main develop --tags  # goes to Bitbucket + GitHub

# hotfix
git flow hotfix start 1.1.1
# ...fix...
git flow hotfix finish 1.1.1         # merges into main + develop, tags v1.1.1
git push origin main develop --tags  # goes to Bitbucket + GitHub
```

Without the CLI, the same flow works with plain `git branch` / `git merge --no-ff` following the table above.

### Rules

- Do not commit directly to `main`; it only receives merges from `release/*` and `hotfix/*`.
- Deploy is done from `main`.
