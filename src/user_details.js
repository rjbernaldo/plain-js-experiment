function UserDetails(setParams) {
  this.lat = 0;
  this.lng = 0;
  this.radius = 0;
  this.limit = 0;
  this.setParams = setParams;
}

UserDetails.prototype.render = function() {
  this.dom = document.createElement('div');
  this.dom.innerHTML = `
    <div class="list-group">
        <div href="#" class='list-group-item list-group-item-success flex-column align-items-start' style='margin-bottom: 8px;' }}>
          <div class="d-flex w-100 justify-content-between" style='margin-bottom: 8px;' }}>
            <h5 class="mb-1">User Details</h5>
          </div>
          <div className="mb-1">
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon1" style='width: 100px;'>Latitude</span>
              <input
                id="latInput"
                type="text"
                className="form-control"
                placeholder="0"
                aria-describedby="basic-addon1"
                value='${this.lat}'
                disabled
              />
            </div>
          </div>
          <div class="mb-1">
            <div class="input-group">
              <span class="input-group-addon" id="basic-addon2" style='width: 100px;'>Longitude</span>
              <input
                id="lngInput"
                type="text"
                className="form-control"
                placeholder="0"
                aria-describedby="basic-addon2"
                value='${this.lng}'
                disabled
              />
            </div>
          </div>
          <div className="mb-1">
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon3" style='width: 100px;'>Radius</span>
              <input
                id="radiusInput"
                type="text"
                className="form-control"
                aria-describedby="basic-addon3"
                value='${this.radius}'
              />
            </div>
          </div>
          <div className="mb-1">
            <div className="input-group">
              <span className="input-group-addon" id="basic-addon4" style='width: 100px;'>Limit</span>
              <input
                id="limitInput"
                type="text"
                className="form-control"
                aria-describedby="basic-addon4"
                value='${this.limit}'
              />
            </div>
          </div>
          <div className="mb-1">
            <button
              id="submitBtn"
              type="button"
              className="btn btn-primary"
             >Change</button>
          </div>
        </div>
      </div>
  `;

  return this.dom;
};

UserDetails.prototype.attachEventListeners = function() {
  var lat = document.getElementById('latInput');
  var lng = document.getElementById('lngInput');
  var radius = document.getElementById('radiusInput');
  var limit = document.getElementById('limitInput');
  var btn = document.getElementById('submitBtn');

  [
    ['lat', lat],
    ['lng', lng],
    ['radius', radius],
    ['limit', limit],
  ].forEach(function(elem) {
    var dom = elem[1];
    var attr = elem[0];

    dom.addEventListener('change', function(e) {
      var val = parseInt(e.target.value || 0);
      this[attr] = isNaN(val) ? 0 : val;

    }.bind(this));
  }.bind(this));

  btn.addEventListener('click', function(e) {
    console.log(this.lat, this.lng, this.radius, this.limit);
  }.bind(this));
};
