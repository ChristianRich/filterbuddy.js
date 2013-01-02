/**
* Image processing filters can be used on all elements supporting the extraction of ImageData:
* HTMLImageElement, HTMLVideoElement, HTMLCanvasElement and ImageBitmap
*
* Image processing is very CPU intensive and using these in conjunction with an HTML5 Web Worker is recommended.
* Read more about Web Workers here: http://www.html5rocks.com/en/tutorials/workers/basics
* or use enclosed example (http://www.html5rocks.com/en/tutorials/workers/basics)
*
* Notice: These filters will most likely not work on tablets and mobiles due to limited HTML5 support on these devices.
* 
* Built on a research study based on:
* http://www.html5rocks.com/en/tutorials/canvas/imagefilters
* http://techslides.com/html5-video-into-canvas-with-filters
*/
var Filters = {};

Filters.none = function(imageData){
	return imageData;
}

/**
* Greyscale
* @param  {ImageData} imageData
* @return {ImageData} imageData
*/
Filters.greyscale = function(imageData){
	var data = imageData.data, r, g, b, brightness, len = data.length;

	for(var i = 0; i < len; i+=4) {
		r = data[i];
		g = data[i+1];
		b = data[i+2];
		brightness = (r + g + b) * 0.333333;
		data[i] = brightness;
		data[i+1] = brightness;
		data[i+2] = brightness;
	}

	imageData.data = data;
	return imageData;
}

/**
* greyscaleCIE. Applies the CIE luminance formula. http://en.wikipedia.org/wiki/Luminance_(relative)
* @param  {ImageData} imageData
* @return {ImageData} imageData
*/
Filters.greyscaleCIE = function(imageData) {
	var data = imageData.data, r, g, b, v, len = data.length;

	for(var i=0; i<len; i+=4) {
		r = data[i];
		g = data[i+1];
		b = data[i+2];
		v = 0.2126 * r + 0.7152 * g + 0.0722 * b;
		data[i] = data[i+1] = data[i+2] = v;
	}

	imageData.data = data;
	return imageData;
}

/**
* Noise applied per channel
* @param  {ImageData} imageData
* @param  {Boolean} r
* @param  {Boolean} g
* @param  {Boolean} b
* @return {ImageData} imageData
*/
Filters.noise = function(imageData, r, g, b){
	var data = imageData.data,
		len = data.length;

	for(var i=0;i<len;i+=4){
		if(r) data[i+0] = Math.random() * 255 | 0;
		if(g) data[i+1] = Math.random() * 255 | 0;
		if(b) data[i+2] = Math.random() * 255 | 0;
	}

	imageData.data = data;
	return imageData;
}

/**
* Tint. Turns the image into b&w and adds a modifier to one or more of channels
* @param  {ImageData} imageData
* @param  {Number} r
* @param  {Number} g
* @param  {Number} b
* @return {ImageData} imageData
*/
Filters.tint = function(imageData, r, g, b){
	var data = imageData.data,
		len = data.length,
		average;

	for(var i = 0; i < len; i+=4) {
		average = (data[i] + data[i+1] + data[i+2]) * 0.333333;
		if(r != undefined) data[i] = average + r;
		if(g != undefined) data[i+1] = average + g;
		if(b != undefined) data[i+2] = average + b;
	}

	imageData.data = data;
	return imageData;
}

/**
* Color. The color filter replaces one or more channels with a new fill color. Replacing all three channels would result in the original image being lost.
* @param  {ImageData} 	imageData
* @param  {Number} r 	0 -255
* @param  {Number} g 	0 -255
* @param  {Number} b 	0 -255
* @return {ImageData} 	imageData
*/
Filters.color = function(imageData, r, g, b){
	var data = imageData.data, len = data.length;

	for(var i=0;i<len; i+=4) {
		if(r != undefined) data[i] = r;
		if(g != undefined) data[i+1] = g;
		if(b != undefined) data[i+2] = b;
	}

	imageData.data = data;
	return imageData;
}

/**
* Sephia is a dark brown-gray color, named after the rich brown pigment derived from the ink sac of the common cuttlefish Sepia.
* @param  {ImageData} imageData
* @param  {Number} r
* @param  {Number} g
* @param  {Number} b
* @return {ImageData} imageData
*/
Filters.sephia = function(imageData){
	var data = imageData.data,
		len = data.length,
		r, g, b;

	for(var i = 0; i < len; i+=4){
		r = data[i];
		g = data[i+1];
		b = data[i+2];
		data[i] = (r * .393) + (g *.769) + (b * .189);
		data[i+1] = (r * .349) + (g *.686) + (b * .168);
		data[i+2] = (r * .272) + (g *.534) + (b * .131);
	}

	imageData.data = data;
	return imageData;
}

/**
* TwoChannel overwrites the blue channel with the green, leaving just red and green. Result is that yellow / orange colours are suppressed.
* @param  {ImageData} imageData
* @return {ImageData} imageData
*/
Filters.twoChannel = function(imageData){
	var data = imageData.data,
		len = data.length,
		r, g, b;

	for(var i = 0; i < len; i+=4){
		r = data[i];
		g = data[i+1];
		b = data[i+2];
		data[i] = r;
		data[i+1] = g;
		data[i+2] = g;
	}

	imageData.data = data;
	return imageData;
}

/**
* Inverts the colors to negative
* @param  {ImageData} imageData
* @return {ImageData} imageData
*/
Filters.invert = function(imageData){
	var data = imageData.data,
		len = data.length,
		r, g, b;

	for(var i = 0; i < len; i+=4){
		r = data[i];
		g = data[i+1];
		b = data[i+2];
		data[i] = 255-r;
		data[i+1] = 255-g;
		data[i+2] = 255-b;
	}

	imageData.data = data;
	return imageData;
}

/**
* Simple brightness filter
* @param  {ImageData} 			imageData
* @param  {Number} 				amount 0 - 255
* @return {ImageData}			imageData
*/
Filters.brightness = function(imageData, amount) {
	var d = imageData.data, len = d.length;

	for(var i=0; i< len; i+=4) {
		d[i] += amount;
		d[i+1] += amount;
		d[i+2] += amount;
	}

	return imageData;
}

/**
* Simple darken filter
* @param  {ImageData} 			imageData
* @param  {Number} 				amount 0 - 255
* @return {ImageData}			imageData
*/
Filters.darken = function(imageData, amount) {
	var d = imageData.data, len = d.length;

	for(var i=0; i< len; i+=4) {
		d[i] -= amount;
		d[i+1] -= amount;
		d[i+2] -= amount;
	}

	return imageData;
}

/**
* Returns a pure black and white representation of the image with abolutely no shades of gray (like super hard contrast)
* @param  {ImageData} 			imageData
* @param  {Number} amount		0 - 255
* @return {ImageData}			imageData
*/
Filters.threshold = function(imageData, amount) {
	var d = imageData.data, len = d.length, r, g, b, v;

	for (var i=0; i<len; i+=4) {
		r = d[i];
		g = d[i+1];
		b = d[i+2];
		v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= (amount || 128)) ? 255 : 0;
		d[i] = d[i+1] = d[i+2] = v;
	}

	return imageData;
}