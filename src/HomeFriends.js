import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import LogoHeader from './LogoHeader.js';
import './HomeFriends.css';

let databaseUsername = ['Wellesly', 'Scooter', 'Spender', 'CoalMan', 'Eric'];

let databaseName = ['Wesley Ford', 'Scott Bass', 'Spencer Lowitz', 'Coleman Smith', 'Eric Doppelt'];

let databaseRating = ['4.3', '8.2', '9.9', '6.7', '4.4'];

class HomeFriends extends Component {
  constructor(props) {
    super(props)

    this.state = {
      usernameList: [],
      nameList: [],
      ratingsList: [],
      showAdding: false,
      showConfirming: false,
      user: ''
    }

    this.loadFriend = this.loadFriend.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.submitFriend = this.submitFriend.bind(this);
  }

  

  loadFriend(username) {
    for (let i = 0; i < databaseUsername.length; i++) {
      if (databaseUsername[i] === username) {
        this.setState({showAdding: false, showConfirming: true, user: username})
        return;
      }

  }
}

  handleClick(e) {
    this.setState({showAdding: true})
  }

  handleChange(e) {
    this.loadFriend(e.target.value)

  }

  submitFriend(username) {
    console.log('CLICK');
    for (let i = 0; i < databaseUsername.length; i++) {
    if (databaseUsername[i] === username) {
      let name = databaseName[i];
      let rate = databaseRating[i];

      if (!this.state.usernameList.includes(username)) {
        this.setState((prevState) => ({usernameList: prevState.usernameList.concat([username])}));
        this.setState((prevState) => ({nameList: prevState.nameList.concat([name])}));
        this.setState((prevState) => ({ratingsList: prevState.ratingsList.concat([rate])}));
      }
  }
}
}

  render() {
    let one = (
      <div>
        <LogoHeader/>
        <div>
        {this.state.usernameList.toString()}
      <br/>
        {this.state.nameList.toString()}
      <br/>
        {this.state.ratingsList.toString()}
      </div>
        <div>
          <Button variant='outlined' color='secondary' onClick={this.handleClick}> Search For Friend </Button>
        </div>
      </div>
    );

    let two = (
      <div>
        <div>
          <TextField placeholder='Username' type='text' onChange={this.handleChange}/>
        </div>
      </div>
    );

    let three = (
      <div>
        <div>
          <Button variant='outlined' color='primary' onClick = {this.submitFriend.bind(this, this.state.user)}> Confirm Friend </Button>
        </div>
      </div>
    );

    if(this.state.showAdding) {
      return [one, two];
    } else if (this.state.showConfirming) {
      return [one, two, three];
    }
    return one;
  }

}

export default HomeFriends;
