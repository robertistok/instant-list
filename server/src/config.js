require("dotenv").config({ path: ".env" });

module.exports = {
  PRISMA_ENDPOINT: process.env.PRISMA_ENDPOINT,
  FRONTEND_URL: process.env.FRONTEND_URL
};
