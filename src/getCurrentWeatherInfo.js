const processedWeatherData = []

const getProcessedData = () => {
  return processedWeatherData
}

const setProcessedData = (fahrenheitData, celsiusData) => {
  processedWeatherData[0] = fahrenheitData
  processedWeatherData[1] = celsiusData
  return processedWeatherData
}

/* Fetches weather data from API and returns JSON */
const fetchCurrentWeatherData = async () => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=842b5da522834ef3bb4233651230704&q=Saint Louis&aqi=no
      `,
      { mode: 'cors' }
    )
    if (!response.ok) {
      throw new Error('Failed Fetch')
    }
    const weatherData = await response.json()
    console.log(weatherData)
    return weatherData
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const handleFetchWeatherFromSearch = async (event) => {
  const inputElm = document.getElementById('locationSearch')
  const inputValue = inputElm.value
  const spanError = document.querySelector('.error')
  // reset input field after user hits search btn
  inputElm.value = ''
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=842b5da522834ef3bb4233651230704&q=${inputValue}&aqi=no
      `,
      { mode: 'cors' }
    )
    if (!response.ok) {
      throw new Error('Failed Fetch')
    }
    const weatherData = await response.json()
    /* console.log(weatherData) */
    return weatherData
  } catch (error) {
    /*  console.error('There has been a problem with your fetch operation:', error) */
    spanError.textContent = 'Oops, please enter a valid location'
  }
}

const processWeatherFromSearch = (weatherData) => {
  const fahrenheitData = processInitialFahrenheit(weatherData)
  const celsiusData = processInitialCelsius(weatherData)
  setProcessedData(fahrenheitData, celsiusData)
  console.log(processedWeatherData)
}

const processInitialFahrenheit = (weatherData) => {
  const locationName = weatherData.location.name
  const currentConditions = weatherData.current.condition.text
  const conditionIcon = 'https:' + weatherData.current.condition.icon
  const currentTemp = Math.round(weatherData.current.temp_f)
  const feelsLikeF = Math.round(weatherData.current.feelslike_f)
  return {
    locationName,
    currentConditions,
    conditionIcon,
    currentTemp,
    feelsLikeF
  }
}

const processInitialCelsius = (weatherData) => {
  console.log(weatherData)
  const locationName = weatherData.location.name
  const currentConditions = weatherData.current.condition.text
  const conditionIcon = 'https:' + weatherData.current.condition.icon
  const currentTemp = Math.round(weatherData.current.temp_c)
  const feelsLikeC = Math.round(weatherData.current.feelslike_c)
  return {
    locationName,
    currentConditions,
    conditionIcon,
    currentTemp,
    feelsLikeC
  }
}

const handleWeatherData = async () => {
  /* extracts quick glance weather info like temp, condition, feels like, etc. in Fahrenheit */
  try {
    const weatherData = await fetchCurrentWeatherData()
    const fahrenheitData = processInitialFahrenheit(weatherData)
    const celsiusData = processInitialCelsius(weatherData)
    setProcessedData(fahrenheitData, celsiusData)
    console.log(processedWeatherData)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

export {
  fetchCurrentWeatherData,
  handleWeatherData,
  processWeatherFromSearch,
  handleFetchWeatherFromSearch,
  setProcessedData,
  getProcessedData
}
