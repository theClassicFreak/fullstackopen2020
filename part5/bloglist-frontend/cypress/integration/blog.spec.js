describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://127.0.0.1:3001/api/testing/reset')
    const user = {
        name: 'Test User',
        username: 'testuser',
        password: 'testpassword'
      }
    cy.request('POST', 'http://127.0.0.1:3001/api/users/', user)
    cy.visit('http://127.0.0.1:3000')
  })

  it('Front page is shown', function() {
    cy.contains('Blog Page')
  })

  it('Login form is shown', function() {
    cy.contains(new RegExp('username'))
    cy.contains(new RegExp('password'))
  })

  describe('Logged In', function() {
       beforeEach(function() {
              cy.contains('login')
              cy.get('#username').type('testuser')
              cy.get('#password').type('testpassword')
              cy.get('#login-button').click()
          })

        it('New blog can be created', function() {
            cy.contains('Create New Post').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('www.testurl.com')
            cy.get('#submit-button').click()
            cy.contains('test title')
            cy.request('GET', 'http://127.0.0.1:3001/api/blogs/').then((response) => {
                expect(response.body[0].title).to.equal('test title')
            })
        })

        it('Blog can be deleted', function() {
            cy.contains('Create New Post').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('www.testurl.com')
            cy.get('#submit-button').click()
            cy.contains('test title')
            cy.contains('test author').parent().get('#view-button').click()
            cy.intercept('/api/blogs/').as('blogAPI')
            cy.contains('test author').parent().get('#delete-button').click()
            cy.wait('@blogAPI').then((response) => {
                cy.request('GET', 'http://127.0.0.1:3001/api/blogs/').then((response) => {
                    expect(response.body.length===0)
                })
            })
        })

        it('Blog can be liked', function() {
            cy.contains('Create New Post').click()
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('www.testurl.com')
            cy.get('#submit-button').click()
            cy.contains('test author').parent().get('#view-button').click()
            cy.intercept('/api/blogs/').as('blogAPI')
            cy.contains('test author').parent().get('#like-button').click()
            cy.wait('@blogAPI').then((response) => {
                cy.request('GET', 'http://127.0.0.1:3001/api/blogs/').then((response) => {
                    expect(response.body[0].likes).to.equal(1)
                })
            })
        })

        it('Blogs are sorted by likes', function() {
            cy.contains('Create New Post').click()
            cy.get('#title').type('test title 1 ')
            cy.get('#author').type('test author 1')
            cy.get('#url').type('www.testurl1.com')
            cy.get('#submit-button').click()
            cy.contains('Create New Post').click()
            cy.get('#title').type('test title 2 ')
            cy.get('#author').type('test author 2')
            cy.get('#url').type('www.testurl2.com')
            cy.get('#submit-button').click()
            cy.contains('Create New Post').click()
            cy.get('#title').type('test title 3 ')
            cy.get('#author').type('test author 3')
            cy.get('#url').type('www.testurl3.com')
            cy.get('#submit-button').click()
            cy.contains('Create New Post').click()
            cy.get('#title').type('test title 4 ')
            cy.get('#author').type('test author 4')
            cy.get('#url').type('www.testurl4.com')
            cy.get('#submit-button').click()
            cy.contains('test author 1').parent().contains('View').click()
            cy.contains('test author 2').parent().contains('View').click()
            cy.contains('test author 3').parent().contains('View').click()
            cy.contains('test author 4').parent().contains('View').click()
            cy.contains('test author 1').parent().contains('Like')
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            cy.contains('test author 2').parent().contains('Like')
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            cy.contains('test author 3').parent().contains('Like')
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            cy.contains('test author 4').parent().contains('Like')
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            cy.wait(5000)
            let prevLikes = -1
            cy.get('.blogExpanded').each((blogEntry) => {
                let currLikes =  blogEntry.children()[2].innerText.split(" ")[0]
                expect(currLikes>=prevLikes)
                prevLikes = currLikes
            })
        })
  })

  describe('Login', function() {
      it('User can login', function() {
          cy.contains('login')
          cy.get('#username').type('testuser')
          cy.get('#password').type('testpassword')
          cy.get('#login-button').click()
          cy.contains('Test User has logged in')
      })

      it('Incorrect credetials cannot login', function() {
          cy.contains('login')
          cy.get('#username').type('testyuser')
          cy.get('#password').type('testpassword')
          cy.get('#login-button').click()
          cy.contains('Wrong Credentials')
      })
  })
})
