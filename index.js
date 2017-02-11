class MapsWrapper {
	var _map = undefined;
	map() { // returns a promise always
  // if _map is undefined, instantiate the map
  	return Promise.new(/*return the map when it's done*/)
  }
  geocoder() {
  	
  }
  
  
	init(apiKey, mapContainerId) {
  	this.mapContainerId = mapContainerId;
    this._loadMapsApi(apiKey);
  }
    
	    
    
   _loadMapsApi (token) {
   		const script = document.createElement("script");
      const cls = this;
      script.src=`https://maps.googleapis.com/maps/api/js?key=${token}`;
      script.onload = function() {cls._mapsApiLoaded.call(cls);};
   		document.body.appendChild(script);
   }
   
   _mapsApiLoaded() {
   	this.map = new google.maps.Map(document.getElementById(this.mapContainerId), {
      center: {lat: 90.6425, lng: -156.000},
      zoom: 5
    });
    this.geo = new google.maps.Geocoder();
   }
   
   centerOnLocation(location) {
   map().then(actuallyCenterOnLoc)
   
    this.geo.geocode({'address': location}, function(results, status) {
    	if (status == 'OK') {
      	console.log("location: " + results[0]);
        cls.map.setCenter(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
   }
   
 }
 
window.mapsWrapper = new MapsWrapper();

//document.body.onload = function() {
	window.mapsWrapper.init(`AIzaSyBQv8SmhfqTttR9XO0gAzuw4ikzLyvCysI`, 'map');
  window.mapsWrapper.centerOnLocation("Anchorage, AK");
//}


