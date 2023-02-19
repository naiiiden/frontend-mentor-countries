import { useEffect, useState } from "react";

const Main = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all")
        .then((response) => response.json())
        .then((data) => ( console.log(data), setData(data)))
        .catch((error) => console.log(error.message));
    }, []);


    return (
        <main>
            <div className="inputs-container">
                <input type="text" name="" id="" aria-label="Search for a country by name"/>
                <select name="" id="" aria-label="Filter countries by region">
                    <option value="">Filter by region</option>
                    <option value="">Africa</option>
                    <option value="">America</option>
                    <option value="">Asia</option>
                    <option value="">Europe</option>
                    <option value="">Oceania</option>
                </select>
            </div>
            <div className="countries-container">
                {data.map((country) => (
                    <div className="country-container">
                        <img src={country.flags["png"]} alt={country.flags["alt"]}/>
                        <div className="text-container">
                            <h2>{country.name.common}</h2>
                            <p>Population: <span>{country.population}</span></p>
                            <p>Region: <span>{country.region}</span></p>
                            <p>Capital: <span>{country.capital}</span></p>
                        </div>
                    </div>
                ) )}
            </div>
        </main>
    )
}

export default Main;