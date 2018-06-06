import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { IconButton, Icon, Grid } from '@material-ui/core';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import LogoHeader from '../LogoHeader.js';
import store from '../UserStore';
import { observer } from 'mobx-react';
import { formatMoney, clampInput, addBalance, removeBalance, inputMoneyFormat, updateUserInfo } from '../Utils';
import './Bank.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom';
const buttonStyle = createMuiTheme({
  palette: {
    primary: {
      main: '#bf2a2a'
    },
    secondary: {
      main: '#239620'
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

const styles = {
  Icon: {
    color: '#fff',
  },
  IconButton: {
    margin: '10px',
    marginBottom: '2px',
  },
}

@observer
class Bank extends Component {

  constructor(props) {
    super(props)

    this.state = {
      amountShow: ''
      showError: false
    }
    this.depositMoney = this.depositMoney.bind(this);
    this.withdrawMoney = this.withdrawMoney.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  componentDidMount() {
    updateUserInfo(store.username);
  }

  depositMoney(e) {
    addBalance(store.username, Number(this.state.amountShow))
      .then(() => {
        this.setState({showError: false, amountShow: ''});
      })
      .then(res => {
        console.log('Transaction went through.');
      })
      .catch(error => {
        console.log('Transaction failed.');
      })
      .then(() => {
        updateUserInfo(store.username);
      });
  }

    withdrawMoney(e) {
      console.log(this.state.amountShow);
      console.log(store.balance);
      if (this.state.amountShow > store.balance) {
        this.setState({showError: true});
        return;
      }
      removeBalance(store.username, Number(this.state.amountShow))
        .then(() => {
          this.setState({showError: false, amountShow: ''});
        })
        .then(res => {
          console.log('Transaction went through.');
        })
        .catch(error => {
          console.log('Transaction failed.');
        })
        .then(() => {
          updateUserInfo(store.username);
        });
    }

    handleAmountChange(e) {
      e.target.value = e.target.value.replace(',', '');
      this.setState({showError: false, amountShow: e.target.value})
    }

  render() {
    return (
      <body>
        <div className='parentDiv'>
          <div style={{backgroundColor: '#1b3b77'}}>
            <IconButton style={styles.IconButton} component={Link} to='/dashboard'>
              <ArrowBack style={styles.Icon}/>
            </IconButton>
            <h1 style={{margin:'0px', padding:'15px', color:'#fff', textAlign:'center', fontWeight:'400', marginTop: '-60px'}}>Bank</h1>
          </div>
          <div className = 'balanceHeader'>
            <h2> Balance: ${formatMoney(store.balance)} </h2>
          </div>
          <div className = 'amount'>
            <h3>Amount</h3>
            <TextField
              hintText=""
              placeholder = ''
              type='text'
              value = {inputMoneyFormat(this.state.amountShow)}
              onChange={this.handleAmountChange}
              InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}/>
          </div>
          <div className="errorMessage" style={{color: this.state.showError ? "#bf2a2a" : "#ffffff"}}>
            Balance too low
          </div>
          <div className='whitespaceDiv'></div>
          <div className='bottom'>
            <div className="submitButton">
              <MuiThemeProvider theme={buttonStyle}>
                <Grid container>
                  <Grid item xs={6}>
                    <div style={{textAlign:'center'}}>
                      <Button style={bStyle} variant='raised' color='secondary' onClick={this.withdrawMoney} fullWidth>
                        <span style={sStyle}> Withdraw </span>
                      </Button>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div style={{textAlign:'center'}}>
                      <Button style={bStyle} variant='raised' color='primary' onClick={this.depositMoney} fullWidth>
                        <span style={sStyle}> Deposit </span>
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </MuiThemeProvider>
            </div>
          </div>
        </div>
      </body>
    )
  }
}

export default Bank;
