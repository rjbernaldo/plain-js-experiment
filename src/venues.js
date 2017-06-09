function Venues() {

}

Venues.prototype.render = function() {
  this.dom = document.createElement('div');
  this.dom.innerHTML = `
    <div class='list-group'></div>
  `;

  return this.dom;
};
