const express = require("express");
const router = express.Router();
const { getDependenciesTree } = require("../utils/dependencyUtils");

/* GET package information. */
router.get("/:packageName/:packageVersion?", async (req, res, next) => {
  const { params } = req;
  const packageVersion = params.packageVersion || "latest";
  const deps = await getDependenciesTree(params.packageName, packageVersion);

  res.status(200).json({
    name: params.packageName,
    version: packageVersion,
    dependencies: deps
  });
});

module.exports = router;
