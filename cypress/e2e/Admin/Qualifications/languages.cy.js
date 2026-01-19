/// <reference types="cypress" />

import { routesHelper } from "../../../fixtures/routesHelper";
import { generateAdminData } from "../../../support/dataFactory/adminData";
import { onLanguagesPage } from "../../../pages/Admin/languagesPage";
import { onNavigationToPages } from "../../../pages/navigationToPages";
import { onGeneralMethods } from "../../../pages/generalMethods";

const data = generateAdminData();
const { languageDetails } = data;

describe('Admin - Languages - Add , Edit and Delete Language', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.login();
        cy.visit(routesHelper.dashboard());
    });

    it('Should add a new Language, Edit it, then delete it', () => {
        onNavigationToPages.navigateToLanguagesPage();
        onLanguagesPage.addLanguage(
            languageDetails.name,
        );
        onLanguagesPage.assertLanguageAdded(languageDetails.name);  
        onGeneralMethods.assertRecordsCountMatchesTable();
        onLanguagesPage.updateAddedLanguage(
            languageDetails.name,
            `${languageDetails.name} Updated`,
        );
        onLanguagesPage.assertLanguageAdded(`${languageDetails.name} Updated`);
        onLanguagesPage.deleteAddedLanguage(`${languageDetails.name} Updated`);
        onGeneralMethods.assertRecordsCountMatchesTable();
    });
});
