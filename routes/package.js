const express = require("express");
// const request = require("request-promise-native");
const router = express.Router();

const { getDependencyTree } = require("../utils/dependencyUtils");

//todo export logic to util that will work recursively
//for each package store results
//all fetches need to resolve before returning data
//package: {packageName: 'name', dependencies: [{package}]}

/* GET package information. */
router.get("/:packageName/:packageVersion?", async (req, res, next) => {
  console.log("inside package name get");

  const { params } = req;
  const packageVersion = params.packageVersion || "latest";
  const npmRes = await getDependencyTree(params.packageName, packageVersion);

  const { name, version, dependencies } = npmRes.body;

  res.status(npmRes.statusCode).json({
    name,
    version,
    dependencies
  });
});

module.exports = router;
