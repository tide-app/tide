/* eslint-disable jest/valid-expect, jest/expect-expect */
function setupServerMocks() {
  cy.server()
  cy.route('GET', 'https://freesound.org/apiv2/sounds/462808', 'fixture:sound.json')
  cy.route('GET', '/people/qfox123/packs/26158', 'fixture:sound.json')
  cy.route('GET', 'https://freesound.org/apiv2/packs/26158/', 'fixture:pack.json')
  cy.route('GET', 'https://freesound.org/apiv2/packs/26158/sounds/?fields=id%2Cname%2Cduration%2Cnum_downloads%2Cusername%2Cnum_ratings', 'fixture:pack-sounds.json')
  cy.route('GET', 'https://freesound.org/apiv2/sounds/462808/similar/?fields=id%2Cname%2Cduration%2Cnum_downloads%2Cusername%2Cnum_ratings', 'fixture:similar-sounds.json')
  cy.route('GET', 'https://freesound.org/data/previews/462/462808_8386274-lq.mp3', 'fixture:sound.mp3')
}

describe("Home Page", () => {
  beforeEach(() => {
    setupServerMocks()
  })

  it("should load ", () => {
    cy.visit("/");
    cy
      .get(`[data-e2e-id='SoundList']`)
      .should('be.visible')
  });
});

describe("Search functionality", () => {
  beforeEach(() => {
    setupServerMocks()
  })

  it("checks that search updates the url correctly ", () => {
    cy.visit("/");
    cy
      .get(`[name="sound-search"]`)
      .type('hello')
      .should('have.value', 'hello')
    cy.url().should('include', '/search?q=hello')
  });
});

describe("Sound Page", () => {
  beforeEach(() => {
    setupServerMocks()
  })

  it("should load the page", () => {
    const testSoundId = '462808';
    cy.visit(`/sound/${testSoundId}`);
    cy
      .get(`[data-e2e-id="sound-title"]`)
      .should('be.visible')
      .should('have.text', 'Music note 9')
  });
});
