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
                <div>
                    <img src={country.flags["png"]} alt={country.flags["alt"]}/>
                    <p>{country.name.common}</p>
                    <p>population: {country.population}</p>
                    <p>region: {country.region}</p>
                    <p>capital: {country.capital}</p>
                </div>
            ) )}
        </main>
    )
}

export default Main;