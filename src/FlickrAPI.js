/*
export function JavaScriptFetch() {
    var script = document.createElement('script');
    var searchName = "azolimnos";

    script.src = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=syros%2C" + searchName + "&text=" + searchName;

    document.querySelector('head').appendChild(script);

}

export function jsonFlickrFeed(data) {
    var image = "";

    data.items.forEach(function (element) {
        image += "<img src=\"" + element.media.m + "\"/>";
        console.log(data);
    });

    document.getElementById("#images").innerHTML = image;
}

*/
// FLICKR
//const key= '05be6248bf2f1e0f922813fb44b11191'
//const secret= 'daad362f29936164' 
//const user =' '
/*
export function startFlickr() {
    function Flickr() {
        this.init();
    }
    Flickr.prototype = {
        init: function () {
            window.getPhotos = this.getPhotos;
            this.getJSON();
        },
        getJSON: function () {
            var src = "https://api.flickr.com/services/feeds/photos_public.gne?&lat=37.390110&lon=24.963928&radius=1&tags=azolimnos&format=json&jsoncallback=getPhotos";
            var script = document.createElement("script");
            script.src = src;
            document.body.appendChild(script);
        },
        getPhotos: function (data) {
            var limit = 5;

            if (data && data.items) {
                var title = data.title;
                var items = data.items;
                var albumTitle = title.replace("Content from ", "");
                var html = "<h3>" + albumTitle + "</h3>";
                html += "<div class='images'>";

                for (var i = 0; i < items.length; ++i) {
                    var item = items[i];
                    var n = i + 1;
                    if (n <= limit) {
                        html += "<a href='" + item.link + "'><img src='" + item.media.m + "' alt='' /></a>";
                    }
                }
                html += "</div>";

                document.getElementById("images").innerHTML = html;
            }
        }
    };
}
*/
/*
let searchName = 'azolimnos'
let request = `https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=syros%2C ${searchName} &text= ${searchName}`

export const searchFlickrByName = (name) =>
    fetch(`${request}/search`, {
        method: 'GET',
        body: JSON.stringify({ place })
    }).then(res => res.json())
        .then(data => data.photos)

        */