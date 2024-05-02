const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");
var cors = require("cors");

const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4200",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("chat", (data) => io.emit("chat", data));
  socket.on("typing", (data) => io.emit("typing", data));
});

server.listen(3100, () => {
  console.log("server running at http://localhost:3100");
});
