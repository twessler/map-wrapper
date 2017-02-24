import Promise from "bluebird";
import { forIn } from "lodash";
import MapState from "./map-state";
import MapWrapper from "./map-wrapper";
import MapAnimator from "./map-animator";

// Placeholder for adding animation logic potentially
export default class MapTransition {
	static to(map, state) {
		forIn(MapState.updated(MapWrapper.currentState(map), state), MapWrapper.setValue.bind(null, map));
	}

	/**
	 *	test: window.MapTransition.animateToCoordinates(window.wrapper, { lat: 60.6425, lng: -156.000 }, { lat: 30.6425, lng: -56.000 });
	 */
	static animateToCoordinates(map, newCenter) {
		const oldCenter = MapWrapper.getValue(map, "center");
		const mapAnimator = MapAnimator.fromPoints(oldCenter, newCenter);

		Promise.each(mapAnimator.getStepsArray(), MapTransition
			.createPromise.bind(null, map, mapAnimator));
	}

	static createPromise(map, animator, stepNumber) {
		return new Promise((resolve) => {
			setTimeout(() => {
				map.setValue("center", animator.calculateCoordinateForStep(stepNumber));	
				resolve();
			}, animator.stepDuration);
		});
	}

	static animateStateChange(map, state) {
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
