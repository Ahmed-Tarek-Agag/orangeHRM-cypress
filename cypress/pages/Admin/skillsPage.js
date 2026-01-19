class skillsPage {
    elements = {
        skillsLabel: () => cy.get('h6').contains('Skills'),
        addSkillButton: () => cy.get('button').contains('Add'),
        addSkillLabel: () => cy.get('h6').contains('Add Skill'),
        editSkillLabel: () => cy.get('h6').contains('Edit Skill'),
        skillNameInput: () => cy.contains('label', 'Name').parents('.oxd-input-group').find('input'),
        skillDescriptionTextarea: () => cy.contains('label', 'Description').parents('.oxd-input-group').find('textarea'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    }

    fillSkillForm(skillName, skillDescription) {
        this.elements.skillNameInput().clear().type(skillName);
        this.elements.skillDescriptionTextarea().clear().type(skillDescription);
    }

    addSkill(skillName, skillDescription) {
        this.elements.skillsLabel().should('be.visible');
        this.elements.addSkillButton().click();
        this.elements.addSkillLabel().should('be.visible');
        this.fillSkillForm(skillName, skillDescription);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteAddedSkill(skillName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', skillName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(3).find('button').eq(0).click(); // Click delete button
            });
        this.elements.deleteConfirmationButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
    }

    assertSkillAdded(skillName) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each(rows => {
            if ((rows.text().includes(skillName))) {
                cy.wrap(rows).find('.oxd-table-cell').eq(1).should('have.text', skillName);
            }
        });
    }

    updateAddedSkill(oldName, newName, newDescription) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', oldName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(3).find('button').eq(1).click(); // Click edit button
            });
        this.elements.editSkillLabel().should('be.visible');
        this.fillSkillForm(newName, newDescription);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }
}
export const onSkillsPage = new skillsPage();