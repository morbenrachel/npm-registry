const express = require("express");
const request = require("request-promise-native");
const router = express.Router();

/* GET package information. */
router.get("/:packageName/:packageVersion?", async (req, res, next) => {
  console.log("inside package name get");
  const { params } = req;
  const packageVersion = params.packageVersion || "latest";

  const npmRes = await request(
    `https://registry.npmjs.org/${params.packageName}/${packageVersion}`,
    {
      resolveWithFullResponse: true,
      json: true
    }
  );

  const { name, version, dependencies } = npmRes.body;

  console.log(`name: ${name} version: ${version} deps: ${dependencies}`);

  res.status(npmRes.statusCode).json({
    name,
    version,
    dependencies
  });
});

module.exports = router;
