require("dotenv").config();
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const response = [];
//import of modules section

const authRouters = require("./authantication");
const regenerateAccesToken = require("./refreshRegeneration");
const verifyingUser = require("./tokenVerification");
const { Idea, users } = require("./model/siteModels");
const listOfUsers = require("./allUser");

//accepting input from the client middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
); //allowing all origins to  make request to the server

app.use(cookieParse());

const httpServer = http.createServer(app); //creating http server
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
}); // creating an io instance
const PORT = 3000;

const messageRooms = io.of("/messages");

//socket middleware
/* io.use((socket, next) => {
  const token = socket.handshake.auth;
  const data = jwt.verify(token.user, process.env.SECRET_KEY);
  console.log(data);
  next();
});
*/
//io connection initiation
io.on("connection", (socket) => {
  const mappedUsers = io.of("/").sockets;
  const userList = [];
  for (let [id, socket] of mappedUsers) {
    userList.push({
      id,
    });
  }

  console.log(`Client ${socket.id} just connected`);
  io.emit("allofus", userList);

  socket.on("fromClient", (data) => {
    const postID = v4();
    const newPostInstance = new Idea(postID, data.postOwnerID, data.idea);
    const ideaOwner = users.find((user) => user.id === data.postOwnerID);
    let indexOwner = users.indexOf(ideaOwner);
    users[indexOwner].postCreated.push(postID);
    const { names, email } = ideaOwner;
    response.push({ ...newPostInstance, names, email });
    io.emit("liveData", response);
  });
});

messageRooms.on("connection", (socket) => {
  console.log(`new message from ${socket.id} came`);
  socket.on("message", (res) => {
    console.log(res);
  });
});

app.use("/ourblog", authRouters);
app.use(listOfUsers);

app.get("/currentTalk", verifyingUser, (req, res) => {
  let userDetails = req.user;
  res.status(200).json({ response, userDetails });
});
app.get("/newaccesToken", regenerateAccesToken);
app.get("/list", verifyingUser, async (req, res) => {
  res.status(200).json(response);
});
httpServer.listen(PORT, () =>
  console.log("successfully connected to " + "" + PORT),
);
