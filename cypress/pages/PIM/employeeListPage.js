class employeeListPage {
    elements = {
        employeeNameInput: () => cy.contains('label', 'Employee Name').parents('.oxd-input-group').find('input'),
        employeeIDInput: () => cy.contains('label', 'Employee Id').parents('.oxd-input-group').find('input'),
        employeeStatusDropdown: () => cy.contains('label', 'Employment Status').parents('.oxd-input-group').find('.oxd-select-text-input'),
        includeDropdown: () => cy.contains('label', 'Include').parents('.oxd-input-group').find('.oxd-select-text-input'),
        supervisorNameInput: () => cy.contains('label', 'Supervisor Name').parents('.oxd-input-group').find('input'),
        jobTitleDropdown: () => cy.contains('label', 'Job Title').parents('.oxd-input-group').find('.oxd-select-text-input'),
        subUnitDropdown: () => cy.contains('label', 'Sub Unit').parents('.oxd-input-group').find('.oxd-select-text-input'),
        searchButton: () => cy.get('button[type="submit"]'),
        resetButton: () => cy.get('button[type="reset"]'),
        tableCells: () => cy.get('.oxd-table-body').find('.oxd-table-row').find('.oxd-table-cell'),
        recordFoundLabel: () => cy.get('.orangehrm-vertical-padding'),
        tableRows: () => cy.get('.oxd-table-body .oxd-table-card'),
        toasterNoRecordsFound: () => cy.contains('.orangehrm-vertical-padding', 'No Records Found'),
    };

    searchByEmployeeByName(employeeName) {
        this.elements.employeeNameInput().type(employeeName);
        cy.wait(2000);
        this.elements.employeeNameInput().type('{downarrow}{enter}');
        this.elements.searchButton().click();
        cy.wait(2000);
        this.elements.tableCells().eq(2).first().invoke('text').then((text) => {
            cy.wrap(text.trim()).as('selectedEmployeeName');
        });
    }

    searchByEmployeeByID(employeeID) {
        this.elements.employeeIDInput().type(employeeID);
        this.elements.searchButton().click();
        cy.wait(2000);
        this.elements.tableCells().eq(1).first().invoke('text').then((text) => {
            cy.wrap(text.trim()).as('selectedEmployeeID');
        });
    }

    // Assertion Method to verify the searched Number of records from the label
    assertOnNumberOfRecordsFromLabel() {

        this.elements.recordFoundLabel().invoke('text').then(text => {

            const match = text.match(/\d+/);

            // ✅ No Records Found
            if (!match) {
                cy.contains(
                    '.orangehrm-vertical-padding, .oxd-table-cell',
                    'No Records Found'
                ).should('be.visible');

                this.elements.tableRows().should('have.length', 0);
                return;
            }

            const recordsFromLabel = parseInt(match[0], 10);

            // ✅ Assert label text فقط
            const expectedText =
                recordsFromLabel === 1
                    ? `(1) Record Found`
                    : `(${recordsFromLabel}) Records Found`;

            this.elements.recordFoundLabel()
                .should('contain.text', expectedText);

            // ✅ Assert rows <= page size (مش =)
            this.elements.tableRows().then(rows => {
                expect(rows.length).to.be.at.most(50);
                expect(rows.length).to.be.greaterThan(0);
            });
        });
    }

    /**
     * Generic method to search by any dropdown
     * @param {Function} dropdownElementFn - function returning the dropdown element
     * @param {number|null} columnIndex - index of the column to assert (null if no column)
     */
    searchByDropdown(dropdownElementFn, columnIndex = null) {

        dropdownElementFn().click({ force: true });
        cy.wait(3000);
        cy.get('div.oxd-select-option').then(options => {

            const randomIndex = Math.floor(Math.random() * options.length);
            const expectedOption = options.eq(randomIndex).text().trim();

            cy.contains('div.oxd-select-option', expectedOption)
                .click({ force: true });

            this.elements.searchButton().click({ force: true });
            cy.wait(1500);

            // 🔹 حالة dropdown بدون column (Include)
            if (columnIndex === null) {
                this.assertOnNumberOfRecordsFromLabel();
                return;
            }

            const assertCurrentPage = () => {
                cy.get('.oxd-table-body').then($body => {

                    const rows = $body.find('.oxd-table-card');

                    if (rows.length === 0) {
                        cy.contains(
                            '.orangehrm-vertical-padding, .oxd-table-cell',
                            'No Records Found'
                        ).should('be.visible');
                        return;
                    }

                    cy.wrap(rows).each(row => {
                        cy.wrap(row)
                            .find('.oxd-table-cell')
                            .eq(columnIndex)
                            .should('have.text', expectedOption);
                    });
                });
            };

            const goThroughPages = () => {

                assertCurrentPage();

                cy.get('body').then($body => {

                    const nextBtn = $body.find('button.oxd-pagination-page-item--next');

                    // 🔹 لا يوجد pagination أصلاً
                    if (!nextBtn.length) {
                        return;
                    }

                    // 🔹 آخر صفحة
                    if (nextBtn.is(':disabled')) {
                        return;
                    }

                    cy.wrap(nextBtn)
                        .click({ force: true });

                    cy.wait(1200);
                    goThroughPages();
                });
            };

            goThroughPages();
        });
    }

};

export const onEmployeeListPage = new employeeListPage();