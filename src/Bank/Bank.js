import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import { IconButton, Icon, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import TextField from '@material-ui/core/TextField';
import LogoHeader from '../LogoHeader.js';
import store from '../UserStore';
import { observer } from 'mobx-react';
import {formatMoney, clampInput, addBalance, removeBalance, inputMoneyFormat } from '../Utils';
import './Bank.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom';

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
      showDeposit: false,
      showWithdraw: false,
      withdrawShow: '',
      depositShow: ''
    }
  }

    depositMoney(e) {
      if (e.which === 13) {
        store.balance += Number(e.target.value);
        this.setState({depositShow: ''});
        addBalance(store.username, Number(e.target.value));
      } else if (e.which == 44) {
        e.preventDefault();
      }
    }

    withdrawMoney(e) {
      if (e.which === 13) {
        store.balance -= Number(e.target.value);
        this.setState({withdrawShow: ''});
        removeBalance(store.username, Number(e.target.value));
      }
    }

    handleWithdrawChange(e) {
      e.target.value = e.target.value.replace(',', '');
      this.setState({withdrawShow: clampInput(e.target.value, 0, store.balance)})
    }

    handleDepositChange(e) {
      e.target.value = e.target.value.replace(',', '');
      this.setState({depositShow: clampInput(e.target.value, 0, 999)})
    }

  render() {
    return (
    <body>
      <div style={{backgroundColor: '#1b3b77'}}>
        <IconButton style={styles.IconButton} component={Link} to='/dashboard'>
          <ArrowBack style={styles.Icon}/>
        </IconButton>
        <h1 style={{margin:'0px', padding:'15px', color:'#fff', textAlign:'center', fontWeight:'400', marginTop: '-60px'}}>Bank</h1>
      </div>
        <div className = 'balanceHeader'>
          <h2> Balance: ${formatMoney(store.balance)} </h2>
        </div>
        <div className = 'deposit'>
          <h3>Deposit</h3>
          <TextField
            hintText="Amount"
            placeholder = 'Deposit Amount'
            type='text'
            value = {inputMoneyFormat(this.state.depositShow)}
            onChange={this.handleDepositChange.bind(this)}
            onKeyPress={this.depositMoney.bind(this)}
            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}/>
        </div>
        <div className = 'withdraw'>
          <h3>Withdraw</h3>
          <div>
            <TextField
            placeholder='Withdraw Amount'
            type='text'
            value = {inputMoneyFormat(this.state.withdrawShow)}
            onChange={this.handleWithdrawChange.bind(this)}
            onKeyPress={this.withdrawMoney.bind(this)}
            InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>,}}/>
          </div>
        </div>
    </body>
  )
}
}

export default Bank;
