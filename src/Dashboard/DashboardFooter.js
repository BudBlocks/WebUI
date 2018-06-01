import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import {Send} from '@material-ui/icons';
import {Lock} from '@material-ui/icons';
import { Link } from 'react-router-dom';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import store from '../UserStore';

const bStyle = {
  fontSize: '20px',
  textAlign: 'center',
  border: '1px solid white',
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
}

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#1b3b77'
      },
     secondary: {
       main: '#d64949'
     }
        }
      });

@observer
class DashboardFooter extends Component {
  render() {
      if (store.balance < 0) {
        return (
        <MuiThemeProvider theme={theme}>
        <div style={{textAlign:'center'}}>
          <Button style = {bStyle} variant = 'raised' color='secondary' fullWidth>
            <span style = {sStyle}> Account Locked </span>
            <Lock/>
          </Button>
        </div>
      </MuiThemeProvider>);

  } else {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{textAlign:'center'}}>
          <Button style = {bStyle} variant = 'raised' color='primary' component={Link} to='/sendnote' fullWidth>
            <span style = {sStyle}> Send Note </span>
            <Send/>
          </Button>
        </div>
      </MuiThemeProvider>);

    }
  }
}


export default DashboardFooter;
