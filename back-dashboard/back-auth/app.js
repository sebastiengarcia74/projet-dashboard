const express = require("express");
const app = express();
const port = 8002;
require("dotenv/config");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use(authRoutes);

app.use((req, res, next) => {
  res.json({ message: "coucou User auth Express" });
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port);
  })
  .then(() => console.log("User Auth 🚀"))
  .catch((err) => {
    console.log(err);
  });
