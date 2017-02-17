import { has, keys, chain } from "lodash";

const ALTERABLE_PROPERTIES = {
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

/**
 * Utility class for working with the map object.
 */
export default class Map {
	
	/**
	 * Set a new state value on the map, if allowed.
	 * 
	 * @param {Object} map object
	 * @param {Object} new value
	 * @param {String} property on which the value should be set
	 */
	static setValue(map, value, property) {
		if (Map.isAlterable(property)) {
			map[ALTERABLE_PROPERTIES[property].set](value);
		}
	}

	/**
	 * Get value from the current map state
	 * 
	 * @param  {Object} map object
	 * @param  {String} property for which we want a value.
	 * @return {Object} value of the requested property
	 */
	static getValue(map, property) {
		if (!Map.isAlterable(property)) {
			return null;
		}
		return map[ALTERABLE_PROPERTIES[property].get]();
	}

	/**
	 *	Is the given property something we allow to be altered?
	 * 
	 * @param  {String} map property name.
	 * @return {Boolean} whether property is alterable or not
	 */
	static isAlterable(property) {
		return has(ALTERABLE_PROPERTIES, property);
	}

	/**
	 *	Current state of the map, with respect to alterable map properties.
	 * 
	 * @param  {Object} map object.
	 * @return {Object} current map state.
	 */
	static currentState(map) {
		return chain(ALTERABLE_PROPERTIES)
					.transform((result, value, key) => { 
						const rslt = result;
						rslt[key] = Map.getValue(map, key); 
					})
					.value();
	}

	/**
	 *	Current list of map properties which can be edited.
	 * 
	 * @return {Array} list of alterable map properties.
	 */
	static getAlterableProperties() {
		return keys(ALTERABLE_PROPERTIES);
	}
}
