import { geoButton, getGeolocation } from "./modules/geolocation.js"
import { searchForm, formSubmit } from "./modules/searchForm.js"

// Get weather based on geo location
geoButton.addEventListener("click", getGeolocation);

// Get location based on search term
searchForm.addEventListener("submit",formSubmit);
