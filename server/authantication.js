const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { AccountCreation } = require("./model/siteModels");
const { v4: uuid, v4 } = require("uuid");

const users = [
  {
    id: "7c30335f-b5eb-4975-92d6-7f477db6835e",
    names: "arnold",
    email: "arnoldjabo@gmail.com",
    postCreated: [],
    postCommented: [],
  },
];

//acc creation endpoints
router.post("/signup", async (req, res) => {
  const userData = req.body;
  const id = v4();

  if (!userData)
    return res.status(400).json({ message: "input the information please!" });

  const findEmail = users.find((user) => user.email === userData.email);
  if (findEmail)
    return res
      .status(400)
      .json({ message: "The email exists in the community" });

  const accInstance = new AccountCreation(id, userData.names, userData.email);
  users.unshift(accInstance);
  res.status(201).json({ message: "the user created successfully", users });
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
    expiresIn: "10s",
  });

  const refreshToken = jwt.sign(foundUser, process.env.REFRESH_KEY, {
    expiresIn: "30d",
  });

  res.cookie("token", refreshToken, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    secure: false,
    sameSite: "lax",
  });

  res.status(200).json({ message: "Welcomeback", accessToken });
});

module.exports = router;
