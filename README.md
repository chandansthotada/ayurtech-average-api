# Ayurtech Average API

A simple REST API that accepts a number via `POST /average` and returns the
**running average of all numbers** it has been called with so far.

Built with **Node.js** and **Express**, tested with **Jest + Supertest**, and
gated by **Husky** git hooks that enforce **Conventional Commits**.

![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)
![Express](https://img.shields.io/badge/express-4.x-blue)
![Jest](https://img.shields.io/badge/tested%20with-jest-red)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 Assignment Details

| Field | Value |
|-------|-------|
| **Assignment Code** | `R280926724P` |
| **Deal Name** | `AYU0926PEND01` |
| **Runtime** | Node.js (>= 18) |
| **Framework** | Express 4 |

---

## ✨ Features

- `POST /average` — submit a number, get back the running average
- `GET /health` — lightweight readiness probe
- Input validation (rejects non-finite / non-numeric values with `400`)
- In-memory store (server-lifetime) — see [Design Notes](#-design-notes)
- CLI client + `curl` + Postman support
- Jest + Supertest test suite with coverage
- Git hooks: pre-commit lint + test, commit-msg Conventional Commits check
- Full JSDoc annotations on all public functions

---

## 📁 Project Structure

```
ayurtech-average-api/
├── .husky/
│   ├── pre-commit          # runs lint-staged (eslint + related tests)
│   └── commit-msg          # runs commitlint
├── client/
│   └── cli.js              # command-line client
├── src/
│   ├── app.js              # Express app factory + routes
│   ├── server.js           # HTTP server entry point
│   └── averageStore.js     # in-memory running-average store
├── tests/
│   └── average.test.js     # Jest + Supertest integration tests
├── .eslintrc.json
├── .gitignore
├── commitlint.config.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18 (uses native `fetch` in the CLI client)
- **npm** >= 9

### Installation

```bash
git clone https://github.com/chandansthotada/ayurtech-average-api.git
cd ayurtech-average-api
npm install
```

> `npm install` automatically runs the `prepare` script which executes
> `husky install`, activating the git hooks.

---

## 🏃 Running the Server

```bash
npm start                 # listens on http://localhost:3000
PORT=4000 npm start       # custom port (macOS/Linux)
set PORT=4000 && npm start   # custom port (Windows CMD)
npm run dev               # auto-reload on file changes (Node 18+)
```

You should see:

```
Ayurtech Average API listening on http://localhost:3000
```

---

## 🔌 API Reference

### `POST /average`

Submits a number and returns the running average.

**Request body**

```json
{ "number": 42 }
```

A bare numeric body (`42`) is also accepted for convenience.

**Success response — `200 OK`**

```json
{
  "average": 42,
  "count": 1
}
```

**Error response — `400 Bad Request`**

```json
{
  "error": "Request body must contain a finite number, e.g. { \"number\": 5 }"
}
```

---

### `GET /health`

```json
{ "status": "ok" }
```

---

## 🧪 Calling the API

### Option 1 — cURL

```bash
# First call
curl -X POST http://localhost:3000/average \
     -H "Content-Type: application/json" \
     -d '{"number": 10}'
# → {"average":10,"count":1}

# Second call
curl -X POST http://localhost:3000/average \
     -H "Content-Type: application/json" \
     -d '{"number": 20}'
# → {"average":15,"count":2}

# Third call
curl -X POST http://localhost:3000/average \
     -H "Content-Type: application/json" \
     -d '{"number": 30}'
# → {"average":20,"count":3}
```

### Option 2 — Bundled CLI Client

```bash
node client/cli.js 42
# → Sent 42 → average = 42 (n=1)

node client/cli.js 100
# → Sent 100 → average = 71 (n=2)

node client/cli.js 5 --url http://localhost:4000
```

### Option 3 — Postman

1. Create a new `POST` request to `http://localhost:3000/average`
2. Body → raw → JSON
3. Payload: `{ "number": 42 }`

---

## ✅ Testing

```bash
npm test              # run all tests with coverage
npm run test:watch    # watch mode
```

Covered scenarios:

- First call returns the submitted number as the average
- Running average across multiple calls
- Negative numbers and decimals
- Bare numeric body
- Rejection of non-numeric strings (`400`)
- Rejection of `NaN` / `Infinity` (`400`)
- Health endpoint

---

## 🧹 Linting

```bash
npm run lint
npm run lint:fix
```

---

## 🪝 Git Hooks

Hooks are installed automatically via Husky when you run `npm install`.

| Hook | Action |
|------|--------|
| `pre-commit` | Runs `lint-staged` → ESLint (autofix) + related Jest tests on staged `.js` files |
| `commit-msg` | Runs `commitlint` → enforces Conventional Commits |

### Conventional Commit Format

```
<type>(<optional scope>): <subject>
```

**Allowed types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`,
`chore`, `perf`, `ci`, `build`, `revert`

**Examples**

```bash
git commit -m "feat(api): add POST /average endpoint"
git commit -m "test: cover negative-number averaging"
git commit -m "docs: add usage examples to README"
git commit -m "chore: enable husky git hooks"
```

❌ Non-conventional messages are **rejected**:

```bash
git commit -m "added stuff"     # blocked by commitlint
```

> **Windows tip:** if Husky's `pre-commit` hook fails with a
> `'"node"' is not recognized` error, use
> `git commit --no-verify -m "feat: ..."` to bypass for that one commit.

---

## 🧠 Design Notes

- **State is in-memory.** The phrase _"all numbers it has been called with so
  far"_ is interpreted as server-lifetime state, not persistent storage. This
  means a server restart resets the average. If persistence were required,
  only `src/averageStore.js` needs to change — nothing else touches storage.
- **Empty-set convention.** If no numbers have been submitted yet, the store
  returns `0`. In practice, every `POST /average` adds one number first, so
  the response always reflects at least that value.
- **Input validation.** Non-finite values (`NaN`, `Infinity`, `null`, strings
  that don't parse to numbers) are rejected with HTTP `400`.

---

## 📦 Dependencies

Declared explicitly in `package.json`:

### Runtime

- **express** — HTTP server framework

### Development

- **jest** — test runner
- **supertest** — HTTP assertions for Express apps
- **eslint** — linting
- **husky** — git hooks manager
- **@commitlint/cli** + **@commitlint/config-conventional** — Conventional Commits enforcement
- **lint-staged** — run linters/tests on staged files

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js ≥ 18 |
| Framework | Express 4 |
| Testing | Jest + Supertest |
| Linting | ESLint |
| Git Hooks | Husky + lint-staged + commitlint |
| Client | CLI (native `fetch`) + cURL + Postman |

---

## 📄 License

[MIT](./LICENSE)

---

## 👤 Author

**Chandan T S**

- GitHub: [@chandansthotada](https://github.com/chandansthotada)
- Repository: [ayurtech-average-api](https://github.com/chandansthotada/ayurtech-average-api)
