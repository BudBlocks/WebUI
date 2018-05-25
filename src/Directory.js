import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import SULI from './SULI';
import DashboardHeader from './DashboardHeader';

const styles = {
  StretchButton: {
    width: '100%',
    height: '100px',
    fontSize: '36px'
  }
}

const loginPage = <SULI/>;
const dashboardHeader = <DashboardHeader/>;
let dirPage = undefined;

class Directory extends Component {

  constructor(props) {
    super(props);

    this.changeTo = this.changeTo.bind(this);
    this.signUp = this.signUp.bind(this);
    this.dashboard = this.dashboard.bind(this);

    dirPage = (
      <div>
        <Button style={styles.StretchButton} onClick={this.signUp}>Sign Up</Button>
        <Button style={styles.StretchButton} onClick={this.dashboard}>Dashboard</Button>
      </div>
    );

    this.state = {
      current: dirPage
    }
  }

  signUp() {
    this.changeTo(loginPage);
  }

  dashboard() {
    this.changeTo(dashboardHeader);
  }

  changeTo(form) {
    console.log('changing!');
    this.setState({
      current: form
    });
  }

  render() {
    return this.state.current;
  }
}

export default Directory;
