import MapPropertyEaser from "./map-property-easer";
import MapEasingFunctions from "./map-easing-functions";

export default class MapPath {
	constructor(startCoord, endCoord) {
		this.startCoord = startCoord;
		this.endCoord = endCoord;
		this.easingFunction = MapEasingFunctions.DEFAULT;
	}

	atPercent(percent) {
		return {
			lat: MapPropertyEaser.valueAtPercent(this.startCoord.lat, this.endCoord.lat, percent, this.easingFunction),
			lng: MapPropertyEaser.valueAtPercent(this.startCoord.lng, this.endCoord.lng, percent, this.easingFunction)
		};
	}
}
