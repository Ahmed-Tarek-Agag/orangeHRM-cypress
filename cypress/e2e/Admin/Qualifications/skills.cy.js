/// <reference types="cypress" />

import { routesHelper } from "../../../fixtures/routesHelper";
import { generateAdminData } from "../../../support/dataFactory/adminData";
import { onSkillsPage } from "../../../pages/Admin/skillsPage";
import { onNavigationToPages } from "../../../pages/navigationToPages";
import { onGeneralMethods } from "../../../pages/generalMethods";

const data = generateAdminData();
const { skillsDetails } = data;

describe('Admin - Skills - Add , Edit and Delete Skill', () => {
    before(() => {
        cy.login();
    });
    beforeEach(() => {
        cy.login();
        cy.visit(routesHelper.dashboard());
    });

    it('Should add a new Skill, Edit it, then delete it', () => {
        onNavigationToPages.navigateToSkillsPage();
        onSkillsPage.addSkill(
            skillsDetails.name,
            skillsDetails.description,
        );
        onSkillsPage.assertSkillAdded(skillsDetails.name);
        onGeneralMethods.assertRecordsCountMatchesTable();
        onSkillsPage.updateAddedSkill(
            skillsDetails.name,
            `${skillsDetails.name} Updated`,
            `${skillsDetails.description} Updated`,
        );
        onSkillsPage.assertSkillAdded(`${skillsDetails.name} Updated`);
        onSkillsPage.deleteAddedSkill(`${skillsDetails.name} Updated`);
        onGeneralMethods.assertRecordsCountMatchesTable();
    }   
    );
});