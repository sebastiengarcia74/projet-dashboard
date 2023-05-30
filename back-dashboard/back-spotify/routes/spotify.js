const express = require("express");
const router = express.Router();
const spotifyController = require("../controllers/spotifyController");

router.get("/filter", (req, res) => {
  const { name, genre } = req.query;
  res.json(`artist name: ${name} - genre: ${genre}`);
});

router.post("/search", spotifyController.getArtist);
router.post("/top-five", spotifyController.topFive);
router.post("/similar", spotifyController.similar);

module.exports = router;
