import { useEffect, useState } from "react";

const Main = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => (console.log(data), setData(data)))
        .catch((error) => console.log(error.message));
    }, []);

    function countriesByRegion(region) {
        fetch(`https://restcountries.com/v3.1/${region}`)
        .then((response) => response.json())
        .then((data) => (console.log(data), setData(data)))
        .catch((error) => console.log(error.message));
    }

    function countriesByName(name) {
        name === "" 
        ? fetch(`https://restcountries.com/v3.1/all`)
            .then((response) => response.json())
            .then((data) => (console.log(data), setData(data)))
            .catch((error) => {
              console.log(error.message);
              setData([]);
              setError("Unable to fetch countries.");
        })
        : fetch(`https://restcountries.com/v3.1/name/${name}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error("Country not found");
              }
              return response.json();
            })
            .then((data) => (console.log(data), setData(data)))
            .catch((error) => {
              console.log(error.message);
              setData([]);
              setError("Country not found.");
        });
    }

    return (
        <main>
            <div className="inputs-container">
                <div className="text-input-wrapper">
                    <input type="text" placeholder="Search for a country..." aria-label="Search for a country by name" onChange={(e) => countriesByName(e.target.value)}/>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24">
                        <path className="search-icon" d="M784 936 532 684q-30 24-69 38t-83 14q-109 0-184.5-75.5T120 476q0-109 75.5-184.5T380 216q109 0 184.5 75.5T640 476q0 44-14 83t-38 69l252 252-56 56ZM380 656q75 0 127.5-52.5T560 476q0-75-52.5-127.5T380 296q-75 0-127.5 52.5T200 476q0 75 52.5 127.5T380 656Z"/>
                    </svg>
                </div>
                <select aria-label="Filter countries by region" onClick={(e) => countriesByRegion(e.target.value)}>
                    <option value="all">Filter by region</option>
                    <option value="region/africa">Africa</option>
                    <option value="region/americas">America</option>
                    <option value="region/asia">Asia</option>
                    <option value="region/europe">Europe</option>
                    <option value="region/oceania">Oceania</option>
                </select>
            </div>
            <div className="countries-container">
                {data && data.length > 0 && data.map((country) => (
                    <div className="country-container" key={country.name.common}>
                        <img src={country.flags["png"]} alt={country.flags["alt"]}/>
                        <div className="text-container">
                            <h2>{country.name.common}</h2>
                            <p>Population: <span>{country.population}</span></p>
                            <p>Region: <span>{country.region}</span></p>
                            <p>Capital: <span>{country.capital}</span></p>
                        </div>
                    </div>
                ))}
            </div>
            {data && data.length === 0 && <p className="error-text" role="alert" aria-live="assertive">{error}</p>}
        </main>
    )
}

export default Main;