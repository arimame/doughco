var kingSpadina =;
var bloorYonge =''


// Initialize and add the map
function initMap() {
    // The location of LHL
var lighthouse = {lat: 43.644618, lng: -79.394891};
  // The map, centered at LHL
var map = new google.maps.Map(
document.getElementById('map'), {zoom: 15, center: lighthouse});
      // The marker, positioned at Uluru
var marker = new google.maps.Marker({position: lighthouse, map: map});
      }

