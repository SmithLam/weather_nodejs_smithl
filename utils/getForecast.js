const axios = require("axios");

const getForecast = async ([lon, lat]) => {
  try {
    const token = process.env.WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=daily,minutely&appid=${token}&units=metric`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    throw err;
  }
};

module.exports = getForecast;
