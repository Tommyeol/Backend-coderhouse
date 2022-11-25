const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const logger = require("morgan");
const app = express();
const dotenv = require("dotenv");

//  .env config
dotenv.config();

require("./database/connection");

app.use(logger("dev"));
app.use(compression());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Server protection
app.use((err, req, res, next) => {
    console.error(err.message);
    return res.status(500).send("Something broke");
});

const usersRouter = require("./routes/users");
const messagesRouter = require("./routes/messages");
app.use("/api", usersRouter);
app.use("/api", messagesRouter);

// Port
const PORT = process.env.PORT || 8080;

// Listening server
const server = app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});

// Error message
server.on("error", (error) => {
    console.log("server error:", error);
});
