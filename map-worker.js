const queue=[];
let monitoring=false;

export class MapWorker {
	constructor(apiKey) {

		this.loadMapsApi(apiKey);
	}

	loadMapsApi(token) {
		const cls = this;
		const script = global.document.createElement("script");

		script.src = `https://maps.googleapis.com/maps/api/js?key=${token}`;
		script.onload = function loadGoogleApi() {
			cls.mapsApiLoaded.call(cls);
		};
		global.document.body.appendChild(script);
	}

	/**
	 *	Function performs the following: 
	 *		1.)  queues requests to interact with the google maps api
	 *		2.)  if api is available, then process queue
	 *		3.)  if api is not available, then check again in 50ms
	 * 
	 * @param  {Function}	instructions to execute when api is available
	 * @param  {Function}	function to call once instructions have been executed
	 * @return {void}
	 */
	performMapOperation(fn, callback) {
		queue.push({
			fn: fn,
			cb: callback
		});

		if(monitoringStarted) {
			return;
		}

		function checkMapApiAvailable() {
			if(google) {
				queue.forEach((command) => {
					command.fn();
					command.cb();
				});
				monitoring = false;
			} else {
				setTimeout(checkMapApiAvailable, 50);
			}
		}

		monitoring = true;
		checkMapApiAvailable();	
	}
}