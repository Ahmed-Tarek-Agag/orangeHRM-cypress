/// <reference types="cypress" />
import { routesHelper } from "../../../fixtures/routesHelper";
import { generateAdminData } from "../../../support/dataFactory/adminData";
import { onEmploymentStatusPage } from "../../../pages/Admin/employmentStatusPage";
import { onNavigationToPages } from "../../../pages/navigationToPages";
import { onGeneralMethods } from "../../../pages/generalMethods";
const data = generateAdminData();
const { employmentStatusDetails } = data;

describe('Admin - Employment Status - Add , Edit and Delete Employment Status', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.login();
        cy.visit(routesHelper.dashboard());
    });

    it('Should add a new Employment Status, Edit it, then delete it', () => {
        onNavigationToPages.navigateToEmploymentStatusPage();
        onEmploymentStatusPage.addEmploymentStatus(
            employmentStatusDetails.name,
        );
        onEmploymentStatusPage.assertEmploymentStatusAdded(employmentStatusDetails.name);
        onGeneralMethods.assertRecordsCountMatchesTable();
        onEmploymentStatusPage.updateAddedEmploymentStatus(
            employmentStatusDetails.name,
            `${employmentStatusDetails.name} Updated`,
        );
        onEmploymentStatusPage.assertEmploymentStatusAdded(`${employmentStatusDetails.name} Updated`);
        onEmploymentStatusPage.deleteAddedEmploymentStatus(`${employmentStatusDetails.name} Updated`);
        onGeneralMethods.assertRecordsCountMatchesTable();
    }
    );
});
