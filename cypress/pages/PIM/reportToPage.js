class reportToPage {
    elements = {
        reportToHeader: () => cy.get('h6').contains('Report to'),
        assignSupervisorButton: () => cy.contains('button', ' Add '),
        reportToNameInput: () => cy.get('input[placeholder="Type for hints..."]'),
        reportinMethodDropDwon: () => cy.contains('label', 'Reporting Method').parents('.oxd-input-group').find('.oxd-select-text-input'),
        saveButton: () => cy.get('button').contains(' Save '),
         attachmentAddButton: () => cy.get(':nth-child(2) > .orangehrm-action-header > .oxd-button'),
        browseButton: () => cy.get('input[type="file"]'),
        commentInput: () => cy.contains('label', 'Comment').parents('.oxd-input-group').find('textarea'),
        saveButtonForAttachment: () => cy.get('.orangehrm-attachment').within(() => {
            cy.get('button[type="submit"]').click();
        }),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    };
    assignSupervisor(reportToName, reportingMethodIndex) {
        this.elements.reportToHeader().should('be.visible');
        this.elements.assignSupervisorButton().click();
        this.elements.reportToNameInput().type(reportToName)
        cy.wait(2000);
        this.elements.reportToNameInput().type('{downarrow}{enter}');
        this.elements.reportinMethodDropDwon().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(reportingMethodIndex).click();
        });
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteSupervisor() {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(3).find('button').eq(0).click(); // Click delete button
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
export const onReportToPage = new reportToPage();
