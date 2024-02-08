/* eslint-disable */

describe('InputField component tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check if input is rendered', () => {
    cy.get('input').should('exist');
  });

  it('Check for input value', () => {
    cy.get('input').should('have.value', '');
  });

  it('Check if input is controlled component', () => {
    cy.get('input').type('some text').should('have.value', 'some text');

    cy.get('button').click();

    cy.get('input').should('have.value', '');
  });

  it('Check if input clear button works properly', () => {
    cy.get('input').type('some text').should('have.value', 'some text');

    cy.get('.ant-input-clear-icon').click();

    cy.get('input').should('have.value', '');
  });

  it('Check if Load button is rendered', () => {
    cy.get('button').should('have.text', 'Load');
  });

  it('Check if Profile link is rendered', () => {
    cy.get('a:first-of-type span').should('have.text', 'Profile link');
  });

  it('Check if Repo link is rendered', () => {
    cy.get('a:last-of-type span').should('have.text', 'Repo link');
  });

  it('Check if Profile link state works prorerly', () => {
    cy.get('a:first-of-type')
      .should('have.attr', 'class')
      .and('contain', 'ant-btn-disabled');

    cy.get('input').type('https://github.com/facebook/react');
    cy.get('button').click();

    cy.get('a:first-of-type')
      .should('have.attr', 'class')
      .and('not.contain', 'ant-btn-disabled');

    cy.get('a:first-of-type').should('have.text', 'facebook');

    cy.get('input').type('some text');

    cy.get('a:first-of-type')
      .should('have.attr', 'class')
      .and('contain', 'ant-btn-disabled');

    cy.get('a:first-of-type span').should('have.text', 'Profile link');
  });

  it('Check if Repo link state works prorerly', () => {
    cy.get('a:last-of-type')
      .should('have.attr', 'class')
      .and('contain', 'ant-btn-disabled');

    cy.get('input').type('https://github.com/facebook/react');
    cy.get('button').click();

    cy.get('a:first-of-type')
      .should('have.attr', 'class')
      .and('not.contain', 'ant-btn-disabled');

    cy.get('a:last-of-type').should('have.text', 'react');

    cy.get('input').type('some text');

    cy.get('a:last-of-type')
      .should('have.attr', 'class')
      .and('contain', 'ant-btn-disabled');

    cy.get('a:last-of-type span').should('have.text', 'Repo link');
  });

  it('Check localStorage for saving columns', () => {
    const link = 'https://github.com/facebook/react';

    cy.clearLocalStorage().should((ls) => {
      expect(ls.getItem(link)).to.be.null; 
    });

    cy.get('input').type(link);
    cy.get('button')
      .click()
      .should(() => {
        expect(localStorage.getItem(link)).to.be; 
      });
  });
});
