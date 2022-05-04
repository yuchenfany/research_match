// message_spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe('sending a message', () => {
  it('user signs in, sends a message', () => {
    cy.visit('http://localhost:3000');
    cy.get('form');
    cy.get('#username').type('noti').should('have.value', 'noti');
    cy.get('#password').type('notipass').should('have.value', 'notipass');
    cy.get('#submit-button').click();
    cy.location('pathname').should('eq', '/participant-home');
    cy.get('#message-button').click();
    cy.location('pathname').should('eq', '/messages');
    cy.get('#view-button').click();
    cy.location('pathname').should('eq', '/chat');
    cy.get('#chat-message').type('cypress test yay!').should('have.value', 'cypress test yay!');
    cy.get('#send-button').click();
  });
});
  