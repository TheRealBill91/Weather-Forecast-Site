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
toggleCelsiusWeatherInfo()
toggleFahrenheitWeatherInfo()
fetchWeatherFromSearchListen()
