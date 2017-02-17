import { forIn } from "lodash";
import MapState from "./map-state";
import Map from "./map";

// Placeholder for adding animation logic potentially
export default class MapTransition {
	static to(map, state) {
		forIn(MapState.updated(Map.currentState(map), state), Map.setValue.bind(null, map));
	}
}
