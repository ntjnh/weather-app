//
// Elements
//

const locationHeading = document.getElementById("location");
const conditions = document.querySelector(".conditions");

//
// Functions
//

// Toggle loader
function loader() {

  const results = document.querySelector(".results-container");
  const loadingSection = document.querySelector(".loading");

  // Toggle the loader
  loadingSection.classList.toggle("show");
  loadingSection.classList.toggle("hide");

  // Toggle the results container
  results.classList.toggle("show");
  results.classList.toggle("hide");

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

export { locationHeading, conditions, loader, getFahrenheit, getIcon, toggle };
