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
        cy.preenchaCamposObrigatorios()
        cy.get('#email').clear().type('pereleorecgmail.com')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    it('Teste numero 08 - Inserir e validar dados de texto no campo de telefone', function(){
        cy.preenchaCamposObrigatorios()
        cy.get('#phone').type('pereleorecgmail.com').should('have.value', '')
    })
    it('Teste numero 09 - Validar mensagem de erro no telefone', function(){
        cy.preenchaCamposObrigatorios()
        cy.get('#phone-checkbox').click()
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
    it('Teste numero 12 - Enviar formulário usando comando customizado e contains', function(){
        cy.preenchaCamposObrigatorios()
        cy.contains('button', 'Enviar').click()
    })
    it('Teste numero 13 - Selecionar elementos de menu suspenso pelo Nome', function(){
        cy.preenchaCamposObrigatorios()
        cy.get('#product').select('YouTube').should('have.value','youtube')
        cy.contains('button', 'Enviar').click()
    })
    it('Teste numero 14 - Selecionar elementos de menu suspenso pelo valor', function(){
        cy.preenchaCamposObrigatorios()
        cy.get('#product').select('mentoria').should('have.value','mentoria')
        //cy.contains('button', 'Enviar').click()
    })
    it('Teste numero 15 - Selecionar elementos de menu suspenso pelo valor', function(){
        cy.preenchaCamposObrigatorios()
        cy.get('#product').select(2).should('have.value','cursos')
        //cy.contains('button', 'Enviar').click()
    })
    it('Teste numero 16 - Marcar o campo do tipo radio', function(){
        cy.preenchaCamposObrigatorios()
        cy.get('input[type="radio"]') //Com isso vamos pegar todos os radio button da tela.
        .should('have.length', 3)     //Aqui validamos o tamanho do radio buttons que queremos utilizar
        .each(function($radio){       //Aqui o each cria a função para usar em cada radio com o wrap
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
        //cy.contains('button', 'Enviar').click()
    })
    it('Teste numero 17 - Marcando e desmarcando o campo do tipo checkbox', function(){
        cy.preenchaCamposObrigatorios()
        cy.get('input[type="checkbox"]').check()
        cy.get('input[type="checkbox"]').last().uncheck()
        //cy.contains('button', 'Enviar').click()
    })
    it('Teste numero 18 - Marcando e desmarcando o campo do tipo checkbox com check.', function(){
        cy.preenchaCamposObrigatorios()
        cy.get('#phone-checkbox').check()
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
    })
    it('Teste numero 19 - Fazendo upload de arquivos.', function(){
        cy.get('input[type="file"]')  //Aqui pegamos o unico input do tipo file na página
        .should("not.have.value")    //verificamos se o valor é vazio
        .selectFile('./cypress/fixtures/example.json') //Enviamos o arquivo de uma pasta
    })
    it('Teste numero 20 - Fazendo upload de arquivos e verificar o arquivo enviado é correto.', function(){
        cy.get('input[type="file"]')  
        .should("not.have.value")   
        .selectFile('./cypress/fixtures/example.json') 
        .should(function($input){  //função para gerar log do input de enviar arquivo
            console.log($input)   //função de mostrar o que tem no input no console
            expect($input[0].files[0].name).to.equal('example.json') 
            //Acima, nós pegamos o primeiro input, o primeiro item de file e o nome do item de file para pode comparar
        })
    })

    it('Teste numero 21 - Fazendo upload de arquivos com drag and drop.', function(){
        cy.get('input[type="file"]')  
        .should("not.have.value")   
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'}) 
        .should(function($input){  //função para gerar log do input de enviar arquivo
            console.log($input)   //função de mostrar o que tem no input no console, procure por files
            expect($input[0].files[0].name).to.equal('example.json') 
            //Acima, nós pegamos o primeiro input, o primeiro item de file e o nome do item de file para pode comparar
        })
    })
    it('Teste numero 22 - Fazendo upload de arquivos com alias.', function(){
        cy.fixture('example.json').as('clone_file')  //Aqui damos um novo nome ao arquivo example.json

        cy.get('input[type="file"]')
        .selectFile('@clone_file')
        .should(function($input){
            console.log($input)
            expect($input[0].files[0].name).to.equal('example.json') //Na hora de comparar o nome temos que usar o original
        })          
    })
    it('Teste numero 23 - Verifica se opção que abre link que abre em nova aba.', function(){
        cy.get('#privacy a').should('have.attr','target','_blank')       
    })
    it('Teste numero 24 - Remover opção que abre link que abre em nova aba.', function(){
        cy.get('#privacy a').should('have.attr','target','_blank')
        cy.get('#privacy a').invoke('removeAttr','target','_blank').click()         
    })
    it('Teste numero 25 - Simular resolução mobile.', function(){
        cy.preenchaCamposObrigatorios()
        cy.get(".button").click()          
    })
    it('Teste numero 26 - Usar a função cy.clock() para esperar um tempo ao mostrar feedback.', function(){
        cy.preenchaCamposObrigatorios()
        cy.get(".button").click() 
        cy.get('.success').should('be.visible')
        cy.clock(3000)
        cy.get('.success').should('not.be.visible')
    })

    it.only('Teste numero 27 - Usar a função cy.tick() para avançar no tempo ao mostrar feedback.', function(){
        cy.preenchaCamposObrigatorios()
        cy.get(".button").click() 
        cy.clock()
        cy.get('.success').should('be.visible')
        cy.tick(3000)
        cy.get('.success').should('not.be.visible')
    })
    

})



