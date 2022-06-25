/// <reference types="cypress" />

describe('about me page work', () => {
  beforeEach(() => {
    cy.visit('/aboutme')
  })
  it('should have a desc', () => {
    cy.contains('善良单纯的人')
  })
})
