//globalSetup.js file

const dotenv = require("dotenv");
async function globalSetup() {
  try {
    console.log("Running test in environment: %s", process.env.ENV);
    if (process.env.ENV) {
      dotenv.config({
        path: `.env.${process.env.ENV}`,
        override: true,
      });
    }
  } catch (error) {
    console.error("Error in loading environment variables", error);
  }
}
export default globalSetup;
