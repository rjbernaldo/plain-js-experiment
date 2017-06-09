function App() {
  this.dom = document.getElementById('app');
}

App.prototype.resize = function() {
  var height = window.innerHeight;
  var width = window.innerWidth;
  var mapWidth = Math.floor(width * (2 / 3));
  var sidebarWidth = Math.floor(width * (1 / 3)) - 16;

  this.map.dom.style.height = `${height}px`;
  this.map.dom.style.width = `${mapWidth}px`;
  this.sidebar.dom.style.height = `${height}px`;
  this.sidebar.dom.style.width = `${sidebarWidth}px`;
};

App.prototype.renderMap = function(lat, lng) {
  this.map = new Map();
  this.dom.appendChild(this.map.render());
  this.map.attachGoogleMaps(lat, lng);
};

App.prototype.renderSidebar = function() {
  this.sidebar = new Sidebar();
  this.dom.appendChild(this.sidebar.render());
};

App.prototype.renderUserDetails = function(lat, lng) {
  this.userDetails = new UserDetails(lat, lng); // todo: setparams
  this.sidebar.dom.appendChild(this.userDetails.render());
};

App.prototype.renderVenues = function(lat, lng) {
  this.venues = new Venues();
  this.sidebar.dom.appendChild(this.venues.render());
  this.venues.fetchVenues(
    this.map,
    lat,
    lng,
    this.userDetails.radius,
    this.userDetails.limit,
  );
};

App.prototype.attachEventListeners = function() {
  window.addEventListener('resize', app.resize, false);
  this.userDetails.attachEventListeners();
};

function initialize() {
  var app = new App();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(p) {
      var lat = p.coords.latitude;
      var lng = p.coords.longitude;

      app.renderMap(lat, lng);
      app.renderSidebar();
      app.renderUserDetails(lat, lng);
      app.renderVenues(lat, lng);
      app.attachEventListeners();
      app.resize();
    });
  } else {
    alert('Geolocation not available');
  }
}

window.addEventListener('DOMContentLoaded', initialize, false);
