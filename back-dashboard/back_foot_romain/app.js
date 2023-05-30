const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;
const fetch = require("node-fetch");


app.get('/foot', async function (req, res) {
  const url = `https://api-football-standings.azharimm.dev/leagues`


  try {

    fetch(url)
      .then(response => response.json())
      .then(json => res.json(json))
      .catch(err => console.error('error:' + err));
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;


app.listen(port, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port "+ port)
	else
		console.log("Error occurred, server can't start", error);
	}
);
