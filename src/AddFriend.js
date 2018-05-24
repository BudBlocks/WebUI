import React, {Component} from 'react';

class AddFriend extends Component{
  constructor(props){
    super(props)

    this.state = {newFriend: ''}

    this.updateNewFriend = this.updateNewFriend.bind(this)
    this.handleAddNew = this.handleAddNew.bind(this)
  }

  updateNewFriend(e){
    this.setState({newFriend: e.target.value})
  }

  handleAddNew(){
    this.props.addNew(this.state.newFriend)
    this.setState({newFriend: ''})
  }

  render(){
    return(
    <div>
    <input type = "text" value = {this.state.newFriend} onChange = {this.updateNewFriend}/>
    <button onClick = {this.handleAddNew}>Add Friend</button>
    </div>
  )
  }
}

export default AddFriend;
