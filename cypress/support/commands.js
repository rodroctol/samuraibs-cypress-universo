// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('generateFixture', () => {
    const faker = require('faker')

    cy.writeFile('cypress/fixtures/stories.json', {
        'hits': Cypress._.times(20, () => {
            return {
                'title': `${faker.lorem.words(3)}`,
                'url': `${faker.internet.url()}`,
                'author': `${faker.name.firstName()} ${faker.name.lastName()}`,
                'num_comments': `${faker.datatype.number()}`,
                'points': `${faker.datatype.number()}`,
                'objectID': `${faker.datatype.uuid()}`,
                'email': `${faker.internet.email()}`,
            }
        })
    })
})

Cypress.Commands.add('postUser', function (user) {
    cy.task('removeUser', user.email)
        .then(function (result) {
            console.log(result)
        })

    cy.request(
        'POST',
        'http://localhost:3333/users',
        user
    ).then(function (response) {
        expect(response.status).to.eq(200)
    })
})

Cypress.Commands.add('recoveryPass', function (email) {

    cy.request(
        'POST',
        'http://localhost:3333/password/forgot',
        { email: email }
    ).then(function (response) {
        expect(response.status).to.eq(204)


        cy.task('findToken', this.data.email)
            .then(function (result) {
                Cypress.env('recoveryToken', result.token)
            })
    })
})