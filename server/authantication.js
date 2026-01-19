const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const users = [];
//acc creation endpoints
router.post("/signup", async (req, res) => {
  const userData = req.body;
  if (!userData)
    return res.status(400).json({ message: "input the information please!" });
  users.push(userData);
  res.status(201).json({ message: "the created successfully" });
});

// acc verification endpoints
router.post("/login", async (req, res) => {
  const userData = req.body;
  const foundUser = users.find((user) => user.email === userData.email);
  if (!foundUser)
    return res
      .status(404)
      .json({ message: "the user is not part of the community!" });

  //signing token for the user
  const token = jwt.sign(foundUser, process.env.SECRET_KEY, {
    expiresIn: "2m",
  });
  res.status(200).json({ message: "Welcomeback", token });
});

module.exports = router;
