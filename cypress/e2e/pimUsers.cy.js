/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { onLoginPage } from "../pages/loginPage";
import { onNavigationToPages } from '../pages/navigationToPages';
import { onPimPage } from "../pages/pimPage";


beforeEach("Open Application", () => {
    cy.visit("/")
});

describe('PIM Users Management', () => {
    it('Should add a new employee', () => {
        onLoginPage.loginIntoApp(Cypress.env('username'), Cypress.env('password'));
        onNavigationToPages.navigateToPimPage();
        onPimPage.fillEmployeeDetails(
            faker.person.firstName(),
            faker.person.middleName(),
            faker.person.lastName(),
            faker.number.int(1000, 9999)
        );
        
    });
});

