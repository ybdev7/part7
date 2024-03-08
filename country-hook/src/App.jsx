import React, { useState, useEffect } from "react";
import axios from "axios";
import { get } from "./countries";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    (async (name) => {
      if (name === "") {
        setCountry(null);
        return;
      }
      try {
        const result = await get(name);
        console.log(result);
        console.log(`name=${name}, result=${result}`);
        if (result)
          setCountry({
            found: true,
            data: {
              name: result.name.common,
              capital: result.capital[0],
              population: result.population,
              flag: result.flags.svg,
            },
          });
        return result;
      } catch (error) {
        console.log("here", error);
        setCountry({ found: false });
      }
    })(name);
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  } else {
    console.log("country");
    console.log(country);
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
