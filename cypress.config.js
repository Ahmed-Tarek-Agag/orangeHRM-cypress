const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");
const fs = require("fs-extra");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://opensource-demo.orangehrmlive.com/',

    setupNodeEvents(on, config) {
      // ✅ Allure Plugin
      allureWriter(on, config);

      // ✅ Clean old Allure reports before run
      on("before:run", async () => {
        console.log("Cleaning old Allure reports...");
        await fs.remove("allure-report");
        await fs.remove("allure-results");
      });

      // ✅ Environment variables from GitHub Actions
      config.env.username = process.env.CYPRESS_USERNAME;
      config.env.password = process.env.CYPRESS_PASSWORD;

      return config;
    },
  },

  video: true,
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 100000,
  pageLoadTimeout: 60000,

  // 🔥 ENV واحد فقط
  env: {
    allure: true,
    routes: {
      login: '/web/index.php/auth/login',
      dashboard: '/web/index.php/dashboard/index',
      pim: '/web/index.php/pim/viewEmployeeList'
    }
  }
});
