const appKey = import.meta.env.APP_KEY;
import { locationHeading, conditions, loader, getFahrenheit, getIcon, toggle } from "./utilities.js";

// Get current weather with coordinates
export default function (latitude, longitude, name) {
  const weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appKey}`;

  fetch(weatherData)
    .then(response => response.json())
    .then(data => {

      // Hide loader when data is received
      loader();

      const weatherInfo = data;
      const temp = document.querySelector(".c-temp");
      const fTemp = document.querySelector(".f-temp");

      // Convert kelvin to celsius
      const celsius = Math.round(weatherInfo.main.temp - 273.15);

      const { city, state, country } = name;

      // Add weather info to the DOM
      locationHeading.textContent = `${city}, ${(city == state) || !state ? '' : state + ', '}${country}`;
      temp.textContent = `${celsius}`;
      fTemp.textContent = `${getFahrenheit(celsius)}`;
      conditions.textContent = weatherInfo.weather[0].main;
      getIcon(weatherInfo.weather[0].id);

      toggle("show");

    })
    .catch(error => console.error('An error occured.', error));
}
