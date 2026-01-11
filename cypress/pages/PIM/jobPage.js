class jobPage {
    elements = {
        jobDetailsTab: () => cy.contains('a', 'Job'),
        joinedDateInput: () => cy.contains('label', 'Joined Date').parents('.oxd-input-group').find('input'),
        jobTitleDropdown: () => cy.contains('label', 'Job Title').parents('.oxd-input-group').find('.oxd-select-text-input'),
        //jobSpecificationDropdown: () => cy.contains('label', 'Job Specification').parents('.oxd-input-group').find('.input-container --disabled'),
        jobCategoryDropdown: () => cy.contains('label', 'Job Category').parents('.oxd-input-group').find('.oxd-select-text-input'),
        subUnitDropdown: () => cy.contains('label', 'Sub Unit').parents('.oxd-input-group').find('.oxd-select-text-input'),
        locationDropdown: () => cy.contains('label', 'Location').parents('.oxd-input-group').find('.oxd-select-text-input'),
        emplymentStatusDropdown: () => cy.contains('label', 'Employment Status').parents('.oxd-input-group').find('.oxd-select-text-input'),
        includeIncludeEmploymentContractDetailsToggle: () => cy.get('input[type="checkbox"]'),
        contractStartDateInput: () => cy.contains('label', 'Contract Start Date').parents('.oxd-input-group').find('input'),
        contractEndDateInput: () => cy.contains('label', 'Contract End Date').parents('.oxd-input-group').find('input'),
        contractDetailsUploadButton: () => cy.contains('label', 'Contract Details').parents('.oxd-input-group').find('input[type="file"]'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        terminateEmploymentButton: () => cy.contains('button', ' Terminate Employment '),
        terminationDateInput: () => cy.contains('label', 'Termination Date').parents('.oxd-input-group').find('input'),
        terminationReasonDropdown: () => cy.contains('label', 'Termination Reason').parents('.oxd-input-group').find('.oxd-select-text-input'),
        noteInput: () => cy.contains('label', 'Note').parents('.oxd-input-group').find('textarea'),
        terminatedOnLabel: () => cy.get('p.orangehrm-terminate-date'),
    };
    fillJobDetails(joinedDate, jobTitleIndex, jobCategoryIndex, subUnitIndex, locationIndex, employmentStatusIndex, contractStartDate, contractEndDate, filePath) {
        this.elements.jobDetailsTab().click();
        this.elements.joinedDateInput().type(`${joinedDate}`);
        cy.get('.oxd-layout-container').click(); // Click outside to close the date picker if open
        this.elements.jobTitleDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(jobTitleIndex).click();
        });
        //this.elements.jobSpecificationDropdown().should('contain.text','Not Defined')
        this.elements.jobCategoryDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(jobCategoryIndex).click();
        });
        this.elements.subUnitDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(subUnitIndex).click();
        });
        this.elements.locationDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(locationIndex).click();
        }
        );
        this.elements.emplymentStatusDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(employmentStatusIndex).click();
        });
        this.elements.includeIncludeEmploymentContractDetailsToggle().check({ force: true });
        this.elements.contractStartDateInput().type(`${contractStartDate}`);
        cy.get('.oxd-layout-container').click(); // Click outside to close the date picker if open
        this.elements.contractEndDateInput().type(`${contractEndDate}`);
        cy.get('.oxd-layout-container').click(); // Click outside to close the date picker if open
        this.elements.contractDetailsUploadButton().selectFile(filePath, { force: true });
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }
    terminateEmployment(terminationDate, terminationReasonIndex, note) {
        this.elements.terminateEmploymentButton().click();
        this.elements.terminationDateInput().type(`${terminationDate}`);
        cy.get('.orangehrm-modal-header').click(); // Click outside to close the date picker if open
        this.elements.terminationReasonDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(terminationReasonIndex).click();
        });
        this.elements.noteInput().type(note);
        cy.contains('.orangehrm-dialog-modal', 'Terminate Employment').within(() => {
            cy.contains('button', 'Save').click();
        });
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
        //this.elements.terminatedOnLabel().should('be.visible').and('contain.text', `Terminated on: ${terminationDate}`);
    }

}
export const onJobPage = new jobPage();