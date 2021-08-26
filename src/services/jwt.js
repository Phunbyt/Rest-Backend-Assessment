require("dotenv").config({ path: require("find-config")(".env") });

const { sign, verify } = require("jsonwebtoken");

const createToken = (user) => {
  const { username, _id } = user;
  const accessToken = sign(
    { username: username, id: _id },
    process.env.TOKEN_KEY
  );
  return accessToken;
};

const validateToken = (req, res, next) => {
    // const {body} = req;
  const accessToken = req.headers.cookie.split("=")[1];

  if (!accessToken)
    return res.status(400).json({ error: "User not Authenticated" });

  try {
    const validToken = verify(accessToken, process.env.TOKEN_KEY);
    if (validToken) {
        req.authenticated = true;
      return next();
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};

module.exports = {
  createToken,
  validateToken,
};
