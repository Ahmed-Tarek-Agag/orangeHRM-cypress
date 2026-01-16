class navigationToPages {
    elements = {
        pimPageLink: () => cy.contains('a', 'PIM'),
        
    };

    navigateToPimPage() {
        this.elements.pimPageLink().click();
        cy.url().should('include', '/pim');
    }

    navigateToAdminPage() {
        cy.contains('a', 'Admin').click();
        cy.url().should('include', '/admin');
    }
}
export const onNavigationToPages = new navigationToPages();