import React, {
  useState,
  useEffect
}
from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import phonebookservice from './services/phonebook'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [errorClass, setErrorClass] = useState('success')
  useEffect(() => {
    phonebookservice.getAll()
    .then(InitialPersons => {
      setPersons(InitialPersons)
    })
  }, [])
  const updateFilteredList = (searchword) => {
    let selectedPersons = []
    if(searchword !== "") {
        selectedPersons = persons.reduce((result, person) => {
        if(person.name.toLowerCase()
          .includes(searchword.toLowerCase())) {
          result.push(person)
        }
        return result
      }, [])
    }
    return(selectedPersons)
  }
  const delPerson = (event) => {
    event.preventDefault()
    let id = event.target.value
    let selectedPerson = persons.find(person=>person.id.toString()===id)
    if(window.confirm("Delete "+selectedPerson.name+" ? ")){
      phonebookservice.del(id)
      .then(result => {
        setPersons(persons.filter(person=>person.id.toString()!==id))
        setErrorMessage(`${selectedPerson.name} has been deleted`)
        setErrorClass('success')
        setTimeout(() => {setErrorMessage(null)}, 5000)
      })
      .catch(error => {
        setErrorMessage(`${selectedPerson.name} has already been deleted`)
        console.log(error)
        setErrorClass('failure')
        setTimeout(() => {setErrorMessage(null)}, 5000)
      })
    }
  }
  const addOrUpdatePerson = (event) => {
    event.preventDefault()
    let personObject = {}
    personObject["name"] = newName
    personObject["number"] = newNumber
    let nameMatch = persons.find((person) => person.name === newName)
    let numberMatch = persons.find((person) => person.number === newNumber)
    if(nameMatch!==undefined && numberMatch!==undefined)
    {
      setErrorMessage(`${nameMatch.name}, ${numberMatch.number} is already added to phonebook`)
      setErrorClass('error')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
    else if(nameMatch===undefined && numberMatch!==undefined)
    {
      setErrorMessage(`${numberMatch.number} is already added to phonebook under ${numberMatch.name}`)
      setErrorClass('error')
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
    else if(nameMatch!==undefined && numberMatch===undefined)
    {
      if(window.confirm(`${nameMatch.name} is already added to phonebook, would you like to update the phone number?`))
      {
        phonebookservice.update(nameMatch.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.filter(person=>person.id!==nameMatch.id).concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(`${nameMatch.name} has been updated`)
            setErrorClass('success')
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
          .catch(error => {
            console.log(error)
            setErrorMessage(`${nameMatch.name} has already been deleted`)
            setErrorClass('failure')
            setTimeout(() => {setErrorMessage(null)}, 5000)
          })
      }
    }
    else
    {
      phonebookservice.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setErrorMessage(newName +` has been added`)
          setErrorClass('success')
          setTimeout(() => {setErrorMessage(null)}, 5000)
        })
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
        setSearchKey(event.target.value)
        break;
      default:
        break;
    }
  }
  const filteredResults = updateFilteredList(searchKey)
  return (
    < div >
      < h2 > Phonebook < /h2>
      <Notification message={errorMessage} errorClass={errorClass} />
      < Filter
        searchKey = { searchKey }
        handleFormInput = { handleFormInput }
      />
      < h3 > Add New < /h3 >
      < PersonForm
        addOrUpdatePerson = { addOrUpdatePerson }
        newName = { newName }
        newNumber = { newNumber }
        handleFormInput = { handleFormInput }
        />
      < h3 > Numbers < /h3 >
      < Person
        results = { filteredResults }
        delPerson = { delPerson }
        />
    < /div >
  )
}
export default App
