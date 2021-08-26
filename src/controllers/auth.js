import User from "../entities/user";
import Token from "../entities/token";
import { signInSchema } from "../schemas/authSchema";
const bcrypt = require("bcrypt");
const sendmail = require("../utils/sendmail");
const crypto = require("crypto");
const Joi = require("joi");

require("dotenv").config({ path: require("find-config")(".env") });
const { createToken } = require("../services/jwt.js");

/**
 * Given a json request
 * {"username": "<...>", "password": "<...>"}
 * Verify the user is valid and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400);
      throw new Error("user not found");
    }

    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
      if (!match) {
        res.status(400).json("username or password is incorrect");
      } else {
        const accessToken = createToken(user);
        res.cookie("access-token", accessToken, {
          maxAge: 3600 * 24 * 60 * 60,
          httpOnly: true,
        });
        res.send(user);
      }
    });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

/**
 * Given a json request
 * {"username": "<...>", "password": "<...>"}
 * Create a new user and return some authentication token
 * which can be used to verify protected resources
 * {"user": <{...}>, "token": "<...>""}
 */
export const signup = async (req, res) => {
  try {
    console.log(req.body);
    const validUser = signInSchema(req.body);
    if (validUser.error) {
      throw new Error(validUser.error);
    }

    const { email, username, password, name } = validUser.value;

    const oldUser = await User.findOne({ email, username });

    if (oldUser) {
      return res.status(409).json({ err: "User Already Exist. Please Login" });
    }

    const newUser = await new User({
      email,
      username,
      password,
      name,
    }).save();

    res.status(200).json({ newUser });
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

/**
 * Implement a way to recover user accounts
 */
export const forgotPassword = async (req, res) => {
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details);

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .json({ err: "user with given email doesn't exist" });

    let token = await Token.findOne({ userId: user._id });
    if (!token) {
      token = await new Token({
        userId: user._id,
        token: crypto.randomBytes(32).toString("hex"),
      }).save();
    }

    const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;
    const sent = await sendmail(user.email, "Password reset", link);

    res.json({
      message: "password reset link sent to your email account",
      link,
      sent,
    });
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};

export const passwordReset = async (req, res) => {
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await User.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link or expired");

    user.password = req.body.password;
    await user.save();
    await token.delete();

    res.send("password reset sucessfully.");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
};

export default {
  login,
  signup,
  forgotPassword,
  passwordReset,
};
