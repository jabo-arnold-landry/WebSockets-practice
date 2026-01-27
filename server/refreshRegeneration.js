const jwt = require("jsonwebtoken");

const regenerateAccesToken = async (req, res, next) => {
  const token = req.cookies;

  if (!token?.token) return res.status(403).json({ message: "not allowed" });
  jwt.verify(token.token, process.env.REFRESH_KEY, (err, data) => {
    if (err) {
      return res.status(401).json({ message: "invalid refresh token" });
    }
    const newAccessToken = jwt.sign(data, process.env.SECRET_KEY);
    res.status(200).json(newAccessToken);
  });
};

module.exports = regenerateAccesToken;
