import React from 'react'

class LocationList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render() {
        
        return (
            <div id='side-bar'>
            <input 
            id='input-box' 
            type='text' 
            placeholder='Enter beach name' 
            value={this.state.query}
            onChange={e=>this.props.updateQuery(e.target.value)}
            />
            <ul aria-label = 'List of beaches'>
            {this.props.workingList.map( location =>
            <li data-key={location.id} key={location.id} role="button" 
            onClick={e=>this.props.handleClick(e)}> 
            {location.name} 
            </li>
            )}
            </ul>
            </div>
        );
    
    }
}

export default LocationList