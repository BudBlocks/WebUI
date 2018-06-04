import React, { Component } from 'react';
import { IconButton, Icon, Grid, Button } from '@material-ui/core';
import { Add, Delete, AccountBalance, ArrowDownward, ArrowUpward } from '@material-ui/icons';
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
            <IconButton style={styles.IconButton} component={Link} to='/friends'>
              <Add style={styles.Icon}/>
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <h1 style={{margin:'0px', padding:'0px', color:'#fff', textAlign:'center', paddingTop:'15px', fontWeight:'400'}}>Dashboard</h1>
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
          <Grid item xs={12}>
            <div style={{textAlign:'center', marginBottom:'-10px', marginTop:'-40px'}}>
              <IconButton onClick={event => feedState.showIncoming()}>
                <ArrowDownward style={styles.Icon}/>
              </IconButton>
              <IconButton onClick={event => feedState.showOutgoing()}>
                <ArrowUpward style={styles.Icon}/>
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <br/>
      </div>
    )
  }
}

export default DashboardHeader;
