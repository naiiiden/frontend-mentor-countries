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
    <main>
      <img src={data.flags["png"]} alt={data.flags["alt"]} />
      <h1>{data.name.common}</h1>
    </main>
  );
};

export default CountryDetails;
