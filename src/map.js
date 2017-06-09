var USER_MARKER_URL = '/assets/blue.png'; // TODO: dotenv

function Map() {

}

Map.prototype.render = function() {
  this.dom = document.createElement('div');
  this.dom.id = 'map';
  this.dom.setAttribute('style', 'background-color: blue; float: left;');
  return this.dom;
};

Map.prototype.attachGoogleMaps = function() {
  var googleMapsUrl = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=initMap`;
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', googleMapsUrl);
  document.head.appendChild(script);

  window.initMap = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        var map = new google.maps.Map(
          document.getElementById('map'),
          { zoom: 17, center: { lat: lat, lng: lng }},
        );

        var marker = new google.maps.Marker({
          icon: {
            url: USER_MARKER_URL,
            scaledSize: new google.maps.Size(20, 20),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 50),
          },
          position: { lat: lat, lng: lng },
          map: map
        });
      });
    }
  }.bind(this);
};

