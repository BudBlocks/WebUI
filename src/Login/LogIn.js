import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './LogIn.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Logo from './Images/BudblockLogo.png';
import { getAllUsers } from './Utils';
import { Redirect } from 'react-router-dom';
import store from './UserStore';

const buttonStyle = createMuiTheme({
  palette: {
    primary: {
      main: '#000000'
    }
  }
});

const bStyle = {
  borderRadius: '5px',
  color: '#1b3b77',
  backgroundColor: '#fff'
};

class LogIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      toDashboard: false
    }
  }

  updateEmail(e) {
    this.setState({email: e.target.value})
  }

  async confirmPassword() {
    let users = await getAllUsers();
    console.log(users);
    let found = false;
    let foundUser = undefined;

    for(let i = 0; i < users.length; i++){
      let user = users[i];
      if(user.email == this.state.email) {
        found = true;
        foundUser = user;
        break;
      }
    }

    if(!found) {
      console.log("Error! No user created with this email: " + this.state.email);
      return;
    }

    store.username = foundUser.username;
    store.password = this.state.password;
    store.balance = foundUser.balance / 100;

    this.setState({ toDashboard: true });
  }

  render() {
    if(this.state.toDashboard) {
      return <Redirect to='/dashboard'/>
    }
    return (<div>

      <div class="email">
        <TextField label="Email" placeholder="example@email.com" onChange={this.updateEmail.bind(this)}/>
        <br/>
      </div>

      <div class="username">
        <TextField label="Password" placeholder="password"/>
      </div>

      <div id="logInButton">
        <MuiThemeProvider theme={buttonStyle}>
          <Button variant="raised" onClick={this.confirmPassword.bind(this)} style={bStyle}>
            Log In
          </Button>
        </MuiThemeProvider>
      </div>
      <div className="App-logo">
        <img src={Logo} width="20%"></img>
      </div>
    </div>);
  }
}

export default LogIn;
