const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const fs = require("fs-extra");

module.exports = defineConfig({

  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',

    setupNodeEvents(on, config) {

      // ===============================
      // 1️⃣ Mochawesome reporter plugin
      // Must be called first to avoid "missing config" error
      // ===============================
      require('cypress-mochawesome-reporter/plugin')(on);

      // ===============================
      // 2️⃣ Allure plugin
      // ===============================
      allureWriter(on, config);

      // ===============================
      // 3️⃣ before:run hook
      // Clean old reports before each run
      // ===============================
      on("before:run", async () => {
        console.log("Cleaning old Allure and Mochawesome reports...");

        // Remove Allure reports/results
        await fs.remove("allure-report");
        await fs.remove("allure-results");

        // Remove Mochawesome reports
        await fs.remove("cypress/reports");

        // Recreate reports folder for Mochawesome
        await fs.mkdir("cypress/reports");
      });

      // ===============================
      // Set environment variables
      // ===============================
      config.env.username = process.env.CYPRESS_USERNAME;
      config.env.password = process.env.CYPRESS_PASSWORD;

      return config;
    },
  },

  video: true, // Enable video recording

  // ===============================
  // Reporter configuration
  // ===============================
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    overwrite: true, // overwrite old JSON files if exist
    html: false,     // disable HTML here, we generate it via npm scripts
    json: true,
    quiet: true
  },

  env: {
    allure: true
  },

  viewportWidth: 1280,
  viewportHeight: 720
});
