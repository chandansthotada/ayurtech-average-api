# Ayurtech Average API

A Node.js REST API that accepts a number via `POST /average` and returns the **running average**, **count**, and **sum** of all numbers submitted since the server started.

Comes with a **live web UI**, a **command-line client**, a **Jest + Supertest test suite**, and **Husky git hooks** that enforce Conventional Commits.

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

- **`POST /average`** — submit a number, get back the running average
- **`GET /health`** — lightweight readiness probe
- **Web UI** — live calculator served at `http://localhost:3000`
- **Input validation** — rejects non-finite / non-numeric values with `400`
- **In-memory store** — server-lifetime state, no DB required
- **CLI client** — `client/cli.js` using native `fetch`
- **Multiple clients documented** — Web UI, cURL, CLI, Postman
- **Jest + Supertest test suite** with coverage
- **Git hooks** — pre-commit lint + test, commit-msg Conventional Commits check
- **Full JSDoc annotations** on all public functions

---

## 📁 Project Structure

```
ayurtech-average-api/
├── .husky/
│   ├── pre-commit              # runs lint-staged (eslint + related tests)
│   └── commit-msg              # runs commitlint
├── client/
│   └── cli.js                  # command-line client
├── public/                     # web UI (served by Express)
│   ├── index.html
│   ├── style.css
│   └── script.js
├── src/
│   ├── app.js                  # Express app factory + routes
│   ├── server.js               # HTTP server entry point
│   └── averageStore.js         # in-memory running-average store
├── server.test.js              # Jest + Supertest integration tests
├── .gitignore
├── LICENSE
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

> `npm install` automatically runs the `prepare` script, which executes
> `husky install` and activates the git hooks.

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
  "count": 1,
  "sum": 42
}
```

**Example: multiple requests**

| # | Sent | Response |
|---|:----:|----------|
| 1 | 10 | `{ "average": 10, "count": 1, "sum": 10 }` |
| 2 | 20 | `{ "average": 15, "count": 2, "sum": 30 }` |
| 3 | 30 | `{ "average": 20, "count": 3, "sum": 60 }` |

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

### Option 1 — Web UI (Easiest)

1. Start the server: `npm start`
2. Open [http://localhost:3000](http://localhost:3000) in your browser
3. Type a number and click **Submit**
4. The **Average**, **Count**, and **Sum** update live after each submission
5. Number history is displayed below the stats

### Option 2 — cURL

```bash
# First call
curl -X POST http://localhost:3000/average \
     -H "Content-Type: application/json" \
     -d '{"number": 10}'
# → {"average":10,"count":1,"sum":10}

# Second call
curl -X POST http://localhost:3000/average \
     -H "Content-Type: application/json" \
     -d '{"number": 20}'
# → {"average":15,"count":2,"sum":30}

# Third call
curl -X POST http://localhost:3000/average \
     -H "Content-Type: application/json" \
     -d '{"number": 30}'
# → {"average":20,"count":3,"sum":60}
```

### Option 3 — Bundled CLI Client

```bash
node client/cli.js 42
# → Sent 42 → average = 42 (n=1)

node client/cli.js 100
# → Sent 100 → average = 71 (n=2)

node client/cli.js 5 --url http://localhost:4000
```

### Option 4 — Postman

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
- **Frontend is served from the same origin** — `express.static('public')` — so
  no CORS configuration is needed.

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
| Frontend | HTML5, CSS3, Vanilla JS (fetch API) |
| Testing | Jest + Supertest |
| Linting | ESLint |
| Git Hooks | Husky + lint-staged + commitlint |
| Clients | Web UI + CLI (native `fetch`) + cURL + Postman |

---

## 🎤 Demonstrating to the Evaluator

Follow these steps to verify every feature of this project:

1. **Clone and install**

   ```bash
   git clone https://github.com/chandansthotada/ayurtech-average-api.git
   cd ayurtech-average-api
   npm install
   ```

2. **Start the server**

   ```bash
   npm start
   ```

   You should see: `Ayurtech Average API listening on http://localhost:3000`

3. **Open the web UI**

   Go to [http://localhost:3000](http://localhost:3000) in your browser.
   Submit `10`, then `20`, then `30`. Watch the Average / Count / Sum
   values update live with each submission.

4. **Use the CLI client**

   In a second terminal:

   ```bash
   node client/cli.js 100
   # → Sent 100 → average = 40 (n=4)
   ```

5. **Verify input validation**

   ```bash
   curl -X POST http://localhost:3000/average \
     -H "Content-Type: application/json" \
     -d '{"number": "abc"}'
   # → 400 with descriptive error
   ```

6. **Run the test suite**

   ```bash
   npm test
   # → All tests pass with coverage summary
   ```

7. **See git hooks in action**

   Try a bad commit message:

   ```bash
   git commit -m "random stuff"
   # → Rejected by commitlint
   ```

   Try a valid one:

   ```bash
   git commit -m "feat: demonstrate conventional commits"
   # → Accepted (after tests pass)
   ```

---

## 📄 License

[MIT](./LICENSE)

---

## 👤 Author

**Chandan T S**

- GitHub: [@chandansthotada](https://github.com/chandansthotada)
- Repository: [ayurtech-average-api](https://github.com/chandansthotada/ayurtech-average-api)
