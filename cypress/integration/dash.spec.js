

describe('dashboard', function () {

    context('When the customer have an appointment in mobile app', function () {

        const data = {
            customer: {
                name: 'Nikki Sixx',
                email: 'nikki@motleycrue.com',
                password: 'pwd123',
                is_provider: false
            },
            samurai: {
                name: 'Ramon Valdez',
                email: 'ramon@televisa.com',
                password: 'pwd123',
                is_provider: true
            }
        }

        before(function () {
            cy.postUser(data.customer)
            cy.postUser(data.samurai)

            cy.apiLogin(data.customer)
            cy.log(Cypress.env('apiToken'))
        })

        it('The customer should be shown in the samurai dashboard', function () {
            console.log(data)
        })
    })
})

Cypress.Commands.add('apiLogin', function (user) {

    const payload = {
        email: user.email,
        password: user.password
    }

    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/sessions',
        body: payload
    }).then(function (response) {
        expect(response.status).to.eq(200)
        Cypress.env('apiToken', response.body.token)
    })
})