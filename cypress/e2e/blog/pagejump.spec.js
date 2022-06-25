/// <reference types="cypress" />
describe('jump from index', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should jump to aboutme and back', () => {
    cy.contains('.menu > *', '关于我').click()
    cy.url().should('contain', '/aboutme')
    cy.get('.navbar').contains('板板的博客！').click()
    cy.url().should('not.contain', 'aboutme')
    cy.get('.menu')
      .contains('首页')
      .should('have.class', 'active')
      .should('have.css', 'background-color')
  })
})
