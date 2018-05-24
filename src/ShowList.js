import React, {Component} from 'react';

class ShowList extends Component{


  render(){
    return(
      <div>
      <h3> Friends: </h3>
      <ul>
      {this.props.names.map((friend) => <li>{friend}</li>)}
      </ul>
      </div>
    )
  }
}

export default ShowList;
