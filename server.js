const BodyParser = require("body-parser");
const Express = require("express");
const dependenciesRouter = require("./routes/package");

const app = Express();
const port = process.env.PORT || 5000;
const data = "bla";

app.use(BodyParser.json());

app.use("/package", dependenciesRouter);
// app.get("/api", (req, res) => {
//   res.send(data);
// });

// app.get("/package", (req, res) => {
//   console.log("server package " + req);
//   res.send(data);
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
