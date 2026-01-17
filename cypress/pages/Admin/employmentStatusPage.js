class employmentStatusPage {
    elements = {
        employmentStatusLabel: () => cy.get('h6').contains('Employment Status'),
        addEmploymentStatusButton: () => cy.get('button').contains('Add'),
        addEmploymentStatusLabel: () => cy.get('h6').contains('Add Employment Status'),
        editEmploymentStatusLabel: () => cy.get('h6').contains('Edit Employment Status'),
        employmentStatusNameInput: () => cy.contains('label', 'Name').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    }

    fillEmploymentStatusForm(employmentStatusName) {
        this.elements.employmentStatusNameInput().clear().type(employmentStatusName);
    }

    addEmploymentStatus(employmentStatusName) {
        this.elements.employmentStatusLabel().should('be.visible');
        this.elements.addEmploymentStatusButton().click();
        this.elements.addEmploymentStatusLabel().should('be.visible');
        this.fillEmploymentStatusForm(employmentStatusName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteAddedEmploymentStatus(employmentStatusName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', employmentStatusName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(0).click(); // Click delete button
            });
        this.elements.deleteConfirmationButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
    }

    assertEmploymentStatusAdded(employmentStatusName) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each(rows => {
            if ((rows.text().includes(employmentStatusName))) {
                cy.wrap(rows).find('.oxd-table-cell').eq(1).should('have.text', employmentStatusName);
            }
        });
    }

    updateAddedEmploymentStatus(oldName, newName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', oldName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(1).click(); // Click edit button
            });
        this.elements.editEmploymentStatusLabel().should('be.visible');
        this.fillEmploymentStatusForm(newName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }
}
export const onEmploymentStatusPage = new employmentStatusPage();
