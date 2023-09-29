const express = require("express");
var cors = require("cors");

const connectToMongo = require("./db");
connectToMongo();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routing
app.use("/api/note/", require("./routes/note"));
app.use("/api/auth/", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
