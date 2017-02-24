import MapEasingFunctions from "./map-easing-functions";
import MapPath from "./map-path";

export default class MapAnimator {
	constructor(opts) {
		this.startCoord = opts.startCoord || { lat: 0, lng: 0 };
		this.endCoord = opts.endCoord || { lat: 0, lng: 0 };
		this.easingFunction = opts.easingFunction || MapEasingFunctions.DEFAULT;
		this.duration = opts.duration || 5000;
		this.steps = opts.steps || 60;
		this.stepDuration = this.duration / this.steps;
		this.pathFunction = opts.pathFunction || new MapPath(this.startCoord, this.endCoord);
		this.frameTime = this.duration / this.steps;
		// calculate the distance between the animation points
	}

	getStepsArray() {
		return [...Array(this.steps).keys()].map((i) => i + 1);
	}

	calculateCoordinateForStep(currentStep) {
		const percentage = this.easingFunction(currentStep / this.steps);
		const nextCoord = {
			lat: this.startCoord.lat - (percentage * (this.startCoord.lat - this.endCoord.lat)),
			lng: this.startCoord.lng - (percentage * (this.startCoord.lng - this.endCoord.lng))
		};

		console.log(JSON.stringify(nextCoord));
		return nextCoord;
	}

	static fromPoints(startCoord, endCoord) {
		return new MapAnimator({
			startCoord,
			endCoord
			// figure out the duration and steps needed to make the animator smooth
		});
	}
}
