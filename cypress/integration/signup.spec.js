import signupPage from '../support/pages/signup'

describe('Sign in process', function () {

    context('When is a new user', function () {

        const user = {
            name: 'Rodrigo',
            email: 'rodrigo@mail.com',
            password: 'rodrigo123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.visit('/');
        })

        it('should complete the singing up process', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })
    })

    context('When the email is already registered', function () {

        const user = {
            name: 'Rodrigo',
            email: 'rodrigo@mail.com',
            password: 'rodrigo123',
            is_provider: true
        }

        before(function () {
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

        it('should not allow register the same email twice', function () {

            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('Validating error message to bad email', function () {
        const user = {
            name: 'Rodrigo',
            email: 'rodrigo.mail.com',
            password: 'rodrigo123',
        }

        it('should return a error message alert', function () {
            signupPage.go()
            signupPage.form(user)
            signupPage.submit()
            signupPage.alertHaveText('Informe um email válido')
        })
    })

    context('Should not allow short password ', function () {

        const passwords = ['1', '2a', '3ab', 'abc4', 'ab#c5']

        beforeEach(function () {
            signupPage.go()
        })

        passwords.forEach(function (p) {
            it('should not register the user with the password: ' + p, function () {

                const user = { name: 'Jason Friday', email: 'jason@mail.com', password: p }

                signupPage.form(user)
                signupPage.submit()
            })
        })

        afterEach(function () {
            signupPage.alertHaveText('Pelo menos 6 caracteres')
        })

    })

    context('When I do not fill any required field', function () {

        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        alertMessages.forEach(function (alert) {
            it('should show ' + alert.toLowerCase(), function () {
                signupPage.alertHaveText(alert)
            })
        })
    })
})
