/// <reference types="cypress" />

describe('Check form page', () => {
  it('should contain form', () => {
    cy.visit('/form');

    cy.get('[data-testid="form"]').should('exist');
  });

  it('should show warnings with incorrectly field form', () => {
    cy.visit('/form');

    cy.get('[data-testid="form-submit-btn"]').click();
    cy.get('.input-error').should('have.length', 9);
  });

  it('should show warnings with incorrectly filled form', () => {
    cy.visit('/form');

    cy.get('[data-testid="form-submit-btn"]').click();
    cy.get('.input-error').should('have.length', 9);
  });

  it('should show submit message and submitted card with correctly filled form', () => {
    cy.visit('/form');

    cy.get('[data-testid="name"]').type('Rick');
    cy.get('[data-testid="status-0"]').check();
    cy.get('[data-testid="species"]').select(2);
    cy.get('[data-testid="gender"]').select(2);
    cy.get('[data-testid="origin"]').type('Earth');
    cy.get('[data-testid="location"]').type('Mars');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/Rick.png');
    cy.get('input[name="date"]').type('2020-05-12');
    cy.get('[data-testid="checkbox"]').check();

    cy.get('[data-testid="form-submit-btn"]').click();

    cy.get('[data-testid="submit-message"]').should('be.visible');
    cy.get('[data-testid="card"]').should('be.visible');

    cy.get('[data-testid="card"]').click();
    cy.get('[data-testid="card-modal"]').should('exist');

    cy.get('[data-testid="modal-close-btn"]').click();
    cy.get('[data-testid="modal"]').should('not.be.visible');
  });

  it('return coverage', () => {
    expect(true).to.equal(true);
  });
});
