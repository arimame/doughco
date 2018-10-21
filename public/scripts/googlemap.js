let lat;
let long;

$(() => {
    $.ajax({
      method: 'GET',
      url: `/api/location/${location_id}`
    }).done((location) => {
      console.log(location);
     lat = Number(location[0].lat);
     long = Number(location[0].long);
     console.log(long);

    });
});


// Initialize and add the map
function initMap() {
setTimeout(function() {
    // The location of location
var location = {lat: lat, lng: long};
  // The map, centered at LHL
var map = new google.maps.Map(
document.getElementById('map'), {zoom: 15, center: location});
      // The marker, positioned at Uluru
var marker = new google.maps.Marker({position: location, map: map});

}, 150)

}

