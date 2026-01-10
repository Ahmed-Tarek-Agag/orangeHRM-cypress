class qualificationsPage {
    elements = {
        qualificationLabel: () => cy.get('h6').contains('Qualifications'),
        workExperienceAddButton: () => cy.get(':nth-child(2) > :nth-child(1) > .orangehrm-action-header > .oxd-button'),
        companyInput: () => cy.contains('label', 'Company').parents('.oxd-input-group').find('input'),
        jobTitleInput: () => cy.contains('label', 'Job Title').parents('.oxd-input-group').find('input'),
        fromDateInput: () => cy.contains('label', 'From').parents('.oxd-input-group').find('input'),
        toDateInput: () => cy.contains('label', 'To').parents('.oxd-input-group').find('input'),
        commentInput: () => cy.contains('label', 'Comment').parents('.oxd-input-group').find('textarea'),
        educationAddButton: () => cy.get(':nth-child(3) > :nth-child(1) > .orangehrm-action-header > .oxd-button'),
        levelDropdown: () => cy.contains('label', 'Level').parents('.oxd-input-group').find('.oxd-select-text-input'),
        instituteInput: () => cy.contains('label', 'Institute').parents('.oxd-input-group').find('input'),
        majorInput: () => cy.contains('label', 'Major/Specialization').parents('.oxd-input-group').find('input'),
        yearInput: () => cy.contains('label', 'Year').parents('.oxd-input-group').find('input'),
        gpaScoreInput: () => cy.contains('label', 'GPA/Score').parents('.oxd-input-group').find('input'),
        startDateInput: () => cy.contains('label', 'Start Date').parents('.oxd-input-group').find('input'),
        endDateInput: () => cy.contains('label', 'End Date').parents('.oxd-input-group').find('input'),
        addSkillButton: () => cy.get(':nth-child(4) > :nth-child(1) > .orangehrm-action-header > .oxd-button'),
        skillDropdown: () => cy.contains('label', 'Skill').parents('.oxd-input-group').find('.oxd-select-text-input'),
        yearsOfExperienceInput: () => cy.contains('label', 'Years of Experience').parents('.oxd-input-group').find('input'),
        commentsInputForSkills: () => cy.contains('label', 'Comments').parents('.oxd-input-group').find('textarea'),
        addLanguageButton: () => cy.get(':nth-child(5) > :nth-child(1) > .orangehrm-action-header > .oxd-button'),
        languageDropdown: () => cy.contains('label', 'Language').parents('.oxd-input-group').find('.oxd-select-text-input'),
        fluencyDropdown: () => cy.contains('label', 'Fluency').parents('.oxd-input-group').find('.oxd-select-text-input'),
        competencyDropdown: () => cy.contains('label', 'Competency').parents('.oxd-input-group').find('.oxd-select-text-input'),
        commentsInputForLanguages: () => cy.contains('label', 'Comments').parents('.oxd-input-group').find('textarea'),
        addLicenseButton: () => cy.get(':nth-child(6) > :nth-child(1) > .orangehrm-action-header > .oxd-button'),
        licenceTypeDropdown: () => cy.contains('label', 'License Type').parents('.oxd-input-group').find('.oxd-select-text-input'),
        licenceNumberInput: () => cy.contains('label', 'License Number').parents('.oxd-input-group').find('input'),
        issuedDateInput: () => cy.contains('label', 'Issued Date').parents('.oxd-input-group').find('input'),
        ExpiryDateInput: () => cy.contains('label', 'Expiry Date').parents('.oxd-input-group').find('input'),
        addAttachmentButton: () => cy.get(':nth-child(2) > .orangehrm-action-header > .oxd-button'),
        browseButton: () => cy.get('input[type="file"]'),
        commentInputForAttachment: () => cy.contains('label', 'Comment').parents('.oxd-input-group').find('textarea'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
        saveButtonForAttachment: () => cy.get('.orangehrm-attachment').within(() => {
            cy.get('button[type="submit"]').click();
        }),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        saveButton: () => cy.get('button[type="submit"]'),
    };

    addWorkExperience(company, jobTitle, fromDate, toDate, comment) {
        this.elements.qualificationLabel().should('be.visible');
        this.elements.workExperienceAddButton().click();
        this.elements.companyInput().type(company);
        this.elements.jobTitleInput().type(jobTitle);
        this.elements.fromDateInput().type(fromDate);
        this.elements.toDateInput().type(toDate);
        cy.get('.oxd-layout-context').click({force: true});
        this.elements.commentInput().type(comment);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteworkExperienceRecord() {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(6).find('button').eq(0).click(); // Click delete button
            this.elements.deleteConfirmationButton().click();
            this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
        });
    }

    addEducation(levelIndex, institute, major, year, gpaScore, startDate, endDate) {
        this.elements.educationAddButton().click();
        this.elements.levelDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(levelIndex).click();
        });
        this.elements.instituteInput().type(institute);
        this.elements.majorInput().type(major);
        this.elements.yearInput().type(year);
        this.elements.gpaScoreInput().type(gpaScore);
        this.elements.startDateInput().type(startDate);
        this.elements.endDateInput().type(endDate);
        cy.get('.oxd-layout-container').click({force: true});
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteEducationRecord() {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(4).find('button').eq(0).click(); // Click delete button    
            this.elements.deleteConfirmationButton().click();
            this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
        });
    }

    addSkill(skillIndex, yearsOfExperience, comments) {
        this.elements.addSkillButton().click();
        this.elements.skillDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(skillIndex).click();
        });
        this.elements.yearsOfExperienceInput().type(yearsOfExperience);
        this.elements.commentsInputForSkills().type(comments);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteSkillRecord() {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(3).find('button').eq(0).click(); // Click delete button
            this.elements.deleteConfirmationButton().click();
            this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
        });
    }


    addLanguage(languageIndex, fluencyIndex, competencyIndex, comments) {
        this.elements.addLanguageButton().click();
        cy.wait(1000);
        this.elements.languageDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(languageIndex).click();
        });
        this.elements.fluencyDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(fluencyIndex).click();
        });
        this.elements.competencyDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(competencyIndex).click();
        });
        this.elements.commentsInputForLanguages().type(comments);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteLanguageRecord() {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(5).find('button').eq(0).click(); // Click delete button    
            this.elements.deleteConfirmationButton().click();
            this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
        });
    }

    addLicense(licenceTypeIndex, licenceNumber, issuedDate, expiryDate) {
        this.elements.addLicenseButton().click();
        this.elements.licenceTypeDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(licenceTypeIndex).click();
        });
        this.elements.licenceNumberInput().type(licenceNumber);
        this.elements.issuedDateInput().type(issuedDate);
        this.elements.ExpiryDateInput().type(expiryDate);
        cy.get('.oxd-layout-container').click({force: true});
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteLicenseRecord() {
        cy.get('.oxd-table-body').find('.oxd-table-row').last().then(rows => {
            cy.wrap(rows).find('.oxd-table-cell').eq(4).find('button').eq(0).click(); // Click delete button
            this.elements.deleteConfirmationButton().click();
            this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
        });
    }

    uploadAttachment(filePath, comment) {
        this.elements.addAttachmentButton().click();
        this.elements.browseButton().selectFile(filePath, { force: true });
        this.elements.commentInputForAttachment().type(comment);
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
export const onQualificationsPage = new qualificationsPage();