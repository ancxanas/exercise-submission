describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Muhammed Anas',
      username: 'anas',
      password: 'paika',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('anas')
      cy.get('#password').type('paika')
      cy.get('#login-button').click()

      cy.contains('Muhammed Anas logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('anas')
      cy.get('#password').type('kallangadi')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Muhammed Anas logged in')
    })
  })
})
