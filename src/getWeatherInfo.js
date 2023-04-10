/* Fetches weather data from API and returns JSON */
const fetchWeatherData = async () => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=842b5da522834ef3bb4233651230704&q=Saint Louis&aqi=no
    `,
    { mode: 'cors' }
  )
  const weatherData = await response.json()
  console.log(weatherData)
  return weatherData
}

const handleWeatherData = () => {
  /* extracts quick glance weather info like temp, condition, feels like, etc. */
  const quickWeatherInfo = () => {}
}

export { fetchWeatherData }
