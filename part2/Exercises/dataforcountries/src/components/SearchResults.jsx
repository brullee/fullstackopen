import { useEffect } from "react";
import CountryInfo from "./CountryInfo";

const SearchResults = ({
  search,
  countries,
  handleShow,
  selectedCountry,
  weather,
}) => {
  const filteredResults = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    if (filteredResults.length === 1) {
      handleShow(filteredResults[0]);
    }
  }, [filteredResults, handleShow]);

  if (selectedCountry) {
    return <CountryInfo country={selectedCountry} weather={weather} />;
  }

  if (filteredResults.length > 10 || search === "") {
    return <p>Too many matches, try a more specific filter</p>;
  } else if (filteredResults.length > 1) {
    return (
      <>
        {filteredResults.map((country) => {
          return (
            <li key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => handleShow(country)}>Show</button>
            </li>
          );
        })}
      </>
    );
  } else {
    return <p>No matches found, try another filter</p>;
  }
};

export default SearchResults;
