// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("Visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "sd");
  });
});

describe("Test Login and todo addition", () => {
  it("Visits the app root url", () => {
    //заходим на главную
    cy.visit("/");
  });
  it("Find Login button, click on it, input login info and login, check for redirect to todo list after the login, check for todo addition", () => {
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
    cy.get("input[name=addTodo]").type("teste");
    cy.get("button[type=submit]").click();

    // cy.get("[data-hook=allTasks] input[name=task]").should("have.length", 2);
  });
  it("add new task + chek length", () => {
    cy.get("[data-hook=allTasks]").then(($list) => {
      let preLength = $list[0].children.length;
      cy.get("input[name=addTodo]")
        .type("teste")
        .then(() => {
          let newV = $list[0].children.length;
          expect(newV).to.eq(preLength);
        });
    });
  });

  it("add new task + update", () => {
    cy.get("[data-hook=allTasks]").then(($list) => {
      let preLength = $list[0].children.length;
      cy.get("input[name=addTodo]")
        .type("teste")
        .then(() => {
          let newV = $list[0].children.length;
          expect(newV).to.eq(preLength);

          console.log($list, "$list");
        });
    });
  });

  // it("delete task  + chek length", () => {
  //   cy.get("[data-hook=allTasks]").then(($list) => {
  //     let preLength = $list[0].children.length;
  //     cy.get("[data-hook='deleteTask']").then(($buttons) => {
  //       $buttons[0].click();
  //       // let newV =  $list[0].children.length
  //       // expect(newV).to.eq(preLength -1)
  //     });
  //   });
  // });
});
