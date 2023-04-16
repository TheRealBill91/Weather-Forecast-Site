import { format, parseISO } from 'date-fns'

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
    console.log(Object.values(fahrenheitData.forecastFahrenheit))
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

const formatCountryName = (countryName) => {
  const quickWeatherInfo = document.querySelectorAll('.locationDiv > h3')

  const formattedCountry =
    countryName === 'United States of America'
      ? (countryName = 'United States')
      : countryName

  if (countryName.length >= 12 && countryName.length < 14) {
    quickWeatherInfo.forEach((div) => {
      div.style.fontSize = '2.2rem'
    })
  } else if (countryName.length >= 14) {
    quickWeatherInfo.forEach((div) => {
      div.style.fontSize = '1.9rem'
    })
  }

  return formattedCountry
}

/* If the conditions header has more than four words, a new css selector needs to be added to make the 
font smaller, otherwise just return the conditions header text and use the default selector */
const formatConditionsHeader = (currentConditions) => {
  const conditionsHeader = document.querySelector('.conditionsHeader')
  const conditionsText = currentConditions.split(' ')
  const formattedConditions = currentConditions

  if (conditionsText.length >= 4) {
    conditionsHeader.classList.toggle('longerConditions')
  } else {
    conditionsHeader.classList.remove('longerConditions')
  }

  return formattedConditions
}

/* Processes the current weather fahrenheit data for the quick view data */
const handleCurrentQuickFahrenheitData = (weatherData) => {
  const locationName = weatherData.location.name
  const countryName = formatCountryName(weatherData.location.country)
  const currentConditions = formatConditionsHeader(
    weatherData.current.condition.text
  )
  const conditionIcon = 'https:' + weatherData.current.condition.icon
  const currentTemp = Math.round(weatherData.current.temp_f)
  const feelsLikeF = Math.round(weatherData.current.feelslike_f)
  return {
    locationName,
    countryName,
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
  const locationName = weatherData.location.name
  const countryName = formatCountryName(weatherData.location.country)
  const currentConditions = formatConditionsHeader(
    weatherData.current.condition.text
  )
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

const handleCurrentExtraCelsiusData = (forecastWeatherData) => {
  const windKPH = Math.round(forecastWeatherData.current.wind_kph)
  const visKm = forecastWeatherData.current.vis_km

  return {
    windKPH,
    visKm
  }
}

const getForecastDayOfWeek = (forecastDay) => {
  const forecastDate = forecastDay.date
  const dateObj = parseISO(forecastDate)
  const dayOfWeek = format(dateObj, 'EEEE')
  return dayOfWeek
}

const handleForecastCelsiusData = (forecastWeatherData) => {
  const dayOneData = getCelsiusForecastDayOne(forecastWeatherData)
  const dayTwoData = getCelsiusForecastDayTwo(forecastWeatherData)
  const dayThreeData = getCelsiusForecastDayThree(forecastWeatherData)
  const dayFourData = getCelsiusForecastDayFour(forecastWeatherData)
  return { dayOneData, dayTwoData, dayThreeData, dayFourData }
}

/* Retrieve forecast fahrenheit data for day one */
const getCelsiusForecastDayOne = (forecastWeatherData) => {
  const dayOneData = forecastWeatherData.forecast.forecastday[0].day
  const dayOfWeek = 'Today'
  const conditionIcon = 'https:' + dayOneData.condition.icon
  const tempHighF = Math.round(dayOneData.maxtemp_c)
  const tempLowF = Math.round(dayOneData.mintemp_c)
  const chanceOfRain = dayOneData.daily_chance_of_rain
  return { dayOfWeek, conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day two */
const getCelsiusForecastDayTwo = (forecastWeatherData) => {
  const dayTwoData = forecastWeatherData.forecast.forecastday[1].day
  const dayOfWeek = getForecastDayOfWeek(
    forecastWeatherData.forecast.forecastday[1]
  )
  const conditionIcon = 'https:' + dayTwoData.condition.icon
  const tempHighF = Math.round(dayTwoData.maxtemp_c)
  const tempLowF = Math.round(dayTwoData.mintemp_c)
  const chanceOfRain = dayTwoData.daily_chance_of_rain
  return { dayOfWeek, conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day three */
const getCelsiusForecastDayThree = (forecastWeatherData) => {
  const dayThreeData = forecastWeatherData.forecast.forecastday[2].day
  const dayOfWeek = getForecastDayOfWeek(
    forecastWeatherData.forecast.forecastday[2]
  )
  const conditionIcon = 'https:' + dayThreeData.condition.icon
  const tempHighF = Math.round(dayThreeData.maxtemp_c)
  const tempLowF = Math.round(dayThreeData.mintemp_c)
  const chanceOfRain = dayThreeData.daily_chance_of_rain
  return { dayOfWeek, conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day four */
const getCelsiusForecastDayFour = (forecastWeatherData) => {
  const dayFourData = forecastWeatherData.forecast.forecastday[3].day
  const dayOfWeek = getForecastDayOfWeek(
    forecastWeatherData.forecast.forecastday[3]
  )
  const conditionIcon = 'https:' + dayFourData.condition.icon
  const tempHighF = Math.round(dayFourData.maxtemp_c)
  const tempLowF = Math.round(dayFourData.mintemp_c)
  const chanceOfRain = dayFourData.daily_chance_of_rain
  return { dayOfWeek, conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

const handleForecastFahrenheitData = (forecastWeatherData) => {
  const dayOneData = getFahrenheitForecastDayOne(forecastWeatherData)
  const dayTwoData = getFahrenheitForecastDayTwo(forecastWeatherData)
  const dayThreeData = getFahrenheitForecastDayThree(forecastWeatherData)
  const dayFourData = getFahrenheitForecastDayFour(forecastWeatherData)
  return { dayOneData, dayTwoData, dayThreeData, dayFourData }
}

/* Retrieve forecast fahrenheit data for day one */
const getFahrenheitForecastDayOne = (forecastWeatherData) => {
  const dayOneData = forecastWeatherData.forecast.forecastday[0].day
  const dayOfWeek = 'Today'
  const conditionIcon = 'https:' + dayOneData.condition.icon
  const tempHighF = Math.round(dayOneData.maxtemp_f)
  const tempLowF = Math.round(dayOneData.mintemp_f)
  const chanceOfRain = dayOneData.daily_chance_of_rain
  return { dayOfWeek, conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day two */
const getFahrenheitForecastDayTwo = (forecastWeatherData) => {
  const dayTwoData = forecastWeatherData.forecast.forecastday[1].day
  const dayOfWeek = getForecastDayOfWeek(
    forecastWeatherData.forecast.forecastday[1]
  )
  const conditionIcon = 'https:' + dayTwoData.condition.icon
  const tempHighF = Math.round(dayTwoData.maxtemp_f)
  const tempLowF = Math.round(dayTwoData.mintemp_f)
  const chanceOfRain = dayTwoData.daily_chance_of_rain
  return { dayOfWeek, conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day three */
const getFahrenheitForecastDayThree = (forecastWeatherData) => {
  const dayThreeData = forecastWeatherData.forecast.forecastday[2].day
  const dayOfWeek = getForecastDayOfWeek(
    forecastWeatherData.forecast.forecastday[2]
  )
  const conditionIcon = 'https:' + dayThreeData.condition.icon
  const tempHighF = Math.round(dayThreeData.maxtemp_f)
  const tempLowF = Math.round(dayThreeData.mintemp_f)
  const chanceOfRain = dayThreeData.daily_chance_of_rain
  return { dayOfWeek, conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

/* Retrieve forecast fahrenheit data for day four */
const getFahrenheitForecastDayFour = (forecastWeatherData) => {
  const dayFourData = forecastWeatherData.forecast.forecastday[3].day
  const dayOfWeek = getForecastDayOfWeek(
    forecastWeatherData.forecast.forecastday[3]
  )
  const conditionIcon = 'https:' + dayFourData.condition.icon
  const tempHighF = Math.round(dayFourData.maxtemp_f)
  const tempLowF = Math.round(dayFourData.mintemp_f)
  const chanceOfRain = dayFourData.daily_chance_of_rain
  return { dayOfWeek, conditionIcon, tempHighF, tempLowF, chanceOfRain }
}

export {
  /*  fetchCurrentWeatherData, */
  handleWeatherData,
  setProcessedData,
  getProcessedData,
  handleDataFromSearch,
  handleForecastFahrenheitData
}
