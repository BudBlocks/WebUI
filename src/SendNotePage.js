import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import NotePageConfirmation from './NotePageConfirmation.js';
import NoteToggle from './NoteToggle.js';

class SendNotePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: (typeof props.name === undefined)
        ? ''
        : props.name,
      amount: (typeof props.amount === undefined)
        ? '0.00'
        : props.amount,
      message: (typeof props.message === undefined)
        ? ''
        : props.message
    }

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.getProps = this.getProps.bind(this);
  }

  handleChangeName(e) {
    this.setState({name: e.target.value})
  }

  handleChangeAmount(e) {
    this.setState({
      amount: (String)(e.target.value)
    })
  }

  handleChangeMessage(e) {
    this.setState({message: e.target.value})
  }

  getProps(e) {
    var info = {
      name: this.state.name,
      message: this.state.message,
      amount: formatMoney(this.state.amount)
    }

    this.props.stateChange(info);
  }

  render() {

    return (
    // if sending note, render this:
    <div>
      <div className='info'>
        <h2>
          Send To:
          <input type='text' name='name' value={this.state.name} onChange={this.handleChangeName.bind(this)}/>
        </h2>
        <h2>
          Dollar Amount:
          <input type='Number' step='.01' name='amount' value={formatMoney(this.state.amount)} onChange={this.handleChangeAmount.bind(this)}/>
        </h2>
        <h2>
          Message:
          <input type='text' name='message' value={this.state.message} onChange={this.handleChangeMessage.bind(this)}/></h2>
      </div>
      <div>
        <Button variant='outlined' color='secondary' onClick={this.getProps}>
          Send Note
        </Button>
      </div>
    </div>)
  }
}

function formatMoney(n) {
  let new_n = (Number)(n);
  if (isNaN(new_n)) {
    return n;
  }
  new_n = new_n.toFixed(2);
  if (new_n.length < n.length) {
    return new_n;
  } else {
    return n;
  }
}

export default SendNotePage;
