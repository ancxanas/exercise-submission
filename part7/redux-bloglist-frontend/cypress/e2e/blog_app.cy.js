describe('Blog app', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.createUser({
      name: 'Muhammed Anas',
      username: 'anas',
      password: 'paika',
    })
    cy.createUser({
      name: 'Farhan Ahmed',
      username: 'ahmed',
      password: 'paika',
    })
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

      cy.get('.notification').should('contain', 'wrong username or password')

      cy.get('html').should('not.contain', 'Muhammed Anas logged in')
    })

    describe('when logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'anas', password: 'paika' })
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('Harry Potter')
        cy.get('#author').type('J. K. Rowling')
        cy.get('#url').type(
          'https://www.wizardingworld.com/discover/books/harry-potter-and-the-philosophers-stone'
        )
        cy.get('#create-button').click()

        cy.get('.notification').should(
          'contain',
          'Harry Potter by J. K. Rowling'
        )

        cy.get('.bloglist').should('contain', 'Harry Potter')
      })

      describe('and some blogs exists', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Harry Potter',
            author: 'J. K. Rowling',
            url: 'https://www.wizardingworld.com/discover/books/harry-potter-and-the-philosophers-stone',
          })
          cy.createBlog({
            title: 'Lord of the Rings',
            author: 'J. R. R. Tolkien',
            url: 'https://www.warnerbros.com/movies/lord-rings-fellowship-ring',
          })
          cy.createBlog({
            title: 'Hunger Games',
            author: 'Suzanne Collins',
            url: 'https://www.lionsgate.com/franchises/the-hunger-games',
          })
        })

        it('blog can be liked', function () {
          cy.get('.bloglist').contains('Harry Potter').click()
          cy.get('.blog').get('button').contains('like').click()

          cy.get('.notification').should(
            'contain',
            'liked the blog Harry Potter'
          )
          cy.contains('1 likes')
        })

        it('blog can be deleted', function () {
          cy.contains('Lord of the Rings').click()
          cy.get('button').contains('remove').click()

          cy.get('.bloglist').should('not.contain', 'Lord of the Rings')
          cy.get('.notification').should(
            'contain',
            'Lord of the Rings by J. R. R. Tolkien deleted'
          )
        })

        describe('another user logged in', function () {
          beforeEach(function () {
            cy.contains('logout').click()
            cy.login({
              username: 'ahmed',
              password: 'paika',
            })
          })

          it('delete button is not visible', function () {
            cy.contains('Harry Potter').click()
            cy.get('.blog').should('not.contain', 'remove')
          })

          it.only('can comment', function () {
            cy.contains('Harry Potter').click()
            cy.get('#comment-input').type('This is awesome')
            cy.get('button').contains('add comment').click()
            cy.get('html').contains('This is awesome')
          })
        })
      })
    })
  })
})
