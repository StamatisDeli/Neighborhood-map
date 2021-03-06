import React  from 'react';
import './App.css';
import LocationList from './LocationList'
import Modal from './Modal'
import escapeRegExp from 'escape-string-regexp'
import * as FlickrAPI from './FlickrAPI'
import beaches from './beaches.json'
import markerIcon from './resort_pinlet-1-small.png'

let markers = []
let marker = ''
let infowindows = []
let map = "";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      workingList: [],
      infowindow: null,
      infowindows: [],
      map: "",
      markers: [],
      isVisible: false,
      query: '',
      modalTitle: '',
      marker: [],
      searchHidden: window.innerWidth > 550 ? false : window.innerWidth < 550 ? true : null,
      bounds: {}
    }
    this.drawMap = this.drawMap.bind(this)
    this.updateQuery = this.updateQuery.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.toggleSearch = this.toggleSearch.bind(this)
    this.screenListener = this.screenListener.bind(this)
    this.errMsg = this.errMsg.bind(this)
    this.loadJS = this.loadJS.bind(this)
  }


  componentDidMount() {

    window.drawMap = this.drawMap;
    // Asynchronously load the Google Maps script, passing in the callback reference
    this.loadJS(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAQF9ZueiX06ah5l2KTylOV45HdTGl07bk&callback=drawMap"
    );

    this.screenListener()
    //when offline, do this:
    if (!navigator.onLine)
      this.errMsg()
  }

  //this appends the map API to the dom
  loadJS(src) {
    let ref = window.document.getElementsByTagName("script")[0];
    let script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    script.onerror = this.errMsg
    ref.parentNode.insertBefore(script, ref);
  }

  //initializing Google Maps showing Syros island
  drawMap() {
    let syros = new window.google.maps.LatLng(37.438503, 24.913934)

    let map = new window.google.maps.Map(document.getElementById('map'), {
      center: syros,
      zoom: 13,
      mapTypeId: 'roadmap',
    })

    this.setState({ map: map })

    let bounds = new window.google.maps.LatLngBounds()

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
        icon: markerIcon,
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
        <div><strong><h1>${marker.title}</h1></strong></div>
        <div><strong><p>Click for pictures</p></strong></div>
        </div>
        `
        if (infowindow) infowindow.close();
        infowindow = new window.google.maps.InfoWindow({ content: content });
        infowindow.open(map, marker);
        window.google.maps.event.addListener(infowindow, 'domready', function () {
          self.openModal()
        });
        self.setState({ modalTitle: title })
        self.setState({ infowindow: infowindow })
      };
      // put the method in as a handler
      window.google.maps.event.addListener(marker, "click", marker.openInfoWindow);
      window.google.maps.event.addListener(marker, "click", function () {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function () {
          marker.setAnimation(null);
        }, 800);
      });

      bounds.extend(markers[i].position);
      this.setState({ locations: beaches, workingList: beaches, infowindows: infowindows, markers: markers, bounds: bounds })
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
  }

  //display a message when offline
  errMsg() {
    let root = document.getElementById('map');
    let divMsg = document.createElement('DIV');
    divMsg.innerHTML = `<div class="error">Google Maps failed to load. <br>
        Please come back later!</div>`
    root.prepend(divMsg)
  }

  openModal(infowindow) {
    //if (infowindow) infowindow.close();
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

  updateQuery(query, infowindow) {
    let workingList = this.state.workingList
    let locations = this.state.locations
    let markers = this.state.markers
    this.setState({ query })//or query.trim()
    markers.forEach(marker => marker.setVisible(true))//turn markers on

    if (query) {
      this.state.infowindow === null ? null :
        this.state.infowindow !== null ? this.state.infowindow.close(map, marker) : null;

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

  handleClick(e, index) {

    let locations = this.state.locations
    let markers = this.state.markers
    e.preventDefault()
    index = e.target.dataset.key
    markers[index].openInfoWindow()
    markers[index].setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(function () {
      markers[index].setAnimation(null);
    }, 800);

    window.innerWidth < 550 ? this.setState({ searchHidden: true }) : null
    this.setState({ workingList: locations })
    markers.forEach(marker => marker.setVisible(true))
  }

  toggleSearch() {
    this.setState(prevState => ({
      searchHidden: !prevState.searchHidden
    }));
  }

  screenListener() {
    let self = this
    window.addEventListener("resize", function () {
      window.innerWidth < 550 ? self.setState({ searchHidden: true }) :
        window.innerWidth > 550 ? self.setState({ searchHidden: false }) : null
      self.state.map.fitBounds(self.state.bounds)//this fits map in different screens
    });
  }

  render() {
    return (
      <main className="App" role="main" >

        <section ref="map" className="map" id="map" role="application"></section>

        <section className="right-column" >
          <header className="header" aria-label="Application Header">
            <p>Powered by Google Maps & Flickr.com</p>
            <h3>find a great beach in</h3>
            <h1>Syros</h1>
            <button id='toggleButton'
              title='TOGGLE LIST'
              type='button'
              onClick={this.toggleSearch}
            >{this.state.searchHidden ? 'SHOW' : 'HIDE'}</button>
          </header>
          {!this.state.searchHidden ?
            <LocationList
              locations={this.state.locations}
              handleClick={this.handleClick}
              updateQuery={this.updateQuery}
              query={this.state.query}
              markers={this.state.markers}
              workingList={this.state.workingList}
              searchHidden={this.state.searchHidden}
            /> : null}
        </section>
        <Modal
          isVisible={this.state.isVisible}
          closeModal={this.closeModal}
          startFlickr={this.props.startFlickr}
          modalTitle={this.state.modalTitle}
        />
      </main>
    );
  }
}

export default App

