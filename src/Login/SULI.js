import React, {Component} from 'react';
import logo from '../logo.svg';
import './SULI.css';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import LogIn from './LogIn';
import SignUp from './SignUp'
import Background from '../Images/bluepic2.jpg';
import Logo from '../Images/BudblockLogo.png';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1b3b77'
    }, // Purple and green play nicely together.
    secondary: {
      main: '#ffffff'
    }, // This is just green.A700 as hex.
  }
});

var h = window.innerHeight;
var w = window.innerWidth;

const backGround = {
  backgroundImage: "url(" + (
  Background) + ")",
  width: "100%",
  height: "100%",
  margin: "0",
  padding: "0",
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "inherit"
};

const buttonColor = {
  white: "#ffffff"

};

const logIn = <LogIn/>;
const signUp = <SignUp/>;

class SULI extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentForm: logIn
    }

    this.changePageLogIn = this.changePageLogIn.bind(this);
    this.changePageSignUp = this.changePageSignUp.bind(this);
  }

  changePageLogIn() {
    if (this.state.currentForm == logIn) {
      return;
    }
    this.setState((state) => {
      return {currentForm: logIn};
    });

  }

  changePageSignUp() {
    if (this.state.currentForm == signUp) {
      return;
    }
    this.setState((state) => {
      return {currentForm: signUp};
    });
  }

  render() {
    return (<MuiThemeProvider theme={theme}>
      <body style={backGround}>

        <div className="SULI-header">
          <h1>Welcome to
            <span className="color"> Bud</span>Blocks</h1>
        </div>
        <div className="App-logo">
            <div className='inner'>
              <img src={Logo} width="20%"></img>
            </div>
       </div>
        <div className="buttons">
          <div className="signupbut">
            <Button variant="outlined" color="primary" onClick={this.changePageSignUp}>
              Sign Up
            </Button>
          </div>
          <div className="loginbut">
            <Button variant="outlined" color="secondary" onClick={this.changePageLogIn}>
              Log In
            </Button>
          </div>
        </div>

        <div className="thePage">
          {this.state.currentForm}
        </div>

      </body>
    </MuiThemeProvider>);
  }

}

export default SULI;
