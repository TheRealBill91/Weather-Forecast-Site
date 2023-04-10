/* Fetches weather data from API and returns JSON */
const fetchWeatherData = async () => {
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

const handleWeatherData = () => {
  /* extracts quick glance weather info like temp, condition, feels like, etc. */
  const quickWeatherInfo = async () => {
    try {
      const weatherData = await fetchWeatherData()
      console.log(weatherData)
      const locationName = weatherData.location.name
      const currentConditions = weatherData.current.condition.text
      const currentTemp = weatherData.current.temp_f
      const feelsLikeF = weatherData.current.feelslike_f
      return { locationName, currentConditions, currentTemp, feelsLikeF }
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error
      )
    }
  }

  return { quickWeatherInfo }
}

export { fetchWeatherData, handleWeatherData }
