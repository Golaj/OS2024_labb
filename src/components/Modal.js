import React from 'react'
import '../style/App.css';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};



export default class DetalisModal extends React.Component {

    constructor(props) {
        super();
    
        this.state = {
          modalIsOpen: false
        };
    
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }
    
      openModal() {
        this.setState({modalIsOpen: true});
      }
    
      afterOpenModal() {
        // references are now sync'd and can be accessed.
        // this.subtitle.style.color = '#f00';
      }
    
      closeModal() {
        this.setState({modalIsOpen: false});
      }



    render() {

        return (

            <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button onClick={this.closeModal}>close</button>
          <div>Transport: {this.props.transport}</div>
          <div>Distance: {this.props.distance}</div>
          <div>Duration: {this.props.durationH}{this.props.durationM}</div>
          <div>Price: {this.props.pricing}</div>
          <button onClick = {this.props}> Add Route to saved list </button>
        </Modal>
      </div>


        )
    }
}