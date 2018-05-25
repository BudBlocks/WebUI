import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import NotePageConfirmation from './NotePageConfirmation.js';
import SendNotePage from './SendNotePage';

let sendNote = undefined;

class NoteToggle extends Component {

  constructor(props) {
    super(props)

    this.handleNoteChange = this.handleNoteChange.bind(this);
    this.handleNoteEdit = this.handleNoteEdit.bind(this);

    sendNote = <SendNotePage stateChange = {this.handleNoteChange}/>

      this.state = {
        currentComponent: sendNote
      }
  }


  handleNoteChange(info) {
        this.setState ({
          currentComponent: <NotePageConfirmation stateChange = {this.handleNoteEdit} name = {info.name} amount = {info.amount} message = {info.message}/>
        })
    }

  handleNoteEdit(info) {
      this.setState ({
        currentComponent: <SendNotePage stateChange = {this.handleNoteChange} name = {info.name} amount = {info.amount} message = {info.message}/>
      })
  }

    render() {
      return (
        <div>
          {this.state.currentComponent}
        </div>
      )
    }
}

export default NoteToggle;
