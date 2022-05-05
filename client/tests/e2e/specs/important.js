describe("Login and Update", () => {
  it("login and create task", () => {
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
    //берём все элементы инпут с именем task
    cy.get("[data-hook=important]").then(($list) => {
      cy.get($list[0]).click();
    });
    cy.get("[data-hook=task-wrap] label").then(($list) => {
      //берём первый инпут из списка элементов, очищаем инпут, вписываем значение
      cy.get($list[0]).should("have.class", "bg-orange-4");
    });
    cy.get("[data-hook=important]").then(($list) => {
      cy.get($list[0]).click();
    });

    cy.get("[data-hook=completed]").then(($list) => {
      cy.get($list[0]).click();
    });
    cy.get("[data-hook=task-wrap] label").then(($list) => {
      //берём первый инпут из списка элементов, очищаем инпут, вписываем значение
      cy.get($list[0]).should("have.class", "bg-green-4");
    });
    cy.get("[data-hook=completed]").then(($list) => {
      cy.get($list[0]).click();
    });
  });
});
