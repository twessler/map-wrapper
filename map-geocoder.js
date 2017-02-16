const geocoder = null;

export default class MapGeocoder {
	constructor() {
		if (!geocoder) this.geocoder = new global.google.maps.Geocoder();
	}

	// Something wonky going on here.  Spotty at best.
	lookup(location) {
		const me = this;

		this.geocoder.geocode({ address: location }, (results, status) => {
			if (status === "OK") {
				me.loc = results[0].geometry.location;
			}
		});

		return me.loc;
	}
}
