const axios = require("axios");

const { TODOIST_CLIENT_ID, TODOIST_CLIENT_SECRET } = require("../config");

const Todoist = ({ clientId, clientSecret, ...rest }) => {
  let { accessToken } = rest;

  if (!clientId) {
    throw new Error("A clientId must be specified when instantiating the WunderList class");
  }

  const BASE_URL = "https://todoist.com/api/v8";

  const request = {
    post: {
      oauth: async ({ code }) => {
        const { data } = await axios({
          method: "post",
          url: `https://todoist.com/oauth/access_token`,
          data: {
            code,
            client_id: clientId,
            client_secret: clientSecret
          }
        });

        accessToken = data.access_token;

        return { accessToken: data.access_token };
      },

      sync: async () => {
        const { data } = await axios({
          method: "post",
          url: `${BASE_URL}/sync`
        });
      }
    },

    get: {
      // user: () => axios({ method: "get", url: `${BASE_URL}/user`, headers })
    }
  };

  return { request };
};

module.exports = Todoist({
  clientId: TODOIST_CLIENT_ID,
  clientSecret: TODOIST_CLIENT_SECRET
});
