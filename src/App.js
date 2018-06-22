import React, { Component } from 'react';
import './App.css';
import LocationList from './LocationList'
import Modal from './Modal'
import escapeRegExp from 'escape-string-regexp'
import * as FlickrAPI from './FlickrAPI'

let markers = []
let infowindows = []
let syros = new window.google.maps.LatLng(37.438503, 24.913934)
const request = {
  location: syros,
  radius: '9500',
  query: ["Παραλία", "Paralia", "παραλίες", "Beach"]
};
let map = "";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      workingList: [],
      infowindows: [],
      map: "",
      markers: [],
      isVisible: false,
      query: ''
    }
    this.drawMap = this.drawMap.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.callback = this.callback.bind(this)
    //this.showInfo = this.showInfo.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  componentDidMount() {
    this.drawMap()
    FlickrAPI.fetchFlickrImages()
  }
  //initializing Google Maps showing Syros island
  drawMap() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: syros,
      zoom: 12,
      mapTypeId: 'roadmap',
    })

    this.setState({ map: map })

    let service = new window.google.maps.places.PlacesService(map);
    service.textSearch(request, this.callback);
  }

  callback(results, status) {
    const self = this

    if (status === window.google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      this.setState({ locations: results, workingList: results })
    }

    function createMarker(place) {
      let photos = place.photos;

      let marker = new window.google.maps.Marker({
        map: self.state.map,
        position: place.geometry.location,
        id: place.id,
        //animation: window.google.maps.Animation.DROP
      });

      markers.push(marker)

      let content =`<a>
      <div id="info">
      <strong>${place.name}</strong><br>
      <img src ='${photos ? photos[0].getUrl({ 'maxWidth': 140, 'maxHeight': 140 }) : null}'><br>
      <p>Click for more pictures</p>
      </div>
      </a>`

      let infowindow = new window.google.maps.InfoWindow({
        maxWidth: 140,
        id: place.id,
        content: content
      })

      infowindows.push(infowindow)

      self.setState({ infowindows: infowindows, markers: markers })
      let info
      window.google.maps.event.addListener(marker, 'click', function () {
        infowindow.setContent(content)
        infowindow.open(self.state.map, this)
        let info = document.getElementById("info")

        window.google.maps.event.addDomListener(info, 'click', function () {
          //let info = document.getElementById("info")
          console.log(info)
          self.openModal(content)
        })
      })
    }

  }

  //this opens infowindows when list items are clicked
  handleClick(e) {
    this.state.markers.map(marker => {
      if (marker.id === e.target.dataset.key) {
        this.state.infowindows.map(infowindow => {
          if (marker.id === infowindow.id) {
            infowindow.open(this.state.map, marker);
          }
        })
      }
    })
  }

  updateQuery = (query) => {
    let workingList = this.state.workingList
    let locations = this.state.locations
    let markers = this.state.markers
    this.setState({ query })//or query.trim()
    markers.forEach(marker => marker.setVisible(true))//turn markers on

    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      workingList = locations.filter(location => match.test(location.name))
      //Loop through both arrays an return an array with markers not represented by markers
      const notVisible = markers.filter(marker =>
        workingList.every(place => place.id !== marker.id)
      )
      notVisible.forEach(marker => marker.setVisible(false)) // turn them off
    } else { workingList = locations }
    this.setState({ workingList })
  }

  openModal() {
    this.setState({ isVisible: true })
  }

  closeModal(e) {
    this.setState({ isVisible: false })
  }



  render() {

    return (
      <div className="App" role
        ="main">
        <section className="left-column" >
          <h1>Find a wonderful beach in Syros</h1>
          <LocationList
            locations={this.state.locations}
            handleClick={this.handleClick}
            updateQuery={this.updateQuery}
            query={this.state.query}
            showingLocations={this.showingLocations}
            markers={this.state.markers}
            workingList={this.state.workingList}
            infowindow={this.state.infowindows}
          />
        </section>
        <section className="map" id="map">
        </section>
        <Modal
          isVisible={this.state.isVisible}
          closeModal={this.closeModal}
          startFlickr={this.props.startFlickr}
        />
        <div id="flickr"></div>
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