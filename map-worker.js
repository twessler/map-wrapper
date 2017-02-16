import Promise from "bluebird";
import MapState from "./map-state";
// import MapTransition from "./map-transition";
// import MapGeocoder from "./map-geocoder";

/**
 * Class for handling direct interactions with the google maps api.
 */
export default class MapWorker {

	constructor(apiKey, mapId = "map", defaultState) {
		this.mapId = mapId;
		this.apiKey = apiKey;
		this.mapState = new MapState(defaultState);
		this.loadMapsApi();
	}

	/**
	 * Determine if the map api has been loaded.  If not, then load it dynamically.
	 *
	 * @return {Promise} promise to notify when google map api is loaded
	 */
	loadMapsApi() {
		this.promiseChain = new Promise((resolve, reject) => {
			try {
				if (global.google && global.google.maps) {
					resolve();
					return;
				}

				const script = global.document.createElement("script");
				script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
				script.onload = () => {
					const el = global.document.getElementById(this.mapId);
					this.map = new global.google.maps.Map(el, this.mapState);

					// Testing if stuff works.  For the most part, it seems like it does.
					// MapTransition.to(this.map, new MapState({ zoom: 7 }));
					// this.geo = new MapGeocoder(this.map);
					resolve();
				};
				global.document.body.appendChild(script);
			} catch (e) {
				reject(e);
			}
		});

		return this.promiseChain;
	}
}
