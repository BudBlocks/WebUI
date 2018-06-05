import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import NoteToggle from './NoteToggle.js';
import LogoHeader from '../LogoHeader';
import { sendNote } from '../Utils';
import { Redirect } from 'react-router-dom';
import store from '../UserStore';
import './NotePageConfirmation.css';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {Check} from '@material-ui/icons';


const bStyle = {
  fontSize: '20px',
  textAlign: 'center',
  border: '1px solid white',
  // marginRight: '40px',
  // marginLeft: '40px',
  // borderRadius: '10px',
  marginTop: '10px',
  // marginBottom: '30px'
}

const sStyle = {
  marginRight: '10px',
  fontWeight: '400',
  textTransform: 'none',
}

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1b3b77'
      },
     secondary: {
       main: '#d64949'
     }
        }
      });

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
    let d = new Date(this.state.deadline);
    console.log(d);
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 2);
    console.log(d);
    sendNote(store.username, this.state.name, this.state.amount, d, this.state.message);

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
      <div className='parentDiv'>
        <LogoHeader/>
        <div className='noteHeader'>
          <h3 className = 'confirmHeader'> <span className = 'blueSpan'> Confirm Your Note: </span> </h3>
          <div className='recipientDiv'>
            To: {this.state.name}
          </div>
          <div className='amountDiv'>
            Amount: ${this.state.amount}
          </div>
          <div className='messageDiv'>
            Message: {this.state.message}
          </div>
          <div className='deadlineDiv'>
            Deadline: {this.state.deadline}
          </div>
        </div>
        <div className='editButton'>
          <Button color='primary' onClick={this.getProps}>
            Edit Note
          </Button>
        </div>
        <div className='whitespaceDiv'></div>
        <MuiThemeProvider theme={theme}>
          <div className="confirmButton" style={{textAlign:'center'}}>
            <Button style = {bStyle} variant = 'raised' color='primary' onClick={this.handleSendNote} fullWidth>
              <span style = {sStyle}> Confirm </span>
              <Check/>
            </Button>
          </div>
        </MuiThemeProvider>
      </div>
)
  }
}

export default NotePageConfirmation;
