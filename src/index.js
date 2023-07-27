import './css/normalize.css'
import './css/style.css'

import {
  displayQuickWeatherInfoFahrenheit,
  toggleFahrenheitWeatherInfo,
  toggleCelsiusWeatherInfo,
  fetchWeatherFromSearchListen,
  displayExtraFahrenheitData,
  displayForecastFahrenheit
} from './displayController'

await displayQuickWeatherInfoFahrenheit()
await displayExtraFahrenheitData()
await displayForecastFahrenheit()
const fahrenheitBtn = document.getElementById('fahrenheit-btn')
fahrenheitBtn.classList.toggle('active')
toggleCelsiusWeatherInfo()
toggleFahrenheitWeatherInfo()
fetchWeatherFromSearchListen()
