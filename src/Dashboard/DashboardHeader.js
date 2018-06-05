import React, { Component } from 'react';
import { IconButton, Icon, Grid, Button, SvgIcon } from '@material-ui/core';
import { Add, Delete, AccountBalance, ArrowDownward, ArrowUpward, AccountBox } from '@material-ui/icons';
import { formatMoney } from '../Utils';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import store from '../UserStore';
import { feedState } from './DashboardFeed';

const styles = {
  Right: {
    textAlign: 'right',
  },
  Left: {
    textAlign: 'left',
  },
  Balance: {
    paddingLeft: 30,
    color: '#5ACA21',
  },
  Rating: {
    textAlign: 'right',
    paddingRight: 20,
    color: '#ffffff'
  },
  Header: {
    backgroundColor: '#1b3b77'
  },
  Icon: {
    color: '#fff',
  },
  IconButton: {
    margin: '10px',
    marginBottom: '2px',
  },
}

@observer
class DashboardHeader extends Component {
  constructor(props){
    super(props);

    this.state = {
      rating: 9.9,
    }
  }

  render() {
    return (
      <div style={styles.Header}>
        <Grid container>
          <Grid item xs={2} style={styles.Left}>
            <IconButton style={styles.IconButton} component={Link} to='/login'>
              <SvgIcon style={styles.Icon, {transform:'rotate(180deg)', color:'#fff'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19,3 C20.11,3 21,3.9 21,5 L21,8 L19,8 L19,5 L5,5 L5,19 L19,19 L19,16 L21,16 L21,19 C21,20.1 20.11,21 19,21 L5,21 C3.9,21 3,20.1 3,19 L3,5 C3,3.9 3.9,3 5,3 L19,3 Z M15.5,17 L20.5,12 L15.5,7 L14.09,8.41 L16.67,11 L7,11 L7,13 L16.67,13 L14.09,15.59 L15.5,17 Z"/></svg>
              </SvgIcon>
            </IconButton>
          </Grid>
          <Grid item xs={8}>
              <h1
                onClick={() => { feedState.handleRefresh() }}
                style={{margin:'0px', padding:'0px', color:'#fff', textAlign:'center', paddingTop:'15px', fontWeight:'400'}}
                >
                Dashboard
              </h1>
          </Grid>
          <Grid item xs={2}>
            <div style={styles.Right}>
              <IconButton style={styles.IconButton} component={Link} to='/bank'>
							  <AccountBalance style={styles.Icon}/>
              </IconButton>
            </div>
          </Grid>

          <Grid item xs={8} style={styles.Balance}>
            <div style={{marginTop:'10px', color:'white'}}>Balance</div>
            <div style={{fontSize:'28px', color: store.balance < 0 ? '#CB534E' : '#5ACA21'}}>${formatMoney(store.balance)}</div>
          </Grid>
          <Grid item xs={4} style={styles.Rating}>
            <div style={{marginTop:'10px'}}>Rating</div>
            <div style={{fontSize:'28px'}}>{this.state.rating}</div>
          </Grid>
          {/*<div style={{width: '100%', textAlign:'center'}}>
            <IconButton style={styles.IconButton, {marginTop:'-50px'}} onClick={() => {
                feedState.handleRefresh();
              }}>
              <Refresh style={styles.Icon}/>
            </IconButton>
          </div>*/}
        </Grid>
        <br/>
      </div>
    )
  }
}

export default DashboardHeader;
