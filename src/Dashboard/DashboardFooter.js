import React, {Component } from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import {Send} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const bStyle = {
  fontSize: '20px',
  textAlign: 'center',
  border: '1px solid white',
  marginRight: '40px',
  marginLeft: '40px',
  borderRadius: '10px',
  marginTop: '10px',
  marginBottom: '10px'
}

const sStyle = {
  marginRight: '10px',
}

class DashboardFooter extends Component {

  render() {
    return (
      <div style={{textAlign:'center'}}>
        <Button style = {bStyle} variant = 'raised' color='primary' component={Link} to='/sendnote'>
          <span style = {sStyle}> Send Note </span>
            <Send/>
            {/*<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill='#ffffff' d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>*/}
        </Button>
      </div>
    )
  }
}

export default DashboardFooter;
