const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 3000;
require('dotenv').config();


app.use(express.static(path.join(__dirname, "public")));
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const routes = require("./routes/allroutes");
app.use("/", routes);

app.listen(port, () => {
  console.log(`Servern kör på http://localhost:${port}`);
});
console.log("Server.js körs");

app.get("/", (req, res) => {
  res.send("Välkommen till servern!");
});
