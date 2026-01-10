# Copilot instructions — orangehrm-cypress

Comprehensive E2E test suite for OrangeHRM using Cypress with Page Object Model pattern. Tests cover PIM workflows including employee creation, personal details, contact info, and salary management. Integrated with Allure reporting for test results visualization.

## Architecture & Key Patterns

**Page Object Model (POM)**: Each page/feature has a dedicated class in `cypress/pages/` (e.g., `loginPage.js`, `PIM/addEmployeePage.js`). Classes expose an `elements` property with getter functions and methods for user actions. Exported as singletons (e.g., `export const onLoginPage = new loginPage()`).

**Test structure**: Import page objects, use them declaratively in test specs (see `cypress/e2e/pimUsers.cy.js` for comprehensive example). Tests use `beforeEach` hooks with `cy.visit("/")` to reset state, then use page object methods to interact with the app.

**Session & custom commands**: `cy.login()` command in `cypress/support/commands.js` uses `cy.session()` to cache login state across tests, preventing repeated logins. Commands should be global reusables; test-specific logic goes in page objects.

## Development Workflows

- **Interactive testing**: `npx cypress open` → select test file in Cypress UI (preferred for authoring/debugging).
- **Headless run**: `npm run cypress:run` (from scripts in `package.json`).
- **Full suite with Allure**: `npm run cypress:run:all` cleans old reports, runs tests, generates Allure report in `allure-report/`.
- **View Allure results**: `npm run allure:open` opens HTML report locally.

## Configuration & Environment

**Base URL**: Set in `cypress.config.js` as `https://opensource-demo.orangehrmlive.com/` (public OrangeHRM demo instance).

**Credentials**: Stored in `cypress.env.json` (username/password). Override at runtime via environment variables (see `setupNodeEvents` in config).

**Routes**: Defined in `cypress.config.js` `env.routes` object (e.g., `routes.login`, `routes.pim`). Access via `Cypress.env('routes').login`.

**Plugins**: Allure plugin (`@shelex/cypress-allure-plugin`) auto-configured in `cypress/e2e.js` and `cypress.config.js` for test reporting. File upload support via `cypress-file-upload`.

## Common Patterns & Conventions

**Selectors**: Use semantic selectors (e.g., `cy.contains('button', 'Save')`, `cy.get('[placeholder="Username"]')`). Avoid brittle index-based queries when possible.

**Table interactions**: Use `.oxd-table-body`, `.oxd-table-row`, `.oxd-table-cell` selectors (OrangeHRM UI framework). See `generalMethods.js` for patterns like `cy.get('.oxd-table-body').find('.oxd-table-row').last()` to target new rows.

**Form input patterns**: Parent `.oxd-input-group` contains label + input. Use `cy.contains('label', 'Label Text').parents('.oxd-input-group').find('input')` to reliably find fields.

**Assertions on user feedback**: Tests expect toaster messages (`#oxd-toaster_1`) after saves/deletes with text like "Successfully Saved", "Successfully Updated", "Successfully Deleted".

**File uploads**: Use `cy.get('input[type="file"]').selectFile(filePath, { force: true })` (from `cypress-file-upload` plugin).

**Data generation**: Use `@faker-js/faker` for random test data (see `pimUsers.cy.js` for phone formatting, date handling, etc.).

## Files to Know

- `cypress.config.js` — baseUrl, timeouts, Allure setup, route definitions.
- `cypress/support/commands.js` — global `cy.login()` command using sessions.
- `cypress/support/e2e.js` — imports commands, registers Allure & file-upload plugins.
- `cypress/pages/` — page object classes; organize sub-domains in folders (e.g., `PIM/addEmployeePage.js`).
- `cypress/e2e/pimUsers.cy.js` — comprehensive workflow test showing faker usage, multiple page object interactions, assertions.
- `cypress/fixtures/` — test data; `routesHelper.js` available for route management.

## Edge Cases & Gotchas

- CommonJS config + ES6 imports in support files: Cypress bundler handles this; prefer `import` statements in support/pages as shown in repo.
- Viewport: Fixed at 1280×720 in config (affects layout assertions).
- Timeouts: `defaultCommandTimeout` 100s, `pageLoadTimeout` 60s (generous for demo server).
- Allure cleanup: `before:run` hook clears old reports automatically; no manual cleanup needed between runs.
