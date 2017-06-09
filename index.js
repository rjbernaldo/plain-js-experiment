function App() {
  this.app = document.getElementById('app');
  this.generateMap();
  this.generateSidebar();
  this.resize();
}

App.prototype.resize = function() {
  var height = window.innerHeight;
  var width = window.innerWidth;
  var mapWidth = Math.floor(width * (2 / 3));
  var sidebarWidth = Math.floor(width * (1 / 3)) - 16;

  this.map.style.height = `${height}px`;
  this.map.style.width = `${mapWidth}px`;
  this.sidebar.style.height = `${height}px`;
  this.sidebar.style.width = `${sidebarWidth}px`;
};

App.prototype.generateMap = function() {
  this.map = document.createElement('div');
  this.map.id = 'map';
  this.map.setAttribute('style', 'background-color: blue; float: left;');
  this.app.appendChild(this.map);
};

App.prototype.generateSidebar = function() {
  this.sidebar = document.createElement('div');
  this.sidebar.id = 'sidebar';
  this.sidebar.setAttribute('style', 'background-color: red; float: left; overflow-y: scroll; margin-left: 8px; padding-top: 8px; padding-bottom: 8px;');
  this.app.appendChild(this.sidebar);
};

function initialize() {
  var app = new App();
  window.addEventListener('resize', app.resize.bind(app));
}

window.addEventListener('DOMContentLoaded', initialize, false);