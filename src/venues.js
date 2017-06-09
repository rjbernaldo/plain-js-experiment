// TODO: dotenv
var CLIENT_ID = 'D2RALMRPSNOPXON20GXYIHADRYDIOJCMZ45WXFP14LXLPW0M';
var CLIENT_SECRET = '1XGQMVGAWCBDRFH3SLOCBSZMWQLKPSVWUSB1QQAP22Q1NIGX';
var VERSION = '20170101';
var MARKER_URL = '/assets/black.png';
var CURRENT_MARKER_URL = '/assets/green.png';

function Venues() {
  this.data = [];
}

Venues.prototype.render = function() {
  this.dom = document.createElement('div');
  this.dom.innerHTML = `
    <div id='venues' class='list-group'></div>
  `;

  return this.dom;
};

Venues.prototype.setCurrentMarkerId = function(data) {
  var lastCurrent = this.dom.getElementsByClassName('active')[0];
  if (lastCurrent) {
    lastCurrent.classList.remove('active');
  }

  var current = data ? document.getElementById(data.id) : null;
  if (current) {
    current.classList.add('active');
    current.scrollIntoViewIfNeeded();

    this.data.forEach(function(d) {
      d.marker.setIcon({
        url: MARKER_URL,
        scaledSize: new google.maps.Size(20, 20),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 50),
      });
    });

    data.marker.setIcon({
      url: CURRENT_MARKER_URL,
      scaledSize: new google.maps.Size(20, 20),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 50),
    });
  }
};

Venues.prototype.renderVenues = function() {
  this.data.forEach(function(d) {
    var venue = new Venue(d);

    this.dom.appendChild(venue.render(this.setCurrentMarkerId));

    venue.dom.addEventListener('mouseover', function() {
      this.setCurrentMarkerId(d);
    }.bind(this));
  }.bind(this));

  this.setCurrentMarkerId();
};

Venues.prototype.fetchVenues = function(map, lat, lng, radius, limit) {
  var foursquareUrl = `https://api.foursquare.com/v2/venues/search?intent=browse&ll=${lat},${lng}&radius=${radius}&limit=${limit}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&v=${VERSION}`;

  fetch(foursquareUrl)
    .then(function(res) { return res.json(); })
    .then(function(res) {
      var venues = res.response.venues.map(function(venue) {
        var marker = new google.maps.Marker({
          icon: {
            url: MARKER_URL,
            scaledSize: new google.maps.Size(20, 20),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 50),
          },
          position: { lat: venue.location.lat, lng: venue.location.lng },
          map: map.google,
          title: venue.name,
        });

        var newVenue = Object.assign({}, venue, { marker: marker });

        marker.addListener('mouseover', function() {
          this.setCurrentMarkerId(newVenue);
        }.bind(this));

        return newVenue;
      }.bind(this));

      this.data = venues;
      this.renderVenues();
    }.bind(this));
};
