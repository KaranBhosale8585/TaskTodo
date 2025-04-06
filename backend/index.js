const express = require("express");
const app = express();
require("dotenv").config();
require("./models/db");
const PORT = process.env.PORT || 8080;
const TaskRouter = require("./routes/TaskRouter");
const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(bodyParser.json());

app.use("/tasks", TaskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`);
});
