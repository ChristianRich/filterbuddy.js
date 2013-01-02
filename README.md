filterbuddy.js
==============

#### Bitmap processing filters ####

Filterbuddy.js provides bitmap processing filters for images, video and canvas. I strongly advice that these filters are used in conjunction with a HTML5 Web Worker.
 
### Available filters ###

*
*
*
*
*
*

### Usage examples ###

```html
// Extracts a 100x100 region from a Canvas element and returns an Image element
var myImage = canvasbuddy.canvasToImage(canvas, 0, 0, 100, 100);
```

```html
// Copies the pixels from the current frame of na HTML5VideoElement onto a HTML5CanvasElement
canvasbuddy.videoToCanvas(video, ctx);
```

```html
// Extracts a 100x100 region from a Canvas and returns an ImageData object
canvasbuddy.getImageData(canvas, 0, 0, 100, 100);
```