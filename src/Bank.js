import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './SendNotePage.css';
import LogoHeader from './LogoHeader.js';
import { formatMoney } from './Utils';
import store from './UserStore';

class Bank extends Component {
  render() {
    return (

      <div className="everythingAgain">
        <LogoHeader/>
        <Button color = 'primary'> Deposit </Button>
        <br/>
        <Button color = 'secondary'> Withdraw </Button>
        <p>${formatMoney(store.balance)}</p>
      </div>
    );
  }
}

export default Bank;
