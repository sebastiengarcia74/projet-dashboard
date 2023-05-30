const express = require('express');
const router = express.Router();
const app = express();
const port = 3008;
const fetch = require("node-fetch");
require("dotenv/config");
process.env.Nasa_API_KEY;


app.get('/nasa', async function (req, res) {
  const url = `https://api.nasa.gov/planetary/earth/imagery?lon=100.75&lat=1.5&date=2014-02-01&api_key=${Nasa_API_KEY}`


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
