import React, { Component } from 'react';
import './App.css';
import LocationList from './LocationList'
import Modal from './Modal'
import escapeRegExp from 'escape-string-regexp'
import * as FlickrAPI from './FlickrAPI'
import beaches from './beaches.json'


//let info = document.getElementById("info")
let markers = []
let marker = ''
let infowindows = []
let syros = new window.google.maps.LatLng(37.438503, 24.913934)
let map = "";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      workingList: [],
      infowindow: {},
      infowindows: [],
      map: "",
      markers: [],
      isVisible: false,
      query: '',
      modalTitle: '',
      marker: []
    }
    this.drawMap = this.drawMap.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.drawMap()
  }

  //initializing Google Maps showing Syros island
  drawMap() {
    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: syros,
      zoom: 12,
      mapTypeId: 'roadmap',
    })

    this.setState({ map: map })

    var bounds = new window.google.maps.LatLngBounds();
    // The following group uses the location array to create an array of markers on initialize.
    for (let i = 0; i < beaches.length; i++) {
      // Get the position from the location array.
      let position = beaches[i].location;
      let title = beaches[i].name;
      let id = beaches[i].id
      // Create a marker per location, and put into markers array.
      let marker = new window.google.maps.Marker({
        map: map,
        position: position,
        title: title,
        //animation: window.google.maps.Animation.DROP,
        id: id
      });
      // Push the marker to our array of markers.
      markers.push(marker);

      var infowindow = new window.google.maps.InfoWindow({
        map: map,
        title: title,
        id: id,
        maxWidth: 200
      });
      let self = this
      // Create an onclick event to open an infowindow at each marker.
      marker.openInfoWindow = function () {

        let content =
          `<div id='info'>
        <div><strong>${marker.title}</strong></div>
        <div><strong>Click for Pictures</strong></div>
        </div>
        `
        if (infowindow) infowindow.close();
        infowindow = new window.google.maps.InfoWindow({ content: content });
        infowindow.open(map, marker);
        self.openModal()
        self.setState({ modalTitle: title })
        self.setState({ infowindow: infowindow })

      };
      // put the method in as a handler
      window.google.maps.event.addListener(marker, "click", marker.openInfoWindow);
  
      bounds.extend(markers[i].position);
      this.setState({ locations: beaches, workingList: beaches, infowindows: infowindows, markers: markers})
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
  }

  openModal(infowindow) {
    if (infowindow) infowindow.close();
    let self = this
    let info = document.getElementById("info")
    window.google.maps.event.addDomListener(info, 'click', function () {
      self.setState({ isVisible: true })
      FlickrAPI.fetchFlickrImages(self.state.modalTitle)
    })
  }

  closeModal(map, marker) {
    this.setState({ isVisible: false })
    this.state.infowindow.close(map, marker)
  }

  updateQuery(query) {
    this.state.infowindow.close(map, marker)
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

  //dataset key = marker index
  handleClick(e, index) {
    let self=this
    index = e.target.dataset.key
    markers[index].openInfoWindow()
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
            markers={this.state.markers}
            workingList={this.state.workingList}
          />
        </section>
        <section className="map" id="map">
        </section>
        <Modal
          isVisible={this.state.isVisible}
          closeModal={this.closeModal}
          startFlickr={this.props.startFlickr}
          modalTitle={this.state.modalTitle}
        />
        <div id="flickr"></div>
      </div>
    );
  }
}

export default App