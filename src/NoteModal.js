import React, { Component } from 'react';
import Modal from 'react-modal';
import { Button } from '@material-ui/core';
import { formatMoney } from './Utils';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  },
  overlay : {
    backgroundColor : 'rgba(0,0,0,.8)'
  }
};

class NoteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: true
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
          shouldCloseOnOverlayClick={false}
        >
          <div style={{textAlign:'center'}}>
            <h2>{this.props.header}</h2>
            <div>${formatMoney(this.props.note.amount)} from {this.props.note.sender}</div>
            <p>{this.props.note.message}</p>
            <form>
              <Button color='primary' onClick={this.closeModal}>Accept</Button>
              <Button color='secondary' onClick={this.closeModal}>Reject</Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NoteModal;
