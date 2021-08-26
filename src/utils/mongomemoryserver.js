const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

exports.dbConnect = async () => {
  const mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  mongoose
    .connect(uri, mongooseOpts)
    .then((connection) => console.log("mongo memory connected, "));
  
};

exports.dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};

// class dbConnect {

//   connect
//   disconnect
// }

// const 