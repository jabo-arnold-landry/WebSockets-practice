const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require("http");

//accepting input from the client middleware
app.use(express.json());

const httpServer = http.createServer(app); //creating http server
const io = new Server(httpServer); // creating an io instance
const PORT = 3000;

//io connection initiation
io.on("connection", (socket) => {
  console.log(`Client ${socket.id} just connected`);
});

httpServer.listen(PORT, () =>
  console.log("successfully connected to " + "" + PORT)
);
