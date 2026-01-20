const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const users = [
  {
    names: "jabo",
    email: "arnoldjabo@gmail.com",
  },
];
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
  const accessToken = jwt.sign(foundUser, process.env.SECRET_KEY, {
    expiresIn: "2m",
  });

  const refreshToken = jwt.sign(foundUser, process.env.REFRESH_KEY, {
    expiresIn: "20m",
  });
  res.cookie("token", refreshToken, { httpOnly: true, maxAge: 60 * 60 * 1000 });

  res.status(200).json({ message: "Welcomeback", accessToken });
});

module.exports = router;
