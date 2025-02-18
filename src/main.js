import './scss/app.scss'
import { geoButton, getGeolocation } from './js/modules/geolocation.js'
import { searchForm, formSubmit } from './js/modules/searchForm.js'

// Get weather based on geo location
geoButton.addEventListener('click', getGeolocation)

// Get location based on search term
searchForm.addEventListener('submit', formSubmit)
