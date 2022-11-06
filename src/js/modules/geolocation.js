import getWeather from "./getWeather.js";

const geoButton = document.querySelector(".geo-button");

function getGeolocation() {
  
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

      getWeather(lat, lng);
    };

    navigator.geolocation.getCurrentPosition(success);
  }

}

export { geoButton, getGeolocation };
