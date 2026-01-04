const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  reporter: "mochawesome",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: false,
    json: true
  },
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      config.env.username = process.env.CYPRESS_USERNAME;
      config.env.password = process.env.CYPRESS_PASSWORD;
      return config;
      // implement node event listeners here
    },
  },
  env: {
    allure: true
  },
  video: false,
  viewportWidth: 1280,
  viewportHeight: 720
});
