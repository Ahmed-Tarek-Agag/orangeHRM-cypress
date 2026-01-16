// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { onLoginPage } from "../pages/loginPage"
Cypress.Commands.add('login', () => {
  cy.session('orangeHRM-session', () => {
    cy.visit(Cypress.env('routes').login);

    onLoginPage.loginIntoApp(Cypress.env('username'), Cypress.env('password'));

    cy.url().should('include', Cypress.env('routes').dashboard);
  });
});


Cypress.Commands.add('apiLogin', () => {
  cy.request({
    method: 'POST',
    url: 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate',
    form: true, 
    body: {
      username: Cypress.env('username'),
      password: Cypress.env('password')
    }
  }).then((response) => {
    expect(response.status).to.eq(200)
  })
})

