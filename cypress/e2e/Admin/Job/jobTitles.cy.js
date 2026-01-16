/// <reference types="cypress" />

import { routesHelper } from "../../../fixtures/routesHelper";
import { generateAdminData } from "../../../support/dataFactory/adminData";
import { onJobTitlesPage } from "../../../pages/Admin/jobTitlesPage";
import { onNavigationToPages } from "../../../pages/navigationToPages";

const data = generateAdminData();
const { jobTitleDetails } = data;
const attachmentFilePath = 'cypress/fixtures/files/TestPDF.pdf';


describe('Admin - Job Titles - Add , Edit and Delete Job Title', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.login();
        cy.visit(routesHelper.dashboard());
    });

    it.only('Should add a new Job Title, Edit it, then delete it', () => {
        onNavigationToPages.navigateToAdminPage();
        onJobTitlesPage.addJobTitle(
            jobTitleDetails.title,
            jobTitleDetails.description,
            attachmentFilePath,
            jobTitleDetails.note
        );
        onJobTitlesPage.assertJobTitleAdded(jobTitleDetails.title);
        onJobTitlesPage.updateAddedJobTitle(
            jobTitleDetails.title,
            `${jobTitleDetails.title} Updated`,
            `${jobTitleDetails.description} Updated`,
            `${jobTitleDetails.note} Updated`,
            attachmentFilePath,
            true
        );
        onJobTitlesPage.assertJobTitleAdded(`${jobTitleDetails.title} Updated`);
        onJobTitlesPage.deleteJobTitle(`${jobTitleDetails.title} Updated`);
    });
});

