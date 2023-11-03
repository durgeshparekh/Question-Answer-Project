const express = require("express");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const constants = require("./constants");
const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/departments", departmentRoutes);

app.listen(constants.port, () => {
  console.log(`Server started on port ${constants.port}`);
});
