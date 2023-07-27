import { format } from 'date-fns'

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
    return astronomyWeatherData
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
}

const fetchForecastDataFromSearch = async () => {
  const inputElm = document.getElementById('locationSearch')
  const inputValue = inputElm.value
  const spanError = document.querySelector('.error')
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=842b5da522834ef3bb4233651230704&q=${inputValue}&days=3&aqi=yes&alerts=no
          `,
      { mode: 'cors' }
    )
    if (!response.ok) {
      throw new Error('Failed Fetch')
    }
    const forecastWeatherData = await response.json()
    return forecastWeatherData
  } catch (error) {
    /*  console.error('There has been a problem with your fetch operation:', error) */
    spanError.textContent = 'Oops, please enter a valid location'
  }
}

/* Used to get the sunrise and sunset data */
const fetchAstronomyDataFromSearch = async () => {
  const inputElm = document.getElementById('locationSearch')
  const inputValue = inputElm.value
  const currentDate = new Date()
  const dateString = format(currentDate, 'yyyy-MM-dd')

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/astronomy.json?key=842b5da522834ef3bb4233651230704&q=${inputValue}&dt=${dateString}
          `,
      { mode: 'cors' }
    )
    if (!response.ok) {
      throw new Error('Failed Fetch')
    }
    const astronomyWeatherData = await response.json()
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
    return weatherData
  } catch (error) {
    /*  console.error('There has been a problem with your fetch operation:', error) */
    spanError.textContent = 'Oops, please enter a valid location'
  }
}

export {
  fetchForecastData,
  fetchAstronomyData,
  fetchCurrentWeatherFromSearch,
  fetchAstronomyDataFromSearch,
  fetchForecastDataFromSearch
}
