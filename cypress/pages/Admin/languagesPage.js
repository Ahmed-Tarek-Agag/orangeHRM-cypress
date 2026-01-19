class languagesPage {
    elements = {
        languagesLabel: () => cy.get('h6').contains('Languages'),
        addLanguageButton: () => cy.get('button').contains('Add'),
        addLanguageLabel: () => cy.get('h6').contains('Add Language'),
        editLanguageLabel: () => cy.get('h6').contains('Edit Language'),
        languageNameInput: () => cy.contains('label', 'Name').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    }

    fillLanguageForm(languageName) {
        this.elements.languageNameInput().clear().type(languageName);
    }

    addLanguage(languageName) {
        this.elements.languagesLabel().should('be.visible');
        this.elements.addLanguageButton().click();
        this.elements.addLanguageLabel().should('be.visible');
        this.fillLanguageForm(languageName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteAddedLanguage(languageName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', languageName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(0).click(); // Click delete button
            });
        this.elements.deleteConfirmationButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
    }

    assertLanguageAdded(languageName) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each(rows => {
            if ((rows.text().includes(languageName))) {
                cy.wrap(rows).find('.oxd-table-cell').eq(1).should('have.text', languageName);
            }
        });
    }

    updateAddedLanguage(oldName, newName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', oldName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(1).click(); // Click edit button
            });
        this.elements.editLanguageLabel().should('be.visible');
        this.fillLanguageForm(newName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }
}
export const onLanguagesPage = new languagesPage();