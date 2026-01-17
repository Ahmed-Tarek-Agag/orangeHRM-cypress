class jobCategoryPage {
    elements = {
        jobCategoryLabel: () => cy.get('h6').contains('Job Categories'),
        addJobCategoryButton: () => cy.get('button').contains('Add'),
        addJobCategoryLabel: () => cy.get('h6').contains('Add Job Category'),
        editJobCategoryLabel: () => cy.get('h6').contains('Edit Job Category'),
        jobCategoryNameInput: () => cy.contains('label', 'Name').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    }

    fillJobCategoryForm(jobCategoryName) {
        this.elements.jobCategoryNameInput().clear().type(jobCategoryName);
    }

    addJobCategory(jobCategoryName) {
        this.elements.jobCategoryLabel().should('be.visible');
        this.elements.addJobCategoryButton().click();
        this.elements.addJobCategoryLabel().should('be.visible');
        this.fillJobCategoryForm(jobCategoryName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteAddedJobCategory(jobCategoryName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', jobCategoryName) // find the row dynamically   
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(0).click(); // Click delete button
            });
        this.elements.deleteConfirmationButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
    }

    assertJobCategoryAdded(jobCategoryName) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each(rows => {
            if ((rows.text().includes(jobCategoryName))) {
                cy.wrap(rows).find('.oxd-table-cell').eq(1).should('have.text', jobCategoryName);
            }
        });
    }
    
    updateAddedJobCategory(oldName, newName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', oldName) // find the row dynamically   
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(1).click(); // Click edit button
            }); 
        this.elements.editJobCategoryLabel().should('be.visible');
        this.fillJobCategoryForm(newName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }
}
export const onJobCategoryPage = new jobCategoryPage();