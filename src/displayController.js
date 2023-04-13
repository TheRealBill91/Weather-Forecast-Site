import {
  handleWeatherData,
  handleFetchWeatherFromSearch,
  processWeatherFromSearch,
  setProcessedData,
  getProcessedData,
  fetchCurrentWeatherFromSearch
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
    const fahrenheitData = processedData.fahrenheitInfo.quickFahrenheit
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
    const CelsiusData = processedData.celsiusInfo.quickCelsius
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

const displayExtraFahrenheitData = async () => {
  const quickWeatherInfoDivs = document.querySelectorAll(
    '.extraWeatherInfo > *'
  )
  try {
    /*     const weatherInfo = await handleWeatherData().quickWeatherInfoCelsius() */
    let processedData = getProcessedData()
    if (processedData.length === 0) {
      await handleWeatherData()
      processedData = getProcessedData()
    }
    const fahrenheitData = processedData.fahrenheitInfo.extraFahrenheit
    const weatherInfoObj = [
      { weatherInfoKeys: Object.keys(fahrenheitData) },
      { weatherInfoValues: Object.values(fahrenheitData) }
    ]
    changeExtraWeatherInfoFahrenheit(weatherInfoObj, quickWeatherInfoDivs)
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
        ? (divs[1].textContent = `${weatherInfoValues[i]} % `)
        : weatherInfoKeys[i] === 'windMPH'
        ? (divs[2].childNodes[1].textContent = `${weatherInfoValues[i]} MPH `)
        : weatherInfoKeys[i] === 'windDir'
        ? (divs[2].childNodes[3].textContent = `${weatherInfoValues[i]} `)
        : weatherInfoKeys[i] === 'aqi'
        ? (divs[6].textContent = `US Index: ${weatherInfoValues[i]} `)
        : weatherInfoKeys[i] === 'visMiles'
        ? (divs[5].textContent = `${weatherInfoValues[i]} mi `)
        : weatherInfoKeys[i] === 'uvIndex'
        ? (divs[4].textContent = `${weatherInfoValues[i]} UV `)
        : weatherInfoKeys[i] === 'cloudCoverPct'
        ? (divs[8].textContent = `${weatherInfoValues[i]} % `)
        : weatherInfoKeys[i] === 'moonphase'
        ? (divs[7].textContent = `${weatherInfoValues[i]}  `)
        : weatherInfoKeys[i] === 'tempHighF'
        ? (divs[0].childNodes[1].textContent = `High: ${weatherInfoValues[i]} °F`)
        : weatherInfoKeys[i] === 'tempLowF'
        ? (divs[0].childNodes[3].textContent = `Low: ${weatherInfoValues[i]} °F `)
        : weatherInfoKeys[i] === 'sunrise'
        ? (divs[3].childNodes[1].textContent = `Sunrise: ${weatherInfoValues[i]} `)
        : weatherInfoKeys[i] === 'sunset'
        ? (divs[3].childNodes[3].textContent = `Sunset: ${weatherInfoValues[i]} `)
        : null
  }
}

const displayExtraCelsiusData = async () => {
  const quickWeatherInfoDivs = document.querySelectorAll(
    '.extraWeatherInfo > *'
  )
  try {
    /*     const weatherInfo = await handleWeatherData().quickWeatherInfoCelsius() */
    let processedData = getProcessedData()
    if (processedData.length === 0) {
      await handleWeatherData()
      processedData = getProcessedData()
    }
    const celsiusData = processedData.celsiusInfo.extraCelsius
    const weatherInfoObj = [
      { weatherInfoKeys: Object.keys(celsiusData) },
      { weatherInfoValues: Object.values(celsiusData) }
    ]
    changeExtraWeatherInfoCelsius(weatherInfoObj, quickWeatherInfoDivs)
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
        ? (divs[2].childNodes[1].textContent = `${weatherInfoValues[i]} KPH `)
        : weatherInfoKeys[i] === 'aqi'
        ? (divs[6].childNodes[0].textContent = `Defra Index: ${weatherInfoValues[i]} `)
        : weatherInfoKeys[i] === 'visKm'
        ? (divs[5].textContent = `${weatherInfoValues[i]} `)
        : weatherInfoKeys[i] === 'tempHighC'
        ? (divs[0].childNodes[1].textContent = `High: ${weatherInfoValues[i]} °C`)
        : weatherInfoKeys[i] === 'tempLowC'
        ? (divs[0].childNodes[3].textContent = `Low:${weatherInfoValues[i]} °C`)
        : null
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
        ? (divs[1].childNodes[1].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'locationName'
        ? (divs[0].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'conditionIcon'
        ? (divs[1].childNodes[3].src = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'currentTemp'
        ? (divs[2].textContent = `${weatherInfoValues[i]} °F `)
        : weatherInfoKeys[i] === 'feelsLikeF'
        ? (divs[3].textContent = `Feels like ${weatherInfoValues[i]} °F`)
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
        ? (divs[1].childNodes[1].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'locationName'
        ? (divs[0].textContent = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'conditionIcon'
        ? (divs[1].childNodes[3].src = weatherInfoValues[i])
        : weatherInfoKeys[i] === 'currentTemp'
        ? (divs[2].textContent = `${weatherInfoValues[i]} °C `)
        : weatherInfoKeys[i] === 'feelsLikeC'
        ? (divs[3].textContent = `Feels like ${weatherInfoValues[i]} °C`)
        : null
  }
}

const toggleQuickWeatherInfoCelsius = () => {
  const celsiusBtn = document.getElementById('celsius-btn')
  const fahrenheitBtn = document.getElementById('fahrenheit-btn')
  celsiusBtn.addEventListener('click', () => {
    displayQuickWeatherInfoCelsius()
    displayExtraCelsiusData()
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
    displayExtraFahrenheitData()
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
    const weatherData = await fetchCurrentWeatherFromSearch(event)
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
  fetchWeatherFromSearchListen,
  displayExtraFahrenheitData
}
