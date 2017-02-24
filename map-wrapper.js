import { has, keys, chain } from "lodash";

/**
 * Utility class for working with the map object.
 */
export default class MapWrapper {
	constructor(map) {
		this.map = map;
	}
	
	static get ALTERABLE_PROPERTIES() {
		return {
			center: {
				get: "getCenter",
				set: "setCenter"
			},
			zoom: {
				get: "getZoom",
				set: "setZoom"
			},
			heading: {
				get: "getHeading",
				set: "setHeading"
			},
			mapTypeId: {
				get: "getMapTypeId",
				set: "setMapTypeId"
			},
			// streetView: {
			// 	get: "getStreetView",
			// 	set: "setStreetView"
			// },
			tilt: {
				get: "getTilt",
				set: "setTilt"
			}
		};
	}

	/**
	 * Set a new state value on the map, if allowed.
	 * 
	 * @param {Object} map object
	 * @param {String} property on which the value should be set
	 * @param {Object} new value
	 */
	static setValue(map, property, value) {
		if (MapWrapper.isAlterable(property)) {
			map[MapWrapper.ALTERABLE_PROPERTIES[property].set](value);
		}
	}

	setValue(property, value) {
		MapWrapper.setValue(this.map, property, value);
	}

	/**
	 * Get value from the current map state
	 * 
	 * @param  {Object} map object
	 * @param  {String} property for which we want a value.
	 * @return {Object} value of the requested property
	 */
	static getValue(map, property) {
		if (!MapWrapper.isAlterable(property)) {
			return null;
		}
		// TODO - This is terribly hacky, but this property has functions in it for lat and lng
		if (property === "center") {
			return map.map[MapWrapper.ALTERABLE_PROPERTIES[property].get]().toJSON();
		}
		return map.map[MapWrapper.ALTERABLE_PROPERTIES[property].get]();
	}

	getValue(property) {
		return MapWrapper.getValue(this.map, property);
	}

	/**
	 *	Is the given property something we allow to be altered?
	 * 
	 * @param  {String} map property name.
	 * @return {Boolean} whether property is alterable or not
	 */
	static isAlterable(property) {
		return has(MapWrapper.ALTERABLE_PROPERTIES, property);
	}

	/**
	 *	Current state of the map, with respect to alterable map properties.
	 * 
	 * @param  {Object} map object.
	 * @return {Object} current map state.
	 */
	static currentState(map) {
		return chain(MapWrapper.ALTERABLE_PROPERTIES)
					.transform((result, value, key) => { 
						const rslt = result;
						rslt[key] = MapWrapper.getValue(map, key); 
					})
					.value();
	}

	currentState() {
		return MapWrapper.currentState(this.map);
	}

	/**
	 *	Current list of map properties which can be edited.
	 * 
	 * @return {Array} list of alterable map properties.
	 */
	static getAlterableProperties() {
		return keys(MapWrapper.ALTERABLE_PROPERTIES);
	}
}
