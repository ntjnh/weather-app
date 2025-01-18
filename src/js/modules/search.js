const appKey = process.env.APP_KEY;
import getWeather from "./getWeather.js";

// Get the coordinates for the searched place and call the getWeather() function
export default function(place) {
  const locationData = `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=${appKey}`;

  fetch(locationData)
    .then(response => {
      return response.json();
    })
    .then(data => {
      const lat = data[0].lat;
      const lon = data[0].lon;

      const fullname = {
        city: data[0].name,
        state: data[0].state,
        country: data[0].country
      };

      getWeather(lat, lon, fullname);
    })
    .catch(error => console.error('An error occured.', error));
}
