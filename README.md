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

-TODO: text input search field

-TODO: make the app responsive.


#Resources:

https://codeburst.io/multiple-ways-of-implementing-flickr-public-api-in-jquery-and-javascript-dbaf0f35bbef