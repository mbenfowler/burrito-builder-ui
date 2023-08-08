describe("All tests", () => {
  describe('App with empty content', () => {
    beforeEach(() => {
      cy.intercept('http://localhost:3001/api/v1/orders', {
        method: 'GET',
        statusCode: 200,
        fixture: 'orders'
      }).as('initialGET')

      cy.visit("http://localhost:3000/")
    })

    it("should be visible", () => {
      cy.wait('@initialGET').then(() => {
        cy.get('h1').should('contain', 'Burrito Builder')
        .get('input').should('not.have.value')
        .get('form').children().should('have.length', 15)
        .get('form > p').should('contain', 'Order: Nothing selected')
        .get('section').children().should('have.length', 3)
      })
    });

    it('should not allow order submission without name and/or at least one ingredient', () => {
      cy.wait('@initialGET').then(() => {
        const alertStub = cy.stub()
        cy.on('window:alert', alertStub)
        cy.get(':nth-child(15)').click().then(() => {
          expect(alertStub.getCall(0)).to.be.calledWith('Please fill out required fields!')
        })
      })
    })
  })

  describe('Adding an order', () => {
    beforeEach(() => {
      cy.intercept('http://localhost:3001/api/v1/orders', {
        method: 'GET',
        statusCode: 200,
        fixture: 'orders'
      }).as('initialGET')

      cy.visit("http://localhost:3000/")
    })

    it('user should be able to make a new order', () => {
        cy.get('input').type('generic name')
        .get('[name="sour cream"]').click()
        .get('[name="jalapenos"]').click()
        .get('[name="beans"]').click()
        .get('form > p').should('contain', 'Order: sour cream, jalapenos, beans')
        .intercept('http://localhost:3001/api/v1/orders', {
          method: 'POST',
          statusCode: 201,
          body: JSON.stringify({id: 4, name:'generic name', ingredients:['sour cream', 'jalapenos', 'beans']})
        }).as('newOrder')
        .get(':nth-child(15)').click()
        cy.wait('@newOrder')
        
    })
  })
});
