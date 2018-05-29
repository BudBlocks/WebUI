import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './LogIn.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Logo from './Images/BudblockLogo.jpg';

const buttonStyle = createMuiTheme({
  palette: {
    primary: {main: '#000000'},

  },
});

const bStyle = {
    borderRadius: '5px',
    color: '#1b3b77',
    backgroundColor: '#fff'
};

class LogIn extends Component{

  updateEmail(e){
    this.setState({email: e.target.value})
  }


constructor(props){
  super(props)
  this.state = {email: '', password: ''}

    }
      render(){

        return(

    <div>
      <div class = "email">
        <TextField label = "Email" placeholder = "example@email.com"/>
        <br/>
      </div>



      <div class = "username">
        <TextField label = "Password" placeholder = "password"/>
      </div>

      <div className = "App-logo">
        <img src = {Logo} width = "20%"></img>
      </div>

      <div className = "createAccountButton">
        <MuiThemeProvider theme = {buttonStyle}>
        <Button
          variant = "raised"
          onClick = {this.confirmPassword}
          style = {bStyle}>
          Log In </Button>
        </MuiThemeProvider>
      </div>

    </div>
    );
}
}

export default LogIn;
