// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "sd");
  });
});

describe("Login form opens", () => {
  it("Visits the app root url", () => {
    //заходим на главную
    cy.visit("/");
    //находим кнопку логина, проверяем, что она содержит искомый текст
    cy.get("[data-attr=login]").contains("Login form").click();
    //находим форму логина, проверяем, что кол-во инпутов в ней === 2
    cy.get("[data-attr=login-form]").find("input").should("have.length", 2);
    //находим инпут, вводим текст
    cy.get("input[name=Email]").type(`tester`);
    cy.get("input[name=Password]").type(`tester`);
    //находим кнопку сабмита, нажимаем на неё
    cy.get("button[type=submit]").click();
    //урл должен содержать нужное нам значение
    cy.url().should("include", "/todos");
  });
});
