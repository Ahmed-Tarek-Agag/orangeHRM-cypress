class addEmployeePage {
    elements = {
        addEmployeeButton: () => cy.contains('button', 'Add'),
        firstNameInput: () => cy.get('input[name="firstName"]'),
        middleNameInput: () => cy.get('input[name="middleName"]'),
        lastNameInput: () => cy.get('input[name="lastName"]'),
        employeeIDInput: () => cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input'),
        imageUploader: () => cy.get('input[type="file"]'),
        createLoginDetailsToggle: () => cy.get('input[type="checkbox"]'),
        usernameInput: () => cy.contains('label', 'Username').parents('.oxd-input-group').find('input'),
        passwordInput: () => cy.contains('label', 'Password').parents('.oxd-input-group').find('input'),
        confirmPasswordInput: () => cy.contains('label', 'Confirm Password').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.contains('button', 'Save'),
    };

    fillEmployeeDetails(firstName, middleName, lastName, employeeID, fileAttachment) {
        this.elements.addEmployeeButton().click();
        this.elements.firstNameInput().type(firstName);
        this.elements.middleNameInput().type(middleName);
        this.elements.lastNameInput().type(lastName);
        this.elements.employeeIDInput().clear().type(employeeID);
        this.elements.imageUploader().selectFile(fileAttachment, { force: true });
    }

    createLoginDetails(username, password, confirmPassword) {
        this.elements.createLoginDetailsToggle().check({ force: true });
        this.elements.usernameInput().type(username);
        this.elements.passwordInput().type(password);
        this.elements.confirmPasswordInput().type(confirmPassword);
        this.elements.saveButton().click();
        cy.url().should('include', '/pim/viewPersonalDetails')
    }
}

export const onAddEmployeePage = new addEmployeePage();