import './css/normalize.css'
import './css/style.css'

import {
  displayQuickWeatherInfoFahrenheit,
  toggleQuickWeatherInfoCelsius,
  toggleQuickWeatherInfoFahrenheit,
  fetchWeatherFromSearchListen,
  displayExtraFahrenheitData
} from './displayController'

await displayQuickWeatherInfoFahrenheit()
await displayExtraFahrenheitData()
toggleQuickWeatherInfoCelsius()
toggleQuickWeatherInfoFahrenheit()
fetchWeatherFromSearchListen()
