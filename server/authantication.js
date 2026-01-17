const express = require("express");
const router = express.Router();

const users = [];
//acc creation endpoints
router.post("/signup", async (req, res) => {
  const userData = req.body;
  if (!userData)
    return res.status(400).json({ message: "input the information please!" });
  users.push(userData);
  console.log(users);
  res.status(201).json({ message: "the created successfully" });
});

// acc verification endpoints
router.post("/login", async (req, res) => {
  const userData = req.body;
  if (!userData)
    return res.status(400).json({ message: "user input must not be empty" });
  const findingUser = users.find((user) => user.email === userData.email);
  if (findingUser) return res.json({ message: "welcome back!" });
  return res.status(404).json({ message: "User is not part of the community" });
});

module.exports = router
