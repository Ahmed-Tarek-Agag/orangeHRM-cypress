# Copilot instructions — orangehrm-cypress

This repository is a minimal Cypress end-to-end test project. Use these instructions to be productive writing or modifying tests and support code.

Overview
- Purpose: E2E tests using Cypress (see `package.json` dependency on `cypress`).
- Test files live under `cypress/e2e/` (currently empty). Support and custom commands are under `cypress/support/`.
- Config and node hooks live in `cypress.config.js`.

Quick workflows
- Install deps: `npm ci` or `npm install`.
- Open interactive runner: `npx cypress open` (use this for authoring and debugging tests).
- Run headless: `npx cypress run --spec "cypress/e2e/**/*.cy.{js,ts}"`.
- Run headed for debugging: `npx cypress run --headed --browser chrome --spec "cypress/e2e/**/*.cy.{js,ts}"`.
- Override config at runtime: `npx cypress open --config baseUrl=https://example.com` or `npx cypress run --config baseUrl=https://example.com`.

Project conventions & patterns (discoverable in repo)
- File layout: tests → `cypress/e2e/*.cy.js` (use the `.cy.js` suffix). Support code → `cypress/support/commands.js` and `cypress/support/e2e.js` (import `./commands` there).
- Add reusable actions as Cypress custom commands in `cypress/support/commands.js` so they are globally available.
- Use `cypress.config.js`'s `setupNodeEvents` for any Node-side plugins or tasks. Keep browser-facing logic in tests/support files.
- Keep tests declarative and use fixtures from `cypress/fixtures/` for test data.

Examples
- Minimal test file: create `cypress/e2e/login.cy.js` with:
  ```js
  describe('Login', () => {
    it('logs in', () => {
      cy.visit('/login')
      cy.get('[data-cy=username]').type('admin')
      cy.get('[data-cy=password]').type('admin')
      cy.get('[data-cy=submit]').click()
      cy.contains('Dashboard')
    })
  })
  ```
- Register a command in `cypress/support/commands.js` and import it from `cypress/support/e2e.js` (already wired in this repo).

Debugging tips
- Use the interactive runner (`npx cypress open`) and the Chrome devtools it launches.
- Insert `cy.pause()` and `cy.debug()` in tests to inspect state during runs.
- For quick CLI debugging run a single spec: `npx cypress run --spec "cypress/e2e/login.cy.js" --headed`.

Notes & edge cases
- `package.json` sets `type: "commonjs"` but Cypress support files may use `import` — Cypress bundling handles support/imports; prefer the existing pattern in `cypress/support/e2e.js`.
- No `scripts` for Cypress are present; consider adding `"cy:open": "cypress open"` and `"cy:run": "cypress run"` if you want npm-script shortcuts.
- There is no `baseUrl` configured — set it in `cypress.config.js` or via `--config` when running commands.

Files to inspect when changing behavior
- `package.json` — dependency versions and scripts
- `cypress.config.js` — top-level Cypress configuration and Node event hooks
- `cypress/support/commands.js` — place to add/modify custom commands
- `cypress/support/e2e.js` — support bootstrap (imports `commands`)

If anything in these notes is unclear or you'd like me to add examples for TypeScript, CI configuration, or sample CI job steps, tell me which you'd prefer next.
