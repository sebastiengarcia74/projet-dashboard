const express = require("express");
const app = express();
const port = 8001;
require("dotenv/config");
const mongoose = require("mongoose");
const bp = require('body-parser')


var randomstring = require("randomstring");
randomstring.generate(16);

const authRoutes = require("./routes/auth");
const spotifyRoutes = require("./routes/spotify");
var cors = require("cors");
app.use(cors());
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


app.use(authRoutes);
app.use(spotifyRoutes);

app.use((req, res, next) => {
  res.json({ message: "coucou Spotify Express" });
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port);
  })
  .then(() => console.log("Spotify 🚀"))
  .catch((err) => {
    console.log(err);
  });
