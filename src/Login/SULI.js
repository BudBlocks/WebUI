import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import { AppBar, Tab, Tabs } from '@material-ui/core'
import InputLabel from '@material-ui/core/InputLabel';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import './SULI.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Logo from '../Images/BudblockLogo.png';
import { updateUserInfo, createUser } from '../Utils';
import { Redirect } from 'react-router-dom';
import store from '../UserStore';
import { withStyles } from '@material-ui/core/styles';

const buttonStyle = createMuiTheme({
  palette: {
    primary: {
      main: '#1b3b77'
    },
    secondary: {
      main: '#d64949'
    }
  }
});

// const bStyle = {
//   borderRadius: '5px',
//   color: '#1b3b77',
//   backgroundColor: '#fff'
// };

const bStyle = {
  fontSize: '20px',
  textAlign: 'center',
  border: '1px solid white',
  paddingTop: '40px',
  paddingBottom: '40px',
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
  fontSize: '40px'
}

const tabStyles = theme => ({
  indicator:{
    backgroundColor:'#2c81b5',
  },
  tabRoot: {
    color: '#1b3b77',
    textTransform: 'none',
  },
});

class SULI_nostyles extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirm: '',
      email: '',
      toDashboard: false,
      firstTimeUser: 0
    }
    this.updateUsername = this.updateUsername.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }
  handleChange(e, value) {
    this.setState({firstTimeUser: value});
  }
  updateUsername(e) {
    this.setState({username: e.target.value})
  }
  updateEmail(e){
    this.setState({email: e.target.value})
  }
  async submitLogin(e) {
    if (this.state.firstTimeUser === 0 && this.state.password === this.state.confirm) {
      await createUser(this.state.username, this.state.email);
    }
    let success = await updateUserInfo(this.state.username);

    if (!success) {
      console.log("User with username " + this.state.username + " does not exist.");
      return;
    }

    store.username = this.state.username;
    store.password = this.state.password;

    this.setState({toDashboard: true});
  }

  // async submitNewUser(e) {
  //
  // }

  render() {
    if (this.state.toDashboard) {
      return <Redirect to='/dashboard'/>
    }
    const { classes } = this.props;
    // first one is for login
    if (this.state.firstTimeUser === 0) {
      return (
        <div className="parentDiv">
          <div className="header">
            Welcome to BudBlocks
          </div>

          <div className="appBar">
            <AppBar position='static' style={{backgroundColor: 'white'}}>
              <Tabs value={this.state.firstTimeUser}
                onChange={this.handleChange}
                classes={{indicator: classes.indicator}}
                fullWidth>
                <Tab label='Sign Up' classes={{root: classes.tabRoot}}/>
                <Tab label='Login' classes={{root:classes.tabRoot}}/>
              </Tabs>
            </AppBar>
          </div>

          <div className="signUp">
            <div className="textfield">
              <TextField label="email" placeholder="user@name.me" onChange={this.updateEmail}/>
            </div>
            <div className="textfield">
              <TextField label="username" placeholder="username" onChange={this.updateUsername}/>
            </div>
            <div className="textfield">
              <TextField label="password" placeholder="password"/>
            </div>
            <div className="textfield">
              <TextField label="confirm password" placeholder="confirm"/>
            </div>
          </div>

          <div className="whitespaceDiv"></div>

          <div className="submitButton">
            <MuiThemeProvider theme={buttonStyle}>
              <div style={{textAlign:'center'}}>
                <Button style={bStyle} variant='raised' color='primary' onClick={this.submitLogin} fullWidth>
                  <span style={sStyle}> Create Account </span>
                </Button>
              </div>
            </MuiThemeProvider>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="parentDiv">
          <div className="header">
            Welcome to BudBlocks
          </div>

          <div className="appBar">
            <AppBar position='static' style={{backgroundColor: 'white'}}>
              <Tabs value={this.state.firstTimeUser}
                onChange={this.handleChange}
                classes={{indicator: classes.indicator}}
                fullWidth>
                <Tab label='Sign Up' classes={{root: classes.tabRoot}}/>
                <Tab label='Login' classes={{root:classes.tabRoot}}/>
              </Tabs>
            </AppBar>
          </div>

          <div className="signUp">
            <div style={{paddingTop:'30px'}}></div>
            <div className="textfield">
              <TextField label="username" placeholder="username" onChange={this.updateUsername}/>
            </div>
            <div className="textfield">
              <TextField label="password" placeholder="pass word"/>
            </div>
          </div>

          <div className="whitespaceDiv"></div>

          <div className="submitButton">
            <MuiThemeProvider theme={buttonStyle}>
              <div style={{textAlign:'center'}}>
                <Button style={bStyle} variant='raised' color='primary' onClick={this.submitLogin} fullWidth>
                  <span style={sStyle}> Log In </span>
                </Button>
              </div>
            </MuiThemeProvider>
          </div>
        </div>
      )
    }
  }
}

const SULI = withStyles(tabStyles)(SULI_nostyles);

export default SULI;
