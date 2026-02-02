require("dotenv").config();
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const cors = require("cors");
const cookieParse = require("cookie-parser");
const { v4 } = require("uuid");

const response = [];
//import of modules section
const authRouters = require("./authantication");
const tokenVerificationModules = require("./tokenVerification");
const regenerateAccesToken = require("./refreshRegeneration");
const verifyingUser = require("./tokenVerification");
const { Idea, users } = require("./model/siteModels");
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

//io connection initiation
io.on("connection", (socket) => {
  console.log(`Client ${socket.id} just connected`);
  socket.on("fromClient", (data) => {
    const postID = v4();
    const newPostInstance = new Idea(postID, data.commenterID, data.idea);
    const ideaOwner = users.findIndex((user) => user.id === data.commenterID);
    users[ideaOwner].postCreated.push(postID);
    response.push(newPostInstance);
    io.emit("liveData", response);
  });
  socket.on("comment", (req) => {
    const targetContent = response.find((idea) => idea.id === req.contentId);
    targetContent["comments"].push(req.comment);

    io.emit("commented", response);
  });
});

app.use("/ourblog", authRouters);
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
