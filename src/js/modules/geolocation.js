const appKey = import.meta.env.VITE_APP_KEY;
import getWeather from "./getWeather.js";
import { loader } from "./utilities.js";

const geoButton = document.querySelector(".geo-button");

function getGeolocation() {

  loader();
  
  // Check if user's browser supports geolocation
  if (!navigator.geolocation) {

    const errorMessage = document.createElement("h3"),
    subErrorMessage = document.createElement("h4");

    errorMessage.textContent = "Geolocation is not supported by your browser.";
    subErrorMessage.textContent = "Please allow location access.";

    const resultsContainer = document.querySelector(".results-container");
    resultsContainer.appendChild(subErrorMessage);
    resultsContainer.appendChild(errorMessage);
    
    subErrorMessage.classList.add("error");

  } else {

    // When location is successfully retrieved
    const success = position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      const location = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${appKey}`;

      fetch(location)
        .then(response => response.json())
        .then(data => {
          
          const fullname = {
            city: data[0].name,
            state: data[0].state,
            country: data[0].country
          };

          getWeather(lat, lng, fullname);
        })
        .catch(error => console.error('An error occured.', error));

    };

    navigator.geolocation.getCurrentPosition(success);
  }

}

export { geoButton, getGeolocation };
