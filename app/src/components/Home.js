import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphql/Queries";

const Home = () => {
  const [city, setCity] = useState("");
  const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: city },
  });

  if (error) return <h1>Error found</h1>;
  if (data) {
    console.log(data);
  }
  console.log(city);

  return (
    <div className="home">
      <h1>Search for weather</h1>
      <input
        type="text"
        placeholder="City name"
        onChange={(event) => {
          setCity(event.target.value);
        }}
      />
      <button onClick={() => getWeather()}>Search</button>
      <div className="weather">
        {data && (
          <>
            <h1>{data.getCityByName.name}</h1>
            <h1>{data.getCityByName.weather.temperature.actual}</h1>
            <h1>{data.getCityByName.weather.summary.title}</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
