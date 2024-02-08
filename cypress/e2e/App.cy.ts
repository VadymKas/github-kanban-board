describe('App component tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check if App component is rendered', () => {
    cy.get('.App').should('exist');
  });

  it('Check if Header is rendered', () => {
    cy.get('h1').should('have.text', 'KANBAN BOARD');
  });

  it('Check if InputField component is rendered', () => {
    cy.get('.inputFiled').should('exist');
  });

  it('Check if CardBlock component is rendered', () => {
    cy.get('.cardBlock').should('exist');
  });
});
