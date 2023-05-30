require("dotenv/config");
const express = require('express')
const app = express()
const port = 3020
var cors = require('cors')

app.use(cors())

app.get('/CO', async (req, res) => {


    const options = {
        "method": "GET",
        "headers": {
            "x-api-key":process.env.ApiIQAIR}}
    const tmp = await (await fetch("https://api.ambeedata.com/latest/by-lat-lng?lat=48.866667&lng=2.333333", options )).json();

    //console.log(tmp);

  res.send(tmp)
})

app.get('/getcity', async (req, res) => {

  const cities = await fetch("https://api.airvisual.com/v2/cities?state=Ile-de-France&country=france&key=8bd43c29-eb3f-4e78-824d-bfa920641893")
  .then(data => data.json())
  .then(res => res.data)

  console.log(cities);

res.send(cities)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


// app.get('/Paris', async (req, res) => {

//   const options = {
//       "method": "GET",
//       "headers": {
//           "x-api-key": process.env.ApiIQAIR}},
//           "Content-type": "application/json"

//       }
//   };
//   const tmp = await (await fetch(" https://api.ambeedata.com/latest/by-lat-lng?lat=48&lng=2", options )).json();

//   console.log(tmp);

// res.send(tmp)
// })

// app.listen(port, () => {
// console.log(`Example app listening on port ${port}`)
// })







// app.get('/Mexico', async (req, res) => {

//   const options = {
//       "method": "GET",
//       "headers": {
//           "x-api-key": "bb96deb2f61a923c52259fa14ff2f2bf7524b637268043af3bcb0060d680e626",
//           "Content-type": "application/json"

//       }
//   };
//   const tmp = await (await fetch(" https://api.ambeedata.com/latest/by-lat-lng?lat=19.432608&lng=-99.133208", options )).json();

//   console.log(tmp);

// res.send(tmp)
// })

// app.listen(port, () => {
// console.log(`Example app listening on port ${port}`)
// })


// app.get('/New-york', async (req, res) => {

//   const options = {
//       "method": "GET",
//       "headers": {
//           "x-api-key": "bb96deb2f61a923c52259fa14ff2f2bf7524b637268043af3bcb0060d680e626",
//           "Content-type": "application/json"

//       }
//   };
//   const tmp = await (await fetch(" https://api.ambeedata.com/latest/by-lat-lng?lat=40.4251&lng=74.0021", options )).json();

//   console.log(tmp);

// res.send(tmp)
// })

// app.listen(port, () => {
// console.log(`Example app listening on port ${port}`)
// })

// app.get('/London', async (req, res) => {

//   const options = {
//       "method": "GET",
//       "headers": {
//           "x-api-key": "bb96deb2f61a923c52259fa14ff2f2bf7524b637268043af3bcb0060d680e626",
//           "Content-type": "application/json"

//       }
//   };
//   const tmp = await (await fetch(" https://api.ambeedata.com/latest/by-lat-lng?lat=51.509093&lng=-0.094151", options )).json();

//   console.log(tmp);

// res.send(tmp)
// })

// app.listen(port, () => {
// console.log(`Example app listening on port ${port}`)
// })

