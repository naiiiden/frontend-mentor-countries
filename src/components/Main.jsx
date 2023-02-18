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
        </main>
    )
}

export default Main;