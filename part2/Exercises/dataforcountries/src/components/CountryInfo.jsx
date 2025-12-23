const CountryInfo = ({ country, weather }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <li>Capital {country.capital[0]}</li>
      <li>Area {country.area}</li>
      <h1>Languages</h1>
      <ul>
        {Object.values(country.languages).map((language) => {
          return <li key={language}>{language}</li>;
        })}
      </ul>
      <img src={country.flags.png} />
      {weather && (
        <>
          <h1>Weather in {country.capital[0]}</h1>
          <p>Temperature {weather.main.temp} celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>Wind {weather.wind.speed} m/s</p>
        </>
      )}
    </>
  );
};

export default CountryInfo;
