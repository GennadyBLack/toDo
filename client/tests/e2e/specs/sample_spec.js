const { isExportDeclaration } = require("typescript")

describe('My first test',()=>{
    it('Does not muth!',()=>{
        // expect(true).to.equal(true)
        cy.visit('https://example.cypress.io')
    })
})