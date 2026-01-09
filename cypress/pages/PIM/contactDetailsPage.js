
class contactDetailsPage {
    elements = {
        contactDetailsTab: () => cy.get('a').contains('Contact Details'),
        contactDetailsLabel: () => cy.get('h6').contains('Contact Details'),  
        streetOneInput: () => cy.contains('label', 'Street 1').parents('.oxd-input-group').find('input'),
        streetTwoInput: () => cy.contains('label', 'Street 2').parents('.oxd-input-group').find('input'),
        cityInput: () => cy.contains('label', 'City').parents('.oxd-input-group').find('input'),
        stateInput: () => cy.contains('label', 'State/Province').parents('.oxd-input-group').find('input'),
        zipCodeInput: () => cy.contains('label', 'Zip/Postal Code').parents('.oxd-input-group').find('input'),
        countryDropdown: () => cy.contains('label', 'Country').parents('.oxd-input-group').find('.oxd-select-text'), 
        homeTelephoneInput: () => cy.contains('label', 'Home').parents('.oxd-input-group').find('input'),
        mobileInput: () => cy.contains('label', 'Mobile').parents('.oxd-input-group').find('input'),
        workTelephoneInput: () => cy.contains('label', 'Work').parents('.oxd-input-group').find('input'),
        workEmailInput: () => cy.contains('label', 'Work Email').parents('.oxd-input-group').find('input'),
        otherEmailInput: () => cy.contains('label', 'Other Email').parents('.oxd-input-group').find('input'),
        saveButton: () => cy.get('button[type="submit"]'),
    };

    navigateToContactDetailsTab() {
        this.elements.contactDetailsTab().click();
        cy.url().should('include', '/pim/viewContactDetails');
        this.elements.contactDetailsLabel().should('be.visible');
    }

    fillAddressDetails(streetOne, streetTwo, city, state, zipCode, countryIndex) {  
        this.elements.streetOneInput().clear().type(streetOne);
        this.elements.streetTwoInput().clear().type(streetTwo);
        this.elements.cityInput().clear().type(city);
        this.elements.stateInput().clear().type(state);
        this.elements.zipCodeInput().clear().type(zipCode);
        this.elements.countryDropdown().then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.oxd-select-option').eq(countryIndex).click();
        });
    }

    fillTelephoneDetails(homeTelephone, mobile, workTelephone) {
        this.elements.homeTelephoneInput().clear().type(homeTelephone);
        this.elements.mobileInput().clear().type(mobile);
        this.elements.workTelephoneInput().clear().type(workTelephone);
    }

    fillEmailDetails(workEmail, otherEmail) {
        this.elements.workEmailInput().clear().type(workEmail);
        this.elements.otherEmailInput().clear().type(otherEmail);
        this.elements.saveButton().click();
        cy.get('#oxd-toaster_1').should('be.visible').and('contain.text', 'Successfully Updated');
    }
}
export const onContactDetailsPage = new contactDetailsPage();