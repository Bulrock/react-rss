/// <reference types="cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.visit('/');
  });

  it('checks About link works', () => {
    // Given
    cy.visit('/');

    // When
    cy.get('.header-links').contains('About').click();

    // Then
    cy.url().should('include', '/about');
    cy.get('.main').contains('What is this?');
  });

  it('return coverage', () => {
    expect(true).to.equal(true);
  });
});
