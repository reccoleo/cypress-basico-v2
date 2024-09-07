Cypress.Commands.add('preenchaCamposObrigatorios',function(){
    cy.get('#firstName').type('Leon')
    cy.get('#lastName').type('Recco')
    cy.get('#email').type('pereleorec@gmail.com')
    cy.get('#open-text-area').type('Eu ganhei mais de 1 milhão na megasena')
})