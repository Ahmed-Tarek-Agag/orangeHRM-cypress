/// <reference types="cypress" />

import { routesHelper } from "../../fixtures/routesHelper";
import { generateEmployeeData } from "../../support/dataFactory/employeeData";
import { onEmployeeListPage } from "../../pages/PIM/employeeListPage";
import { onAddEmployeePage } from "../../pages/PIM/addEmployeePage";
import { onNavigationToPages } from "../../pages/navigationToPages";

const data = generateEmployeeData();
const { employee } = data;
const profileImagePath = 'cypress/fixtures/files/profileImage.jpg';
let  employeeNumber;

describe('PIM - Search for Employee', () => {
    before(() => {
        cy.login();
    });

    beforeEach(() => {
        cy.login();
        const dashboardUrl = routesHelper.dashboard();
        if (!dashboardUrl) throw new Error('Dashboard URL is not defined in routesHelper');
        cy.visit(dashboardUrl);
    });

    it('Should add a new employee and create login details', () => {
            onNavigationToPages.navigateToPimPage();
    
            onAddEmployeePage.fillEmployeeDetails(
                employee.firstName,
                employee.middleName,
                employee.lastName,
                employee.employeeID,
                profileImagePath
            );
    
            onAddEmployeePage.createLoginDetails(
                employee.username,
                employee.password,
                employee.password
            );
        });

    it('should search for an employee by Name and Assert On it', () => {
        onNavigationToPages.navigateToPimPage();
        onEmployeeListPage.searchByEmployeeByName(`${employee.firstName} ${employee.lastName}`);
        onEmployeeListPage.assertOnNumberOfRecordsFromLabel();
    });

    it('should search for an employee by ID and Assert On it', () => {
        onNavigationToPages.navigateToPimPage();
        onEmployeeListPage.searchByEmployeeByID(`${employee.employeeID}`);
        onEmployeeListPage.assertOnNumberOfRecordsFromLabel();
    });

    it.only('should search for an employee by Employment Status and Assert On it', () => {
        onNavigationToPages.navigateToPimPage();
        onEmployeeListPage.searchByDropdown(onEmployeeListPage.elements.employeeStatusDropdown, 5);
    });

    it.only('should search for an employee by Include and Assert On it', () => {
        onNavigationToPages.navigateToPimPage();
        onEmployeeListPage.searchByDropdown(onEmployeeListPage.elements.includeDropdown, null);
    });

    it.only('should search for an employee by Job Title and Assert On it', () => {
        onNavigationToPages.navigateToPimPage();
        onEmployeeListPage.searchByDropdown(onEmployeeListPage.elements.jobTitleDropdown, 4);
    });

    it.only('should search for an employee by Sub Unit and Assert On it', () => {
        onNavigationToPages.navigateToPimPage();
        onEmployeeListPage.searchByDropdown(onEmployeeListPage.elements.subUnitDropdown, 6);
    });
});