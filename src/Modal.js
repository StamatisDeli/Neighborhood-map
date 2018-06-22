import React, { Component } from 'react'
import * as FlickrAPI from './FlickrAPI'

class Modal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      }

    }

    render() {
      
       return (
            
            <div>
            {this.props.isVisible ?(
            <div id="modal">
            <span className="close" onClick={this.props.closeModal}>&times;</span>
            <div id="images">
            
            </div>
            </div>
            ):null}
            </div>
       )
    }
}


export default Modal