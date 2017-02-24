import Promise from "bluebird";
import { forIn } from "lodash";
import MapState from "./map-state";
import Map from "./map";
import MapEasingFunctions from "./map-easing-functions";
import MapAnimator from "./map-animator";

global.MapEasingFunctions = MapEasingFunctions;

// Placeholder for adding animation logic potentially
export default class MapTransition {
	static to(map, state) {
		forIn(MapState.updated(Map.currentState(map), state), Map.setValue.bind(null, map));
	}

	// this needs to be a lot smarter
	// probably chaining promises or something that can be cancelled later on
	// static animateTo(map, state) {
	// 	const stateChanges = MapState.updated(MapState.getCurrent(map), state);

	// 	function processStateChange(value, key) {
	// 		if (key === "center") map.setCenter(value);
	// 		if (key === "zoom") map.setZoom(value);
	// 		if (key === "heading") map.setHeading(value);
	// 		if (key === "mapTypeId") map.setMapTypeId(value);
	// 		if (key === "streetView") map.setStreetView(value);
	// 		if (key === "tilt") map.setTilt(value);
	// 	}

	// 	forIn(stateChanges, processStateChange);
	// }

	/**
	 *	test: window.MapTransition.animateTo(window.map, { lat: 60.6425, lng: -156.000 }, { lat: 30.6425, lng: -56.000 });
	 */
	static animateTo(map, oldCenter, newCenter) {
		const mapAnimator = MapAnimator.fromPoints(oldCenter, newCenter);

		Promise.each(mapAnimator.getStepsArray(), MapTransition
			.createPromise.bind(null, map, mapAnimator));
	}

	static createPromise(map, animationContext, stepNumber) {
		return new Promise((resolve) => {
			setTimeout(() => {
				map.setCenter(animationContext.calculateCoordinateForStep(stepNumber));	
				resolve();
			}, animationContext.stepDuration);
		});
	}
}
