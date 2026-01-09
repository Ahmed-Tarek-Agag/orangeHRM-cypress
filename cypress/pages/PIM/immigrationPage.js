class immigrationPage {
    elements = {
        addButton: () => cy.contains('button', ' Add ').eq(0).parent('.orangehrm-action-header'),
        documentTypeRadioButton: (type) => cy.contains('label', type).parents('.oxd-radio-wrapper').find('input[type="radio"]'),
        numberInput: () => cy.contains('label', 'Number').parents('.oxd-input-group').find('input'),
        issuedDateInput: () => cy.contains('label', 'Issued Date').parents('.oxd-input-group').find('input'),
        expiryDateInput: () => cy.contains('label', 'Expiry Date').parents('.oxd-input-group').find('input'),
        eligibleStatusInput: () => cy.contains('label', 'Eligible Status').parents('.oxd-input-group').find('input'),
        issuedByDropDwon: () => cy.contains('label', 'Issued By').parents('.oxd-input-group').find('.oxd-select-text-input'),
        elligableDateInput: () => cy.contains('label', 'Eligible Review Date').parents('.oxd-input-group').find('input'),
        commentInput: () => cy.contains('label', 'Comments').parents('.oxd-input-group').find('textarea'),
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

    addImmigrationRecord(number, issuedDate, expiryDate, eligibleStatus, issuedByIndex, elligableDate, comment) {
        this.elements.addButton().click();
        this.elements.numberInput().type(number);
        this.elements.issuedDateInput().type(issuedDate);
        cy.get('.oxd-layout-container').click(); // Click outside to close the date picker if open
        this.elements.expiryDateInput().type(expiryDate);
        cy.get('.oxd-layout-container').click(); // Click outside to close the date picker if open
        this.elements.eligibleStatusInput().type(eligibleStatus);
        this.elements.issuedByDropDwon().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(issuedByIndex).click();
        });
        this.elements.elligableDateInput().type(elligableDate);
        cy.get('.oxd-layout-container').click(); // Click outside to close the date picker if open
        this.elements.commentInput().type(comment);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteImmigrationRecord() {
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
export const onImmigrationPage = new immigrationPage();