// const _ = require("lodash");
const constants = require("../constants");
const request = require("request-promise-native");

const getDependencyTree = async (packageName, packageVersion) => {
  const response = await request(
    `${constants.NPM_BASE_URL}/${packageName}/${packageVersion}`,
    {
      resolveWithFullResponse: true,
      json: true
    }
  );
  return response;
};

module.exports = { getDependencyTree };
