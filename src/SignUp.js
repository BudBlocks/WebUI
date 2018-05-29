import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './SignUp.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { friends } from './App';
import { Redirect } from 'react-router-dom';

const buttonStyle = createMuiTheme({
  palette: {
    primary: {main: '#000000'},

  },
});

const bStyle = {
    borderRadius: '40px'
};

class SignUp extends Component{


constructor(props){
  super(props)
  this.state = {
    email: '',
    password: '',
    password2: '',
    passwordMatch: true,
    passwordError: true,
    toDashboard: false,
  }

  this.updateEmail = this.updateEmail.bind(this);
  this.updatePassword = this.updatePassword.bind(this);
  this.updatePassword2 = this.updatePassword2.bind(this);
  this.confirmPassword = this.confirmPassword.bind(this);
}

updateEmail(e){
  this.setState({email: e.target.value})
}
updatePassword(e){
  this.setState({password: e.target.value})
}
updatePassword2(e){
  this.setState({password2: e.target.value})
}
confirmPassword(){
  if(this.state.password === this.state.password2){
    friends.push(this.state.email);
    this.setState({ toDashboard: true });
    return
  }
  else{

  }
}

  render(){
    if(this.state.toDashboard){
      return <Redirect to='/dashboard'/>
    }

    return(
  <div>
    <div class = "email">
        <TextField label = "Email" placeholder = "Enter Email Here" onChange = {this.updateEmail}/>
    </div>

    <div class = "password1">

      <TextField
        label = "Password"
        placeholder = "Password"
        type = "password"
        onChange = {this.updatePassword}/>
    </div>
    <div class = "password2">
      <TextField
      errorText = "u don goofed"
      label = "Confirm Password"
      id = "a"
      placeholder = "Confirm Password"
      type = "password"
      onChange = {this.updatePassword2}/>
    </div>
    <div class = "password2">
      <MuiThemeProvider theme = {buttonStyle}>
      <Button
        variant = "raised"
        onClick = {this.confirmPassword}
        style = {bStyle}>
        Sign Up </Button>
      </MuiThemeProvider>
    </div>
  </div>
);
}
}

export default SignUp;
