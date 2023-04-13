import { format } from 'date-fns'

const processedWeatherData = []

const getProcessedData = () => {
  return processedWeatherData
}

const setProcessedData = (fahrenheitData, celsiusData) => {
  processedWeatherData.fahrenheitInfo = fahrenheitData
  processedWeatherData.celsiusInfo = celsiusData
  return processedWeatherData
}

/* Fetches weather data from API and returns JSON */
const fetchCurrentWeatherData = async () => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=842b5da522834ef3bb4233651230704&q=Saint Louis&aqi=yes`,
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

const fetchForecastData = async () => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=842b5da522834ef3bb4233651230704&q=Saint Louis&days=4&aqi=yes&alerts=no

      `,
      { mode: 'cors' }
    )
    if (!response.ok) {
      throw new Error('Failed Fetch')
    }
    const forecastWeatherData = await response.json()
    console.log(forecastWeatherData)
    return forecastWeatherData
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

/* Used to get the sunrise and sunset data */
const fetchAstronomyData = async () => {
  const currentDate = new Date()
  const dateString = format(currentDate, 'yyyy-MM-dd')

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/astronomy.json?key=842b5da522834ef3bb4233651230704&q=Saint Louis&dt=${dateString}
      `,
      { mode: 'cors' }
    )
    if (!response.ok) {
      throw new Error('Failed Fetch')
    }
    const astronomyWeatherData = await response.json()
    console.log(astronomyWeatherData)
    return astronomyWeatherData
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const fetchCurrentWeatherFromSearch = async (event) => {
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

const handleWeatherData = async () => {
  /* extracts quick glance weather info like temp, condition, feels like, etc. in Fahrenheit */
  try {
    const [currentWeatherData, forecastWeatherData, astronomyWeatherData] =
      await Promise.all([
        fetchCurrentWeatherData(),
        fetchForecastData(),
        fetchAstronomyData()
      ])
    /* const currentWeatherData = await fetchCurrentWeatherData()
    const forecastWeatherData = await fetchForecastData()
    const astronomyWeatherData = await fetchAstronomyData() */
    const fahrenheitData = processFahrenheitData(
      currentWeatherData,
      forecastWeatherData,
      astronomyWeatherData
    )
    const celsiusData = processCelsiusData(currentWeatherData)
    setProcessedData(fahrenheitData, celsiusData)
    console.log(processedWeatherData)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const processWeatherFromSearch = (weatherData) => {
  const fahrenheitData = processFahrenheitData(weatherData)
  const celsiusData = processCelsiusData(weatherData)
  setProcessedData(fahrenheitData, celsiusData)
  console.log(processedWeatherData)
}

const processFahrenheitData = (
  currentWeatherData,
  forecastWeatherData,
  astronomyWeatherData
) => {
  const currentQuickFahrenheitData =
    handleCurrentQuickFahrenheitData(currentWeatherData)

  const currentExtraFahrenheitData = handleCurrentExtraFahrenheitData(
    currentWeatherData,
    forecastWeatherData,
    astronomyWeatherData
  )

  return {
    quickFahrenheit: currentQuickFahrenheitData,
    extraFahrenheit: currentExtraFahrenheitData
  }
}

/* Processes the current weather fahrenheit data for the quick view data */
const handleCurrentQuickFahrenheitData = (weatherData) => {
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

/* Processes the current weather fahrenheit data for the extra weather data,
like humidity, UV Index, etc */
const handleCurrentExtraFahrenheitData = (
  currentWeatherData,
  forecastWeatherData,
  astronomyWeatherData
) => {
  const humidity = currentWeatherData.current.humidity
  const windMPH = currentWeatherData.current.wind_mph
  const windDir = currentWeatherData.current.wind_dir
  const aqi = currentWeatherData.current.air_quality['us-epa-index']
  const visMiles = currentWeatherData.current.vis_miles
  const uvIndex = currentWeatherData.current.uv
  const cloudCoverPct = currentWeatherData.current.cloud
  const tempHighF = forecastWeatherData.forecast.forecastday[0].day.maxtemp_f
  const tempLowF = forecastWeatherData.forecast.forecastday[0].day.mintemp_f
  const sunrise = astronomyWeatherData.astronomy.astro.sunrise
  const sunset = astronomyWeatherData.astronomy.astro.sunset
  const moonphase = astronomyWeatherData.astronomy.astro.moon_phase
  return {
    humidity,
    windMPH,
    windDir,
    aqi,
    visMiles,
    uvIndex,
    cloudCoverPct,
    tempHighF,
    tempLowF,
    sunrise,
    sunset,
    moonphase
  }
}

const processCelsiusData = (weatherData) => {
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

export {
  fetchCurrentWeatherData,
  handleWeatherData,
  processWeatherFromSearch,
  fetchCurrentWeatherFromSearch,
  setProcessedData,
  getProcessedData
}
