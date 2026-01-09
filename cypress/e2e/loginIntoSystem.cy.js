/// <reference types="cypress" />

import { onLoginPage } from "../pages/loginPage";

beforeEach("Open Application", () => {
    cy.visit("/")
});

describe('Login into the System', () => {
    it('Should login with valid credentials', () => {
        cy.visit('/');
        onLoginPage.loginIntoApp(Cypress.env('username'), Cypress.env('password'));
    });
});