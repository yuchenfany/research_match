
// login_spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// username: testuser, password: testuserpass
describe('login', () => {
  it('a participant logs in with their username and password', () => {
    cy.visit('http://localhost:3000');
    cy.get('form');
    cy.get('#username').type('testuser').should('have.value', 'testuser');
    cy.get('#password').type('testuserpass').should('have.value', 'testuserpass');
    cy.get('#submit-button').click();
    cy.location('pathname').should('eq', '/participant-home');
  });
});
