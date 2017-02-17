import { chain, forIn, extend, isEqual, omitBy, cloneDeep, isNull } from "lodash";
import Map from "./map";

export default class MapState {
	constructor(stateHash) {
		forIn(MapState.filterKeys(stateHash), (value, key) => { this[key] = value; });
	}
	
	/**
	 * Returns the states that changed between state1 and state2
	 *
	 * @return {Hash} The key/value pairs that have been updated.
	 */
	static updated(state1, state2) {
		const allState = extend(MapState.filterKeys(state1), MapState.filterKeys(state2));

		function compareKeys(value, key) {
			return isEqual(allState[key], state1[key]);
		}

		return omitBy(allState, compareKeys);
	}

	/**
	 * Syntactic sugar for merging two states
	 *
	 * @return {MapState} the resulting state after merging two states
	 */
	static merge(state1, state2) {
		return new MapState(extend(state1, state2));
	}

	/**
	 * Filter state properties to only those that can be updated,
	 * and only those that are not null
	 *
	 * @param  {Object} desired state.
	 * @return {Object} updated state based on what is allowed.
	 */
	static filterKeys(stateHash) {
		return chain(cloneDeep(stateHash))
					.pick(Map.getAlterableProperties())
					.omit(isNull)
					.value();
	}
}
