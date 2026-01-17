/// <reference types="cypress" />

import { routesHelper } from "../../../fixtures/routesHelper";
import { generateAdminData } from "../../../support/dataFactory/adminData";
import { onPayGradesPage } from "../../../pages/Admin/payGradesPage";
import { onNavigationToPages } from "../../../pages/navigationToPages";
import { onGeneralMethods } from "../../../pages/generalMethods";

const data = generateAdminData();
const { payGradeDetails } = data;


describe('Admin - Pay Grades - Add , Edit and Delete Pay Grade', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.login();
        cy.visit(routesHelper.dashboard());
    });

    it('Should add a new Pay Grade, Edit it, then delete it', () => {
        onNavigationToPages.navigateToPayGradesPage();
        onPayGradesPage.addPayGrade(
            payGradeDetails.name,
            10,
            payGradeDetails.minSalary,
            payGradeDetails.maxSalary
        );
        onPayGradesPage.assertPayGradeAdded(payGradeDetails.name);
        onGeneralMethods.assertRecordsCountMatchesTable();
        onPayGradesPage.updateAddedPayGrade(
            payGradeDetails.name,
            `${payGradeDetails.name} Updated`,
            12,
            `${payGradeDetails.minSalary}1`,
            `${payGradeDetails.maxSalary}1`
        );
        onPayGradesPage.assertPayGradeAdded(`${payGradeDetails.name} Updated`);
        onPayGradesPage.deleteAddedPayGrade(`${payGradeDetails.name} Updated`);
        onGeneralMethods.assertRecordsCountMatchesTable();
    }
    );
});