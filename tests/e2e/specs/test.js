// https://docs.cypress.io/api/introduction/api.html

describe('Home screen test', () => {
  it('Visits the home screen', () => {
    cy.visit('/');
    cy.contains('h1', 'Hello,');
  });

  it('did not load the main part of the application', () => {
    cy.get('.voice-computer').should('not.exist');
  });

  it('should register name', () => {
    cy.get('[type="text"]').type('John');
    cy.get('[type="submit"]').click();
    cy.get('ol').should('exist');
    cy.get('button').should('exist');
  });

  it('should finish tutorial', () => {
    cy.get('button').click();
    cy.get('.voice-computer').should('exist');
  });

  it('should try recording voice', () => {
    cy.get('.mic').click();
    cy.get('.test').should('exist');
    cy.get('button').should('exist');
    cy.request('http://dev.aymericarn.fr/speacular_api/');
    cy.server();
    cy.route({
      method: 'POST',      // Route all POST requests
      url: /audio/,    // that have a URL that matches '/audio/*'
      response: {
        anger: 2,
        calm: 28,
        energy: 8,
        joy: 12,
        sorrow: 6,
      }       // and force the response to be: []
    });
    cy.get('button').click();
  });
});

describe('Analytics part test', () => {
  it('should go on the analytics section', () => {
    cy.get('.next-section').click();
    cy.get('.analytics').should('exist');
    cy.get('canvas').should('exist');
  })
});

describe('Quotes history part test', () => {
  it('should go on the quote section', () => {
    cy.get('.next-section').click();
    cy.get('.analytics').should('exist');
    cy.get('canvas').should('exist');
  })
});

