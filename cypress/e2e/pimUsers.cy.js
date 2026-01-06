/// <reference types="cypress" />
import { faker } from '@faker-js/faker';
import { onLoginPage } from "../pages/loginPage";
import { onNavigationToPages } from '../pages/navigationToPages';
import { onAddEmployeePage } from "../pages/PIM/addEmployeePage";
import { onViewPersonalDetailsPage } from '../pages/PIM/viewEmployeeDetailsPage';

// Generate random data for the new employee
const firstName = faker.person.firstName();
const middleName = faker.person.middleName();
const lastName = faker.person.lastName();
const employeeID = faker.number.int({ min: 1000, max: 9999 }).toString();
const fullName = `${firstName} ${lastName}`;
const username = faker.internet.username({ firstName, lastName });
const password = faker.internet.password({ length: 8 }) + "A1!";

// Generate random data for personal details
const otherID = faker.string.alphanumeric(8);
const driverLicense = faker.string.alphanumeric(10);

describe('PIM Users Management', () => {

    beforeEach(() => {
        cy.visit('/')
        onLoginPage.loginIntoApp(Cypress.env('username'), Cypress.env('password'));
    })


    it('Should add a new employee and create login details Then Complete Personal Details', () => {
        onNavigationToPages.navigateToPimPage();

        onAddEmployeePage.fillEmployeeDetails(
            firstName,
            middleName,
            lastName,
            employeeID,
            'cypress/fixtures/files/profileImage.jpg'
        );

        onAddEmployeePage.createLoginDetails(
            username,
            password,
            password
        );

        onViewPersonalDetailsPage.fillPersonalDetails(
            otherID,
            driverLicense,
        );

    });


});
