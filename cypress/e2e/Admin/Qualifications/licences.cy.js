/// <reference types="cypress" />

import { routesHelper } from "../../../fixtures/routesHelper";
import { generateAdminData } from "../../../support/dataFactory/adminData";
import { onLicencesPage } from "../../../pages/Admin/licencesPage";
import { onNavigationToPages } from "../../../pages/navigationToPages";
import { onGeneralMethods } from "../../../pages/generalMethods";

const data = generateAdminData();
const { licenceDetails } = data;

describe('Admin - Licences - Add , Edit and Delete Licences', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.login();
        cy.visit(routesHelper.dashboard());
    });

    it('Should add a new Licence, Edit it, then delete it', () => {
        onNavigationToPages.navigateToLicensesPage();
        onLicencesPage.addLicence(
            licenceDetails.name,
        );
        onLicencesPage.assertLicenceAdded(licenceDetails.name);
        onGeneralMethods.assertRecordsCountMatchesTable();
        onLicencesPage.updateAddedLicence(
            licenceDetails.name,
            `${licenceDetails.name} Updated`,
        );
        onLicencesPage.assertLicenceAdded(`${licenceDetails.name} Updated`);
        onLicencesPage.deleteAddedLicence(`${licenceDetails.name} Updated`);
        onGeneralMethods.assertRecordsCountMatchesTable();
    });
});