/// <reference types="cypress" />

import { routesHelper } from "../../../fixtures/routesHelper";
import { generateAdminData } from "../../../support/dataFactory/adminData";
import { onEducationsPage } from "../../../pages/Admin/educationsPage";
import { onNavigationToPages } from "../../../pages/navigationToPages";
import { onGeneralMethods } from "../../../pages/generalMethods";

const data = generateAdminData();
const { educationDetails } = data;

describe('Admin - Education - Add , Edit and Delete Education', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.login();
        cy.visit(routesHelper.dashboard());
    });

    it('Should add a new Education, Edit it, then delete it', () => {
        onNavigationToPages.navigateToEducationPage();
        onEducationsPage.addEducation(
            educationDetails.name,
        );
        onEducationsPage.assertEducationAdded(educationDetails.name);
        onGeneralMethods.assertRecordsCountMatchesTable();
        onEducationsPage.updateAddedEducation(
            educationDetails.name,
            `${educationDetails.name} Updated`,
        );
        onEducationsPage.assertEducationAdded(`${educationDetails.name} Updated`);
        onEducationsPage.deleteAddedEducation(`${educationDetails.name} Updated`);
        onGeneralMethods.assertRecordsCountMatchesTable();
    }
    );
});