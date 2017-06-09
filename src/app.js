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

App.prototype.renderMap = function() {
  this.map = new Map();
  this.dom.appendChild(this.map.render());
};

App.prototype.renderSidebar = function() {
  this.sidebar = new Sidebar();
  this.dom.appendChild(this.sidebar.render());
};

App.prototype.renderUserDetails = function() {
  this.userDetails = new UserDetails();
  this.sidebar.dom.appendChild(this.userDetails.render());
};

App.prototype.renderVenues = function() {
  this.venues = new Venues();
  this.sidebar.dom.appendChild(this.venues.render());
};

App.prototype.attachEventListeners = function() {
  window.addEventListener('resize', app.resize, false);
  this.userDetails.attachEventListeners();
};

function initialize() {
  var app = new App();
  app.renderMap();
  app.renderSidebar();
  app.renderUserDetails();
  app.renderVenues();
  app.attachEventListeners();
  app.resize();
}

window.addEventListener('DOMContentLoaded', initialize, false);
