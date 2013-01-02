// http://gent.ilcore.com/2012/06/better-timer-for-javascript.html
(function(window){
    window.performance = window.performance || {};

    performance.now = (function() {
        return  performance.now       ||
                performance.mozNow    ||
                performance.msNow     ||
                performance.oNow      ||
                performance.webkitNow ||
                function() { return new Date().getTime();
                };
    })();
})(window);

/**
* http://paulirish.com/2011/requestanimationframe-for-smart-animating/
* http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
* requestAnimationFrame polyfill by Erik Möller
* fixes from Paul Irish and Tino Zijdel
* Added presision timing (when available)
*/
(function(window){

    var lastTime = 0;
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];

    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++ x ) {
        window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
        window.cancelAnimationFrame = window[ vendors[ x ] + 'CancelAnimationFrame' ] || window[ vendors[ x ] + 'CancelRequestAnimationFrame' ];
    }

    if(window.requestAnimationFrame === undefined || !window.requestAnimationFrame) {
        window.requestAnimationFrame = function ( callback, element ) {
            var currTime = window.performance.now(), 
                timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );

            var id = window.setTimeout( function() { callback( currTime + timeToCall ); }, timeToCall );
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if(window.cancelAnimationFrame === undefined || !window.cancelAnimationFrame){
        window.cancelAnimationFrame = function ( id ) { 
            clearTimeout( id ); 
        };
    }

})(window);