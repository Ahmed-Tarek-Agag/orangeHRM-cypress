class licencesPage {
    elements = {
        licencesLabel: () => cy.get('h6').contains('Licenses'),
        addLicenceButton: () => cy.get('button').contains('Add'),
        addLicenceLabel: () => cy.get('h6').contains('Add License'),
        editLicenceLabel: () => cy.get('h6').contains('Edit License'),
        licenceNameInput: () => cy.contains('label', 'Name').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    }

    fillLicenceForm(licenceName) {
        this.elements.licenceNameInput().clear().type(licenceName);
    }

    addLicence(licenceName) {
        this.elements.licencesLabel().should('be.visible');
        this.elements.addLicenceButton().click();
        this.elements.addLicenceLabel().should('be.visible');
        this.fillLicenceForm(licenceName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteAddedLicence(licenceName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', licenceName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(0).click(); // Click delete button
            });
        this.elements.deleteConfirmationButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
    }

    assertLicenceAdded(licenceName) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each(rows => {
            if ((rows.text().includes(licenceName))) {
                cy.wrap(rows).find('.oxd-table-cell').eq(1).should('have.text', licenceName);
            }
        });
    }

    updateAddedLicence(oldName, newName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', oldName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(1).click(); // Click edit button
            });
        this.elements.editLicenceLabel().should('be.visible');
        this.fillLicenceForm(newName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }
}
export const onLicencesPage = new licencesPage();