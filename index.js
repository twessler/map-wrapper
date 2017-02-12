// import MapWorker from "./map-worker";

class MapsWrapper {

	constructor(apiKey, mapContainerId = "map") {
		this.mapState = {
			center: { lat: 50.6425, lng: -156.000 },
			zoom: 5
		};

		this.mapContainerId = mapContainerId;
		//this.mapWorker = new MapWorker(apiKey);
		this.loadMapsApi(apiKey);
	}

	mapsApiLoaded() {
		const el = global.document.getElementById(this.mapContainerId);
		this.map = new global.google.maps.Map(el, this.mapState);
	}

	loadMapsApi(token) {
		const cls = this;
		const script = global.document.createElement("script");

		script.src = `https://maps.googleapis.com/maps/api/js?key=${token}`;
		script.onload = function loadGoogleApi() {
			cls.mapsApiLoaded.call(cls);
		};
		global.document.body.appendChild(script);
	}

	/**
	 * center the map at some lat and long
	 * @param  {[type]}
	 * @return {[type]}
	 */
	centerOnLocation(location) {
		this.geo = new global.google.maps.Geocoder();
		// const map = this.map;

		this.geo.geocode({ address: location }, (results, status) => {
			if (status === "OK") {
				this.mapState.center = results[0].geometry.location;
				this.transition();
			} else {
				console.log(`Geocode was not successful for the following reason: ${status}`);
			}
		});
	}

	/**
	 * Update the map to the newest state.
	 */
	transition() {
		this.map.panTo(this.mapState.center);
		//this.map.setZoom(this.mapState.zoom);
	}


	getMapState() {
		return {
			center: this.map.getCenter(),
			zoom: this.map.getZoom(),
			bounds: this.map.getBounds(),
			heading: this.map.getHeading(),
			mapTypeId: this.map.getMapTypeId(),
			projection: this.map.getProjection(),
			streetView: this.map.getStreetView(),
			tilt: this.map.getTilt()
		}
	}

}

global.mapsWrapper = new MapsWrapper(`AIzaSyBQv8SmhfqTttR9XO0gAzuw4ikzLyvCysI`);
// global.mapsWrapper.centerOnLocation("Anchorage, AK");

