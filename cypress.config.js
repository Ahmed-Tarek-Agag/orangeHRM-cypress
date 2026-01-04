const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl : 'https://opensource-demo.orangehrmlive.com/',
    setupNodeEvents(on, config) {
      config.env.username = process.env.CYPRESS_USERNAME;
      config.env.password = process.env.CYPRESS_PASSWORD;
      return config;
      // implement node event listeners here
    },
  },
  viewportWidth: 1280,
  viewportHeight: 720
});
