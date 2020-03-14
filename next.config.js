require("dotenv").config({ path: "./.env" });

module.exports = {
  env: {
    IDENTITY_POOL_ID: process.env.IDENTITY_POOL_ID,
    API_KEY: process.env.API_KEY
  },
  target: "serverless"
};
