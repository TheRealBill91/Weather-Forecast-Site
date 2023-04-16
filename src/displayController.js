import {
  handleWeatherData,
  handleFetchWeatherFromSearch,
  processWeatherFromSearch,
  setProcessedData,
  getProcessedData,
  handleDataFromSearch
} from './processWeatherData.js'

import {
  fetchCurrentWeatherFromSearch,
  fetchAstronomyDataFromSearch,
  fetchForecastDataFromSearch
} from './getWeatherData.js'

// Displays quick glance weather info like city, condition, temp, and feels like
// in fahrenheit (by default)
const displayQuickWeatherInfoFahrenheit = async () => {
  const quickWeatherInfoDivs = document.querySelectorAll(
    '.quickWeatherInfo > *'
  )
  try {
    /* If processed data does not exist (users reloads the page), fetch and process
    weather data from default location */
    let processedData = getProcessedData()
    if (processedData.length === 0) {
      await handleWeatherData()
      processedData = getProcessedData()
    }

    const fahrenheitData = processedData[0].quickFahrenheit
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

const changeQuickWeatherInfoFahrenheit = (weatherInfoObj, divs) => {
  const weatherInfoKeys = weatherInfoObj[0].weatherInfoKeys
  const weatherInfoValues = weatherInfoObj[1].weatherInfoValues
  /*   console.log(weatherInfoKeys)
  console.log(weatherInfoValues) */
  for (let i = 0; i < weatherInfoKeys.length; i++) {
    const newWeatherInfo =
      weatherInfoKeys[i] === 'currentConditions'
        ? (divs[1].childNodes[1].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'locationName'
        ? (divs[0].childNodes[1].textContent = `${weatherInfoValues[i]},`)
        : weatherInfoKeys[i] === 'countryName'
        ? (divs[0].childNodes[3].textContent = `${weatherInfoValues[i]}`)
        : weatherInfoKeys[i] === 'conditionIcon'
        ? (divs[1].childNodes[3].src = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'currentTemp'
        ? (divs[2].textContent = `${weatherInfoValues[i]} °F `)
        : weatherInfoKeys[i] === 'feelsLikeF'
        ? (divs[3].textContent = `Feels like ${weatherInfoValues[i]} °F`)
        : null
  }
}

const displayExtraFahrenheitData = async () => {
  const extraWeatherInfoDivs = document.querySelectorAll(
    '.extraWeatherInfo > *'
  )
  try {
    /*     const weatherInfo = await handleWeatherData().quickWeatherInfoCelsius() */
    let processedData = getProcessedData()
    if (processedData.length === 0) {
      await handleWeatherData()
      processedData = getProcessedData()
    }
    const fahrenheitData = processedData[0].extraFahrenheit
    const weatherInfoObj = [
      { weatherInfoKeys: Object.keys(fahrenheitData) },
      { weatherInfoValues: Object.values(fahrenheitData) }
    ]
    changeExtraWeatherInfoFahrenheit(weatherInfoObj, extraWeatherInfoDivs)
    /*  console.log(weatherInfo) */
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const changeExtraWeatherInfoFahrenheit = (weatherInfoObj, divs) => {
  const weatherInfoKeys = weatherInfoObj[0].weatherInfoKeys
  const weatherInfoValues = weatherInfoObj[1].weatherInfoValues
  /*  console.log(weatherInfoKeys)
  console.log(weatherInfoValues) */
  for (let i = 0; i < weatherInfoKeys.length; i++) {
    const newWeatherInfo =
      weatherInfoKeys[i] === 'humidity'
        ? (divs[1].childNodes[3].textContent = `${weatherInfoValues[i]} % `)
        : weatherInfoKeys[i] === 'windMPH'
        ? (divs[2].childNodes[3].childNodes[1].textContent = `${weatherInfoValues[i]} MPH `)
        : weatherInfoKeys[i] === 'windDir'
        ? (divs[2].childNodes[3].childNodes[3].textContent = `${weatherInfoValues[i]} `)
        : weatherInfoKeys[i] === 'visMiles'
        ? (divs[6].childNodes[3].textContent = `${weatherInfoValues[i]} mi `)
        : weatherInfoKeys[i] === 'uvIndex'
        ? (divs[5].childNodes[3].textContent = `${weatherInfoValues[i]} UV `)
        : weatherInfoKeys[i] === 'cloudCoverPct'
        ? (divs[8].childNodes[3].textContent = `${weatherInfoValues[i]} % `)
        : weatherInfoKeys[i] === 'moonphase'
        ? (divs[7].childNodes[3].textContent = `${weatherInfoValues[i]}  `)
        : weatherInfoKeys[i] === 'chanceOfRain'
        ? (divs[0].childNodes[3].textContent = `${weatherInfoValues[i]} %`)
        : weatherInfoKeys[i] === 'sunrise'
        ? (divs[3].childNodes[3].textContent = `${weatherInfoValues[i]} `)
        : weatherInfoKeys[i] === 'sunset'
        ? (divs[4].childNodes[3].textContent = `${weatherInfoValues[i]} `)
        : null
  }
}

const displayForecastFahrenheit = async () => {
  const forecastWeatherInfoDivs = document.querySelectorAll(
    '#forecastContainer > *'
  )
  try {
    /* If processed data does not exist (users reloads the page), fetch and process
    weather data from default location */
    const processedData = getProcessedData()

    const fahrenheitData = processedData[0].forecastFahrenheit
    const weatherInfoObj = [
      { weatherInfoKeys: Object.keys(fahrenheitData) },
      { weatherInfoValues: Object.values(fahrenheitData) }
    ]
    changeForecastFahrenheitInfo(weatherInfoObj, forecastWeatherInfoDivs)
    console.log(weatherInfoObj)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const changeForecastFahrenheitInfo = (weatherInfoObj, divs) => {
  const weatherInfoKeys = weatherInfoObj[0].weatherInfoKeys
  const weatherInfoValues = weatherInfoObj[1].weatherInfoValues
  console.log(weatherInfoKeys)
  /* console.log(weatherInfoValues[0]) */
  for (let j = 0; j < divs.length; j++) {
    const currentDiv = divs[j]
    const forecastData = weatherInfoValues[j]
    const forecastDataKeys = Object.keys(forecastData)
    const forecastDataValues = Object.values(forecastData)
    for (let i = 0; i < forecastDataKeys.length; i++) {
      const newWeatherInfo =
        forecastDataKeys[i] === 'conditionIcon'
          ? (currentDiv.childNodes[1].childNodes[3].src = forecastDataValues[i])
          : forecastDataKeys[i] === 'dayOfWeek'
          ? (currentDiv.childNodes[1].childNodes[1].textContent =
              forecastDataValues[i])
          : forecastDataKeys[i] === 'chanceOfRain'
          ? (currentDiv.childNodes[7].childNodes[3].textContent = `${forecastDataValues[i]} %`)
          : forecastDataKeys[i] === 'tempHighF'
          ? (currentDiv.childNodes[3].childNodes[3].textContent = `${forecastDataValues[i]} °F `)
          : forecastDataKeys[i] === 'tempLowF'
          ? (currentDiv.childNodes[5].childNodes[3].textContent = `${forecastDataValues[i]} °F `)
          : null
    }
  }
}

const displayQuickWeatherInfoCelsius = async () => {
  const quickWeatherInfoDivs = document.querySelectorAll(
    '.quickWeatherInfo > *'
  )
  try {
    /*     const weatherInfo = await handleWeatherData().quickWeatherInfoCelsius() */
    const processedData = getProcessedData()
    const CelsiusData = processedData[1].quickCelsius
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

const changeQuickWeatherInfoCelsius = (weatherInfoObj, divs) => {
  const weatherInfoKeys = weatherInfoObj[0].weatherInfoKeys
  const weatherInfoValues = weatherInfoObj[1].weatherInfoValues
  /*   console.log(weatherInfoKeys)
  console.log(weatherInfoValues) */
  for (let i = 0; i < weatherInfoKeys.length; i++) {
    const newWeatherInfo =
      weatherInfoKeys[i] === 'currentConditions'
        ? (divs[1].childNodes[1].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'locationName'
        ? (divs[0].childNodes[1].textContent = `${weatherInfoValues[i]},`)
        : weatherInfoKeys[i] === 'countryName'
        ? (divs[0].childNodes[3].textContent = `${weatherInfoValues[i]}`)
        : weatherInfoKeys[i] === 'conditionIcon'
        ? (divs[1].childNodes[3].src = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'currentTemp'
        ? (divs[2].textContent = `${weatherInfoValues[i]} °C `)
        : weatherInfoKeys[i] === 'feelsLikeC'
        ? (divs[3].textContent = `Feels like ${weatherInfoValues[i]} °C`)
        : null
  }
}

const displayExtraCelsiusData = async () => {
  const extraWeatherInfoDivs = document.querySelectorAll(
    '.extraWeatherInfo > *'
  )
  try {
    /*     const weatherInfo = await handleWeatherData().quickWeatherInfoCelsius() */
    let processedData = getProcessedData()
    if (processedData.length === 0) {
      await handleWeatherData()
      processedData = getProcessedData()
    }
    const celsiusData = processedData[1].extraCelsius
    const weatherInfoObj = [
      { weatherInfoKeys: Object.keys(celsiusData) },
      { weatherInfoValues: Object.values(celsiusData) }
    ]
    changeExtraWeatherInfoCelsius(weatherInfoObj, extraWeatherInfoDivs)
    /*  console.log(weatherInfo) */
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const changeExtraWeatherInfoCelsius = (weatherInfoObj, divs) => {
  const weatherInfoKeys = weatherInfoObj[0].weatherInfoKeys
  const weatherInfoValues = weatherInfoObj[1].weatherInfoValues
  /*  console.log(weatherInfoKeys)
  console.log(weatherInfoValues) */
  for (let i = 0; i < weatherInfoKeys.length; i++) {
    const newWeatherInfo =
      weatherInfoKeys[i] === 'windKPH'
        ? (divs[2].childNodes[3].childNodes[1].textContent = `${weatherInfoValues[i]} KPH `)
        : weatherInfoKeys[i] === 'visKm'
        ? (divs[6].childNodes[3].textContent = `${weatherInfoValues[i]} km `)
        : null
  }
}

const displayForecastCelsius = async () => {
  const forecastWeatherInfoDivs = document.querySelectorAll(
    '#forecastContainer > *'
  )
  try {
    /* If processed data does not exist (users reloads the page), fetch and process
    weather data from default location */
    const processedData = getProcessedData()

    const celsiusData = processedData[1].forecastCelsius
    const weatherInfoObj = [
      { weatherInfoKeys: Object.keys(celsiusData) },
      { weatherInfoValues: Object.values(celsiusData) }
    ]
    changeForecastCelsiusInfo(weatherInfoObj, forecastWeatherInfoDivs)
    console.log(weatherInfoObj)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const changeForecastCelsiusInfo = (weatherInfoObj, divs) => {
  const weatherInfoKeys = weatherInfoObj[0].weatherInfoKeys
  const weatherInfoValues = weatherInfoObj[1].weatherInfoValues
  console.log(weatherInfoKeys)
  /* console.log(weatherInfoValues[0]) */
  for (let j = 0; j < divs.length; j++) {
    const currentDiv = divs[j]
    const forecastData = weatherInfoValues[j]
    const forecastDataKeys = Object.keys(forecastData)
    const forecastDataValues = Object.values(forecastData)
    for (let i = 0; i < forecastDataKeys.length; i++) {
      const newWeatherInfo =
        forecastDataKeys[i] === 'conditionIcon'
          ? (currentDiv.childNodes[1].childNodes[3].src = forecastDataValues[i])
          : forecastDataKeys[i] === 'dayOfWeek'
          ? (currentDiv.childNodes[1].childNodes[1].textContent =
              forecastDataValues[i])
          : forecastDataKeys[i] === 'chanceOfRain'
          ? (currentDiv.childNodes[7].childNodes[3].textContent = `${forecastDataValues[i]} %`)
          : forecastDataKeys[i] === 'tempHighF'
          ? (currentDiv.childNodes[3].childNodes[3].textContent = `${forecastDataValues[i]} °C `)
          : forecastDataKeys[i] === 'tempLowF'
          ? (currentDiv.childNodes[5].childNodes[3].textContent = `${forecastDataValues[i]} °C `)
          : null
    }
  }
}

const toggleCelsiusWeatherInfo = () => {
  const celsiusBtn = document.getElementById('celsius-btn')
  const fahrenheitBtn = document.getElementById('fahrenheit-btn')
  celsiusBtn.addEventListener('click', () => {
    displayQuickWeatherInfoCelsius()
    displayExtraCelsiusData()
    displayForecastCelsius()
    /* Remove the toggle effect from fahrenheit btn */
    fahrenheitBtn.classList.remove('active')
    celsiusBtn.classList.toggle('active')
  })
}

const toggleFahrenheitWeatherInfo = () => {
  const fahrenheitBtn = document.getElementById('fahrenheit-btn')
  const celsiusBtn = document.getElementById('celsius-btn')
  fahrenheitBtn.addEventListener('click', () => {
    displayQuickWeatherInfoFahrenheit()
    displayExtraFahrenheitData()
    displayForecastFahrenheit()
    /* Remove the toggle effect from celsius btn */
    celsiusBtn.classList.remove('active')
    fahrenheitBtn.classList.toggle('active')
  })
}

/* Ensure user has entered a city before hitting search, otherwise show error 
to user */
const validateUserInput = (event, spanError) => {
  let validInput = true
  const inputElm = document.getElementById('locationSearch')
  const inputValue = inputElm.value
  if (inputValue.length === 0) {
    spanError.textContent = 'Please enter a valid location'
    event.preventDefault()
    validInput = false
  }
  return validInput
}

const handleSearchClick = async (event) => {
  const quickWeatherInfoDivs = document.querySelectorAll(
    '.quickWeatherInfo > *'
  )

  const extraWeatherInfoDivs = document.querySelectorAll(
    '.extraWeatherInfo > *'
  )

  const forecastWeatherInfoDivs = document.querySelectorAll(
    '#forecastContainer > *'
  )
  const spanError = document.querySelector('.error')
  const validInput = validateUserInput(event, spanError)
  if (!validInput) {
    return
  }
  spanError.textContent = ''

  try {
    const [forecastWeatherData, astronomyWeatherData] = await Promise.all([
      fetchForecastDataFromSearch(),
      fetchAstronomyDataFromSearch()
    ])
    handleDataFromSearch(forecastWeatherData, astronomyWeatherData)
    const processedData = getProcessedData()
    const quickFahrenheitData = processedData[0].quickFahrenheit
    const quickWeatherInfoObj = [
      { weatherInfoKeys: Object.keys(quickFahrenheitData) },
      { weatherInfoValues: Object.values(quickFahrenheitData) }
    ]

    const extraFahrenheitData = processedData[0].extraFahrenheit
    const extraWeatherInfoObj = [
      { weatherInfoKeys: Object.keys(extraFahrenheitData) },
      { weatherInfoValues: Object.values(extraFahrenheitData) }
    ]

    const forecastFahrenheitData = processedData[0].forecastFahrenheit
    const forecastWeatherInfoObj = [
      { weatherInfoKeys: Object.keys(forecastFahrenheitData) },
      { weatherInfoValues: Object.values(forecastFahrenheitData) }
    ]

    changeQuickWeatherInfoFahrenheit(quickWeatherInfoObj, quickWeatherInfoDivs)
    changeExtraWeatherInfoFahrenheit(extraWeatherInfoObj, extraWeatherInfoDivs)
    changeForecastFahrenheitInfo(
      forecastWeatherInfoObj,
      forecastWeatherInfoDivs
    )
  } catch (error) {
    /* console.error('There has been a problem with your fetch operation:', error) */
  }
}

const fetchWeatherFromSearchListen = () => {
  const searchBtn = document.getElementById('searchBtn')
  searchBtn.addEventListener('click', handleSearchClick)
}

export {
  displayQuickWeatherInfoFahrenheit,
  toggleFahrenheitWeatherInfo,
  toggleCelsiusWeatherInfo,
  fetchWeatherFromSearchListen,
  displayExtraFahrenheitData,
  displayForecastFahrenheit
}
