const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");

const app = express();
dbConnection();

app.use(express.json());
app.use(cors());
app.use("/api/", require("./routes/todos"));

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
