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
  fetchWeatherFromSearchListen
} from './displayController'

/* fetchWeatherData() */
displayQuickWeatherInfoFahrenheit()
toggleQuickWeatherInfoCelsius()
toggleQuickWeatherInfoFahrenheit()
fetchWeatherFromSearchListen()
