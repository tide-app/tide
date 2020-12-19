/* eslint-disable jest/valid-expect, jest/expect-expect */
function setupServerMocks() {
  cy.intercept("GET", "https://freesound.org/apiv2/sounds/462808", {
    fixture: "sound.json",
  });
  cy.intercept("GET", "/people/qfox123/packs/26158", { fixture: "sound.json" });
  cy.intercept("GET", "https://freesound.org/apiv2/packs/26158/", {
    fixture: "pack.json",
  });
  cy.intercept(
    "GET",
    "https://freesound.org/apiv2/packs/26158/sounds/?fields=id%2Cname%2Cduration%2Cnum_downloads%2Cusername%2Cnum_ratings",
    { fixture: "pack-sounds.json" }
  );
  cy.intercept(
    "GET",
    "https://freesound.org/apiv2/sounds/462808/similar/?fields=id%2Cname%2Cduration%2Cnum_downloads%2Cusername%2Cnum_ratings",
    { fixture: "similar-sounds.json" }
  );
  cy.intercept(
    "GET",
    "https://freesound.org/data/previews/462/462808_8386274-lq.mp3",
    { fixture: "sound.mp3" }
  );
  cy.intercept(
    "GET",
    "https://freesound.org/apiv2/search/text/?fields=id%2Cname%2Cpreviews%2Cduration%2Cnum_downloads%2Cusername%2Cnum_ratings&page_size=10&query=hello",
    {
      fixture: "search-results.json",
    }
  );
  cy.intercept(
    "GET",
    "https://freesound.org/apiv2/search/text/?fields=id%2Cname%2Cpreviews%2Cduration%2Cnum_downloads%2Cusername%2Cnum_ratings&page_size=10&page=1&query=hello",
    {
      fixture: "search-results.json",
    }
  );
  cy.intercept(
    "GET",
    "https://freesound.org/apiv2/search/text/?fields=id%2Cname%2Cpreviews%2Cduration%2Cnum_downloads%2Cusername%2Cnum_ratings&page_size=10&page=2&query=hello",
    {
      fixture: "search-results-page-2.json",
    }
  ).as("searchResultsPage2");
}

describe("Home Page", () => {
  beforeEach(() => {
    setupServerMocks();
  });

  it("should load the home page", () => {
    cy.visit("/");
    cy.get(`[data-e2e-id='SoundList']`).should("be.visible");
  });
});

describe("Pagination", () => {
  beforeEach(() => {
    setupServerMocks();
  });

  it("should show the second page of search results", () => {
    cy.visit("/search?q=hello");
    cy.get(`[data-e2e-id="SoundList-track-name"]`)
      .first()
      .should("be.visible")
      .should("have.text", "hello mr. foo");
    cy.get(`[data-e2e-id="SoundList-track-url"]`)
      .first()
      .should("be.visible")
      .should("have.attr", "href", "/sound/123");
    cy.get(`[data-e2e-id="first-page-button"]`).should("be.visible");
    cy.get(`[data-e2e-id="next-page-button"]`).click();
    cy.wait("@searchResultsPage2");
    cy.get(`[data-e2e-id="SoundList-track-name"]`)
      .first()
      .should("be.visible")
      .should("have.text", "hello123");

    cy.get(`[data-e2e-id="SoundList-track-url"]`)
      .first()
      .should("be.visible")
      .should("have.attr", "href", "/sound/343161");
  });
});

describe("Search functionality", () => {
  beforeEach(() => {
    setupServerMocks();
  });

  it("checks that the returned search results are correct", () => {
    cy.visit("/search?q=hello");
    cy.get(`[data-e2e-id="SoundList"]`).should("be.visible");
    cy.get(`[data-e2e-id="SoundList-track-name"]`)
      .first()
      .should("be.visible")
      .should("have.text", "hello mr. foo");
    cy.get(`[data-e2e-id="SoundList-track-url"]`)
      .first()
      .should("be.visible")
      .should("have.attr", "href", "/sound/123");
  });

  it("checks that search updates the url correctly", () => {
    cy.visit("/");
    cy.get(`[data-e2e-id="search-input"]`)
      .type("hello")
      .should("have.value", "hello");
    cy.url().should("include", "/search?q=hello");
  });
});

describe("Sound Page", () => {
  beforeEach(() => {
    setupServerMocks();
  });

  it("should load the page", () => {
    const testSoundId = "462808";
    cy.visit(`/sound/${testSoundId}`);
    cy.get(`[data-e2e-id="sound-title"]`)
      .should("be.visible")
      .should("have.text", "Music note 9");
  });
});
