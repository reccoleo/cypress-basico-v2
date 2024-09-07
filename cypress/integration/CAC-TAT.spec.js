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
    it('Teste numero 04 - Complete os dados necessários e envie o formulário', function(){
        cy.get('#firstName').type('Leon')
        cy.get('#lastName').type('Recco')
        cy.get('#email').type('pereleorec@gmail.com')
        cy.get('#open-text-area').type('Eu ganhei mais de 1 milhão na megasena')
        cy.get('.button').click()
    })
    it('Teste numero 05 - Complete os dados necessários e valide o feedback de sucesso', function(){
        cy.get('#firstName').type('Leon')
        cy.get('#lastName').type('Recco')
        cy.get('#email').type('pereleorec@gmail.com')
        cy.get('#open-text-area').type('Eu ganhei mais de 1 milhão na megasena')
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
    })
    it('Teste numero 06 - Verificar quanto tempo demora para colocar dados', function(){
        const texto_longo = 'texto, texto, texto, texto, texto, texto, texto, texto, texto, texto, texto';
        cy.get('#firstName').type(texto_longo, { delay: 0 })
        cy.get('#lastName').type(texto_longo)
    })
    it('Teste numero 07 - Validar mensagem de erro ao colocar email inválido', function(){
        cy.get('#firstName').type('Leon')
        cy.get('#lastName').type('Recco')
        cy.get('#email').type('pereleorecgmail.com')
        cy.get('#open-text-area').type('Eu ganhei mais de 1 milhão na megasena')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    it('Teste numero 08 - Inserir e validar dados de texto no campo de telefone', function(){
        cy.get('#firstName').type('Leon')
        cy.get('#lastName').type('Recco')
        cy.get('#phone').type('pereleorecgmail.com').should('have.value', '')
    })
    it('Teste numero 09 - Validar mensagem de erro no telefone', function(){
        cy.get('#firstName').type('Leon')
        cy.get('#lastName').type('Recco')
        cy.get('#email').type('pereleorecgmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Eu ganhei mais de 1 milhão na megasena')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    it('Teste numero 10 - Validar mensagem de erro no telefone', function(){
        cy.get('#firstName').type('Leon').clear().should('have.value','')
        cy.get('#lastName').type('Recco').clear().should('have.value','')
        cy.get('#email').type('pereleorecgmail.com').clear().should('have.value','')
    })
    it('Teste numero 11 - Enviar formulário usando comando customizado', function(){
        cy.preenchaCamposObrigatorios()
        cy.get('button[type="Submit"]').click()
    })
    it.only('Teste numero 12 - Enviar formulário usando comando customizado e contains', function(){
        cy.preenchaCamposObrigatorios()
        cy.contains('button', 'Enviar').click()
    })


})



