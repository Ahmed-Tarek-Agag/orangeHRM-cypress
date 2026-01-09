class emergencyContactsPage {
    elements = {
        addEmergencyContactButton: () => cy.contains('button', ' Add ').eq(0).parent('.orangehrm-action-header'),
        nameInput: () => cy.contains('label', 'Name').parents('.oxd-input-group').find('input'),
        relationshipInput: () => cy.contains('label', 'Relationship').parents('.oxd-input-group').find('input'),
        homeTelephoneInput: () => cy.contains('label', 'Home Telephone').parents('.oxd-input-group').find('input'),
        mobileInput: () => cy.contains('label', 'Mobile').parents('.oxd-input-group').find('input'),
        workTelephoneInput: () => cy.contains('label', 'Work Telephone').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        attachmentAddButton: () => cy.get(':nth-child(2) > .orangehrm-action-header > .oxd-button'),
        browseButton: () => cy.get('input[type="file"]'),
        commentInput: () => cy.contains('label', 'Comment').parents('.oxd-input-group').find('textarea'),
        saveButtonForAttachment: () => cy.get('.orangehrm-attachment').within(() => {
            cy.get('button[type="submit"]').click();
        }),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    };
    addEmergencyContact(name, relationship, homeTelephone, mobile, workTelephone) {
        this.elements.addEmergencyContactButton().click();
        this.elements.nameInput().type(name);
        this.elements.relationshipInput().type(relationship);
        this.elements.homeTelephoneInput().type(homeTelephone);
        this.elements.mobileInput().type(mobile);
        this.elements.workTelephoneInput().type(workTelephone);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteEmergencyContact() {
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
export const onEmergencyContactsPage = new emergencyContactsPage();