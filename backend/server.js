const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const taskRoutes = require("./routes/tasks");

app.use(cors());
app.use(express.json());
app.use("/api/tasks/", taskRoutes);

app.get("/", (req, res) => {
  res.json({ message: "TaskApi is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
