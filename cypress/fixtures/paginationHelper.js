export class PaginationHelper {

    elements = {
        paginationNav: () => cy.get('nav[aria-label="Pagination Navigation"]'),
        nextBtn: () =>
            cy.get('nav[aria-label="Pagination Navigation"]')
                .find('i.bi-chevron-right')
                .parents('button'),

        prevBtn: () =>
            cy.get('nav[aria-label="Pagination Navigation"]')
                .find('i.bi-chevron-left')
                .parents('button'),

        tableRows: () => cy.get('.oxd-table-body .oxd-table-row'),
        recordsLabel: () => cy.get('.orangehrm-horizontal-padding .oxd-text')
    };

    /**
     * Count all rows across all pages and assert with label count
     * Works even if pagination does NOT exist
     */
    assertTotalRecordsMatchesPagination() {
        let totalRows = 0;

        const countCurrentPage = () => {
            return this.elements.tableRows().then(rows => {
                totalRows += rows.length;
            });
        };

        const goNextIfPossible = () => {
            // لو مفيش pagination أصلاً
            return this.elements.paginationNav().then($nav => {
                if ($nav.length === 0) {
                    return;
                }

                return this.elements.nextBtn().then($btn => {
                    if ($btn.is(':disabled')) {
                        return;
                    }

                    cy.wrap($btn).click();
                    cy.wait(400);
                    countCurrentPage();
                    return goNextIfPossible();
                });
            });
        };

        this.elements.recordsLabel().invoke('text').then(text => {

            // No records case
            if (text.includes('No Records Found')) {
                this.elements.tableRows().should('have.length', 0);
                return;
            }

            const match = text.match(/\d+/);
            expect(match, 'Records count exists in label').to.not.be.null;
            const expectedTotal = Number(match[0]);

            // Count first page
            countCurrentPage();

            // Paginate if needed
            goNextIfPossible();

            // Final assertion
            cy.then(() => {
                expect(
                    totalRows,
                    'Total rows across all pages matches label'
                ).to.eq(expectedTotal);
            });
        });
    }

    /**
     * Navigate to last page (safe if pagination does not exist)
     */
    goToLastPage() {
        this.elements.paginationNav().then($nav => {
            if ($nav.length === 0) return;

            const clickNext = () => {
                this.elements.nextBtn().then($btn => {
                    if ($btn.is(':disabled')) return;
                    cy.wrap($btn).click();
                    cy.wait(300);
                    clickNext();
                });
            };
            clickNext();
        });
    }

    /**
     * Navigate to first page (safe if pagination does not exist)
     */
    goToFirstPage() {
        this.elements.paginationNav().then($nav => {
            if ($nav.length === 0) return;

            const clickPrev = () => {
                this.elements.prevBtn().then($btn => {
                    if ($btn.is(':disabled')) return;
                    cy.wrap($btn).click();
                    cy.wait(300);
                    clickPrev();
                });
            };
            clickPrev();
        });
    }

    /**
     * Find row across pages (safe if pagination does not exist)
     */
    findRowAcrossPages(textToFind) {

        const searchPage = () => {
            return this.elements.tableRows().then($rows => {

                const match = [...$rows].find(row =>
                    row.innerText.includes(textToFind)
                );

                if (match) {
                    return cy.wrap(match);
                }

                return this.elements.paginationNav().then($nav => {
                    if ($nav.length === 0) {
                        throw new Error(`Record "${textToFind}" not found`);
                    }

                    return this.elements.nextBtn().then($btn => {
                        if ($btn.is(':disabled')) {
                            throw new Error(`Record "${textToFind}" not found in any page`);
                        }

                        cy.wrap($btn).click();
                        cy.wait(400);
                        return searchPage();
                    });
                });
            });
        };

        return searchPage();
    }
}

export const Pagination = new PaginationHelper();
