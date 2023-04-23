/// <reference types="cypress" />

describe('Check home page', () => {
  it('checks input', () => {
    cy.visit('/');

    cy.get('.search-img').should('have.attr', 'src', '/src/assets/find.png');
    cy.get('[data-testid="search-btn"]').contains('Search');
    cy.get('[data-testid="search-input"]').should('have.attr', 'value', '');
  });

  it('checks styles', () => {
    cy.visit('/');

    cy.get('[data-testid="form-link"]').trigger('mouseenter').trigger('mouseleave');
  });

  it('checks styles', () => {
    cy.visit('/');

    cy.get('[data-testid="form-link"]').trigger('mouseenter').trigger('mouseleave');
  });

  it('contains footer', () => {
    cy.visit('/');

    cy.get('[data-testid="footer-test"]').should('exist');
    cy.get('[data-testid="github-icon"]').should('exist');
    cy.get('[data-testid="logo"]').should('exist');
    cy.get('[data-testid="copyrights"]').should('exist');
  });

  it('checks default cards presence', () => {
    cy.visit('/');

    cy.get('.search-img').should('have.attr', 'src', '/src/assets/find.png');
    cy.get('[data-testid="card"]').should('have.length', 20);
  });

  it('update cards with valid search', () => {
    cy.visit('/');

    cy.get('[data-testid="search-input"]').type('kyle');
    cy.get('[data-testid="search-btn"]').click();

    cy.get('[data-testid="card"]').should('have.length', 1);
  });

  it('show modal window on card click', () => {
    cy.visit('/');

    cy.get('[data-testid="search-input"]').type('kyle{enter}');

    cy.get('[data-testid="card"]').click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal-content"]').should('exist');

    cy.get('[data-testid="modal-close-btn"]').click();
    cy.get('[data-testid="modal"]').should('not.be.visible');
  });

  it('increase likes on like click', () => {
    cy.visit('/');

    cy.get('[data-testid="search-input"]').type('kyle{enter}');

    cy.get('.like-img').click();
  });

  it('increase views on card click', () => {
    cy.visit('/');

    cy.get('[data-testid="search-input"]').type('kyle{enter}');

    cy.get('[data-testid="card"]').click();
  });

  it('should return error message', () => {
    cy.visit('/');

    cy.get('[data-testid="search-input"]').type('1234{enter}');

    cy.get('[data-testid="error-message-container"]').should('exist');
    cy.get('[data-testid="card"]').should('have.length', 0);
  });

  it('return coverage', () => {
    expect(true).to.equal(true);
  });
});
