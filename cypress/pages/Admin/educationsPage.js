class educationsPage {
    elements = {
        educationLabel: () => cy.get('h6').contains('Education'),
        addEducationButton: () => cy.get('button').contains('Add'),
        addEducationLabel: () => cy.get('h6').contains('Add Education'),
        editEducationLabel: () => cy.get('h6').contains('Edit Education'),
        educationLevelInput: () => cy.contains('label', 'Level').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    }

    fillEducationForm(educationName) {
        this.elements.educationLevelInput().clear().type(educationName);
    }

    addEducation(educationName) {
        this.elements.educationLabel().should('be.visible');
        this.elements.addEducationButton().click();
        this.elements.addEducationLabel().should('be.visible');
        this.fillEducationForm(educationName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteAddedEducation(educationName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', educationName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(0).click(); // Click delete button
            });
        this.elements.deleteConfirmationButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
    }

    assertEducationAdded(educationName) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each(rows => {
            if ((rows.text().includes(educationName))) {
                cy.wrap(rows).find('.oxd-table-cell').eq(1).should('have.text', educationName);
            }
        });
    }

    updateAddedEducation(oldName, newName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', oldName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(1).click(); // Click edit button
            });
        this.elements.editEducationLabel().should('be.visible');
        this.fillEducationForm(newName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }
}
export const onEducationsPage = new educationsPage();