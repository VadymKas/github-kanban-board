describe('App component tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check card structure', () => {
    cy.get('input').type('https://github.com/facebook/react');
    cy.get('button').click();

    cy.get('.card')
      .find('.ant-card-head-title')
      .should('exist')
      .and('not.be.empty');
    cy.get('.card')
      .find('.ant-card-body-info')
      .should('exist')
      .and('not.be.empty');
    cy.get('.card')
      .find('.ant-card-body-meta')
      .should('exist')
      .and('not.be.empty');
  });
});
