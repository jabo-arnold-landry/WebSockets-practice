const express = require("express");
const router = express.Router();
const { users } = require("./model/siteModels");

router.get("/myusers", (req, res) => {
  res.status(200).json(users);
});

module.exports = router
