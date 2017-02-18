

export default class MapAnimator {
	constructor(options) {
		this.duration = 1000;
		this.easingFunction = options.easingFunction || MapAnimator.DEFAULT_EASING_FUNCTION
	}

	steps () {
	}

	static get DEFAULT() {
		return function() {};
	}

	// Borrowing these from https://gist.github.com/gre/1650294 
	// for the time being
	static get FUNCTIONS() {
		return {
			// no easing, no acceleration
			linear: (t) => t,
			// accelerating from zero velocity
			easeInQuad: (t) => t ** 2,
			// decelerating to zero velocity
			easeOutQuad: (t) => t * (2 - t),
			// acceleration until halfway, then deceleration
			easeInOutQuad: (t) => t < .5 ? 2 * (t ** 2) : ((4 - (2 * t)) * t) - 1,
			// accelerating from zero velocity 
			easeInCubic: (t) => t ** 3,
			// decelerating to zero velocity 
			easeOutCubic: (t) => ((t - 1) * (t ** 2)) + 1,
			// acceleration until halfway, then deceleration 
			easeInOutCubic: (t) => t < .5 ? 4 * (t ** 3) : (t - 1) * ((2 * t) - 2) * ((2 * t) - 2) + 1,
			// accelerating from zero velocity 
			easeInQuart: (t) => t ** 4,
			// decelerating to zero velocity 
			easeOutQuart: (t) => 1 - (t - 1) * (t ** 3),
			// acceleration until halfway, then deceleration
			easeInOutQuart: (t) => t < .5 ? 8 * (t ** 4) : 1 - (8 * (t - 1) * (t ** 3)),
			// accelerating from zero velocity
			easeInQuint: (t) => t ** 5,
			// decelerating to zero velocity
			easeOutQuint: (t) => 1 + ((t - 1) * (t ** 4)),
			// acceleration until halfway, then deceleration 
			easeInOutQuint: (t) => t < .5 ? 16 * (t ** 5) : 1 + (16 * (t - 1)* (t ** 4)),
			default: easeInOutCubic
		}
	}
}
