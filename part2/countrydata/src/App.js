import React, {
  useState,
  useEffect
}
from 'react'
import axios from 'axios'
import Country from './components/Country'
import Filter from './components/Filter'
const App = () => {
  const [countries, setCountries] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [filteredResults, setFilteredResults] = useState([])
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  let selectedCountries = []
  const handleFormInput = (event) => {
    event.preventDefault()
    switch (event.target.name) {
      case "search":
        if(event.target.value === "") {
          selectedCountries = []
        }
        else {
          selectedCountries = countries.reduce((result, country) => {
            if(country.name.toLowerCase()
              .includes(event.target.value.toLowerCase())) {
              result.push(country)
            }
            return result
          }, [])
        }
        setSearchKey(event.target.value)
        setFilteredResults(selectedCountries)
        break;
      case "show":
        selectedCountries = countries.reduce((result, country) => {
          if(country.name.toLowerCase() === (event.target.value.toLowerCase())) {
            result.push(country)
          }
          return result
        }, [])
        setFilteredResults(selectedCountries)
        break;
      default:
        break;
    }
  }
  return (<div>
    <h2>Country Data</h2>
    <Filter searchKey={searchKey} handleFormInput={handleFormInput}/>
    <Country results={filteredResults}
      handleFormInput={handleFormInput}/>
  </div>)
}
export default App
