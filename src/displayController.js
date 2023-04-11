import {
  handleWeatherData,
  handleFetchWeatherFromSearch,
  processWeatherFromSearch,
  setProcessedData,
  getProcessedData
} from './getWeatherInfo'

// Displays quick glance weather info like city, condition, temp, and feels like
// in fahrenheit (by default)
const displayQuickWeatherInfoFahrenheit = async () => {
  const quickWeatherInfoDivs = document.querySelectorAll(
    '.quickWeatherInfo > *'
  )
  try {
    /* const weatherInfo = await handleWeatherData().quickWeatherInfoFahrenheit()
    setProcessedData(weatherInfo) */

    /* If processed data does not exist (users reloads the page), fetch and process
    weather data from default location */
    let processedData = getProcessedData()
    if (processedData.length === 0) {
      await handleWeatherData()
      processedData = getProcessedData()
    }
    const fahrenheitData = processedData[0]
    const weatherInfoObj = [
      { weatherInfoKeys: Object.keys(fahrenheitData) },
      { weatherInfoValues: Object.values(fahrenheitData) }
    ]
    changeQuickWeatherInfoFahrenheit(weatherInfoObj, quickWeatherInfoDivs)
    /*  console.log(weatherInfo) */
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const displayQuickWeatherInfoCelsius = async () => {
  const quickWeatherInfoDivs = document.querySelectorAll(
    '.quickWeatherInfo > *'
  )
  try {
    /*     const weatherInfo = await handleWeatherData().quickWeatherInfoCelsius() */
    const processedData = getProcessedData()
    const CelsiusData = processedData[1]
    const weatherInfoObj = [
      { weatherInfoKeys: Object.keys(CelsiusData) },
      { weatherInfoValues: Object.values(CelsiusData) }
    ]
    changeQuickWeatherInfoCelsius(weatherInfoObj, quickWeatherInfoDivs)
    /*  console.log(weatherInfo) */
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const changeQuickWeatherInfoFahrenheit = (weatherInfoObj, divs) => {
  const weatherInfoKeys = weatherInfoObj[0].weatherInfoKeys
  const weatherInfoValues = weatherInfoObj[1].weatherInfoValues
  /*  console.log(weatherInfoKeys)
  console.log(weatherInfoValues) */
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

const changeQuickWeatherInfoCelsius = (weatherInfoObj, divs) => {
  const weatherInfoKeys = weatherInfoObj[0].weatherInfoKeys
  const weatherInfoValues = weatherInfoObj[1].weatherInfoValues
  /*   console.log(weatherInfoKeys)
  console.log(weatherInfoValues) */
  for (let i = 0; i < weatherInfoKeys.length; i++) {
    const newWeatherInfo =
      weatherInfoKeys[i] === 'currentConditions'
        ? (divs[i].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'locationName'
        ? (divs[i].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'currentTemp'
        ? (divs[i].textContent = `${weatherInfoValues[i]} °C `)
        : weatherInfoKeys[i] === 'feelsLikeC'
        ? (divs[i].textContent = `Feels like ${weatherInfoValues[i]} °C`)
        : null
  }
}

const toggleQuickWeatherInfoCelsius = () => {
  const celsiusBtn = document.getElementById('celsius-btn')
  const fahrenheitBtn = document.getElementById('fahrenheit-btn')
  celsiusBtn.addEventListener('click', () => {
    displayQuickWeatherInfoCelsius()
    /* Remove the toggle effect from fahrenheit btn */
    fahrenheitBtn.classList.remove('active')
    celsiusBtn.classList.toggle('active')
  })
}

const toggleQuickWeatherInfoFahrenheit = () => {
  const fahrenheitBtn = document.getElementById('fahrenheit-btn')
  const celsiusBtn = document.getElementById('celsius-btn')
  fahrenheitBtn.addEventListener('click', () => {
    displayQuickWeatherInfoFahrenheit()
    /* Remove the toggle effect from celsius btn */
    celsiusBtn.classList.remove('active')
    fahrenheitBtn.classList.toggle('active')
  })
}

const handleSearchClick = async () => {
  const quickWeatherInfoDivs = document.querySelectorAll(
    '.quickWeatherInfo > *'
  )
  try {
    const weatherData = await handleFetchWeatherFromSearch()
    processWeatherFromSearch(weatherData)

    /*   const processedData =
      processWeatherFromSearch().quickWeatherInfoFahrenheit(weatherData)
    setProcessedData(processedData) */

    const processedData = getProcessedData()
    const fahrenheitData = processedData[0]
    const weatherInfoObj = [
      { weatherInfoKeys: Object.keys(fahrenheitData) },
      { weatherInfoValues: Object.values(fahrenheitData) }
    ]
    changeQuickWeatherInfoFahrenheit(weatherInfoObj, quickWeatherInfoDivs)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const fetchWeatherFromSearchListen = () => {
  const searchBtn = document.getElementById('searchBtn')
  searchBtn.addEventListener('click', handleSearchClick)
}

export {
  displayQuickWeatherInfoFahrenheit,
  toggleQuickWeatherInfoCelsius,
  toggleQuickWeatherInfoFahrenheit,
  fetchWeatherFromSearchListen
}
