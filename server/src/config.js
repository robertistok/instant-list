require("dotenv").config({ path: ".env" });

module.exports = {
  FRONTEND_URL: process.env.FRONTEND_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  PRISMA_ENDPOINT: process.env.PRISMA_ENDPOINT,
  WUNDERLIST_AUTH_CALLBACK: process.env.WUNDERLIST_AUTH_CALLBACK,
  WUNDERLIST_CLIENT_ID: process.env.WUNDERLIST_CLIENT_ID,
  WUNDERLIST_CLIENT_SECRET: process.env.WUNDERLIST_CLIENT_SECRET
};
