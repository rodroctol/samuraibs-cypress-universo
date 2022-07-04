import loginPage from '../support/pages/login'
import dashPage from '../support/pages/dash'

describe('login', function () {
    context('when the user is good enough', function () {

        const user = {
            name: 'Rodrigo',
            email: 'digao@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        beforeEach(function () {
            cy.postUser(user)
        })

        it('should login successfully', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            dashPage.header.userLoggedIn(user.name)
        })
    })

    context('When the user has the right login with wrong password', function () {

        let user = {
            name: 'Celso Nakamura',
            email: 'naka@mail.com',
            password: 'pwd123',
            is_provider: true
        }

        beforeEach(function () {
            cy.postUser(user).then(function () {
                user.password = 'abc123'
            })
        })

        it('should notify credentials error', function () {
            loginPage.go()
            loginPage.form(user)
            loginPage.submit()

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.toast.shouldHaveText(message)

        })
    })

    context('Trying wrong emails to test the block feature', function () {

        const emails = [
            'digao.com.br',
            'yahoo.com',
            '@gmail.com',
            '@',
            '!@#!$',
            '12333',
            'xpto123'
        ]

        before(function () {
            loginPage.go()
        })

        emails.forEach(function (email) {
            it('could not log in with this email: ' + email, function () {
                const user = { email: email, password: 'pwd123' }

                loginPage.form(user)
                loginPage.submit()
                loginPage.alert.haveText('Informe um email válido')
            })
        })
    })

    context('When I do not fill any required field', function () {

        const alertMessages = [
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            loginPage.go()
            loginPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('should show ' + alert.toLowerCase(), function () {
                loginPage.alert.haveText(alert)
            })
        })
    })
})