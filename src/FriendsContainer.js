import React, {Component} from 'react'
import ShowList from './ShowList.js'
import AddFriend from './AddFriend'

class FriendsContainer extends Component{
    constructor(props){
      super(props)

    this.state = {name: 'Spencer Lowitz', friends: ['Scott Bass', 'Coleman Smith', 'Wesley Ford']}

    this.addFriend = this.addFriend.bind(this)
}

    addFriend(friend){
      this.setState((state) => ({friends: state.friends.concat([friend])}))
    }

    render(){
      return(
        <div>
        <h3> {this.state.name}s friends: </h3>
        <ShowList names = {this.state.friends}/>
        <br/>
        <h3> Name: {this.state.name}</h3>
        <AddFriend addNew = {this.addFriend}/>
        </div>
      )
    }

}

export default FriendsContainer;
