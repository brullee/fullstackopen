import { useState, useEffect } from "react";
import SearchResults from "./components/SearchResults";
import weatherServices from "./services/weather";
import countryServices from "./services/countries";

function App() {
  const [weather, setWeather] = useState(null);
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (!selectedCountry) return;

    const lat = selectedCountry.capitalInfo.latlng[0];
    const lon = selectedCountry.capitalInfo.latlng[1];

    weatherServices.getWeather(lat, lon).then((weatherData) => {
      setWeather(weatherData);
    });
  }, [selectedCountry]);

  useEffect(() => {
    countryServices.getCountries().then((countryData) => {
      setCountries(countryData);
    });
  }, []);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    handleShow(null);
  };

  const handleShow = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      Find Countries: <input value={search} onChange={handleSearch} />
      <SearchResults
        search={search}
        countries={countries}
        handleShow={handleShow}
        selectedCountry={selectedCountry}
        weather={weather}
      />
    </>
  );
}

export default App;
