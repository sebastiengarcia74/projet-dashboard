const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const spotifyToken = new Schema({
  user_id: {
    type: String,
  },
  access_token: {
    type: String,
  },
  refresh_token: {
    type: String,
  }
});

module.exports = mongoose.model("SpotifyToken", spotifyToken);
