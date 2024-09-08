Cypress.Commands.add('preenchaCamposObrigatorios',function(){
    cy.get('#firstName').type('Leon', {delay:0})
    cy.get('#lastName').type('Recco', {delay:0})
    cy.get('#email').type('pereleorec@gmail.com', {delay:0})
    cy.get('#open-text-area').type('Eu ganhei mais de 1 milhão na megasena', {delay:0})
})