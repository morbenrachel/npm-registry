const BodyParser = require("body-parser");
const Express = require("express");
const packageRoute = require("./routes/package");

const app = Express();
const port = process.env.PORT || 5000;

app.use(BodyParser.json());

app.use("/package", packageRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));
