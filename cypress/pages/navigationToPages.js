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

    navigateToWorkShiftsPage() {
        this.navigateToAdminPage();
        cy.get('nav').contains('Job').click();
        cy.get('a').contains('Work Shifts').click();
        cy.url().should('include', '/admin/workShift');
    }

    navigateToSkillsPage() {
        this.navigateToAdminPage();
        cy.get('nav').contains('Qualifications').click();
        cy.get('a').contains('Skills').click();
        cy.url().should('include', '/admin/viewSkills');
    }

    navigateToEducationPage() {
        this.navigateToAdminPage();
        cy.get('nav').contains('Qualifications').click();
        cy.get('a').contains('Education').click();
        cy.url().should('include', '/admin/viewEducation');
    }

    navigateToLicensesPage() {
        this.navigateToAdminPage();
        cy.get('nav').contains('Qualifications').click();
        cy.get('a').contains('Licenses').click();
        cy.url().should('include', '/admin/viewLicenses');
    }

    navigateToLanguagesPage() {
        this.navigateToAdminPage();
        cy.get('nav').contains('Qualifications').click();
        cy.get('a').contains('Languages').click();
        cy.url().should('include', '/admin/viewLanguages');
    }

    navigateToMembershipsPage() {
        this.navigateToAdminPage();
        cy.get('nav').contains('Qualifications').click();
        cy.get('a').contains('Memberships').click();
        cy.url().should('include', '/admin/membership');
    }

    navigateToNationalitiesPage() {
        this.navigateToAdminPage();
        cy.get('nav').contains('Nationalities').click();
        cy.url().should('include', '/admin/nationality');
    }
}
export const onNavigationToPages = new navigationToPages();