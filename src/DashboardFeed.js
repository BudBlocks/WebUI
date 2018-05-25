import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import {ArrowDownward, ArrowUpward} from '@material-ui/icons';
import {IconButton, Icon} from '@material-ui/core';

let outgoing = [];
let incoming = [];

class DashboardFeed extends Component {

  constructor(props) {
    super(props)

    this.state = {
      infoList: incoming
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
    return (<div>
      <IconButton onClick={this.showIncoming}>
        <ArrowDownward/>
      </IconButton>
      <IconButton onClick={this.showOutgoing}>
        <ArrowUpward/>
      </IconButton>
    </div>)
  }
}

export default DashboardFeed;
