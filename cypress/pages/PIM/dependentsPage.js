class dependentsPage {
    elements = {
        addDependentButton: () => cy.contains('button', ' Add '),
        nameInput: () => cy.contains('label', 'Name').parents('.oxd-input-group').find('input'),
        relationshipDropdown: () => cy.contains('label', 'Relationship').parents('.oxd-input-group').find('.oxd-select-text-input'),
        specifyRelationshipInput: () => cy.contains('label', 'Specify Relationship').parents('.oxd-input-group').find('input'),
        dateOfBirthInput: () => cy.contains('label', 'Date of Birth').parents('.oxd-input-group').find('input'),
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

    addDependent(name, relationshipIndex, dateOfBirth) {
        this.elements.addDependentButton().click();
        this.elements.nameInput().type(name);
        this.elements.relationshipDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(relationshipIndex).click();
        });
        this.elements.dateOfBirthInput().type(dateOfBirth);
        cy.get('.oxd-layout-container').click(); // Click outside to close the date picker if open
        this.elements.saveButton().click();
    }

    deleteDependent() {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(4).find('button').eq(0).click(); // Click delete button
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
export const onDependentsPage = new dependentsPage();