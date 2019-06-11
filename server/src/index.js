const cookieParser = require("cookie-parser");

const createServer = require("./createServer");
const db = require("./db");
const { FRONTEND_URL } = require("./config.js");

const { verifyToken } = require("./lib/jwt");

const server = createServer();

server.express.use(cookieParser());

server.express.use((req, res, next) => {
  const { token } = req.cookies;

  if (token) {
    const { userId } = verifyToken(token);
    req.userId = userId;
  }

  next();
});

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
