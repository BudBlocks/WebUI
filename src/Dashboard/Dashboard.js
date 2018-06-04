import React, { Component } from 'react';
import DashboardHeader from './DashboardHeader'
import DashboardFeed, { DashboardFeedHeader } from './DashboardFeed'
import DashboardFooter from './DashboardFooter';
import './Dashboard.css';

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <div className='dashboard-container'>
          <div className='dashboard-header'>
            <DashboardHeader />
          </div>

            <div className='dashboard-feed-header'>
            <DashboardFeedHeader />
            </div>
          
          <div className='dashboard-feed'>
            <DashboardFeed />
          </div>
          <div className='dashboard-footer'>
            <DashboardFooter />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
