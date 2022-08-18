const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const PORT = 8080;
const app = express();
app.use(express.static("public"));
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const messages = [
  { author: "Jeremy", text: "Hey whats up?" },
  { author: "Juliet", text: "Im great how are you?" },
  { author: "John", text: "Great!" },
];

io.on("connection", (socket) => {
  console.log("Client has been connected");
  io.sockets.emit("messages", messages);
  socket.emit("messages", messages);
  socket.on("new-message", (data) => {
    messages.push(data);
    io.sockets.emit("messages", messages);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
