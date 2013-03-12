importScripts('Filters.js');

var process = function(e){

	var data = e.data,
		fn = data.filterName,
		args = data.args || [],
		filter;

	// A switch statement would be prettier here, but if / else seems to work slightly faster.
	if(fn == 'greyscale'){
		filter = Filters.greyscale;
	} else if(fn == 'greyscaleCIE'){
		filter = Filters.greyscaleCIE;
	} else if(fn == 'threshold'){
		filter = Filters.threshold;
	} else if(fn == 'color'){
		filter = Filters.color;
	} else if(fn == 'tint'){
		filter = Filters.tint;
	} else if(fn == 'noise'){
		filter = Filters.noise;
	} else if(fn == 'brightness'){
		filter = Filters.brightness;
	} else if(fn == 'darken'){
		filter = Filters.darken;
	} else if(fn == 'sephia'){
		filter = Filters.sephia;
	} else if(fn == 'twoChannel'){
		filter = Filters.twoChannel;
	} else if(fn == 'invert'){
		filter = Filters.invert;
	} else {
		filter = Filters.none;
	}

	// Reformatting args so ImageData is always the first argument passed to the selected filter
	args.unshift(data.imageData)
	postMessage(filter.apply(null, args));
}

addEventListener('message', process, false);