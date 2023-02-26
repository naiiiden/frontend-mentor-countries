import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
    if (data?.borders) {
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
      <Link to="/" className="back-link">
      <svg height="20" viewBox="0 96 960 960" width="20">
        <path d="M480 896 160 576l320-320 57 56-224 224h687v80H313l224 224-57 56Z"/>
      </svg>
        Back
      </Link>
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
          {data?.borders && 
            <div>
              <p>Border Countries:</p>
              <ul>
                {borderCountries.map((country) => 
                  <li><Link to={`/${country.name.common.toLowerCase()}`} className="border-country-link">{country.name.common}</Link></li>
                )}
              </ul>
            </div>}
        </div>
      </div>
    </main>
  );
};

export default CountryDetails;
