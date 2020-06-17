var express = require("express");
var router = express.Router();
const getGeocode = require("../utils/getGeocode");
const getForecast = require("../utils/getForecast.js")


/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const { city } = req.query;
    console.log(city);
    if (!city)
      return res.render("index", {
        title: "Awesome Weather App",
        APPKEY: process.env.MAPBOX_KEY,
      });
    //else
    //get the coordinates from the city name
    const location = await getGeocode(city);
    //use location coords to get the forecast
    // get coordinates from location.geometry.coordinates
    const forecast = await getForecast(location.geometry.coordinates)
    console.log(forecast.current.weather)
    return res.render("index", {
      title: "Awesome Weather App",
      forecast: forecast.current,
    })
  } catch (err) {
    next (err)
  }
});

module.exports = router;
