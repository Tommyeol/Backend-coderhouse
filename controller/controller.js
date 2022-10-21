const { PORT } = require("../config");

const home = (req, res) =>
  res.send(
    `Express server on port: ${PORT} - PID: ${
      process.pid
    } -Time and date: ${new Date().toLocaleString()}`
  );

module.exports.home = home;
