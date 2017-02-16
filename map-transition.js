import _ from "lodash";
import MapState from "./map-state";

// Placeholder for adding animation logic potentially
export default class MapTransition {
	static to(map, state) {
		const stateChanges = MapState.updated(MapState.getCurrent(map), state);

		function processStateChange(value, key) {
			if (key === "center") map.setCenter(value);
			if (key === "zoom") map.setZoom(value);
			if (key === "heading") map.setHeading(value);
			if (key === "mapTypeId") map.setMapTypeId(value);
			if (key === "streetView") map.setStreetView(value);
			if (key === "tilt") map.setTilt(value);
		}

		_.forIn(stateChanges, processStateChange);
	}
}
