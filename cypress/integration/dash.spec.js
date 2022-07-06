import dashPage from '../support/pages/dash'
import { customer, provider, appointment } from '../support/factories/dash/index'

describe('dashboard', function () {

    context('When the customer have an appointment in mobile app', function () {

        before(function () {
            cy.postUser(provider)
            cy.postUser(customer)

            cy.apiLogin(customer)
            cy.setProviderId(provider.email)
            cy.createAppointment(appointment.hour)

        })

        it('The customer should be shown in the samurai dashboard', function () {
            const date = Cypress.env('appointmentDate')

            //cy.uiLogin(provider)
            cy.apiLogin(provider, true)

            dashPage.calendarShouldBeVisible()
            dashPage.selectDay(date)
            dashPage.appointmentShouldBe(customer, appointment.hour)
        })

    })

})