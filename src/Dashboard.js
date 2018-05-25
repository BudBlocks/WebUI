import React, { Component } from 'react';
import DashboardHeader from './DashboardHeader'
import DashboardFeed from './DashboardFeed'

class Dashboard extends Component {

  render() {
    return (
      <div>
        <DashboardHeader/>
        <DashboardFeed/>
      </div>
    );
  }
}

export default Dashboard;
