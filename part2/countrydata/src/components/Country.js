import React, {
  useState,
  useEffect
}
from 'react'
import axios from 'axios'
const Weather = ({
  weather
}) => {
  return (<div>
      <p>Temperature: {weather.main.temp} Celsius</p>
      <p>Wind: {weather.wind.speed} m/s {weather.wind.speed} degrees</p>
    </div>)
}
const Languages = ({
  languages
}) => {
  return (languages.map(lang => <li key={lang.name}>{lang.name}</li>))
}
const Country = ({
  results,
  handleFormInput
}) => {
  const [weather, setWeather] = useState('')
  const [city, setCity] = useState('London')
  const api_key = process.env.REACT_APP_COUNTRYINFO_API_KEY
  useEffect(() => {
    if(results.length === 1) setCity(results[0].capital)
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
      .then(response => {
        setWeather(response.data)
      })
  }, [results, city, api_key])
  if(results.length > 10) {
    return (<p>Too many matches, please specify another filter</p>)
  }
  if(results.length === 1) {
    return (results.map(result => <div key={result.name}>
        <h2>{result.name}</h2>
        <p key={result.capital}>Capital : {result.capital}</p>
        <p key={result.population}>Population : {result.population}</p>
        <h3>Languages </h3>
        <Languages languages={result.languages}/>
        <p key={result.flag}><img src={result.flag} alt="National Flag" height="10%" width="10%"></img></p>
        <Weather weather={weather}/>
      </div>))
  }
  else {
    return (results.map(country => <p key={country.name}>{country.name} <button
        name = "show"
        value = {country.name}
        onClick={handleFormInput} > Show </button></p>))
  }
}
export default Country
