const mongoose = require("mongoose");
const config = require("config");

const db = config.get("dbURI");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

const connectDB = async () => {
  const config = {
    autoIndex: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };
  try {
    await mongoose.connect(db, { config });

    console.log("\nMongoDB is Connected...\n");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
