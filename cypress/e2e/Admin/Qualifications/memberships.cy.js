/// <reference types="cypress" />

import { routesHelper } from "../../../fixtures/routesHelper";
import { generateAdminData } from "../../../support/dataFactory/adminData";
import { onMembershipsPage } from "../../../pages/Admin/membershipsPage";
import { onNavigationToPages } from "../../../pages/navigationToPages";
import { onGeneralMethods } from "../../../pages/generalMethods";

const data = generateAdminData();
const { membershipDetails } = data;

describe('Admin - Memberships - Add , Edit and Delete Membership', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.login();
        cy.visit(routesHelper.dashboard());
    });

    it('Should add a new Membership, Edit it, then delete it', () => {
        onNavigationToPages.navigateToMembershipsPage();
        onMembershipsPage.addMembership(
            membershipDetails.name,
        );
        onMembershipsPage.assertMembershipAdded(membershipDetails.name);
        onGeneralMethods.assertRecordsCountMatchesTable();
        onMembershipsPage.updateAddedMembership(
            membershipDetails.name,
            `${membershipDetails.name} Updated`,
        );
        onMembershipsPage.assertMembershipAdded(`${membershipDetails.name} Updated`);
        onMembershipsPage.deleteAddedMembership(`${membershipDetails.name} Updated`);
        onGeneralMethods.assertRecordsCountMatchesTable();
    });
});