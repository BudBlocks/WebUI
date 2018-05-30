import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './SendNotePage.css';
import Logo from './Images/BudblockLogo.png';

class Bank extends Component {
  render() {
    return (

      <div className="everythingAgain">
      <div className='URMOM'>
        <div className="image">
          <img src={Logo} width="40px"></img>
        </div>
      </div>
        <Button color = 'primary'> Deposit </Button>
        <br/>
        <Button color = 'secondary'> Withdraw </Button>
      </div>
    );
  }
}

export default Bank;
