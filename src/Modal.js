import React from 'react'

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
            <h1>{this.props.modalTitle}</h1>
            <div id="images"></div>
            </div>
            ):null}
            </div>
       )
    }
}


export default Modal