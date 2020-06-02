const express = require("express");
const path = require("path");
var cors = require("cors");

const app = express();

// cors
app.use(cors({ origin: true, credentials: true }));

app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Client server running on port ${port}`));
