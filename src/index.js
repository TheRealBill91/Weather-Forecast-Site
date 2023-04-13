import './css/normalize.css'
import './css/style.css'

import {
  fetchWeatherData,
  handleFetchWeatherFromSearch,
  processWeatherFromSearch
} from './getCurrentWeatherInfo'

import {
  displayQuickWeatherInfoFahrenheit,
  toggleQuickWeatherInfoCelsius,
  toggleQuickWeatherInfoFahrenheit,
  fetchWeatherFromSearchListen,
  displayExtraFahrenheitData
} from './displayController'

/* fetchWeatherData() */
displayQuickWeatherInfoFahrenheit()
displayExtraFahrenheitData()
toggleQuickWeatherInfoCelsius()
toggleQuickWeatherInfoFahrenheit()
fetchWeatherFromSearchListen()
