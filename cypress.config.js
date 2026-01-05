const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const fs = require("fs-extra");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',

    setupNodeEvents(on, config) {
      // 🔹 Allure Plugin
      allureWriter(on, config);

      // 🔹 Clean old Allure reports before each run
      on("before:run", async () => {
        console.log("Cleaning old Allure reports...");
        await fs.remove("allure-report");   // remove old Allure reports
        await fs.remove("allure-results");  // remove old Allure results
      });

      // 🔹 Environment variables
      config.env.username = process.env.CYPRESS_USERNAME;
      config.env.password = process.env.CYPRESS_PASSWORD;

      return config;
    },
  },

  // 🔹 General settings
  video: true,
  viewportWidth: 1280,
  viewportHeight: 720,

  env: {
    allure: true
  }
});
