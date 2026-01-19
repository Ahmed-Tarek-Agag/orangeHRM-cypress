class membershipsPage {
    elements = {
        membershipsLabel: () => cy.get('h6').contains('Memberships'),
        addMembershipButton: () => cy.get('button').contains('Add'),
        addMembershipLabel: () => cy.get('h6').contains('Add Membership'),
        editMembershipLabel: () => cy.get('h6').contains('Edit Membership'),
        membershipNameInput: () => cy.contains('label', 'Name').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.get('button[type="submit"]'),
        toasterMessage: () => cy.get('#oxd-toaster_1'),
        deleteConfirmationButton: () => cy.contains('button', ' Yes, Delete '),
    }

    fillMembershipForm(membershipName) {
        this.elements.membershipNameInput().clear().type(membershipName);
    }

    addMembership(membershipName) {
        this.elements.membershipsLabel().should('be.visible');
        this.elements.addMembershipButton().click();
        this.elements.addMembershipLabel().should('be.visible');
        this.fillMembershipForm(membershipName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Saved');
    }

    deleteAddedMembership(membershipName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', membershipName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(0).click(); // Click delete button
            });
        this.elements.deleteConfirmationButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Deleted');
    }

    assertMembershipAdded(membershipName) {
        cy.get('.oxd-table-body').find('.oxd-table-row').each(rows => {
            if ((rows.text().includes(membershipName))) {
                cy.wrap(rows).find('.oxd-table-cell').eq(1).should('have.text', membershipName);
            }
        });
    }

    updateAddedMembership(oldName, newName) {
        cy.get('.oxd-table-body .oxd-table-row')
            .contains('.oxd-table-cell', oldName) // find the row dynamically
            .parent()
            .within(() => {
                cy.get('.oxd-table-cell').eq(2).find('button').eq(1).click(); // Click edit button
            });
        this.elements.editMembershipLabel().should('be.visible');
        this.fillMembershipForm(newName);
        this.elements.saveButton().click();
        this.elements.toasterMessage().should('be.visible').and('contain.text', 'Successfully Updated');
    }
}
export const onMembershipsPage = new membershipsPage();