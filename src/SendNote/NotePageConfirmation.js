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
import { formatMoney } from '../Utils';

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
        main: '#d64949'
      },
     secondary: {
       main: '#2c81b5'
     }
        }
      });

const themeConfirm = createMuiTheme({
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
            <span className='formatLabel'>From:&emsp;</span>  <span className='formatInput'>{this.state.name}</span>
          </div>
          <div className='amountDiv'>
            <span className='formatLabel'>Amount:&emsp;</span>  <span className='formatInput'>${formatMoney(this.state.amount)}</span>
          </div>
          <div className='messageDiv'>
            <span className='formatLabel'>Message:&emsp;</span>  <span className='formatInput'>{this.state.message}</span>
          </div>
          <div className='deadlineDiv'>
            <span className='formatLabel'>Deadline:&emsp;</span>
             <span className='formatInput'>{formatDate(this.state.deadline)} </span>
          </div>
        </div>
        <MuiThemeProvider theme={theme}>
          <div className='editButton'>
            <Button color='secondary' onClick={this.getProps}>
              Edit Request
            </Button>
            <div className='whitespaceDiv'> </div>
            <Button color='primary' component={Link} to='/dashboard'>
              Cancel Request
            </Button>
          </div>
        </MuiThemeProvider>
        <MuiThemeProvider theme={themeConfirm}>
          <div className='whitespaceDiv'> </div>
          <div className='whitespaceDiv'> </div>
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

function formatDate(date) {
  let stringDate = String(date);
  let month = stringDate.substring(5,7);
  let day = stringDate.substring(8);
  let year = stringDate.substring(0,4);

  return (month + '/' + day + '/' + year);
}

export default NotePageConfirmation;
