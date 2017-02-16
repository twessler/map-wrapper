import { forIn, omit, pick, isNull } from "lodash";

const allowedKeys = ["center", "zoom", "bounds", "heading", "mapTypeId", "projection", "streetView", "tilt"];

export default class MapState {
	constructor(state) {
		forIn(omit(pick(state, allowedKeys), isNull), (key, value) => { this[key] = value; });
	}

	static getCurrent(map) {
		return new MapState({
			center: map.getCenter(),
			zoom: map.getZoom(),
			bounds: map.getBounds(),
			heading: map.getHeading(),
			mapTypeId: map.getMapTypeId(),
			projection: map.getProjection(),
			streetView: map.getStreetView(),
			tilt: map.getTilt()
		});
	}
}
