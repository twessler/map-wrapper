import { forIn } from "lodash";
import MapState from "./map-state";
import Map from "./map";


// Placeholder for adding animation logic potentially
export default class MapTransition {
	static to(map, state) {
		forIn(MapState.updated(Map.currentState(map), state), Map.setValue.bind(null, map));
	}

	// this needs to be a lot smarter
	// probably chaining promises or something that can be cancelled later on
	static animateTo(map, state) {
		const stateChanges = MapState.updated(MapState.getCurrent(map), state);

		function processStateChange(value, key) {
			if (key === "center") map.setCenter(value);
			if (key === "zoom") map.setZoom(value);
			if (key === "heading") map.setHeading(value);
			if (key === "mapTypeId") map.setMapTypeId(value);
			if (key === "streetView") map.setStreetView(value);
			if (key === "tilt") map.setTilt(value);
		}

		forIn(stateChanges, processStateChange);
	}
}
