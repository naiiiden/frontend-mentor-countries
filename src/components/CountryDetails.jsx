import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CountryDetails = () => {
  const { name } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => response.json())
      .then((data) => setData(data?.[0], console.log(data[0])))
      .catch((error) => console.log(error.message));
  }, [name]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main-details">
        <img src={data.flags["svg"]} alt={data.flags["alt"]} />
        <h1>{data.name.common}</h1>
        <div className="details-container">
          <div className="details-subcontainer">
            <p>Native name: {data.name.nativeName?.[Object.keys(data.name.nativeName)[0]].common}</p>
            <p>Population: {data.population}</p>
            <p>Region: {data.region}</p>
            <p>Sub Region: {data.subregion}</p>
            <p>Capital: {data.capital}</p>
          </div>
          <div className="details-subcontainer">
            <p>Top Level Domain: {data.tld.join(", ")}</p>
            <p>Currencies: {Object.values(data.currencies).map(currency => currency.name).join(", ")}</p>
            <p>Languages: {Object.values(data.languages).join(", ")}</p>
          </div>
        </div>
    </main>
  );
};

export default CountryDetails;
