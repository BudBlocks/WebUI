import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {ArrowDownward, ArrowUpward} from '@material-ui/icons';
import {IconButton, Icon} from '@material-ui/core';
import { friends } from './App';

let outgoing = [];
let incoming = [];

class DashboardFeed extends Component {

  constructor(props) {
    super(props)

    this.state = {
      infoList: friends
    }

    this.showIncoming = this.showIncoming.bind(this);
    this.showOutgoing = this.showOutgoing.bind(this);
  }

  showIncoming() {
    this.setState({infoList: incoming})
  }

  showOutgoing() {
    this.setState({infoList: outgoing})
  }

  render() {
    return (
    <div>
      <IconButton onClick={this.showIncoming}>
        <ArrowDownward/>
      </IconButton>
      <IconButton onClick={this.showOutgoing}>
        <ArrowUpward/>
      </IconButton>
      <div>
        <List style={{overflow:'auto'}}>
          {
            this.state.infoList.map((note) =>
              <ListItem>
                <div styles={{alignItems: 'left'}}>
                  <ListItemText>
                    {note}
                  </ListItemText>
                </div>
                <ListItemSecondaryAction>
                  <Button>
                    Resolve
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            )
          }
        </List>
      </div>
    </div>)
  }
}

export default DashboardFeed;
