import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './SendNotePage.css';
import LogoHeader from './LogoHeader.js';
import store from './UserStore';
import { observer } from 'mobx-react';
import {inputMoneyFormat} from './Utils';
import {formatMoney} from './Utils';

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
        }
    }

    withdrawMoney(e) {
      if (e.which === 13) {
      store.balance -= Number(e.target.value);
      this.setState({withdrawShow: ''});
      }
    }

    handleWithdrawChange(e) {
      this.setState({withdrawShow: e.target.value})
    }

    handleDepositChange(e) {
      this.setState({depositShow: e.target.value})
    }

  render() {
    return (
    <div>
    <LogoHeader/>
    <h1>Balance: ${formatMoney(store.balance)}</h1>
    <h3>Deposit</h3>
        <div>
          <TextField placeholder='Deposit Amount' type='text' value = {inputMoneyFormat(this.state.depositShow)} onChange={this.handleDepositChange.bind(this)} onKeyPress={this.depositMoney.bind(this)}/>
        </div>
    <h3>Withdraw</h3>
        <div>
          <TextField placeholder='Withdraw Amount' type='text' value = {inputMoneyFormat(this.state.withdrawShow)} onChange={this.handleWithdrawChange.bind(this)} onKeyPress={this.withdrawMoney.bind(this)}/>
        </div>
    </div>
  )
}
}

export default Bank;
