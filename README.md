# WTFGames Site

Official website of WTFGames — an indie game studio. Built with React (Create React App), React Router, Redux Toolkit, and Bootstrap.

## Getting Started

```bash
npm install
npm start        # dev server at http://localhost:3000
npm run build    # production build into ./build
```

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

The project lives in two repositories that must be kept in sync — push every branch update to both:

| Remote | Host |
| --- | --- |
| `origin` | Bitbucket (`wtf_games/wtfgamessiteclient`) |
| `github.com` | GitHub (`serhii-chechui/WTFGamesSiteClient`) |

### Daily workflow

The [git-flow CLI](https://github.com/nvie/gitflow) is configured for this repo (`main`/`develop`, `v` tag prefix):

```bash
# feature
git flow feature start my-feature
# ...commit work...
git flow feature finish my-feature   # merges into develop
git push origin develop && git push github.com develop

# release
git flow release start 1.1.0
# ...bump version, final fixes...
git flow release finish 1.1.0        # merges into main + develop, tags v1.1.0
git push origin main develop --tags && git push github.com main develop --tags

# hotfix
git flow hotfix start 1.1.1
# ...fix...
git flow hotfix finish 1.1.1         # merges into main + develop, tags v1.1.1
git push origin main develop --tags && git push github.com main develop --tags
```

Without the CLI, the same flow works with plain `git branch` / `git merge --no-ff` following the table above.

### Rules

- Do not commit directly to `main`; it only receives merges from `release/*` and `hotfix/*`.
- Deploy is done from `main`.
