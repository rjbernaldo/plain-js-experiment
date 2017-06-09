function Sidebar() {

}

Sidebar.prototype.render = function() {
  this.dom = document.createElement('div');
  this.dom.id = 'sidebar';
  this.dom.setAttribute('style', 'float: left; overflow-y: scroll; margin-left: 8px; padding-top: 8px; padding-bottom: 8px;');

  return this.dom;
};
