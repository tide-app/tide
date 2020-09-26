/* eslint-disable jest/valid-expect, jest/expect-expect */
describe("Home Page", () => {
  it("should load ", async () => {
    cy.visit("http://localhost:3000");
    cy.get(".playlist-item").first().then(($el) => {
      Cypress.dom.isVisible($el) // true
    })
  });
});
