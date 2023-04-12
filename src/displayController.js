import {
  handleWeatherData,
  handleFetchWeatherFromSearch,
  processWeatherFromSearch,
  setProcessedData,
  getProcessedData
} from './getCurrentWeatherInfo'

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
        ? (divs[i].childNodes[1].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'locationName'
        ? (divs[i].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'currentTemp'
        ? (divs[i].textContent = `${weatherInfoValues[i]} °F `)
        : weatherInfoKeys[i] === 'feelsLikeF'
        ? (divs[i].textContent = `Feels like ${weatherInfoValues[i]} °F`)
        : weatherInfoKeys[i] === 'conditionIcon'
        ? (divs[i].childNodes[3].src = weatherInfoValues[i])
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
  const spanError = document.querySelector('.error')
  const validInput = validateUserInput(event, spanError)
  if (!validInput) {
    return
  }
  spanError.textContent = ''

  try {
    const weatherData = await handleFetchWeatherFromSearch(event)
    processWeatherFromSearch(weatherData)

    const processedData = getProcessedData()
    const fahrenheitData = processedData[0]
    const weatherInfoObj = [
      { weatherInfoKeys: Object.keys(fahrenheitData) },
      { weatherInfoValues: Object.values(fahrenheitData) }
    ]
    changeQuickWeatherInfoFahrenheit(weatherInfoObj, quickWeatherInfoDivs)
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
  toggleQuickWeatherInfoCelsius,
  toggleQuickWeatherInfoFahrenheit,
  fetchWeatherFromSearchListen
}
