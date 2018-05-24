import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FriendsContainer from './FriendsContainer'


class HelloUser extends Component{
  constructor(props){
    super(props)

    this.state = {username: 'spencerlowitz'}

    this.handleChange = this.handleChange.bind(this)

  }

  handleChange(e){
    this.setState({username: e.target.value})
  }

  render(){
    return(
    <div className = "HelloUser"> Hello {this.state.username}
    <br/>
    Hello {this.props.name}
    <br/>
    Change Name:
    <input type="text" value = {this.state.username} onChange = {this.handleChange}/>
    <br/>
    </div>

    )
  }
}

export default HelloUser;
