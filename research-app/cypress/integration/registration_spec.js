// registration_spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
// <reference types="cypress" />

describe('registration', () => {
  it('a user creates a new researcher account', () => {
    cy.visit('http://localhost:3000');
    cy.get('#register-button').click();
    cy.location('pathname').should('eq', '/create');
    cy.get('#username').type('cypressuser').should('have.value', 'cypressuser');
    cy.get('#password').type('cypressuserpass').should('have.value', 'cypressuserpass');
    cy.get('#create-button').click();
    cy.location('pathname').should('eq', '/type');
		cy.get('#researcher').check();
    cy.get('#confirm-button').click();
    cy.location('pathname').should('eq', '/researcher-profile');
    cy.get('#name').type('Dr. Cypress').should('have.value', 'Dr. Cypress');
    cy.get('#organization').type('University of Pennsylvania').should('have.value', 'University of Pennsylvania');
  });
});
