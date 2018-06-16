import React, { Component } from 'react';
import './App.css';
import LocationList from './LocationList'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      infoWindow: [],
      infowindows:[],
      map: "",
      markers: [],
      isVisible:false,
      
    }
    this.drawMap = this.drawMap.bind(this)
    //this.openInfoWindow = this.openInfoWindow.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  //Drawing the map
  componentDidMount() {
    this.drawMap()
  }
  //initializing Google Maps showing Syros island
  drawMap() {
    let syros = new window.google.maps.LatLng(37.438503, 24.913934)
    let markers=[]
    let infowindows=[]
    
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: syros,
      zoom: 12,
      mapTypeId: 'terrain',
    })

    const request = {
      location: syros,
      radius: '9000',
      query: ["Παραλία", "Paralia", "παραλίες"]
    };

    let service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, callback);
    this.setState({ map: map})

    let self = this;//bind this outside the callback function

    function callback(results, status) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
        self.setState({ locations: results })
      }
      
      function createMarker(place) {
        //let placeLoc = place.geometry.location;
        let photos = place.photos;

        if (!photos) return "No data, try again"; //handling absence of photo
        if (place.name.includes('Bar')) return; //excluding bars!

        let marker = new window.google.maps.Marker({
          map: map,
          position: place.geometry.location,
          id:place.id,
          //animation: window.google.maps.Animation.DROP
        });

        markers.push(marker)
        self.setState({markers:markers})

        let content =
        `<div>
        <strong>${place.name}</strong><br>
        <img src ='${photos[0].getUrl({ 'maxWidth': 150, 'maxHeight': 150 })}'><br>
        ${place.geometry.location}
        </div>`

        let infowindow = new window.google.maps.InfoWindow({
          maxWidth:250,
          id:place.id,
          content:content
        })

        infowindows.push(infowindow)
        //self.setState({infoWindow:infowindow})
        self.setState({infowindows:infowindows})
        
        window.google.maps.event.addListener(marker, 'click', function () {
          self.setState({isVisible:true})
          infowindow.setContent(content)
          infowindow.open(self.state.map, this)
          //infowindow.close(self.state.map, this)
          })
      }
    }
  }

  handleClick(e) {

    this.state.markers.map(marker=>{
      if(marker.id===e.target.dataset.key){
        this.state.infowindows.map(infowindow=>{
          if(marker.id===infowindow.id){
            infowindow.open(this.state.map, marker);
          }
        })
      }})
  }

  render() {
    return (
      <div className="App" role="main">
        <section className="left-column" id="flickr">
          <h1>Find a wonderful beach in Syros</h1>
          <LocationList
            locations={this.state.locations}
            handleClick={this.handleClick}
          />
        </section>
        <section className="map" id="map">
        </section>
      </div>
    );
  }
}

export default App

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