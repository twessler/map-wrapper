import MapEasingFunctions from "./map-easing-functions";
import MapPath from "./map-path";
import MapState from "./map-state";

export default class MapAnimator {
	constructor(opts) {
		this.startCoord = opts.startCoord || { lat: 0, lng: 0 };
		this.endCoord = opts.endCoord || { lat: 0, lng: 0 };
		this.easingFunction = opts.easingFunction || MapEasingFunctions.ALL.easeInOutCubic;
		this.duration = opts.duration || 2000;
		this.steps = opts.steps || Math.trunc(this.duration / 60);
		this.stepDuration = this.duration / this.steps;
		this.mapPath = opts.mapPath || new MapPath(this.startCoord, this.endCoord);
		this.frameTime = this.duration / this.steps;
		// calculate the distance between the animation points
	}

	getStepsArray() {
		return [...Array(this.steps).keys()].map((i) => i + 1);
	}

	calculateCoordinateForStep(currentStep) {
		const percent = this.easingFunction(currentStep / this.steps);
		const nextCoord = this.mapPath.atPercent(percent);

		// console.log(JSON.stringify(nextCoord));
		return nextCoord;
	}

	calculateStateForStep(step) {
		const percent = this.easingFunction(step / this.steps);
		const nextCoord = this.mapPath.atPercent(percent);

		return new MapState({
			center: nextCoord
		});
	}

	static fromPoints(startCoord, endCoord) {
		return new MapAnimator({
			startCoord,
			endCoord
			// TODO - figure out the duration and steps needed to make the animator smooth
		});
	}
}
