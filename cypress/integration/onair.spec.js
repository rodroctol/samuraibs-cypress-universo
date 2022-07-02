
it("webapp should be online", function () {
    //testing git pull command
    
    cy.visit('/')

    cy.title().should('eq', 'Samurai Barbershop by QAninja')
})
