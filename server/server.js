const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const response = [];
//accepting input from the client middleware
app.use(express.json());

const httpServer = http.createServer(app); //creating http server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
}); // creating an io instance
const PORT = 3000;

//io connection initiation
io.on("connection", (socket) => {
  console.log(`Client ${socket.id} just connected`);
  socket.on("fromClient", (data) => {
    response.push(data);
    io.emit("liveData", response);
  });
});

httpServer.listen(PORT, () =>
  console.log("successfully connected to " + "" + PORT)
);
