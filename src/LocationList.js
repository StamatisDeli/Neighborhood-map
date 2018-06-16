import React from 'react'
import App from './App'
import escapeRegExp from 'escape-string-regexp'

class LocationList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
      query:''
    }

updateQuery=(query)=>{
    this.setState({query: query}) //or query.trim()
}

    render() {
        //console.log(this.props.locations.map(location=>location.name))
        let showingMarkers
        if(this.state.query){
            const match = new RegExp(escapeRegExp(this.state.query), 'i')
            showingMarkers = this.props.locations.filter(location=>match.test(location.name))
        }else
        {showingMarkers=this.props.locations}

        return (
            <div>
            <input 
            id='input' 
            type='text' 
            placeholder='Enter a beach' 
            value={this.state.query}
            onChange={e=>this.updateQuery(e.target.value)}
            />
            <ul>
            {showingMarkers.map( location=>
            <li data-key={location.id} key={location.id} href="#" role="button" onClick={e=>this.props.handleClick(e)}> {location.name} </li>
            )}
            </ul>
            </div>
        );
    }
}

export default LocationList