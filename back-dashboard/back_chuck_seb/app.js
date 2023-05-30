
const axios = require('axios');
var cors = require('cors')
const express = require('express');

const app = express();
const PORT = 3005;

app.use(cors())

app.get('/api/quote', async (req, res) => {
	try {
	  const response = await axios.get('https://api.chucknorris.io/jokes/random');
	  res.send(response.data);
	} catch (error) {
	  console.error(error);
	  res.status(500).send('Error retrieving quote');
	}
  });

  app.get('/api/quote/:category', async (req, res) => {
	const { category } = req.params;
	const url = `https://api.chucknorris.io/jokes/random?category=${category}`;
	const response = await fetch(url);
	const data = await response.json();
	res.send(data);
  });

app.listen(PORT, (error) =>{
	if(!error)
		console.log("Server is Successfully Running, and App is listening on port "+ PORT)
	else
		console.log("Error occurred, server can't start", error);
	}
);
