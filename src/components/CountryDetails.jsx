import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CountryDetails = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => response.json())
      .then((data) => setData(data?.[0]))
      .catch((error) => console.log(error.message));
  }, [name]);

  useEffect(() => {
    if (data) {
      fetch(`https://restcountries.com/v3.1/alpha?codes=${data.borders.join(",")}`)
        .then((response) => response.json())
        .then((data) => setBorderCountries(data))
        .catch((error) => console.log(error.message));
    }
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <button>Back</button>
      <div className="main-details">
        <img src={data.flags["svg"]} alt={data.flags["alt"]}/>
        <div className="details-container">
          <h1>{data.name.common}</h1>
          <div className="details-subcontainer">
            <div className="details-text-wrapper">
              <p>Native name: <span>{data.name.nativeName?.[Object.keys(data.name.nativeName)[0]].common}</span></p>
              <p>Population: <span>{data.population}</span></p>
              <p>Region: <span>{data.region}</span></p>
              <p>Sub Region: <span>{data.subregion}</span></p>
              <p>Capital: <span>{data.capital}</span></p>
            </div>
            <div className="details-text-wrapper">
              <p>Top Level Domain: <span>{data.tld.join(", ")}</span></p>
              <p>Currencies: <span>{Object.values(data.currencies).map(currency => currency.name).join(", ")}</span></p>
              <p>Languages: <span>{Object.values(data.languages).join(", ")}</span></p>
            </div>
          </div>
          <p>Border Countries:{borderCountries.map((country) => country.name.common).join(", ")}</p>
        </div>
      </div>
    </main>
  );
};

export default CountryDetails;
