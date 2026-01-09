
class personalDetailsPage {
    elements = {
        nameHeader: () => cy.get('h6').contains('Name'),
        personalDetailsHeader: () => cy.get('h6').contains('Personal Details'),
        nickNameInput: () => cy.contains('label', 'Nick Name').parents('.oxd-input-group').find('input'),
        otherIDInput: () => cy.contains('label', 'Other Id').parents('.oxd-input-group').find('input'),
        driverLicenseInput: () => cy.contains('label', 'Driver\'s License Number').parents('.oxd-input-group').find('input'),
        licenseExpiryDateInput: () => cy.contains('label', 'License Expiry Date').parents('.oxd-input-group').find('input'),
        nationalityDropdown: () => cy.contains('label', 'Nationality').parents('.oxd-input-group').find('div.oxd-select-text-input'),
        maritalStatusDropdown: () => cy.contains('label', 'Marital Status').parents('.oxd-input-group').find('div.oxd-select-text-input'),
        dateOfBirthInput: () => cy.contains('label', 'Date of Birth').parents('.oxd-input-group').find('input'),
        genderOptions: () => cy.get('.oxd-input-group'),
        saveButton: () => cy.contains('button', 'Save'),
        bloodTypeDropdown: () => cy.contains('label', 'Blood Type').parents('.oxd-input-group').find('div.oxd-select-text-input'),
        testFieldInput: () => cy.contains('label', 'Test_Field').parents('.oxd-input-group').find('input'),
        saveButtonforCustomFields: () => cy.get('.orangehrm-custom-fields').within(() => {
            cy.get('button[type="submit"]').click();
        }),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
    };

    fillPersonalDetails(otherID, driverLicense, indexNationality, licenseExpiryDate, indexMaritalStatus, dateOfBirth) {
        this.elements.personalDetailsHeader().should('be.visible');
        this.elements.otherIDInput().clear().type(otherID);
        this.elements.driverLicenseInput().clear().type(driverLicense);
        this.elements.nationalityDropdown().then(dropdown => {
            cy.wrap(dropdown).click(0);
            cy.get('.oxd-select-option').eq(indexNationality).click();
        })
        this.elements.licenseExpiryDateInput().type(`${licenseExpiryDate}`);
        cy.get('.oxd-layout-container').click(); // Click outside to close the date picker if open
        this.elements.maritalStatusDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(indexMaritalStatus).click();
        })
        this.elements.dateOfBirthInput().type(`${dateOfBirth}`);
        cy.get('.oxd-layout-container').click(); // Click outside to close the date picker if open
        this.elements.genderOptions().find('input[type="radio"]').then(options => {
            cy.wrap(options).eq(1).check({ force: true }); // Select Female
        });
        this.elements.saveButton().eq(0).click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }

    fillCustomFields(bloodTypeIndex, testFieldValue) {
        this.elements.bloodTypeDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(bloodTypeIndex).click();
        });
        this.elements.testFieldInput().clear().type(testFieldValue);
        this.elements.saveButtonforCustomFields().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }

    
}
export const onPersonalDetailsPage = new personalDetailsPage();