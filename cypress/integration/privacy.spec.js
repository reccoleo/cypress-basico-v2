
Cypress._.times(5, function(){  //Primeiro colocamos o número de repetições e chamamos função
    it('Teste de página de privacidade', function(){
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    })
})

