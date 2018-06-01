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
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.open}
          style={customStyles}
          contentLabel="Example Modal"
          shouldCloseOnOverlayClick={false}
        >
          <div style={{textAlign:'center'}}>
            <h2>{this.props.header}</h2>
            <div>${formatMoney(this.props.note.amount)} from {this.props.note.sender}</div>
            <p>{this.props.note.message}</p>
            <form>
              <Button color='primary' onClick={() => {this.props.onAccept()}}>{this.props.confirm}</Button>
              <Button color='secondary' onClick={() => {this.props.onReject()}}>{this.props.reject}</Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default NoteModal;
