import mongoose from "mongoose";
import logger from "./logger";

const { dbConnect } = require("./mongomemoryserver");
require("dotenv").config({ path: require("find-config")(".env") });

mongoose.Promise = global.Promise;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.PASS}@cluster0.fjd3p.mongodb.net/address_book?retryWrites=true&w=majority`;

const dev = "dev";
const connection = mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

// if (process.env.NODE_ENV === "test") {
// 	dbConnect();
// } else {

// }
connection
  .then((db) => {
    logger.info(`Successfully connected to  MongoDB cluster.`);
    return db;
  })
  .catch((err) => {
    if (err.message.code === "ETIMEDOUT") {
      logger.info("Attempting to re-establish database connection.");
      mongoose.connect(uri);
    } else {
      logger.error("Error while attempting to connect to database:");
      logger.error(err);
    }
  });

export default connection;
