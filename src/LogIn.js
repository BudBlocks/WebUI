import React, {Component} from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import './LogIn.css'
import TextField from '@material-ui/core/TextField';



class LogIn extends Component{

  updateEmail(e){
    this.setState({email: e.target.value})
  }


constructor(props){
  super(props)
  this.state = {email: '', password: ''}

    }
      render(){

        return(

    <div>
      <div class = "email">
        <TextField label = "Email" placeholder = "example@email.com"/>
        <br/>
      </div>



      <div class = "password">
        <TextField label = "Password" placeholder = "password"/>
      </div>
    </div>
    );
}
}

export default LogIn;
