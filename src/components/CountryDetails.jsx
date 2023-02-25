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
        <img src={data.flags["svg"]} alt={data.flags["alt"]}/>
        <div>
          <h1>{data.name.common}</h1>
          <div className="details-container">
            <div className="details-subcontainer">
              <p>Native name: <span>{data.name.nativeName?.[Object.keys(data.name.nativeName)[0]].common}</span></p>
              <p>Population: <span>{data.population}</span></p>
              <p>Region: <span>{data.region}</span></p>
              <p>Sub Region: <span>{data.subregion}</span></p>
              <p>Capital: <span>{data.capital}</span></p>
            </div>
            <div className="details-subcontainer">
              <p>Top Level Domain: <span>{data.tld.join(", ")}</span></p>
              <p>Currencies: <span>{Object.values(data.currencies).map(currency => currency.name).join(", ")}</span></p>
              <p>Languages: <span>{Object.values(data.languages).join(", ")}</span></p>
            </div>
          </div>
        </div>
    </main>
  );
};

export default CountryDetails;
