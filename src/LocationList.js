import React from 'react'
import App from './App'

class LocationList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
  
    }

    render() {
        //console.log(this.props.locations.map(location=>location.name))
        return (
            <ul>
            {this.props.locations.map( location=>
            <li key={location.id} href=""> {location.name} </li>
            )}
            </ul>
        );
    }
}

export default LocationList