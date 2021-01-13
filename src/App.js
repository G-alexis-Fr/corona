import React, { useState, useEffect } from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
// if the files we look for call index.js we don't need to call it, just the folder is ok
import { fetchData } from "./api";
import coronaImage from "./images/image.png";

const App = () => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");
  const [darkTheme, setDarkTheme] = useState(false);

  //you do not change those states later on so we do not need to use `useState()`
  const light = {
    syntax: "#555",
    ui: "#ddd",
    bg: "#eee",
  };

  const dark = {
    syntax: "#fff",
    ui: "#363537",
    bg: "#555",
  };

  useEffect(() => {
    fetchData().then(({ data }) => {
      setData(data);
    });
  }, []);

  const handleCountryChange = async (country) => {
    fetchData(country).then(({ data }) => {
      setCountry(country);
      setData(data);
    });
  };

  const theme = !darkTheme ? light : dark;

  return (
    <div
      className={styles.container}
      style={{ background: theme.ui, color: theme.syntax }}
    >
      <div className="ui toggle checkbox">
        <input
          onClick={() => setDarkTheme(!darkTheme)}
          type="checkbox"
          name="public"
        />
        <label>Dark Mode</label>
      </div>
      <img className={styles.image} src={coronaImage} alt="Covid-19" />
      <Cards data={data} light={light} dark={dark} darkTheme={darkTheme} />
      <CountryPicker handleCountryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
};

export default App;
