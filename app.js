const express = require("express");
const router = require("./routes/index");

const app = express();
app.use(express.json());
app.use("/", router);

//Server
app.listen(process.env.PORT || 8080, () => {
  console.log("SERVER ON");
});

//Error handler
app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500).send("Error has been encountered " + err);
});
