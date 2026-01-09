class salaryPage {
    elements = {
        addSalaryDetails: () => cy.contains('button', ' Add '),
        salaryComponentValueInput: () => cy.contains('label', 'Salary Component').parents('.oxd-input-group').find('input'),
        payGradeDropdown: () => cy.contains('label', 'Pay Grade').parents('.oxd-input-group').find('.oxd-select-text-input'),
        payFrequencyDropdown: () => cy.contains('label', 'Pay Frequency').parents('.oxd-input-group').find('.oxd-select-text-input'),
        currencyDropdown: () => cy.contains('label', 'Currency').parents('.oxd-input-group').find('.oxd-select-text-input'),
        ammountInput: () => cy.contains('label', 'Amount').parents('.oxd-input-group').find('input'),
        commentsInput: () => cy.contains('label', 'Comments').parents('.oxd-input-group').find('textarea'),
        includeDirectDepositDetailsToggle: () => cy.get('input[type="checkbox"]'),
        accountNumberInput: () => cy.contains('label', 'Account Number').parents('.oxd-input-group').find('input'),
        accountTypeDropdown: () => cy.contains('label', 'Account Type').parents('.oxd-input-group').find('.oxd-select-text-input'),
        routingNumberInput: () => cy.contains('label', 'Routing Number').parents('.oxd-input-group').find('input'),
        amountInputForDirectDeposit: () => cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input'),
        saveButton: () => cy.get('button[type="submit"]'),
        attachmentAddButton: () => cy.get(':nth-child(2) > .orangehrm-action-header > .oxd-button'),
        browseButton: () => cy.get('input[type="file"]'),
        commentInput: () => cy.contains('label', 'Comment').parents('.oxd-input-group').find('textarea'),
        saveButtonForAttachment: () => cy.get('.orangehrm-attachment').within(() => {
            cy.get('button[type="submit"]').click();
        }),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    };

    addSalaryDetails(salaryComponent, payGradeIndex, payFrequencyIndex, currencyIndex, amount, comments, accountNumber, accountTypeIndex, routingNumber, directDepositAmount) {
        this.elements.addSalaryDetails().click();
        this.elements.salaryComponentValueInput().type(salaryComponent);
        this.elements.payGradeDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(payGradeIndex).click();
        });
        this.elements.payFrequencyDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(payFrequencyIndex).click();
        });
        this.elements.currencyDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(currencyIndex).click();
        });
        this.elements.ammountInput().eq(0).type(amount);
        this.elements.commentsInput().type(comments);
        this.elements.includeDirectDepositDetailsToggle().check({ force: true });
        this.elements.accountNumberInput().type(accountNumber);
        this.elements.accountTypeDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(accountTypeIndex).click();
        });
        this.elements.routingNumberInput().type(routingNumber);
        this.elements.amountInputForDirectDeposit().type(directDepositAmount);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteAddedSalaryRecord() {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(6).find('button').eq(0).click(); // Click delete button
            this.elements.deleteConfirmationButton().click();
            this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
        });
    }
    uploadAttachment(filePath, comment) {
        this.elements.attachmentAddButton().click();
        this.elements.browseButton().selectFile(filePath, { force: true });
        this.elements.commentInput().type(comment);
        this.elements.saveButtonForAttachment().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }
    // Assertion method to verify the comment on the uploaded attachment for the last row cause the new added displayed last
    assertOnDescriptionOnAttachment(comment) {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(2).should('have.text', comment);
        });
    }
}
export const onSalaryPage = new salaryPage();