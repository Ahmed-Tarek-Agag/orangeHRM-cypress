/// <reference types="cypress" />
import { routesHelper } from "../../../fixtures/routesHelper";
import { generateAdminData } from "../../../support/dataFactory/adminData";
import { onJobCategoryPage  } from "../../../pages/Admin/jobCategoriesPage";
import { onNavigationToPages } from "../../../pages/navigationToPages";
import { onGeneralMethods } from "../../../pages/generalMethods";
const data = generateAdminData();
const { jobCategoryDetails } = data;

describe('Admin - Job Categories - Add , Edit and Delete Job Category', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.login();
        cy.visit(routesHelper.dashboard());
    });

    it('Should add a new Job Category, Edit it, then delete it', () => {
        onNavigationToPages.navigateToJobCategoriesPage();
        onJobCategoryPage.addJobCategory(
            jobCategoryDetails.name,
        );
        onJobCategoryPage.assertJobCategoryAdded(jobCategoryDetails.name);
        onGeneralMethods.assertRecordsCountMatchesTable();  
        onJobCategoryPage.updateAddedJobCategory(
            jobCategoryDetails.name,
            `${jobCategoryDetails.name} Updated`,
        );
        onJobCategoryPage.assertJobCategoryAdded(`${jobCategoryDetails.name} Updated`);
        onJobCategoryPage.deleteAddedJobCategory(`${jobCategoryDetails.name} Updated`);
        onGeneralMethods.assertRecordsCountMatchesTable();  
    }
    );
});