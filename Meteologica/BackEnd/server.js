const express = require('express');
const path = require('path');
const app = express();

const SERVER_PORT = 3000;

const API_KEY = "G54JJBC4XQ7AFQBNNPRKBQL5N";

let MAX_FREE_FORECASTS = 5;

const preffixURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const suffixURL = "?unitGroup=metric&key=" + API_KEY + "&contentType=json";

app.set('view engine', 'ejs');

app.set('views', 'FrontEnd/src/views'); // Asegúrate de que la carpeta 'views' contenga tus plantillas en formato EJS

// Registrar el motor de plantillas personalizado (ejemplo con EJS)
app.engine('ejs', require('ejs').__express);

app.use(express.static('FrontEnd'));

// Ruta de ejemplo que renderiza una plantilla
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/forecasts', (req, res) => {
  res.render('forecasts', { 'api_key': API_KEY, 'max_free_forecasts': MAX_FREE_FORECASTS });
});

app.get('/weatherForecast', (req, res) => {

  if (MAX_FREE_FORECASTS > 0) {

    const city = req.query.city;

    const forecastType = req.query.forecastType;

    const forecastTypeErrorMessage = validateForecastAttribute(forecastType);

    if (city.length === 0) {
      res.status(400).json({ type: 0, message: "Please, write a city" });
    }
    else if (forecastTypeErrorMessage.length != 0) {
      res.status(400).json({ type: 0, message: forecastTypeErrorMessage});
    }
    else {
      let weatherApiURL = preffixURL + city.toLowerCase() + "/" + forecastType.toLowerCase() + suffixURL;

      fetch(weatherApiURL, {
        method: "GET"
      })
        .then(weatherAPIResponse => {
          if (!weatherAPIResponse.ok) {
            throw new Error("Invalid location");
          }
          else {
            return weatherAPIResponse.json();
          }
        })
        .then(weatherData => {
          MAX_FREE_FORECASTS -= 1;
          res.json(weatherData);
        })
        .catch(err => {
          res.status(400).json({ type: 0, message: err.message });

        });
    }

  }
  else {
    res.status(400).json({ type: 1, messages: ["Maximum number of free forecasts reached", "For more forecasts, you need the premium subscription", "Subscribe here"] });
  }

})



function validateForecastAttribute(forecastType) {


  if(typeof forecastType !== 'string'){
    return "Bad forecast type construction";
  }

  if(forecastType.length === 0){
    return "Please, choose a forecast type";
  }

  if (forecastType.toLowerCase() !== "next24hours" && forecastType.toLowerCase() !== "next7days") {
    return "The type of the forecast is not valid";
  }

  return "";
};

app.listen(SERVER_PORT);