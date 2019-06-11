const axios = require("axios");

const { WUNDERLIST_CLIENT_ID, WUNDERLIST_CLIENT_SECRET } = require("../config");

const WunderList = ({ clientId, clientSecret, ...rest }) => {
  const { accessToken } = rest;

  if (!clientId) {
    throw new Error("A clientId must be specified when instantiating the WunderList class");
  }

  const baseUrl = "https://a.wunderlist.com/api/v1";
  const headers = {
    "X-Client-ID": clientId,
    ...(accessToken && { "X-Access-Token": accessToken })
  };

  const request = {
    post: {
      oauth: async ({ code }) => {
        const { data } = await axios({
          method: "post",
          url: "https://www.wunderlist.com/oauth/access_token",
          headers,
          data: {
            code,
            client_id: clientId,
            client_secret: clientSecret
          }
        });

        headers["X-Access-Token"] = data.access_token;

        return { accessToken: data.access_token };
      }
    },

    get: {
      user: () => axios({ method: "get", url: `${baseUrl}/user`, headers })
    }
  };

  return { request };
};

module.exports = WunderList({
  clientId: WUNDERLIST_CLIENT_ID,
  clientSecret: WUNDERLIST_CLIENT_SECRET
});
