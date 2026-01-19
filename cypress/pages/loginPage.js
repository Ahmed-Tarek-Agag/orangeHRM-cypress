class loginPage {
    elements = {
        usernameInput: () => cy.get('[placeholder="username"]'),
        passwordInput: () => cy.get('[placeholder="password"]'),
        loginButton: () => cy.contains('button', 'Login'),
    };

    loginIntoApp(username, password) {
        this.elements.usernameInput().type(username);
        this.elements.passwordInput().type(password);
        this.elements.loginButton().click();
    }
}

export const onLoginPage = new loginPage();