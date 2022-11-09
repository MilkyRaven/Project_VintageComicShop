const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// GET map page with all the postinos
router.get("/map", (req, res) => {
  // Define the locations of the map with the info we want to display in the popup
  const location =  [2.154007, 41.390205]

  // Define the dislay of the map
  const mapCenter = location
  const mapZoom = 15

  // Render the map
  res.render("map", { location, mapCenter, mapZoom  })
})


module.exports = router;
