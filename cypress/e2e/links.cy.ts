/// <reference types="cypress" />

describe('Check links', () => {
  it('passes', () => {
    cy.visit('/');
  });

  it('checks About link works', () => {
    cy.visit('/');

    cy.get('.header-links').contains('About').click();

    cy.url().should('include', '/about');
    cy.get('.main').contains('What is this?');
  });

  it('checks Form link works', () => {
    cy.visit('/');

    cy.get('.header-links').contains('Form').click();

    cy.url().should('include', '/form');
    cy.get('.main').contains('Create new Character with form');
  });

  it('checks Home link works', () => {
    cy.visit('/');

    cy.get('.header-links').contains('Form').click();
    cy.get('.header-links').contains('Home').click();

    cy.url().should('include', '/');
    cy.get('.main').contains('The Rick and Morty Universe');
  });

  it('checks 404 link works', () => {
    cy.visit('/qwert');

    cy.url().should('include', '/qwert');
    cy.get('.not-found-title').contains('404');
    cy.get('.not-found-p').contains('This Universe does not exist. Go your home');
    cy.get('.not-found-img').should('have.attr', 'src', '/src/assets/notFound.png');
    cy.get('.not-found-link').contains('planet');
    cy.get('.not-found-link').click();

    cy.url().should('include', '/');
  });

  it('return coverage', () => {
    expect(true).to.equal(true);
  });
});
