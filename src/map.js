function Map() {

}

Map.prototype.render = function() {
  this.dom = document.createElement('div');
  this.dom.id = 'map';
  this.dom.setAttribute('style', 'background-color: blue; float: left;');
  return this.dom;
};
