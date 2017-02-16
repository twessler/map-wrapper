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
	 *	Compare new desired state to current state of google map, and execute on differences.
	 *
	 * @param  {Object}	new desired state of google map
	 * @return {void}
	 */
	updateMap(newState) {
		const me = this;

		function processUpdate() {
			return new Promise((resolve, reject) => {
				me.priorState = me.getMapState();
				me.mapState = _.extend(_.cloneDeep(me.priorState), newState);
				try {
					if (me.priorState.center !== me.mapState.center) me.map.setCenter(me.mapState.center);
					if (me.priorState.zoom !== me.mapState.zoom) me.map.setZoom(me.mapState.zoom);
					// if (me.priorState.bounds !== me.mapState.bounds) me.map.setBounds(me.mapState.bounds);
					if (me.priorState.heading !== me.mapState.heading) me.map.setHeading(me.mapState.heading);
					if (me.priorState.mapTypeId !== me.mapState.mapTypeId) me.map.setMapTypeId(me.mapState.mapTypeId);
					// if (me.priorState.projection !== me.mapState.projection) me.map.setProjection(me.mapState.projection);
					if (me.priorState.streetView !== me.mapState.streetView) me.map.setStreetView(me.mapState.streetview);
					if (me.priorState.tilt !== me.mapState.tilt) me.map.setTilt(me.mapState.tilt);
					// priorState.markers !== mapState.markers
					setTimeout(resolve, 5000);
				} catch (e) {
					reject(e);
				}
			});
		}
		me.promiseChain = me.promiseChain.then(processUpdate);
	}

	/**
	 * Get the current state of our google map
	 *
	 * @return {Object} all of the current properties of our google map.
	 */
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
			// markers: this.getMarkers()
		};
	}
}
