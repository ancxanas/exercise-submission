describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
})
