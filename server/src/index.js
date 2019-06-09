const cookieParser = require("cookie-parser");

const createServer = require("./createServer");
const db = require("./db");

const { FRONTEND_URL } = require("./config.js");

const server = createServer();

server.express.use(cookieParser());

server.start(
  {
    cors: {
      credentials: true,
      origin: FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
