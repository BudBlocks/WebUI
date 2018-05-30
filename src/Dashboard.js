import React, { Component } from 'react';
import DashboardHeader from './DashboardHeader'
import DashboardFeed, { DashboardFeedHeader } from './DashboardFeed'
import DashboardFooter from './DashboardFooter';
import './Dashboard.css';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.removeBalance = this.removeBalance.bind(this);
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <div className='dashboard-container'>
          <div className='dashboard-header'>
            <DashboardHeader ref={instance => {this.header = instance; }} />
          </div>
          <div className='dashboard-feed-header'>
            <DashboardFeedHeader />
          </div>
          <div className='dashboard-feed'>
            <DashboardFeed removeBalance={this.removeBalance}/>
          </div>
          <div className='dashboard-footer'>
            <DashboardFooter />
          </div>
        </div>
      </div>
    );
  }

  removeBalance(amount){
    this.header.removeBalance(amount);
  }
}

export default Dashboard;
