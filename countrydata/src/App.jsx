import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetails from './components/CountryDetails'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [filtered, setFiltered] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    const result = countries.filter(c =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    )
    setFiltered(result)
    setSelectedCountry(null) // Limpiar selección al cambiar el filtro
  }, [search, countries])

  const handleShow = (country) => {
    setSelectedCountry(country)
  }

  return (
    <div>
      <h1>Country Finder</h1>
      <div>
        Find countries:{" "}
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      {/* Mostrar resultado */}
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : filtered.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filtered.length > 1 ? (
        <ul>
          {filtered.map(country => (
            <li key={country.cca3}>
              {country.name.common}{' '}
              <button onClick={() => handleShow(country)}>show</button>
            </li>
          ))}
        </ul>
      ) : filtered.length === 1 ? (
        <CountryDetails country={filtered[0]} />
      ) : (
        <p>No matches found</p>
      )}
    </div>
  )
}

export default App
