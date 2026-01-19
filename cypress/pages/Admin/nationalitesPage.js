class nationalitesPage {
    elements = {
        nationalitiesLabel: () => cy.get('h6').contains('Nationalities'),
        addNationalityButton: () => cy.get('button').contains('Add'),
        addNationalityLabel: () => cy.get('h6').contains('Add Nationality'),
        editNationalityLabel: () => cy.get('h6').contains('Edit Nationality'),
        nationalityNameInput: () => cy.contains('label', 'Name').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    }

    fillNationalityForm(nationalityName) {
        this.elements.nationalityNameInput().clear().type(nationalityName);
    }

    addNationality(nationalityName) {
        this.elements.nationalitiesLabel().should('be.visible');
        this.elements.addNationalityButton().click();
        this.elements.addNationalityLabel().should('be.visible');
        this.fillNationalityForm(nationalityName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteAddedNationality(nationalityName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', nationalityName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(0).click(); // Click delete button
            });
        this.elements.deleteConfirmationButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
    }

    assertNationalityAdded(nationalityName) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each(rows => {
            if ((rows.text().includes(nationalityName))) {
                cy.wrap(rows).find('.oxd-table-cell').eq(1).should('have.text', nationalityName);
            }
        });
    }

    updateAddedNationality(oldName, newName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', oldName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(1).click(); // Click edit button
            });
        this.elements.editNationalityLabel().should('be.visible');
        this.fillNationalityForm(newName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }
}
export const onNationalitesPage = new nationalitesPage();