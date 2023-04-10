import { handleWeatherData } from './getWeatherInfo'

/* Displays quick glance weather info like city, condition, temp, and feels like */
const displayQuickWeatherInfo = async () => {
  const quickWeatherInfoDivs = document.querySelectorAll(
    '.quickWeatherInfo > *'
  )
  try {
    const weatherInfo = await handleWeatherData().quickWeatherInfo()
    const weatherInfoObj = [
      { weatherInfoKeys: Object.keys(weatherInfo) },
      { weatherInfoValues: Object.values(weatherInfo) }
    ]
    changeQuickWeatherInfo(weatherInfoObj, quickWeatherInfoDivs)
    /*  console.log(weatherInfo) */
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const changeQuickWeatherInfo = (weatherInfoObj, divs) => {
  const weatherInfoKeys = weatherInfoObj[0].weatherInfoKeys
  const weatherInfoValues = weatherInfoObj[1].weatherInfoValues
  console.log(weatherInfoKeys)
  console.log(weatherInfoValues)
  for (let i = 0; i < weatherInfoKeys.length; i++) {
    const newWeatherInfo =
      weatherInfoKeys[i] === 'currentConditions'
        ? (divs[i].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'locationName'
        ? (divs[i].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'currentTemp'
        ? (divs[i].textContent = `${weatherInfoValues[i]} °F `)
        : weatherInfoKeys[i] === 'feelsLikeF'
        ? (divs[i].textContent = `Feels like ${weatherInfoValues[i]} °F`)
        : null
  }
}

export { displayQuickWeatherInfo }
