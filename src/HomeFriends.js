import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import friends from './App.js'

let var Scott = {
  name: Scott Bass
  rating: 7.0
}

let var Spencer = {
  name: Spencer Lowitz
  rating: 7.0
}

let var Eric = {
  name: Eric Doppelt
  rating: 10.0
}

let var Coleman = {
  name: Coleman Smith
  rating: 3.0
}

let var Wesley = {
  name: Wesley Ford
  rating: 5.0
}

class HomeFriends extends Component {
  constructor(props) {
    super(props)

    this.state = {
      friendsList: [Scott, Spencer]
      possibleFriends: [Eric, Coleman, Wesley]
    }
  }

  render{
    (

    )
  }
}
