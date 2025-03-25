const express = require("express");
const serverless = require("serverless-http");
const taskRoutes = require("./routes/taskRoutes");
const setupSwagger = require("./swagger");

const app = express();
setupSwagger(app); 
app.use(express.json());
app.use("/tasks", taskRoutes);




module.exports.app = serverless(app);
