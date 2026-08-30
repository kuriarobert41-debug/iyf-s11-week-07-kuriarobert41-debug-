# Week 7 Implementation

This branch implements the Week 7 exercises (except the daily challenges) into the repository.

What's included:

- A small web app scaffold (index.html + styles.css)
- Modular JS under `js/`: storage.js, utils.js, state.js, ui.js, app.js
- Persistent To‑Do list with filters and saved completed state
- Shopping cart mini project (products, add/remove, quantity, persistence)
- ESLint (.eslintrc.json) and Prettier (.prettierrc) configs and package.json scripts
- Unit tests using Vitest (tests/utils.test.js)

How to run locally:

1. Clone your repo and checkout the branch `implement-week-07-tasks`
2. Install dev deps: `npm install`
3. Open `index.html` in your browser (or use a static server)
4. Run tests: `npm test`

Notes:
- I did not add Node server code; the app is static and uses localStorage in the browser.
- If you want, I can open a PR from this branch to the default branch with this change set.
