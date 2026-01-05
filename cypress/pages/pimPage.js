class pimPage {
    elements = {
        addEmployeeButton: () => cy.contains('button', 'Add'),
        firstNameInput: () => cy.get('input[name="firstName"]'),
        middleNameInput: () => cy.get('input[name="middleName"]'),
        lastNameInput: () => cy.get('input[name="lastName"]'),
        employeeIDInput: () => cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input')
    }; 

    fillEmployeeDetails(firstName, middleName, lastName, employeeID) {
        this.elements.addEmployeeButton().click();
        this.elements.firstNameInput().type(firstName);
        this.elements.middleNameInput().type(middleName);
        this.elements.lastNameInput().type(lastName);
        this.elements.employeeIDInput().clear().type(employeeID);

    }
}

export const onPimPage = new pimPage();