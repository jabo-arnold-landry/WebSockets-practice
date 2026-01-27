const jwt = require("jsonwebtoken");

const verifyingUser = (req, res, next) => {
  const authHeaders = req.headers.Authorization || req.headers.authorization;
  if (!authHeaders)
    return res.status(403).json({ message: "Not allowed to attempt so" });
  let token = authHeaders.split(" ")[1];
  if (!token)
    return res
      .status(403)
      .json({ message: "session expired try to login again" });
  jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
    if (err) return res.status(401).json({ message: "invalid token" });
    req.user = data;
    next();
  });
};

module.exports = verifyingUser;
