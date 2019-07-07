const axios = require("axios");

const {snakeCaseKeys} = require("./utils")
const { TODOIST_CLIENT_ID, TODOIST_CLIENT_SECRET } = require("../config");

const Todoist = ({ clientId, clientSecret, ...props }) => {
  let { accessToken } = props;
  const headers = {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` })
  };

  if (!clientId) {
    throw new Error("A clientId must be specified when instantiating the WunderList class");
  }

  const BASE_URL = "https://todoist.com/api/v8";
  const REST_API = "https://api.todoist.com/rest/v1";

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
        }).catch(console.log);

        accessToken = data.access_token;
        headers.Authorization = `Bearer ${accessToken}`;

        return { accessToken: data.access_token };
      },

      sync: async ({ resource_types = ["all"], sync_token = "*" }) => {
        const { data } = await axios({
          method: "post",
          url: `${BASE_URL}/sync`,
          data: { token: accessToken, resource_types, sync_token }
        }).catch(console.log);

        return data;
      }
    },

    get: {
      project: async ({ id }) => {
        const { projects } = await request.post.sync({ resource_types: ["projects"] });

        return projects.find(project => project.id === id);
      }
    }
  };

  const rest = {
    post: {
      tasks: async ({ data }) => {
        const { data: task } = await axios({
          method: "post",
          url: `${REST_API}/tasks`,
          data: snakeCaseKeys(data),
          headers: { ...headers, "Content-Type": "application/json" }
        }).catch(console.log);

        return task;
      }
    },

    get: {
      projects: () => axios({ method: "get", url: `${REST_API}/projects`, headers })
    }
  };

  return { request, rest, sync: request };
};

module.exports = ({ accessToken }) =>
  Todoist({
    accessToken,
    clientId: TODOIST_CLIENT_ID,
    clientSecret: TODOIST_CLIENT_SECRET
  });
