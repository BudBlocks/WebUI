import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import purple from '@material-ui/core/colors/purple';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import LogIn from './LogIn';
import SignUp from './SignUp'

const theme = createMuiTheme({
  palette: {
        primary: { main: '#1b3b77' }, // Purple and green play nicely together.
        secondary: { main: '#ffffff' }, // This is just green.A700 as hex.

  },
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  // input: {
  // },

});



const logIn = <LogIn />;
const signUp = <SignUp />;

  class App extends Component{

    constructor(props){
      super(props)

      this.state = {
        currentForm: signUp
      }

      this.changePageLogIn = this.changePageLogIn.bind(this);
      this.changePageSignUp = this.changePageSignUp.bind(this);
    }

    changePageLogIn(){
      if(this.state.currentForm == logIn){
        return;
      }
      this.setState((state) => {
        return {
          currentForm: logIn
        };
      });

}

      changePageSignUp(){
        if(this.state.currentForm == signUp){
          return;
        }
        this.setState((state) => {
          return {
            currentForm: signUp
          };
        });
    }



    render(){
      return (
        <MuiThemeProvider theme = {theme}>
            <div>
                {/* <HelloUser name = "Spencer"/> */}
                {/* <FriendsContainer/> */}
                <h1 class = "App-header">Welcome to <span className = "color">Bud</span>Blocks</h1>
                <br/>
                <div class = "button">
                  <Button variant = "outlined" color = "primary" onClick = {this.changePageSignUp}> Sign Up </Button>

                  <Button variant = "outlined" color = "secondary" onClick = {this.changePageLogIn}> Log In </Button>
                </div>

                <div>
                  {this.state.currentForm}
                </div>

              </div>
        </MuiThemeProvider>
      );
    }
}

export default App;
