/// <reference types="cypress" />

describe('index work', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('should have a title', () => {
    cy.contains('板板的博客！')
  })
  it('page-past could not be use', () => {
    cy.contains('a', '上一页')
      .should('have.css', 'pointer-events')
      .and('eq', 'none')
  })
  it('should go to page2', () => {
    cy.contains('下一页').click()
    cy.url().should('contain', '/page/2')
  })
})
