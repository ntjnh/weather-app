import appKey from "/src/js/weather-key.js";

(function() {
  const locationHeading = document.getElementById("location"),
  conditions = document.querySelector(".conditions");

  // Get weather based on geo location
  const geoButton = document.querySelector(".geo-button");
  geoButton.addEventListener("click", () => {
    
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

  });

  // Toggle show/hide classes on weather info elements
  function toggle(action) {
    const icon = document.querySelector(".weather-icon");
    const temperatures = document.querySelector(".temperatures");
    const info = [icon, conditions, temperatures];

    for (let i = 0; i < info.length; i++) {
      if (action === "show") {
        info[i].classList.remove("hide");
      } else {
        info[i].classList.remove("show");
      }

      info[i].classList.add(action);
    }
  }

  // Hide fields and display error message
  function validation() {
    // If the text is already there, only change the font colour
    if (!locationHeading.textContent.startsWith("Please enter a place name")) {
      locationHeading.innerHTML = `Please enter a place name or <br> click the 'Use my location' button.`;
    }

    locationHeading.style.color = "#cf2727";

    toggle("hide");
  }

  // Get location based on search term
  const searchForm = document.getElementById("location-search");
  searchForm.addEventListener("submit", e => {
    e.preventDefault();

    const searchTerm = e.target[0].value;

    if (!searchTerm) {
      validation();
    } else {
      search(searchTerm);

      if (locationHeading.style.color == "rgb(207, 39, 39)") {
        locationHeading.style.color = "#222";
      }

      e.target[0].value = "";
    }
  });

  // Get coordinates for searched place and call getWeather
  function search(place) {
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

  // Convert celsius to fahrenheit
  function getFahrenheit(celsius) {
    return Math.round(celsius * 9 / 5 + 32);
  }

  // Get weather icon and add to DOM
  function getIcon(id) {
    const iconClass = `wi-owm-${id}`;
    document.querySelector(".weather-icon i").classList.add(iconClass);
  }

  // Get current weather with coordinates
  function getWeather(latitude, longitude, name) {
    const weatherData = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appKey}`;

    fetch(weatherData)
      .then(response => response.json())
      .then(data => {

        const weatherInfo = data;
        const temp = document.querySelector(".c-temp");
        const fTemp = document.querySelector(".f-temp");

        // Convert kelvin to celsius
        const celsius = Math.round(weatherInfo.main.temp - 273.15);

        const { city, state, country } = name;

        // Add weather info to the DOM
        locationHeading.textContent = `${city}, ${city == state ? '' : state + ', '}${country}`;
        temp.textContent = `${celsius}`;
        fTemp.textContent = `${getFahrenheit(celsius)}`;
        conditions.textContent = weatherInfo.weather[0].main;
        getIcon(weatherInfo.weather[0].id);

        toggle("show");

      })
      .catch(error => console.error('An error occured.', error));
  }

})();
