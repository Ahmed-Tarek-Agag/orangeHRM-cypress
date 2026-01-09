class navigationToPages {
    elements = {
        pimPageLink: () => cy.contains('a', 'PIM'),
        
    };

    navigateToPimPage() {
        this.elements.pimPageLink().click();
        cy.url().should('include', '/pim');
    }
}
export const onNavigationToPages = new navigationToPages();