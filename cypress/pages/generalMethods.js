class generalMethods {
    elements = {
        attachmentAddButton: () => cy.contains('button', ' Add '),
        browseButton: () => cy.get('input[type="file"]'),
        commentInput: () => cy.contains('label', 'Comment').parents('.oxd-input-group').find('textarea'),
        saveButtonForAttachment: () => cy.get('.orangehrm-attachment').within(() => {
            cy.get('button[type="submit"]').click();
        }),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
        recordFoundLabel: () => cy.get('.orangehrm-vertical-padding'),
        tableRows: () => cy.get('.oxd-table-body .oxd-table-card'),
    };

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

    editAddedAttachment(comment) {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(7).find('button').eq(0).click(); // Click edit button
            this.elements.commentInput().clear().type(comment);
            this.elements.saveButtonForAttachment().click();
            this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
            this.assertOnDescriptionOnAttachment(comment);
        });
    }

    downloadAttachment() {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(7).find('button').eq(2).click(); // Click download button
        });
    }

    deleteAddedRecord() {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(7).find('button').eq(1).click(); // Click delete button
            this.elements.deleteConfirmationButton().click();
            this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
        });
    }

    // // Assertion Method to verify the searched Number of records from the label
    // assertOnNumberOfRecordsFromLabel() {
    //     this.elements.recordFoundLabel().invoke('text').then((text) => {
    //         const match = text.match(/\d+/);
    //         if (!match) {
    //             cy.contains('No Records Found').should('be.visible');
    //             this.elements.tableRows().should('have.length', 0);
    //             return;
    //         }
    //         const recordsFromLabel = parseInt(text.match(/\d+/)[0]);
    //         this.elements.tableRows().should('have.length', recordsFromLabel);
    //         const expectedText = recordsFromLabel === 1
    //             ? `(1) Record Found`
    //             : `(${recordsFromLabel}) Records Found`;
    //         this.elements.recordFoundLabel().should('contain.text', expectedText);
    //     });
    // }
}

export const onGeneralMethods = new generalMethods();