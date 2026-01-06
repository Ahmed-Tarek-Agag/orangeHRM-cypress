class viewPersonalDetailsPage {
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
        genderOptions: () => cy.get('label.oxd-radio-input'),
        saveButton: () => cy.contains('button', 'Save'),
        bloodTypeDropdown: () => cy.contains('label', 'Blood Type').parents('.oxd-input-group').find('div.oxd-select-text-input'),
        testFieldInput: () => cy.contains('label', 'Test Field').parents('.oxd-input-group').find('input'),
        saveButtonforCustomFields: () => cy.contains('button', ' Save '),
        attachmentAddButton: () => cy.contains('button', ' Add '),
        browseButton: () => cy.contains('button', ' Browse '),
        commentInput: () => cy.contains('label', 'Comment').parents('.oxd-input-group').find('textarea'),
        saveButtonForAllPage: () => cy.contains('button', ' Save '),
    };

    fillPersonalDetails(otherID, driverLicense) {
        this.elements.personalDetailsHeader().should('be.visible');
        this.elements.otherIDInput().clear().type(otherID);
        this.elements.driverLicenseInput().clear().type(driverLicense);
    }
}
export const onViewPersonalDetailsPage = new viewPersonalDetailsPage();