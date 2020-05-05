import React, {
  useState
}
from 'react'
import axios from 'axios'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [filteredResults, setFilteredResults] = useState([])
  axios
    .get('http://172.16.27.13:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  let selectedPersons = []
  const addPerson = (event) => {
    event.preventDefault()
    let personObject = {}
    personObject["name"] = newName
    personObject["number"] = newNumber
    if(persons.find((item) => item.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else if(persons.find((item) => item.number === newNumber)) {
      window.alert(`${newNumber} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleFormInput = (event) => {
    switch (event.target.name) {
      case "personName":
        setNewName(event.target.value)
        break;
      case "personNumber":
        setNewNumber(event.target.value)
        break;
      case "search":
        if(event.target.value === "") {
          selectedPersons = []
        }
        else {
          selectedPersons = persons.reduce((result, person) => {
            if(person.name.toLowerCase()
              .includes(event.target.value.toLowerCase())) {
              result.push(person)
            }
            return result
          }, [])
        }
        setSearchKey(event.target.value)
        setFilteredResults(selectedPersons)
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchKey={searchKey} handleFormInput={handleFormInput}/>
      <h3>Add New</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleFormInput={handleFormInput}/>
      <h3>Numbers</h3>
      <Person results={filteredResults}/>
    </div>
  )
}
export default App
