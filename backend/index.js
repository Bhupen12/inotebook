const express = require("express");
var cors = require("cors");

const connectToMongo = require("./db");
connectToMongo();

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routing
app.use("/api/note/", require("./routes/note"));
app.use("/api/auth/", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
