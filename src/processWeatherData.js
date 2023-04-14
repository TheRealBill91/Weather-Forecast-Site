import { format } from 'date-fns'

import {
  fetchForecastData,
  fetchAstronomyData,
  fetchForecastDataFromSearch,
  fet,
  fetchAstronomyDataFromSearch
} from './getWeatherData'

const processedWeatherData = []

const getProcessedData = () => {
  return processedWeatherData
}

const clearProcessedData = () => {
  const processedDataArr = getProcessedData()
  processedDataArr.length = 0
}

const setProcessedData = (fahrenheitData, celsiusData) => {
  const dataSet = [fahrenheitData, celsiusData]
  dataSet.forEach((data) => {
    processedWeatherData.push(data)
  })

  // return processedWeatherData
}

const handleWeatherData = async () => {
  /* extracts quick glance weather info like temp, condition, feels like, etc. in Fahrenheit */
  try {
    const [forecastWeatherData, astronomyWeatherData] = await Promise.all([
      fetchForecastData(),
      fetchAstronomyData()
    ])
    const fahrenheitData = processFahrenheitData(
      forecastWeatherData,
      astronomyWeatherData
    )
    const celsiusData = processCelsiusData(
      forecastWeatherData,
      astronomyWeatherData
    )
    setProcessedData(fahrenheitData, celsiusData)
    console.log(processedWeatherData)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const handleDataFromSearch = async (
  forecastWeatherData,
  astronomyWeatherData
) => {
  /* extracts quick glance weather info like temp, condition, feels like, etc. in Fahrenheit */
  try {
    const fahrenheitData = processFahrenheitData(
      forecastWeatherData,
      astronomyWeatherData
    )
    const celsiusData = processCelsiusData(
      forecastWeatherData,
      astronomyWeatherData
    )
    clearProcessedData()
    setProcessedData(fahrenheitData, celsiusData)
    console.log(processedWeatherData)
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const processFahrenheitData = (forecastWeatherData, astronomyWeatherData) => {
  const currentQuickFahrenheitData =
    handleCurrentQuickFahrenheitData(forecastWeatherData)

  const currentExtraFahrenheitData = handleCurrentExtraFahrenheitData(
    forecastWeatherData,
    astronomyWeatherData
  )

  const forecastFahrenheitData =
    handleForecastFahrenheitData(forecastWeatherData)

  return {
    quickFahrenheit: currentQuickFahrenheitData,
    extraFahrenheit: currentExtraFahrenheitData,
    forecastFahrenheit: forecastFahrenheitData
  }
}

const processCelsiusData = (forecastWeatherData) => {
  const currentQuickCelsiusData =
    handleCurrentQuickCelsiusData(forecastWeatherData)

  const currentExtraCelsiusData =
    handleCurrentExtraCelsiusData(forecastWeatherData)

  const forecastCelsiusData = handleForecastCelsiusData(forecastWeatherData)

  return {
    quickCelsius: currentQuickCelsiusData,
    extraCelsius: currentExtraCelsiusData,
    forecastCelsius: forecastCelsiusData
  }
}

const handleCurrentQuickCelsiusData = (weatherData) => {
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
  forecastWeatherData,
  astronomyWeatherData
) => {
  const humidity = forecastWeatherData.current.humidity
  const windMPH = Math.round(forecastWeatherData.current.wind_mph)
  const windDir = forecastWeatherData.current.wind_dir
  const visMiles = forecastWeatherData.current.vis_miles
  const uvIndex = forecastWeatherData.current.uv
  const cloudCoverPct = forecastWeatherData.current.cloud
  const chanceOfRain =
    forecastWeatherData.forecast.forecastday[0].day.daily_chance_of_rain

  const sunrise = astronomyWeatherData.astronomy.astro.sunrise
  const sunset = astronomyWeatherData.astronomy.astro.sunset
  const moonphase = astronomyWeatherData.astronomy.astro.moon_phase
  return {
    humidity,
    windMPH,
    windDir,
    visMiles,
    uvIndex,
    chanceOfRain,
    cloudCoverPct,
    sunrise,
    sunset,
    moonphase
  }
}

const handleForecastCelsiusData = (forecastWeatherData) => {
  const dayOneData = getCelsiusForecastDayOne()
  const dayTwoData = getCelsiusForecastDayTwo()
  const dayThreeData = getCelsiusForecastDayThree()
  const dayFourData = getCelsiusForecastDayFour()
  return { dayOneData, dayTwoData, dayThreeData, dayFourData }
}

/* Retrieve forecast fahrenheit data for day one */
const getCelsiusForecastDayOne = (forecastWeatherData) => {
  const dayOneData = forecastWeatherData.forecast.forecastday[0].day
  const conditionIcon = 'https:' + dayOneData.condition.icon
  const tempHighF = dayOneData.maxtemp_c
  const tempLowF = dayOneData.mintemp_c
  const chanceOfRain = dayOneData.daily_chance_of_rain
  return { conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day two */
const getCelsiusForecastDayTwo = (forecastWeatherData) => {
  const dayTwoData = forecastWeatherData.forecast.forecastday[1].day
  const conditionIcon = 'https:' + dayTwoData.condition.icon
  const tempHighF = dayTwoData.maxtemp_c
  const tempLowF = dayTwoData.mintemp_c
  const chanceOfRain = dayTwoData.daily_chance_of_rain
  return { conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day three */
const getCelsiusForecastDayThree = (forecastWeatherData) => {
  const dayThreeData = forecastWeatherData.forecast.forecastday[1].day
  const conditionIcon = 'https:' + dayThreeData.condition.icon
  const tempHighF = dayThreeData.maxtemp_c
  const tempLowF = dayThreeData.mintemp_c
  const chanceOfRain = dayThreeData.daily_chance_of_rain
  return { conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day four */
const getCelsiusForecastDayFour = (forecastWeatherData) => {
  const dayFourData = forecastWeatherData.forecast.forecastday[1].day
  const conditionIcon = 'https:' + dayFourData.condition.icon
  const tempHighF = dayFourData.maxtemp_c
  const tempLowF = dayFourData.mintemp_c
  const chanceOfRain = dayFourData.daily_chance_of_rain
  return { conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

const handleForecastFahrenheitData = (forecastWeatherData) => {
  const dayOneData = getFahrenheitForecastDayOne()
  const dayTwoData = getFahrenheitForecastDayTwo()
  const dayThreeData = getFahrenheitForecastDayThree()
  const dayFourData = getFahrenheitForecastDayFour()
  return { dayOneData, dayTwoData, dayThreeData, dayFourData }
}

/* Retrieve forecast fahrenheit data for day one */
const getFahrenheitForecastDayOne = (forecastWeatherData) => {
  const dayOneData = forecastWeatherData.forecast.forecastday[0].day
  const conditionIcon = 'https:' + dayOneData.condition.icon
  const tempHighF = dayOneData.maxtemp_f
  const tempLowF = dayOneData.mintemp_f
  const chanceOfRain = dayOneData.daily_chance_of_rain
  return { conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day two */
const getFahrenheitForecastDayTwo = (forecastWeatherData) => {
  const dayTwoData = forecastWeatherData.forecast.forecastday[1].day
  const conditionIcon = 'https:' + dayTwoData.condition.icon
  const tempHighF = dayTwoData.maxtemp_f
  const tempLowF = dayTwoData.mintemp_f
  const chanceOfRain = dayTwoData.daily_chance_of_rain
  return { conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day three */
const getFahrenheitForecastDayThree = (forecastWeatherData) => {
  const dayThreeData = forecastWeatherData.forecast.forecastday[1].day
  const conditionIcon = 'https:' + dayThreeData.condition.icon
  const tempHighF = dayThreeData.maxtemp_f
  const tempLowF = dayThreeData.mintemp_f
  const chanceOfRain = dayThreeData.daily_chance_of_rain
  return { conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day four */
const getFahrenheitForecastDayFour = (forecastWeatherData) => {
  const dayFourData = forecastWeatherData.forecast.forecastday[1].day
  const conditionIcon = 'https:' + dayFourData.condition.icon
  const tempHighF = dayFourData.maxtemp_f
  const tempLowF = dayFourData.mintemp_f
  const chanceOfRain = dayFourData.daily_chance_of_rain
  return { conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

const handleCurrentExtraCelsiusData = (forecastWeatherData) => {
  const windKPH = Math.round(forecastWeatherData.current.wind_kph)
  const visKm = forecastWeatherData.current.vis_km

  return {
    windKPH,
    visKm
  }
}

export {
  /*  fetchCurrentWeatherData, */
  handleWeatherData,
  setProcessedData,
  getProcessedData,
  handleDataFromSearch,
  handleForecastFahrenheitData
}
