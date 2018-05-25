import React, { Component } from 'react';
import DashboardHeader from './DashboardHeader'
import DashboardFeed from './DashboardFeed'
import DashboardFooter from './DashboardFooter';

class Dashboard extends Component {

  render() {
    return (
      <div>
        <DashboardHeader/>
        <DashboardFeed/>
        <DashboardFooter/>
      </div>
    );
  }
}

export default Dashboard;
