const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({

  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      require('cypress-mochawesome-reporter/plugin')(on);
      config.env.username = process.env.CYPRESS_USERNAME;
      config.env.password = process.env.CYPRESS_PASSWORD;
      return config;
      // implement node event listeners here
    },
  },
  video: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    overwrite: false,
    html: false,
    json: true
  },
  env: {
    allure: true
  },

  viewportWidth: 1280,
  viewportHeight: 720
});
