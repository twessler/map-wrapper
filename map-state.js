import _ from "lodash";

export default class MapState {
	constructor(stateHash) {
		_.forIn(MapState.filterKeys(stateHash), (value, key) => { this[key] = value; });
	}

	static get ALLOWED_KEYS() {
		return [
			"center",
			"zoom",
			"bounds",
			"heading",
			"mapTypeId",
			"projection",
			"streetView",
			"tilt"
		];
	}

	/**
	 * Returns the states that changed between state1 and state2
	 *
	 * @return {Hash} The key/value pairs that have been updated.
	 */
	static updated(state1, state2) {
		const allState = _.extend(MapState.filterKeys(state1), MapState.filterKeys(state2));

		function compareKeys(value, key) {
			return _.isEqual(allState[key], state1[key]);
		}

		return _.omitBy(allState, compareKeys);
	}

	/**
	 * Syntactic sugar for merging two states
	 *
	 * @return {MapState} the resulting state after merging two states
	 */
	static merge(state1, state2) {
		return new MapState(_.extend(state1, state2));
	}

	static getCurrent(map) {
		return new MapState({
			center: map.getCenter(),
			zoom: map.getZoom(),
			bounds: map.getBounds(),
			heading: map.getHeading(),
			mapTypeId: map.getMapTypeId(),
			projection: map.getProjection(),
			streetView: map.getStreetView(),
			tilt: map.getTilt()
		});
	}

	static filterKeys(stateHash) {
		return _.omit(_.pick(_.cloneDeep(stateHash), MapState.ALLOWED_KEYS), _.isNull);
	}
}
