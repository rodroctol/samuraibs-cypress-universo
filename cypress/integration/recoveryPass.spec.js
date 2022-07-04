import fpPage from '../support/pages/forgotPass'
import rpPage from '../support/pages/resetPass'

describe('Recovering the password', function () {

    before(function () {
        cy.fixture('recoveryPass').then(function (recoveryPass) {
            this.data = recoveryPass
        })
    })

    context('When the user forget the password', function () {

        before(function () {
            cy.postUser(this.data)
        })

        it('should receive the recovery message by email', function () {
            fpPage.go()
            fpPage.form(this.data.email)
            fpPage.clickSubmit()

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'

            fpPage.toast.shouldHaveText(message)
        })
    })

    context('When the user requires the recovery password', function () {

        before(function () {
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        })

        it('should be able to register the new password', function () {

            const token = Cypress.env('recoveryToken')

            rpPage.go(token)
            rpPage.form('abc123', 'abc123')
            rpPage.submit()

            const message = 'Agora você já pode logar com a sua nova senha secreta.'
            rpPage.toast.shouldHaveText(message)
        })
    })
})