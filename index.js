const express = require("express");
const app = express();
require("dotenv").config({path:"./config/.env"});
app.use(express.json());
const connectDB = require("./config/connectDB");
connectDB();
const routes = require("./Server/Server");

app.use("/api/user", routes);

const port = 5000;

app.listen(port, (err) => {
  err
    ? console.log("error", err)
    : console.log(`this server is running on ${port}`);
});
