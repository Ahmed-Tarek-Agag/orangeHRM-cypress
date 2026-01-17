import { th } from "@faker-js/faker";

class jobTitlesPage {
    elements = {
        jobTitlelabel: () => cy.get('h6').contains('Job Titles'),
        addJobTitleButton: () => cy.get('button').contains('Add'),
        addJobTitleLabel: () => cy.get('h6').contains('Add Job Title'),
        editJobTitleLabel: () => cy.get('h6').contains('Edit Job Title'),
        jobTitleInput: () => cy.contains('label', 'Job Title').parents('.oxd-input-group').find('input'),
        jobDescriptionTextarea: () => cy.contains('label', 'Job Description').parents('.oxd-input-group').find('textarea'),
        jobSpecificationUploadButton: () => cy.get('input[type="file"]'),
        replaceCurrentButton: () =>  cy.get(':nth-child(3) > :nth-child(2) > .oxd-radio-wrapper > label > .oxd-radio-input'),
        noteTextarea: () => cy.contains('label', 'Note').parents('.oxd-input-group').find('textarea'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    };

    fillJobTitleForm(jobTitle, jobDescription, jobSpecificationAttachment = null, note, isEdit = false) {
        this.elements.jobTitleInput().clear().type(jobTitle);
        this.elements.jobDescriptionTextarea().clear().type(jobDescription);
        this.elements.noteTextarea().clear().type(note);
        if (jobSpecificationAttachment) {
            if (!isEdit&& jobSpecificationAttachment) {
                this.elements.jobSpecificationUploadButton()
                    .selectFile(jobSpecificationAttachment, { force: true });
            } else {
                this.elements.replaceCurrentButton().should('exist').should('be.visible').click({force: true}); 
                this.elements.jobSpecificationUploadButton()
                    .selectFile(jobSpecificationAttachment, { force: true });
            }
        }
    }


    addJobTitle(jobTitle, jobDescription, jobSpecificationAttachment, note, isEdit = false) {
        this.elements.jobTitlelabel().should('be.visible');
        this.elements.addJobTitleButton().click();
        this.elements.addJobTitleLabel().should('be.visible');
        this.fillJobTitleForm(jobTitle, jobDescription, jobSpecificationAttachment, note , isEdit = false);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
        return cy.get('.oxd-table-body .oxd-table-row').contains(jobTitle).parent();

    }

    updateAddedJobTitle(oldTitle, newTitle, newDescription, newNote, attachmentFile = null, isEdit = true) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', oldTitle) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(3).find('button').eq(1).click(); // Click edit button
            });
        this.elements.editJobTitleLabel().should('be.visible');
        this.fillJobTitleForm(newTitle, newDescription, attachmentFile, newNote, isEdit = true);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }

    assertJobTitleAdded(jobTitle) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each(rows => {
            if ((rows.text().includes(jobTitle))) {
                cy.wrap(rows).find('.oxd-table-cell').eq(1).should('have.text', jobTitle);
            }
        });
    }
    deleteJobTitle(jobTitle) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each((row) => {
            if (row.text().includes(jobTitle)) {
                cy.wrap(row).find('.oxd-table-cell').eq(3).find('button').eq(0).click(); // Click delete button
                this.elements.deleteConfirmationButton().click();
                this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
                cy.contains('.oxd-table-cell', jobTitle).should('not.exist');
                return false;
            }
        });
    }
}
export const onJobTitlesPage = new jobTitlesPage();