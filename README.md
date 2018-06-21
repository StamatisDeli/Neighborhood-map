# Neighborhood Map Udacity Project

This an app that uses Google Maps to help the user find whatever they are interested in in Syros island


# Journal

After consulting with the community, I begun setting an initial setup of th project. Do some styling.

Following the simple directions from this page:https://sanderknape.com/2017/07/integrating-reactjs-google-maps-widget/, I managed to implement a map!. That was not so bad, although I searched quite a bit for a clean solution.

- Passed markers. excluded beach bars by word

- After some frustrating hours, I finally managed to pass a photo from the results into the InfoWindow, as well as a heading. I think I will pass 3rd party info as <p> there or something

-TODO: Get info from 3rd party API. 
I tried Foursquare, it's not for this occasion. I am trying to get results from Flickr images and it's giving me a hard time. 

I am trying to get the results I need by geolocation. Not working!

Breakthrough:Flickr API returns a JSONP function. I found a clean solution in codeburst.io. SO, it's just an object. Makes things easy. I guess for security, it would have to be converted to JSON.

I will try to make an album in Flickr and access that, instead of making many requests and shorting them out.

-TODO: make the results appear in a list on the left. Do setState with results obviously. Maybe make a separate component rendering for that.
    Done.

-TODO: make infowindow appear by clicking the corresponding list item.
    For this, I separated the openInfoWindow function, (that took me like all afternoon!!!) so that I can call it on click. I undid that one, 'cause I had to make markers and infowindow arrays, loop through them so I can display the correct infowindow. I did it, but:
-BUG: Infowindows stay open now. 

-TODO: text input search field. Make a filtering function. I installed regexp. Works, but problem: My query is in Greek, and it works with greek. Ι tested in a browser, worked some stuff out. 
    -ISSUE: different results for a browser in english
    I managed to turn the funcionality to work with props and live inside App.
        -Now I have to toggle marker visibility according to text input. It turns out I have to use marker.setVisible() and loop over the markers. On it. Mentor Kelly finally gave me a good link to follow!

-TODO: make the app responsive.

-TODO: Make a modal which appears onClick and displays Flickr images
        - I made 2 functions for open and close. 
        I need to make the infowindows clickable:

Dependances:
escape-string-regexp

#Resources:

https://codeburst.io/multiple-ways-of-implementing-flickr-public-api-in-jquery-and-javascript-dbaf0f35bbef
https://www.outsystems.com/forums/discussion/18669/open-marker-info-box-when-clicking-on-external-link/
https://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array


Temp notes

showInfo = () => {
   // force marker click
   window.google.maps.event.trigger(this.props.place.marker,'click');
}