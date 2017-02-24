

export default class MapPath {
	constructor(startCoord, endCoord) {
		this.startCoord = startCoord;
		this.endCoord = endCoord;
	}

	atPercent(percent) {
		return {
			lat: this.startCoord.lat - (percent * (this.startCoord.lat - this.endCoord.lat)),
			lng: this.startCoord.lng - (percent * (this.startCoord.lng - this.endCoord.lng))
		};
	}
}
