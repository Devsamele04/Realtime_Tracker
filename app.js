const express = require("express");
const app = express();
const path = require("path");

const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

// Set view engine
app.set("view engine", "ejs");

// Static files serve karo (correct way)
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("receive-location", { id: socket.id, ...data });
  });
  socket.on("disconnect", function () {
    io.emit("user-disconnected", socket.id);
  });
});

// Route
app.get("/", function (req, res) {
  res.render("index");
});

// Server listen
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
