/// <reference types="Cypress" />


describe('CEntral de atendimento CAC-TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
    it('Teste numero 01 - Digitar o nome no campo correto', function(){
        cy.get('#firstName').type('Leon')
    })
    it('Teste numero 02 - Fazer uma verificação no nome', function(){
        cy.get('#firstName').type('Leon').should('have.value', 'Leon')
    })
    it('Teste numero 03 - Verificar se o elemento está visivel', function(){
        cy.get('#firstName').should('be.visible')
    })

})



