/// <reference types="cypress" />

import { routesHelper } from "../../../fixtures/routesHelper";
import { generateAdminData } from "../../../support/dataFactory/adminData";
import { onWorkShiftsPage } from "../../../pages/Admin/workShiftsPage";
import { onNavigationToPages } from "../../../pages/navigationToPages";
import { onGeneralMethods } from "../../../pages/generalMethods";

const data = generateAdminData();
const { workShiftDetails } = data;

describe('Admin - Work Shifts - Add , Edit and Delete Work Shift', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.login();
        cy.visit(routesHelper.dashboard());
    });

    it('Should add a new Work Shift, Edit it, then delete it', () => {
        onNavigationToPages.navigateToWorkShiftsPage();
        onWorkShiftsPage.addWorkShift(
            workShiftDetails.name,
            workShiftDetails.hoursInput,
            workShiftDetails.minutesInput,
            workShiftDetails.assignedEmployees
        );
        onWorkShiftsPage.assertWorkShiftAdded(workShiftDetails.name);
        onGeneralMethods.assertRecordsCountMatchesTable();
        onWorkShiftsPage.updateAddedWorkShift(
            workShiftDetails.name,
            `${workShiftDetails.name} Updated`,
            workShiftDetails.hoursInput,
            workShiftDetails.minutesInput,
            workShiftDetails.assignedEmployees,
        );
        onWorkShiftsPage.assertWorkShiftAdded(`${workShiftDetails.name} Updated`);
        onWorkShiftsPage.deleteAddedWorkShift(`${workShiftDetails.name} Updated`);
        onGeneralMethods.assertRecordsCountMatchesTable();
    });
});