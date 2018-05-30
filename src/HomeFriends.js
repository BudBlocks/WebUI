import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import friends from './App.js'

let Scott = {
  name: 'Scott Bass',
  rating: 7.0,
}

let Spencer = {
  name: 'Spencer Lowitz',
  rating: 7.0,
}

let Eric = {
  name: 'Eric Doppelt',
  rating: 10.0,
}

let Coleman = {
  name: 'Coleman Smith',
  rating: 3.0,
}

let Wesley = {
  name: 'Wesley Ford',
  rating: 5.0,
}

class HomeFriends extends Component {
  constructor(props) {
    super(props)

    this.state = {
      friendsList: [Scott, Spencer],
      possibleFriends: [Eric, Coleman, Wesley]
    }
  }

  render(){
    return (
      <p>Eric doesn't understand git.</p>
    );
  }
}

export default HomeFriends;
