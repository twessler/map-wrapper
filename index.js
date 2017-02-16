import MapWorker from "./map-worker";

class MapsWrapper {

	constructor(apiKey, mapContainerId = "map", initialState = { center: { lat: 60.6425, lng: -156.000 }, zoom: 5 }) {
		this.mapWorker = new MapWorker(apiKey, mapContainerId, initialState);
		this.mapContainerId = mapContainerId;
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
				// this.transition();
			} else {
				// console.log(`Geocode was not successful for the following reason: ${status}`);
			}
		});
	}

	/**
	 * Update the map to the newest state.
	 */
	// transition() {
		// this.map.panTo(this.mapState.center);
		// this.map.setZoom(this.mapState.zoom);
	// }
}

global.mapsWrapper = new MapsWrapper(`AIzaSyBQv8SmhfqTttR9XO0gAzuw4ikzLyvCysI`);
// global.mapsWrapper.centerOnLocation("Anchorage, AK");

