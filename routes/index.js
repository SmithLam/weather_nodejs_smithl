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
        title: "Weather Demon",
        APPKEY: process.env.MAPBOX_KEY,
      });
    //else
    //get the coordinates from the city name
    const location = await getGeocode(city);
    console.log(location.place_name)
    //use location coords to get the forecast
    // get coordinates from location.geometry.coordinates
    const forecast = await getForecast(location.geometry.coordinates)
    // console.log(forecast.current);
    // console.log(forecast.current.weather)
    const forecastEvery3Hours1Day = forecast.hourly.filter((item, index) => {
      if (index % 3 === 0 && index < 24) return item
    })
    console.log(forecastEvery3Hours1Day);
    return res.render("index", {
      title: "Weather Demon",
      forecast: forecast,
      currentForecast: forecast.current,
      location: location.place_name,
      hourlyForecast: forecastEvery3Hours1Day,
    })
  } catch (err) {
    next (err)
  }
});

module.exports = router;
