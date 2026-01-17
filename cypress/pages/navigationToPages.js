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

    navigateToJobTitlesPage() {
        this.navigateToAdminPage();
        cy.get('nav').contains('Job').click();
        cy.get('a').contains('Job Titles').click();
        cy.url().should('include', '/admin/viewJobTitleList');
    }

    navigateToPayGradesPage() {
        this.navigateToAdminPage();
        cy.get('nav').contains('Job').click();
        cy.get('a').contains('Pay Grades').click();
        cy.url().should('include', '/admin/viewPayGrades');
    }

    navigateToEmploymentStatusPage() {
        this.navigateToAdminPage();
        cy.get('nav').contains('Job').click();
        cy.get('a').contains('Employment Status').click();
        cy.url().should('include', '/admin/employmentStatus');
    }

    navigateToJobCategoriesPage() {
        this.navigateToAdminPage();
        cy.get('nav').contains('Job').click();
        cy.get('a').contains('Job Categories').click();
        cy.url().should('include', '/admin/jobCategory');
    }
}
export const onNavigationToPages = new navigationToPages();