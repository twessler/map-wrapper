import Promise from "bluebird";
import _ from "lodash";
import MapState from "./map-state";

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

					const s1 = new MapState({ zoom: 5 });
					const s2 = new MapState({ zoom: 5, tilt: 1 });
					const s3 = new MapState({ tilt: 2, center: { lat: 100, lng: 100 } });
					const s4 = new MapState({ center: { lat: 100, lng: 100 } });
					console.log(MapState.updated(s1, s2));
					console.log(MapState.updated(s1, s3));
					console.log(MapState.updated(s1, s4));
					console.log(MapState.updated(s2, s3));
					console.log(MapState.updated(s2, s4));
					console.log(MapState.updated(s3, s4));

					resolve();
				};
				global.document.body.appendChild(script);
			} catch (e) {
				reject(e);
			}
		});

		return this.promiseChain;
	}

	/**
	 * Compare new desired state to current state of google map, and execute on differences.
	 *
	 * @param  {Object}	new desired state of google map
	 * @return {void}
	 */
	updateMapREMOVE(newState) {
		const me = this;

		function processUpdate() {
			return new Promise((resolve, reject) => {
				me.priorState = me.getMapState();
				me.mapState = _.extend(_.cloneDeep(me.priorState), newState);

				try {
					if (me.priorState.center !== me.mapState.center) me.map.setCenter(me.mapState.center);
					if (me.priorState.zoom !== me.mapState.zoom) me.map.setZoom(me.mapState.zoom);
					if (me.priorState.heading !== me.mapState.heading) me.map.setHeading(me.mapState.heading);
					if (me.priorState.mapTypeId !== me.mapState.mapTypeId) me.map.setMapTypeId(me.mapState.mapTypeId);
					if (me.priorState.streetView !== me.mapState.streetView) me.map.setStreetView(me.mapState.streetview);
					if (me.priorState.tilt !== me.mapState.tilt) me.map.setTilt(me.mapState.tilt);
					// if (me.priorState.projection !== me.mapState.projection) me.map.setProjection(me.mapState.projection);
					// if (me.priorState.bounds !== me.mapState.bounds) me.map.setBounds(me.mapState.bounds);
					// priorState.markers !== mapState.markers
				} catch (e) {
					reject(e);
				}
			});
		}
		me.promiseChain = me.promiseChain.then(processUpdate);
	}
}
