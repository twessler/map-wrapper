import MapWorker from "./map-worker";

class MapsWrapper {

	constructor(apiKey, mapContainerId = "map", initialState = { center: { lat: 60.6425, lng: -156.000 }, zoom: 5 }) {
		this.mapWorker = new MapWorker(apiKey, mapContainerId, initialState);
		this.mapContainerId = mapContainerId;
	}
}

global.mapsWrapper = new MapsWrapper(`AIzaSyBQv8SmhfqTttR9XO0gAzuw4ikzLyvCysI`);
// global.mapsWrapper.centerOnLocation("Anchorage, AK");

