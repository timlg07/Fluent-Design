/**
 * Loads an image with progress callback.
 *
 * The `onprogress` callback will be called by XMLHttpRequest's onprogress
 * event, and will receive the loading progress ratio as an whole number.
 * However, if it's not possible to compute the progress ratio, `onprogress`
 * will be called only once passing -1 as progress value. This is useful to,
 * for example, change the progress animation to an undefined animation.
 *
 * @param  {String}   imageUrl     The image to load
 *         {Function} onprogress
 * @return {Promise}
 */
function loadImage(imageUrl, onprogress) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        var notifiedNotComputable = false;

        xhr.open('GET', imageUrl, true);
        xhr.responseType = 'arraybuffer';

        xhr.onprogress = function( ev ){
                if( ev.lengthComputable ){
                    onprogress( (ev.loaded/ev.total) * 100 );
                } else {
                    if(!notifiedNotComputable ){
                        notifiedNotComputable = true;
                        onprogress( -1 );
                    }
                }
        }

        xhr.onloadend = function() {
            if (!xhr.status.toString().match(/^2/)) {
                reject(xhr);
            } else {
                if (!notifiedNotComputable) {
                    onprogress(100);
                }

                var options = {}
                var headers = xhr.getAllResponseHeaders();
                var m = headers.match(/^Content-Type\:\s*(.*?)$/mi);

                if (m && m[1]) {
                    options.type = m[1];
                }

                var blob = new Blob([this.response], options);

                resolve(window.URL.createObjectURL(blob));
            }
        }

        xhr.send();
    });
}




// LOAD BACKGROUND //


loadImage( "bg.jpg",perc=>{
    if( perc == -1 ){
        // Ratio not computable.
        // Remember that since ratio isn't computable, calling this function
        // makes no further sense, so it won't be called again.
    } else {
        // We have progress ratio; update the bar.
        setProgress( perc );
    }
})
.then( imgSrc=>{
    // Loading successfuly complete
    document.querySelector( "#background" ).style.backgroundImage = "url("+imgSrc+")";
    // hide loading-screen
    document.querySelector( "#loading" ).style.display = "none";
}, xhr=>{
    // An error occured. We have the XHR object to see what happened.
    alert("Error.");console.log(xhr);
});


