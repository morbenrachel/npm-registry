const _ = require("lodash");
const constants = require("../constants");
const request = require("request-promise-native");

const getDependenciesTree = async (name, version) => {
  try {
    let firstOrderDeps = await getFirstOrderDependency(name);
    let depTree = [];
    if (!_.isEmpty(_.get(firstOrderDeps, "dependencies", {}))) {
      _.forEach(firstOrderDeps.dependencies, async (key, value) => {
        depTree.push(getDependenciesTree(value, key));
      });
      let results = await Promise.all(depTree);
      return {
        name,
        version,
        dependencies: results
      };
    } else {
      return {
        name,
        version,
        dependencies: firstOrderDeps
      };
    }
  } catch (err) {
    console.log(err);
  }
};

const getFirstOrderDependency = async packageName => {
  const packageVersion = "latest";
  const response = await request(
    `${constants.NPM_BASE_URL}/${packageName}/${packageVersion}`,
    {
      resolveWithFullResponse: true,
      json: true
    }
  );
  const { name, version, dependencies } = response.body;
  return { name, version, dependencies };
};

module.exports = {
  getDependenciesTree
};
