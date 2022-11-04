import appKey from "./weather-key";

(function() {
  const container = document.getElementById("container"),
  location = document.getElementById("location"),
  conditions = document.querySelector(".conditions"),
  celsius = document.getElementById("cel"),
  fahrenheit = document.getElementById("fah"),
  tempButtons = document.querySelector(".temp-buttons"),
  fahrenheitButton = document.querySelector(".f-button"),
  celsiusButton = document.querySelector(".c-button"),
  errorMessage = document.createElement("h3");

  // Get weather based on geo location
  const geoButton = document.querySelector(".geo-button");
  geoButton.addEventListener("click", () => {
    
    // Check if user's browser supports geolocation
    if (!navigator.geolocation) {

      const subErrorMessage = document.createElement("h4");

      errorMessage.textContent = "Geolocation is not supported by your browser.";
      subErrorMessage.textContent = "Please allow location access.";

      container.appendChild(subErrorMessage);
      container.appendChild(errorMessage);
      
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

  });

  const searchForm = document.getElementById("location-search");
  searchForm.addEventListener("submit", e => {
    e.preventDefault();

    const searchTerm = e.target[0].value;

    search(searchTerm);

    e.target[0].value = "";
  });

  function search(place) {
    const locationData = `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=5&appid=${appKey}`;

    fetch(locationData)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const lat = data[0].lat;
        const lon = data[0].lon;

        getWeather(lat, lon);
      })
      .catch(error => console.error('there was an error', error));
  }

  // convert temp to fahrenheit
  function getFahrenheit(celsius) {
    return Math.round(celsius * 9 / 5 + 32);
  }

  // Get weather icon and add to DOM
  function getIcon(id) {
    const iconClass = `wi-owm-${id}`;
    document.querySelector(".weather-icon i").classList.add(iconClass);
  }

  // Get current weather with coordinates
  function getWeather(latitude, longitude) {
    const weatherData = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + appKey;

    fetch(weatherData)
      .then(response => response.json())
      .then(data => {

        const weatherInfo = data;
        const temp = document.querySelector(".temp");

        // convert kelvin temp to celsius
        const celsius = Math.round(weatherInfo.main.temp - 273.15);

        // Add weather info to the DOM
        location.textContent = `${weatherInfo.name}, ${weatherInfo.sys.country}`;
        temp.textContent = `${celsius}`;
        conditions.textContent = weatherInfo.weather[0].main;
        getIcon(weatherInfo.weather[0].id);

        // Convert temperature to fahrenheit
        const fTemp = document.querySelector(".f-temp");
        fTemp.textContent = `${getFahrenheit(celsius)} °F`;

        // Show unit conversion button
        fahrenheitButton.classList.remove("d-none");

      })
      .catch(error => console.error('there was an error', error));
  }

  // Celsius & fahrenheit toggle
  tempButtons.addEventListener("click", () => {
    const tempElements = [fahrenheit, celsius, fahrenheitButton, celsiusButton];
    tempElements.forEach(el => el.classList.toggle("d-none"));
  });

})();
