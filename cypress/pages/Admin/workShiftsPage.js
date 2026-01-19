class workShiftsPage {
    elements = {
        workShiftsLabel: () => cy.get('h6').contains('Work Shifts'),
        addWorkShiftButton: () => cy.get('button').contains('Add'),
        addWorkShiftLabel: () => cy.get('h6').contains('Add Work Shift'),
        editWorkShiftLabel: () => cy.get('h6').contains('Edit Work Shift'),
        workShiftNameInput: () => cy.contains('label', 'Name').parents('.oxd-input-group').find('input'),
        fromTimeInput: () => cy.contains('label', 'From').parents('.oxd-input-group').find('input'),
        toTimeInput: () => cy.contains('label', 'To').parents('.oxd-input-group').find('input'),
        hoursInput: () => cy.get('.oxd-time-hour-input-text'),
        minutesInput: () => cy.get('.oxd-time-minute-input-text'),
        amButton: () => cy.get('[name="am"]'),
        pmButton: () => cy.get('[name="pm"]'),
        assignedEmployeesInput: () => cy.contains('label', 'Assigned Employees').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    }

    fillWorkShiftForm(workShiftName, hoursInput, minutesInput, assignedEmployees) {
        this.elements.workShiftNameInput().clear().type(workShiftName);
        this.elements.fromTimeInput().click();
        this.elements.hoursInput().clear().type(hoursInput);
        this.elements.minutesInput().clear().type(minutesInput);
        this.elements.amButton().click();
        this.elements.toTimeInput().click();
        this.elements.hoursInput().clear().type(hoursInput);
        this.elements.minutesInput().clear().type(minutesInput);
        this.elements.pmButton().click();
        cy.get('.oxd-layout-container').click({force: true}); // Click outside to close the date picker if open
        this.elements.assignedEmployeesInput().type(assignedEmployees,{delay: 2000}).type('{downarrow}{enter}');
    }

    addWorkShift(workShiftName, hoursInput, minutesInput, assignedEmployees) {
        this.elements.workShiftsLabel().should('be.visible');
        this.elements.addWorkShiftButton().click();
        this.elements.addWorkShiftLabel().should('be.visible');
        this.fillWorkShiftForm(workShiftName, hoursInput, minutesInput, assignedEmployees);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteAddedWorkShift(workShiftName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', workShiftName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(5).find('button').eq(0).click(); // Click delete button
            });
        this.elements.deleteConfirmationButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
    }

    assertWorkShiftAdded(workShiftName) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each(rows => {
            if ((rows.text().includes(workShiftName))) {
                cy.wrap(rows).find('.oxd-table-cell').eq(1).should('have.text', workShiftName);
            }
        });
    }

    updateAddedWorkShift(oldName, newName, newHoursInput, newMinutesInput, newAssignedEmployees) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', oldName) // find the row dynamically 
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(5).find('button').eq(1).click(); // Click edit button
            });
        this.elements.editWorkShiftLabel().should('be.visible');
        this.fillWorkShiftForm(newName, newHoursInput, newMinutesInput, newAssignedEmployees);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }
}
export const onWorkShiftsPage = new workShiftsPage();