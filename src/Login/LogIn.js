import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './LogIn.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Logo from '../Images/BudblockLogo.png';
import { updateUserInfo } from '../Utils';
import { Redirect } from 'react-router-dom';
import store from '../UserStore';

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
      username: '',
      password: '',
      toDashboard: false
    }
  }

  updateEmail(e) {
    this.setState({username: e.target.value})
  }

  async confirmPassword() {
    let success = await updateUserInfo(this.state.username);

    if(!success) {
      console.log("Error! No user created with this email: " + this.state.email);
      return;
    }

    store.username = this.state.username;
    store.password = this.state.password;

    this.setState({ toDashboard: true });
  }

  render() {
    if(this.state.toDashboard) {
      return <Redirect to='/dashboard'/>
    }
    return (<div>

      <div className="email">
        <TextField label="Username" placeholder="example@email.com" onChange={this.updateEmail.bind(this)}/>
        <br/>
      </div>

      <div className="username">
        <TextField label="Password" placeholder="password"/>
      </div>

      <div id="logInButton">
        <MuiThemeProvider theme={buttonStyle}>
          <Button variant="raised" onClick={this.confirmPassword.bind(this)} style={bStyle}>
            Log In
          </Button>
        </MuiThemeProvider>
      </div>
    </div>);
  }
}

export default LogIn;
