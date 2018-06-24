# Neighborhood Map Udacity Project

This an app that uses Google Maps to help the user find whatever they are interested in in Syros island


# Journal

After consulting with the community, I begun setting an initial setup of th project. Do some styling.

Following the simple directions from this page:https://sanderknape.com/2017/07/integrating-reactjs-google-maps-widget/, I managed to implement a map!. That was not so bad, although I searched quite a bit for a clean solution.

- Passed markers. excluded beach bars by word

- After some frustrating hours, I finally managed to pass a photo from the results into the InfoWindow, as well as a heading. I think I will pass 3rd party info as <p> there or something

-TODO: Get info from 3rd party API. 
I tried Foursquare, it's not for this occasion. 
I am trying to get results from Flickr images and it's giving me a hard time. I am trying to get the results I need by geolocation. Not working!Breakthrough:Flickr API returns a JSONP function. I found a clean solution in codeburst.io. SO, it's just an object. Makes things easy. I guess for security, it would have to be converted to JSON. I tried to make an album in Flickr and access that, instead of making many requests and shorting them out. Not worth the effort of deciphering Flickr requests. - Rejected: Not good according to project rubric. 
        -I need to use fetch. I managed to get a single page showing. That took all day. Can be seen in commit 7. Now I must loop through results to display all. Done.
        -Pass flickr images to modal.
            Done.
        -TODO: Pass custom images to modal.

-TODO: make the results appear in a list on the left. Do setState with results obviously. Maybe make a separate component rendering for that.
    Done.

-TODO: make infowindow appear by clicking the corresponding list item.
    For this, I separated the openInfoWindow function, (that took me like all afternoon!!!) so that I can call it on click. I undid that one, 'cause I had to make markers and infowindow arrays, loop through them so I can display the correct infowindow. I did it, but:
-BUG: Infowindows stay open now. Fixed! I just did: infowindows.forEach(iw=>iw.close(this)) in some functions.

-TODO: text input search field. Make a filtering function. I installed regexp. Works, but problem: My query is in Greek, and it works with greek. Ι tested in a browser, worked some stuff out. 
    -ISSUE: different results for a browser in english
    I managed to turn the funcionality to work with props and live inside App.
        -Now I have to toggle marker visibility according to text input. It turns out I have to use marker.setVisible() and loop over the markers. On it. Mentor Kelly finally gave me a good link to follow! Done. I used .filter and .every

-TODO: Make a modal which appears onClick and displays Flickr images
        - I made 2 functions for open and close. Closing modal closes infowindow.
        - I need to make the infowindows clickable: I passed an event listener inside the event listener so that the modal opens. 

-BUG: general css rules can affect the map, like img. Easy fix.

Bad news: I have come to a good point, yet unfortunately results are not as expected, because of language issues. I have to start over with hard-coded locations.
    -Made a json file with locations
    -Made markers based on json file
    -Restored functionality. The code is rearranged and now I have to find new solutions.
        I converted the id of the json items starting from 0. This way, the id is the same index of the markers, so I used that for opening infowindows by clicking list items.
        -Need to find how  to close infowindow when the modal is closed. 
            Done: Just passed infowindow to state, and close that!

-TODO: make the app responsive.

-TODO: Handle network failures.

#Dependances:
escape-string-regexp

#Resources:

https://codeburst.io/multiple-ways-of-implementing-flickr-public-api-in-jquery-and-javascript-dbaf0f35bbef
https://www.outsystems.com/forums/discussion/18669/open-marker-info-box-when-clicking-on-external-link/
https://stackoverflow.com/questions/34901593/how-to-filter-an-array-from-all-elements-of-another-array
https://stackoverflow.com/questions/3554723/how-to-open-marker-info-window-outside-of-google-map
Udacity class code.


Temp notes

showInfo = () => {
   // force marker click
   window.google.maps.event.trigger(this.props.place.marker,'click');
}