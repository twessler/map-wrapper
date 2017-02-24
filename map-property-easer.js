import MapEasingFunctions from "./map-easing-functions";

export default class MapPropertyEaser {
	static valueAtPercent(start, end, percent, easingFunction = MapEasingFunctions.DEFAULT) {
		const localPercent = easingFunction(percent);
		return start - (localPercent * (start - end));
	}
}
