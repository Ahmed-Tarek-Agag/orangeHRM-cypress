class payGradesPage {
    elements = {
        payGradesLabel: () => cy.get('h6').contains('Pay Grades'),
        addPayGradeButton: () => cy.get('button').contains('Add'),
        addPayGradeLabel: () => cy.get('h6').contains('Add Pay Grade'),
        editPayGradeLabel: () => cy.get('h6').contains('Edit Pay Grade'),
        addCurrenciesButton: () => cy.get('button').contains('Add'),
        saveAddedCurrencyButton: () => cy.get('.orangehrm-card-container').last().contains('button', ' Save '),
        cancelButton: () => cy.get('.orangehrm-card-container').first().contains('button', ' Cancel '),
        currencyDropdown: () => cy.contains('label', 'Currency').parents('.oxd-input-group').find('.oxd-select-text-input'),
        minimumSalaryInput: () => cy.contains('label', 'Minimum Salary').parents('.oxd-input-group').find('input'),
        maximumSalaryInput: () => cy.contains('label', 'Maximum Salary').parents('.oxd-input-group').find('input'),
        payGradeNameInput: () => cy.contains('label', 'Name').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    };
    fillPayGradeForm(payGradeName, currencyIndex = null, minSalary = null, maxSalary = null) {
        this.elements.payGradeNameInput().clear().type(payGradeName);
        this.elements.saveButton().click();
        this.elements.editPayGradeLabel().should('be.visible');
        this.elements.addCurrenciesButton().click();
        this.elements.currencyDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(currencyIndex).click();
        });
        this.elements.minimumSalaryInput().clear().type(minSalary);
        this.elements.maximumSalaryInput().clear().type(maxSalary);
        this.elements.saveAddedCurrencyButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    addPayGrade(payGradeName, currencyIndex = null, minSalary = null, maxSalary = null) {
        this.elements.payGradesLabel().should('be.visible');
        this.elements.addPayGradeButton().click();
        this.elements.addPayGradeLabel().should('be.visible');
        this.fillPayGradeForm(payGradeName, currencyIndex, minSalary, maxSalary);
        this.elements.cancelButton().click();
        return cy.get('.oxd-table-body .oxd-table-row').contains(payGradeName).parent();
    }

    updateAddedPayGrade(oldName, newName, currencyIndex = null, minSalary = null, maxSalary = null) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', oldName) // find the row dynamically   
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(3).find('button').eq(1).click(); // Click edit button
            });
        this.elements.editPayGradeLabel().should('be.visible');
        this.fillPayGradeForm(newName, currencyIndex, minSalary, maxSalary);
        this.elements.cancelButton().click();
    }

    deleteAddedPayGrade(payGradeName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', payGradeName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(0).click(); // Click delete button
            });
        this.elements.deleteConfirmationButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
    }
    assertPayGradeAdded(payGradeName) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each(rows => {
            if ((rows.text().includes(payGradeName))) {
                cy.wrap(rows).find('.oxd-table-cell').eq(1).should('have.text', payGradeName);
            }
        });
    }

    deleteAddedPayGrade(payGradeName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', payGradeName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(3).find('button').eq(0).click(); // Click delete button
            });
        this.elements.deleteConfirmationButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
        cy.contains('.oxd-table-cell', payGradeName).should('not.exist');
        return false;
    }

}
export const onPayGradesPage = new payGradesPage();