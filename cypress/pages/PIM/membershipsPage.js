class mermbershipsPage {
    elements = {
        addMembershipButton: () => cy.contains('button', ' Add '),
        membershipDropdown: () => cy.contains('label', 'Membership').parents('.oxd-input-group').find('.oxd-select-text-input'),
        subscriptionPaidByDropdown: () => cy.contains('label', 'Subscription Paid By').parents('.oxd-input-group').find('.oxd-select-text-input'),
        subscriptionAmountInput: () => cy.contains('label', 'Subscription Amount').parents('.oxd-input-group').find('input'),
        currencyDropdown: () => cy.contains('label', 'Currency').parents('.oxd-input-group').find('.oxd-select-text-input'),
        subescriptionCommenceDateInput: () => cy.contains('label', 'Subscription Commence Date').parents('.oxd-input-group').find('input'),
        subscriptionRenewalDateInput: () => cy.contains('label', 'Subscription Renewal Date').parents('.oxd-input-group').find('input'),
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
    addMembership(membershipIndex, paidByIndex, amount, currencyIndex, commenceDate, renewalDate) {
        this.elements.addMembershipButton().click();    
        this.elements.membershipDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(membershipIndex).click();
        });
        this.elements.subscriptionPaidByDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(paidByIndex).click();
        });
        this.elements.subscriptionAmountInput().type(amount);
        this.elements.currencyDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(currencyIndex).click();
        });
        this.elements.subescriptionCommenceDateInput().type(commenceDate);
        this.elements.subscriptionRenewalDateInput().type(renewalDate);
        cy.get('.oxd-layout-container').click({force: true}); // Click outside to close the date picker if open
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteMembershipRecord() {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(7).find('button').eq(0).click(); // Click delete button
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
export const onMembershipsPage = new mermbershipsPage();