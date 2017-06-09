var MARKER_URL = '/assets/black.png';

function Venue(data) {
  this.data = data;
}

Venue.prototype.render = function(currentMarkerId, setCurrentMarkerId) {
  this.dom = document.createElement('div');
  this.dom.innerHTML = `
    <div id='${this.data.id}' style='margin-bottom: 8px;' class='list-group-item list-group-item-action flex-column align-items-start'>
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${this.data.name}</h5>
        <small>${this.data.categories.map(function(c) { return c.name; }).join(', ')}</small>
      </div>
      <p class="mb-1">${this.data.location.address || ''}</p>
      <small><a href=${this.data.url || ''}>${ this.data.url ? 'Website' : ''}</a></small>
      <small>${this.data.contact.phone || ''}</small>
    </div>
  `;

  return this.dom;
};
