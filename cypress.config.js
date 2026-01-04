const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const fs = require("fs-extra");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',

    setupNodeEvents(on, config) {
      // Allure plugin
      allureWriter(on, config);

      // Clean Allure before run
      on("before:run", async () => {
        console.log("Cleaning old Allure reports...");
        await fs.remove("allure-report");
        await fs.remove("allure-results");

        console.log("Cleaning old Mochawesome reports...");
        await fs.remove("cypress/reports");
      });

      // Mochawesome plugin
      require('cypress-mochawesome-reporter/plugin')(on);

      // Environment variables
      config.env.username = process.env.CYPRESS_USERNAME;
      config.env.password = process.env.CYPRESS_PASSWORD;

      return config;
    },
  },

  video: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    overwrite: true, // overwrite old files
    html: false,
    json: true,
    quiet: true
  },

  env: {
    allure: true
  },

  viewportWidth: 1280,
  viewportHeight: 720
});
