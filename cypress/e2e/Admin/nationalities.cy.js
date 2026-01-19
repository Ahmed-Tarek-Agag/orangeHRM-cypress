/// <reference types="cypress" />

import { routesHelper } from "../../fixtures/routesHelper";
import { generateAdminData } from "../../support/dataFactory/adminData";
import { onNationalitesPage } from "../../pages/Admin/nationalitesPage";
import { onNavigationToPages } from "../../pages/navigationToPages";
import { onGeneralMethods } from "../../pages/generalMethods";
import { Pagination } from "../../fixtures/paginationHelper";

const data = generateAdminData();
const { nationalityDetails } = data;

describe('Admin - Nationalities - Add , Edit and Delete', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.login();
        cy.visit(routesHelper.dashboard());
    });

    it('Should add a new Nationality, Edit it, then delete it', () => {
        onNavigationToPages.navigateToNationalitiesPage();
        onNationalitesPage.addNationality(
            nationalityDetails.name,
        );
        onNationalitesPage.assertNationalityAdded(nationalityDetails.name);
        //onGeneralMethods.assertRecordsCountMatchesTable();
        onNationalitesPage.updateAddedNationality(
            nationalityDetails.name,
            `${nationalityDetails.name} Updated`,
        );
        onNationalitesPage.assertNationalityAdded(`${nationalityDetails.name} Updated`);
        //onGeneralMethods.assertRecordsCountMatchesTable();
        onNationalitesPage.deleteAddedNationality(`${nationalityDetails.name} Updated`);
    });
});