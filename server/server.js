require("dotenv").config();
const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const cors = require("cors");
const cookieParse = require("cookie-parser");

const response = [
  {
    idea: "jkl\n",
    id: "76976e86-8b9c-4135-b4c8-bf047934151b",
    comments: [],
  },
  {
    idea: "hj,.\n",
    id: "07b5f904-8ac3-427a-8c3c-c2359887e922",
    comments: [],
  },
  {
    idea: "kjkj",
    id: "49d6edcc-398c-40d6-ae9b-ed716cb0f103",
    comments: [],
  },
];
//import of modules section
const authRouters = require("./authantication");
const tokenVerificationModules = require("./tokenVerification");
const regenerateAccesToken = require("./refreshRegeneration");
const verifyingUser = require("./tokenVerification");
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
    console.log(data);
    response.push(data);
    io.emit("liveData", response);
  });
  socket.on("comment", (req) => {
    const targetContent = response.find((idea) => idea.id === req.contentId);
    targetContent["comments"].push(req.comment);

    io.emit("commented", response);
  });
});

app.use("/ourblog", authRouters);
app.get("/currentTalk", tokenVerificationModules, (req, res) => {
  res.status(200).json(response);
});
app.get("/newaccesToken", regenerateAccesToken);
app.get("/list", verifyingUser, async (req, res) => {
  res.status(200).json(response);
});
httpServer.listen(PORT, () =>
  console.log("successfully connected to " + "" + PORT),
);
