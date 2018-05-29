import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './SignUp.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

const buttonStyle = createMuiTheme({
  palette: {
    primary: {main: '#000000'},

  },
});

const bStyle = {

};

const styles = {
  cssRoot: {
    color: '#fff',
    borderRadius: '6px',
    backgroundColor: '#1b3b77',
    '&:hover': {
      backgroundColor: '#ffffff',
    },
  },
};

class SignUp extends Component{


constructor(props){
  super(props)
  this.state = {email: '', username: '', password: '', password2: '', passwordMatch: true, passwordError: true}

  this.updateEmail = this.updateEmail.bind(this);
  this.updateUsername = this.updateEmail.bind(this);
  this.updatePassword = this.updatePassword.bind(this);
  this.updatePassword2 = this.updatePassword2.bind(this);
  this.confirmPassword = this.confirmPassword.bind(this);
}

updateEmail(e){
  this.setState({email: e.target.value})
}
updateUsername(e){
  this.setState({username: e.target.value})
}
updatePassword(e){
  this.setState({password: e.target.value})
}
updatePassword2(e){
  this.setState({password2: e.target.value})
}
confirmPassword(){
  if(this.state.password === this.state.password2){
    return
  }
  else{

  }
}

  render(){

    return(
  <div className = "fields">
    <div className = "email">
      <TextField
        label = "Email"
        placeholder = "Enter Email Here"
        onChange = {this.updateEmail}/>
    </div>
    <div className = "username">
      <TextField
        label = "Username"
        placeholder = "Username"
        onChange = {this.updateEmail}/>
    </div>
    <div className = "password1">
      <TextField
        label = "Password"
        placeholder = "Password"
        type = "password"
        onChange = {this.updatePassword}/>
    </div>
    <div className = "password2">
      <TextField
      label = "Confirm Password"
      placeholder = "Confirm Password"
      type = "password"
      onChange = {this.updatePassword2}/>
    </div>
    <div className = "createAccountButton">
      <MuiThemeProvider theme = {buttonStyle}>
      <Button
        variant = "raised"
        onClick = {this.confirmPassword}
        style = {styles.cssRoot}>
        Create Account </Button>
      </MuiThemeProvider>
    </div>
  </div>


);
}
}

export default SignUp;
