const Auth = require("../models/auth-model");
const axios = require("axios");

let accessToken;

exports.getArtist = async (req, res) => {
  const artistName = req.query.artist;
  const userId = req.query.userId;

  const userInfo = await Auth.findOne({ user_id: userId }).sort({ _id: -1 });

  accessToken = userInfo.access_token;
  const refreshToken = userInfo.refresh_token;

  // console.log({ userInfo });
  // console.log(accessToken);

  try {
    const SpotiRes = await axios.get(
      `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "*/*",
          Connection: "keep-alive",
        },
      }
    );

    res.send(SpotiRes.data);
  } catch (err) {
    try {
      const newToken = await axios.post(
        "http://localhost:8001/refresh-token?refresh_token=" + refreshToken
      );
      console.log(newToken.data);
      await userInfo.updateOne({
        access_token: newToken.data.access_token,
        refresh_token: newToken.data.refresh_token,
      });

      const SpotiRes = await axios.get(
        `https://api.spotify.com/v1/search?q=${artistName}&type=artist`,
        {
          headers: {
            Authorization: "Bearer " + newToken.data.access_token,
            Accept: "*/*",
            Connection: "keep-alive",
          },
        }
      );
      res.send(SpotiRes.data);
    } catch (err) {
      console.log(err);
    }
  }
};

exports.topFive = async (req, res) => {
  console.log({ accessToken });
  console.log(accessToken);
  console.log(req.query.artistId);
  const artistId = req.query.artistId;

  try {
    const SpotiRes = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US
    `,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "*/*",
          Connection: "keep-alive",
        },
      }
    );

    res.send(SpotiRes.data || "Top 5 not found");
  } catch (err) {
    console.log("💥");
    console.log(err);
    res.send("Top 5 not found");
  }

  // res.send(req.params.artistId)
};

exports.similar = async (req, res) => {
  console.log("in similar controlelr");
  console.log(req.query.artistId);
  const id = req.query.artistId;

  try {
    const SpotiRes = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/related-artists
    `,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          Accept: "*/*",
          Connection: "keep-alive",
        },
      }
    );

    console.log(SpotiRes.data.artists)
    res.send(SpotiRes.data.artists || "Similar artists not found");
  } catch (err) {
    console.log("💥");
    console.log(err);
    res.send("Similar artists not found");
  }
};
