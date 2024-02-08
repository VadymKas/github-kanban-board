describe('App component tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check if column has issues cards on first render', () => {
    cy.get('.cardCol').find('.card').should('not.exist');
  });

  it('Check if column has issues cards on input', () => {
    cy.get('input').type('https://github.com/facebook/react');
    cy.get('button').click();
    cy.get('.cardCol').find('.card').should('exist');

    cy.get('input').type('some text');
    cy.get('.cardCol').find('.card').should('not.exist');

    cy.get('input').type('some text');
    cy.get('button').click();
    cy.get('.cardCol').find('.card').should('not.exist');
  });
});
