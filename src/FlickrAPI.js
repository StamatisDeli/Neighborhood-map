function JavaScriptFetch() {
    var script = document.createElement('script');
    var searchName = "azolimnos";

    script.src = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=syros%2C" + searchName + "&text=" + searchName;

    document.querySelector('head').appendChild(script);

}

function jsonFlickrFeed(data) {
    var image = "";

    data.items.forEach(function (element) {
        image += "<img src=\"" + element.media.m + "\"/>";
        console.log(data);
    });

    document.getElementById("#flickr").innerHTML = image;
}