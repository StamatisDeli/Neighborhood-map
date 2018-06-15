import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import LocationList from './LocationList'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations:[]
    }

  }

  //initializing Google Maps showing Syros island
  componentDidMount() {
    let syros = new window.google.maps.LatLng(37.438503, 24.913934);
    let infowindow = new window.google.maps.InfoWindow({
      maxWidth: 250,
    });

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: syros,
      zoom: 12,
      mapTypeId: 'terrain',
    });

    const request = {
      location: syros,
      radius: '9000',
      query: ["Παραλία", "Paralia", "παραλίες", 'Beach']
    };

  
/*
    function JavaScriptFetch() {
      var script = document.createElement('script');
      var searchName = "azolimnos";

      script.src = "https://api.flickr.com/services/feeds/photos_public.gne?format=json&tags=syros%2C" + searchName+"&text="+searchName;

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
*/

    let service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
    let current=this;//bind this outside the callback function
    function callback(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          //let place = results[i];
          createMarker(results[i]);
        }
        
        current.setState({locations:results})
      }

      function createMarker(place) {
        //let placeLoc = place.geometry.location;
        let photos = place.photos;

        if (!photos) return; //handling absence of photo
        if (place.name.includes('Bar')) return; //excludding bars!

        let marker = new window.google.maps.Marker({
          map: map,
          position: place.geometry.location,
        });

        //Make an infowindow with a pic
        window.google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent(
            `<div>
            <strong>${place.name}</strong><br>
            <img src ='${photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 })}'><br>
            ${place.geometry.location}
            </div>`
          );
          infowindow.open(map, this);
        });
      }
    }
  }
  
  render() {
    console.log(this.state.locations)
    return (
      <div className="App" role="main">
        <section className="left-column" id="flickr">
          <h1>Find a wonderful beach in Syros</h1>
          <div id='pac-container'>
            <input id='pac-input' type='text' placeholder='Enter a beach' />
          </div>
        <LocationList locations={this.state.locations}/>
        </section>
        <section className="map" id="map"></section>
      </div>
    );
  }
}

export default App;

// FLICKR
  //const key= '05be6248bf2f1e0f922813fb44b11191'
  //const secret= 'daad362f29936164' 
  //const user =' '
  /*
(function() {
	function Flickr() {
		this.init();
	}
	Flickr.prototype = {
		init: function() {
			window.getPhotos = this.getPhotos;
			this.getJSON();	
		},
		getJSON: function() {
			var src = "https://api.flickr.com/services/feeds/photos_public.gne?&lat=37.390110&lon=24.963928&radius=1&tags=azolimnos&format=json&jsoncallback=getPhotos";	
			var script = document.createElement( "script" );
				script.src = src;
				document.body.appendChild( script );
		},
		getPhotos: function( data ) {
			var limit = 5;
			
			if( data && data.items ) {
				var title = data.title;
				var items = data.items;
				var albumTitle = title.replace( "Content from ", "" );
				var html = "<h3>" + albumTitle + "</h3>";
				    html += "<div class='images'>";
				
				for( var i = 0; i < items.length; ++i ) {
					var item = items[i];
					var n = i + 1;
					if( n <= limit ) {
						html += "<a href='" + item.link + "'><img src='" + item.media.m + "' alt='' /></a>";
					}	
				}
				html += "</div>";
				
				document.querySelector( "#flickr" ).innerHTML = html;
			}	
		  }
      };
      document.addEventListener( "DOMContentLoaded", function() {
        var flickrFeed = new Flickr();
      });
    })();
*/