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
  paddingTop: '10px',
  paddingBottom: '10px',
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
  fontSize: '20px'
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
      name: '',
      toDashboard: false,
      firstTimeUser: 0,
      subtitle: this.getSubtitle(),
      unsucessful: false
    }
    this.updateUsername = this.updateUsername.bind(this);
    this.updateEmail = this.updateEmail.bind(this);
    this.updateName = this.updateName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  getSubtitle() {
      const subtitles = [
        "Powered by Watson",
        "We should have used Xamarin",
        "Not Powered by PhoneGap",
        "Patent Pending?",
        "Fast, Easy, Trusted",
        "Secure Since 2019",
        "Still in Alpha",
        "A hand shake is not on the BlockChain",
        "Managed by Spender",
        "This is a real Spender Bender",
        "Brought to you by The Flock",
        "Even we don't really know what's going on",
        "Better than an uncooked Panini",
        "We're quiting College to develop this",
        "Hi Mom",
        "The Blockchain runs on Alien Technology",
        "R.I.P. StarBlocks"

      ];
      let i = Math.round(Math.random() * (subtitles.length - 1));
      console.log(subtitles[i] + "  " + i);
      return subtitles[i];
    };

  handleChange(e, value) {
    this.setState({firstTimeUser: value, unsucessful: false, username: '', name: '', password: '', confirm: '', email: ''});
  }

  updateUsername(e) {
    this.setState({username: e.target.value, unsucessful: false})
  }
  updateEmail(e){
    this.setState({email: e.target.value, unsucessful: false})
  }
  updateName(e) {
    this.setState({name: e.target.value, unsucessful: false})
  }
  async submitLogin(e) {
    if (this.state.firstTimeUser === 0 && this.state.password === this.state.confirm) {
      await createUser(this.state.username, this.state.email, this.state.name);
    }
    let success = await updateUserInfo(this.state.username);

    if (!success) {
      console.log("User with username " + this.state.username + " does not exist.");
      this.setState({unsucessful: true})
      return;
    }

    store.username = this.state.username;
    store.password = this.state.password;
    store.email = this.state.email;
    store.name = this.state.name;

    this.setState({toDashboard: true});
  }


  // async submitNewUser(e) {
  //
  // }

  render() {
    let subtitle = this.state.subtitle;
    if (this.state.toDashboard) {
      return <Redirect to='/dashboard'/>
    }
    const { classes } = this.props;
    // first one is for login
    if (this.state.firstTimeUser === 0) {
      return (
        <div className="parentDiv">
          <div className="header">
            <p className="headerText">Welcome to BudBlocks!</p>
            <p className="headerSubtext" >{subtitle}</p>
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
              <TextField label="Email" placeholder="user@name.me" defaultValue={this.state.email} onChange={this.updateEmail}/>
            </div>
            <div className="textfield">
              <TextField label="Name" placeholder="User Name" defaultValue={this.state.name} onChange={this.updateName}/>
            </div>
            <div className="textfield">
              <TextField label="Username" placeholder="Username" defaultValue={this.state.username} onChange={this.updateUsername}/>
            </div>
            <div className="textfield">
              <TextField type="password" label="Password" defaultValue={this.state.password} placeholder="Password"/>
            </div>
            <div className="textfield">
              <TextField type="password" label="Confirm Password" defaultValue={this.state.confirm} placeholder="Password"/>
            </div>
            <div className="errorMessage" style={{color: this.state.unsucessful ? "#bf2a2a" : "#ffffff"}}>
              Account with username {this.state.username} already exists
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
            <p className="headerText">Welcome to BudBlocks!</p>
            <p className="headerSubtext">{subtitle}</p>
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
              <TextField label="Username" placeholder="Username" defaultValue={this.state.username} onChange={this.updateUsername}/>
            </div>
            <div className="textfield">
              <TextField type="password" label="Password" defaultValue={this.state.password} placeholder="Password"/>
            </div>
            <div className="errorMessage" style={{color: this.state.unsucessful ? "#bf2a2a" : "#ffffff"}}>
              Account with username {this.state.username} does not exist
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
