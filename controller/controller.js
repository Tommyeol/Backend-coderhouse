const { PORT } = require("../config");

const home = (req, res) =>
  res
    .status(200)
    .send(
      `Express server cluster: ${PORT} - PID: ${
        process.pid
      } - Time and date: ${new Date().toLocaleString()}`
    );

module.exports.home = home;
