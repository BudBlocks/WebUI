import React, {Component} from 'react';
import Logo from './Images/BudblockLogo.png';
import { Link } from 'react-router-dom';

class LogoHeader extends Component {

  render() {
    return (
  <div className = 'URMOM'>
    <div className = "image">
      <Link to='/dashboard'>
      <img src = {Logo} width = "40px" alt=""></img>
      </Link>
    </div>
  </div>
  )
  }
}

export default LogoHeader;
