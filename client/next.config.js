const withPlugins = require("next-compose-plugins");
const withCSS = require("@zeit/next-css");
const publicRuntimeConfig = require("./config");

const nextConfig = {
  publicRuntimeConfig
};

module.exports = withPlugins([withCSS], nextConfig);
