describe('App component tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Check if displays all columns', () => {
    cy.get('.cardCol').should('have.length', 3);
  });

  it('Check column headers', () => {
    const columnHeaders = ['ToDo', 'In Progress', 'Done'];

    cy.get('.cardCol h2').should((headers) => {
      expect(headers[0]).to.contain.text(columnHeaders[0]);
      expect(headers[1]).to.contain.text(columnHeaders[1]);
      expect(headers[2]).to.contain.text(columnHeaders[2]);
    });
  });

  it('Check viewport of columns', () => {
    cy.viewport(992, 1920);
    cy.wait(500);
    cy.viewport(768, 991);
    cy.wait(500);
    cy.viewport(450, 767);
    cy.wait(500);
  });
});
