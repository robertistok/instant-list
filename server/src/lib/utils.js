const lodash = require("lodash");

const snakeCaseKeys = obj =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [lodash.snakeCase(key)]: value
    }),
    {}
  );

module.exports = { snakeCaseKeys };
