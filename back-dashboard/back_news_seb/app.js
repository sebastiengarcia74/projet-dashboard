const express = require('express');
const axios = require('axios');
var cors = require('cors')
const app = express();
const PORT = 3006;

app.use(cors())
require("dotenv/config");
process.env.NEWS_API_KEY;



app.get('/api/news-sources', async (req, res) => {
    try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`);
        res.send(response.data);
        } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving news sources');
        }
});

app.get('/api/news-sources/:query', async (req, res) => {
    const { query } = req.params;
    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?apiKey=${process.env.NEWS_API_KEY}&pageSize=10&q=${query}`);
        res.send(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving news sources');
        }
});

	
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);