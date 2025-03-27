import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { getPersons, addPersons, deletePerson, updatePerson } from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    getPersons().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])

  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)

    const nameObject = {
      name: newName,
      number: newNumber,
    }

    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      updatePerson(existingPerson.id, nameObject)
        .then(updatedPerson => {
        setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson));
        setNewName('');
        setNewNumber('');
        })
        .catch(error => {
        console.error('Error updating person:', error);
        });
      }
      return;
    }

    const handleDeletePerson = (id) => {
      const personToDelete = persons.find(person => person.id === id);
      if (window.confirm(`Delete ${personToDelete.name}?`)) {
        deletePerson(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id));
          })
          .catch(error => {
            console.error('Error deleting person:', error);
          });
      }
    };

    addPersons(nameObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.error('Error adding person:', error)
      })
  }

  const personsToShow = newFilter
    ? persons.filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
    : persons

    return (
      <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={newFilter} onChange={handleFilterChange} /></div>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons 
        personsToShow={personsToShow} 
        handleDelete={(id) => {
        const personToDelete = persons.find(person => person.id === id);
        if (window.confirm(`Delete ${personToDelete.name}?`)) {
          deletePerson(id)
          .then(() => {
            setPersons(persons.filter(person => person.id !== id));
          })
          .catch(error => {
            console.error('Error deleting person:', error);
          });
        }
        }} 
      />
      </div>
    )
}

export default App

