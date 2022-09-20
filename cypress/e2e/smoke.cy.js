describe("smoke tests", () => {
  it("should allow user to login", () => {
    const loginForm = {
      email: "dianrahmaji@gmail.com",
      password: "dianrahmaji",
    };
    cy.visit("http://localhost:8000/");
    cy.get(":nth-child(1) > .mt-1 > .block").type(loginForm.email);
    cy.get(":nth-child(2) > :nth-child(2) > .block").type(loginForm.password);
    cy.get("form > .mt-6").click();
  });
});
