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

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

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

        cy.get('.success')
          .should('contain', 'Harry Potter by J. K. Rowling')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
          .and('have.css', 'border-style', 'solid')

        cy.get('.blog').should('contain', 'Harry Potter')
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
          cy.contains('Harry Potter').contains('view').click()
          cy.contains('like').click()

          cy.contains('likes').should('have.length', '1')
        })

        it('blogs are ordered according to likes', function () {
          cy.get('.blog').each(($ele) => {
            cy.wrap($ele).find('button').contains('view').click()
          })

          const likingBlogs = (title, noOfLikes) => {
            cy.get('.blog').then(() => {
              for (let n = 0; n < noOfLikes; n++) {
                cy.contains(title).find('button').contains('like').click()
              }
            })
          }

          likingBlogs('Harry Potter', 10)
          likingBlogs('Lord of the Rings', 30)
          likingBlogs('Hunger Games', 20)

          cy.get('.blog').eq(0).should('contain', 'Lord of the Rings')
          cy.get('.blog').eq(1).should('contain', 'Hunger Games')
          cy.get('.blog').eq(2).should('contain', 'Harry Potter')
        })

        it('blog can be deleted', function () {
          cy.contains('Lord of the Rings').as('Blog').contains('view').click()
          cy.get('@Blog').contains('remove').click()

          cy.get('.blog').should('not.contain', 'Lord of the Rings')
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
            cy.contains('Harry Potter').as('Blog').contains('view').click()
            cy.get('@Blog').should('not.contain', 'remove')
          })
        })
      })
    })
  })
})
