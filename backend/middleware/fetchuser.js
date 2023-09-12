const jwt = require("jsonwebtoken");
const JWT_TOKEN = "mynameisbhupen";

const fetchuser = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "Please autheticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_TOKEN);
    req.user = data.user;
    next();
  } catch {
    res.status(401).send({ error: "Please authenticate using valid token" });
  }
};

module.exports = fetchuser;
