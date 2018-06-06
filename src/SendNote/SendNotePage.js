import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import NotePageConfirmation from './NotePageConfirmation.js';
import NoteToggle from './NoteToggle.js';
import TextField from '@material-ui/core/TextField';
import './SendNotePage.css';
import LogoHeader from '../LogoHeader.js';
import { Redirect } from 'react-router-dom';
import store from '../UserStore';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import {IconButton} from '@material-ui/core';
import {clampInput, inputMoneyFormat} from '../Utils';

const styles = {
    texts: {
      display: 'inline',
      width: '100%',
      margin: 'auto',
      float: 'right',
    },
    divs: {
      display: 'inline',
      position: 'relative',
    },
    spacing: {
      paddingTop: '30%',
    },
    Icon: {
        color: '#fff',
      },
    IconButton: {
        margin: '10px',
        marginBottom: '2px',
      }
};

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1b3b77'
      },
     secondary: {
       main: '#2c81b5'
     }
        }
      });


class SendNotePage extends Component {

  constructor(props) {
    super(props)

    let d = new Date()
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 3)
    let year = d.getFullYear().toString()
    let month = (d.getMonth()+1).toString()
    let day = d.getDate().toString()
    month = month.length == 1 ? '0'.concat(month) : month
    day = day.length == 1 ? '0'.concat(day) : day

    this.state = {
      name:(props.name === undefined)
        ? ''
        : props.name,
      amount: (props.amount === undefined)
        ? ''
        : props.amount,
      message: (props.message === undefined)
        ? ''
        : props.message,
      deadline: (props.deadline === undefined)
        ? year.concat('-').concat(month).concat('-').concat(day)
        : props.deadline,
      toDashboard: false
    }

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeDeadline = this.handleChangeDeadline.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(e) {
    this.setState({name: e.target.value})
  }

  handleChangeAmount(e) {
    this.setState({
      amount: (String)(clampInput(e.target.value, 0, 100.00))
    })
  }

  handleChangeMessage(e) {
    if (e.target.value.length < 30) {
      this.setState({message: e.target.value})
    }
  }

  handleChangeDeadline(e) {
    this.setState({deadline: e.target.value})
    console.log(e.target.value);
  }

  handleSubmit(e) {
    var info = {
      name: this.state.name,
      message: this.state.message,
      amount: inputMoneyFormat(this.state.amount),
      deadline: this.state.deadline
    }

    this.props.stateChange(info);
  }
  render() {
    return (
    // if sending note, render this:
    <div>
      <div style={{backgroundColor: '#1b3b77'}}>
        <IconButton style={styles.IconButton} component={Link} to='/dashboard'>
          <ArrowBack style={styles.Icon}/>
        </IconButton>
        <h1 style={{margin:'0px', padding:'15px', color:'#fff', textAlign:'center', fontWeight:'300', marginTop: '-60px'}}>Request Money</h1>
      </div>
    <div className = "everything">
      <div className='info'>

          <div className = "friendText">
            <TextField
              label='From'
              fullWidth
              className='field'
              type='text'
              value= {this.state.name}
              onChange={this.handleChangeName.bind(this)}/>
          </div>

          <div className = "amountText">
            <TextField
              fullWidth
              label = "Amount"
              style = {styles.texts}
              type='Number'
              step='.01'
              name='amount'
              value={inputMoneyFormat(this.state.amount)}
              onChange={this.handleChangeAmount.bind(this)}/>
          </div>

          <div className = "messageField">
            <TextField
              fullWidth
              label = "Message"
              type='text'
              name='message'
              value={this.state.message}
              onChange={this.handleChangeMessage.bind(this)}/>
          </div>

          <div className = "date">
          <TextField
            label="Deadline"
            fullWidth
            type='date'
            name='deadline'
            value={this.state.deadline}
            onChange={this.handleChangeDeadline.bind(this)}/>
          </div>
      </div>
      <div className = "SendButtonDesign">
        <MuiThemeProvider theme = {theme}>
          <Button variant='outlined' color='secondary' onClick={this.handleSubmit}>
            Submit Request
          </Button>
        </MuiThemeProvider>
      </div>
    </div>
    </div>
  )
  }
}

export default SendNotePage;
