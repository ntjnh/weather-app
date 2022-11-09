import { locationHeading, loader } from "./utilities.js"
import search from "./search.js";

// Get location based on search term
const searchForm = document.getElementById("location-search");

// Form validation function
function validation() {

  // If the text is already there, only change the font colour
  if (!locationHeading.textContent.startsWith("Please enter a place name")) {
    locationHeading.innerHTML = `Please enter a place name or <br> click the 'Use my location' button.`;
  }

  locationHeading.style.color = "#cf2727";

  toggle("hide");
}

function formSubmit (e) {
  e.preventDefault();

  // Show loader as soon as the function is called
  loader();

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
}

export { searchForm, formSubmit };
