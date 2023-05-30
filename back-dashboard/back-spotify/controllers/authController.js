const Auth = require("../models/auth-model");
var randomstring = require("randomstring");
const axios = require("axios");
const request = require('request')

randomstring.generate(16);

var client_id = process.env.CLIENT_ID;
var client_secret = process.env.CLIENT_SECRET;
console.log(client_id);
console.log(client_secret);
var redirect_uri = "http://localhost:8001/callback";

let userId = "";

exports.login = (req, res) => {
  userId = req.params.userId;
  console.log({ userId });

  var state = randomstring.generate(16);

  var scope =
    "user-read-recently-played user-library-read user-library-modify user-read-recently-played user-top-read user-read-private user-read-email playlist-modify-public playlist-read-private playlist-modify-private";

  const params = {
    response_type: "code",
    client_id: client_id,
    scope: scope,
    redirect_uri: redirect_uri,
    state: state,
  };

  const qs = new URLSearchParams(params);

  const url = "https://accounts.spotify.com/authorize?" + qs.toString();
  console.log(url);
  res.redirect(url);
};

exports.callback = (req, res) => {
  console.log("in callback");
  // console.log(res)
  console.log(req.query.code);

  var code = req.query.code || null;
  var state = req.query.state || null;

  const param = {
    error: "state_mismatch",
  };
  const qs = new URLSearchParams(param);

  if (state === null) {
    res.redirect("/#" + qs.toString());
    return;
  } else {
    var authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: "authorization_code",
      },
      headers: {
        Authorization:
          "Basic " +
          new Buffer.from(client_id + ":" + client_secret).toString("base64"),
      },
      json: true,
    };

    authOptionsFormCode = authOptions.form.code;

    // ADD FORM.CODE ^
    const resParams = {
      auth_code: code,
      header_auth: authOptions.headers.Authorization,
    };

    const resQs = new URLSearchParams(resParams);

    const redUrl = "/account?" + resQs.toString();
    console.log({ redUrl });

    res.redirect(redUrl);
  }
};

exports.account = async (req, res) => {
  console.log("☑️");

  const auth_code = req.query.auth_code;

  const header_auth = req.query.header_auth;

  const param = {
    grant_type: "authorization_code",
    code: auth_code,
    redirect_uri: redirect_uri,
  };
  const qs = new URLSearchParams(param);

  try {
    const spotifyResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      qs.toString(),
      {
        headers: {
          Authorization: header_auth,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log(spotifyResponse.data);

    process.env.CLIENT_ACCESS_TOKEN = spotifyResponse.data.access_token;
    process.env.CLIENT_REFRESH_TOKEN = spotifyResponse.data.refresh_token;

    // MONGO
    const auth = new Auth({
      user_id: userId,
      access_token: process.env.CLIENT_ACCESS_TOKEN,
      refresh_token: process.env.CLIENT_REFRESH_TOKEN,
    });
    auth
      .save()
      .then(() => {
        console.log("new user auth added!");
        
        const message = { connected: true };

        const msgQs = new URLSearchParams(message);

        res.status(200).redirect("http://localhost:3000?" + msgQs);
      })
      .catch((err) => {
        console.log(err);
        const message = { success: false, message: 'log in unsuccesful' };
        const msgQs = new URLSearchParams(message);
        res.status(401).redirect("http://localhost:3000?message=" + msgQs);
      });

   
  } catch (e) {
    console.log("🤔");
    console.log(e);
    const message = { success: false, message: 'log in unsuccesful' };
    const msgQs = new URLSearchParams(message);
    res.status(401).redirect("http://localhost:3000?message=" + msgQs);
  }
};


exports.refreshToken = (req, res) => {
  
  const refresh_token = req.query["refresh_token"];
  
  var authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: {
      Authorization:
        "Basic " +
        new Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    // console.log(response);
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      var refresh_token = body.refresh_token;
      res.send({
        access_token: access_token,
        refresh_token: refresh_token,
      });
    }
  });
};
