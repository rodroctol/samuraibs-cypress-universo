
it("webapp should be online", function () {
    cy.visit('/')

    cy.title().should('eq', 'Samurai Barbershop by QAninja')
})