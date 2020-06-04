const express = require("express");
const path = require("path");
var cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const app = express();

//body parser
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// Connect Database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/api/hello", (req, res) => res.send("Hello World!"));

// Use routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/chores", require("./routes/api/chores"));
app.use("/api/houses", require("./routes/api/houses"));
app.use("/api/notifications", require("./routes/api/notifications"));
app.use("/api/bills", require("./routes/api/bills"));

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "/client/build/index.html"));
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running on port ${port}`));
