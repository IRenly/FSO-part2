const CountryDetails = ({ country }) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Area:</strong> {country.area} km²</p>
  
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages || {}).map((lang, i) => (
            <li key={i}>{lang}</li>
          ))}
        </ul>
  
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="200px" />
      </div>
    )
  }
  
  export default CountryDetails
  