class loginPage {
    elements = {
        usernameInput: () => cy.get('[placeholder="Username"]'),
        passwordInput: () => cy.get('[placeholder="Password"]'),
        loginButton: () => cy.contains('button', 'Login'),
    };

    loginIntoApp(username, password) {
        this.elements.usernameInput().type(username);
        this.elements.passwordInput().type(password);
        this.elements.loginButton().click();
        cy.url().should('include', '/dashboard');
    }
}

export const onLoginPage = new loginPage();