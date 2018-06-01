import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import NoteToggle from './NoteToggle.js';
import LogoHeader from './LogoHeader';
import { sendNote } from './Utils';
import { Redirect } from 'react-router-dom';
import store from './UserStore';

class NotePageConfirmation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.name,
      amount: props.amount,
      message: props.message,
      deadline: props.deadline,
      toDashboard: false,
    }

    this.handleSendNote = this.handleSendNote.bind(this);
    this.getProps = this.getProps.bind(this);
  }

  // CODE THIS TO COMMUNICATE W THE BACKEND
  handleSendNote() {
    sendNote(store.username, this.state.name, this.state.amount, this.state.deadline, this.state.message);

    this.setState({ toDashboard: true});
  }

  getProps() {
    var info = {
      name: this.state.name,
      message: this.state.message,
      amount: this.state.amount,
      deadline: this.state.deadline
    }

    this.props.stateChange(info);
  }

  render() {
    if(this.state.toDashboard) {
      return <Redirect to='/dashboard' />;
    }
    return (
      <div className = "everythingAgain">
      <LogoHeader/>
      <div>
      <div>
        <h3>Confirm Your Note:</h3>
        <ul>
          To: {this.state.name}</ul>
        <ul>
          Amount: ${this.state.amount}</ul>
        <ul>
          Message: {this.state.message}</ul>
        <ul>
          Deadline: {this.state.deadline}</ul>
      </div>
      <div>
        <Button variant='outlined' color='secondary' onClick={this.handleSendNote}>
          Confirm Note
        </Button>
        <Button variant='outlined' color='primary' onClick={this.getProps}>
          Edit Note
        </Button>
      </div>
    </div>
  </div>
)
  }
}

export default NotePageConfirmation;
