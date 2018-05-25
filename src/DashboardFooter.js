import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import {Send} from '@material-ui/icons';

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
      <div>
    <Button style = {bStyle} variant = 'raised' color = 'primary'>
      <span style = {sStyle}> Send Note </span>
      <Send/>
    </Button>
      </div>
    )
  }
}

export default DashboardFooter;
