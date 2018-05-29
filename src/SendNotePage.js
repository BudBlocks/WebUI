import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import NotePageConfirmation from './NotePageConfirmation.js';
import NoteToggle from './NoteToggle.js';

class SendNotePage extends Component {

  constructor(props) {
    super(props)

    let d = new Date()
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 3)
    let year = d.getFullYear().toString()
    let month = (d.getMonth()+1).toString()
    let day = d.getDate().toString()
    month = month.length == 1 ? '0'.concat(month) : month
    day = day.length == 1 ? '0'.concat(day) : day

    this.state = {
      name:(props.name === undefined)
        ? ''
        : props.name,
      amount: (props.amount === undefined)
        ? ''
        : props.amount,
      message: (props.message === undefined)
        ? ''
        : props.message,
      deadline: (props.deadline === undefined)
        ? year.concat('-').concat(month).concat('-').concat(day)
        : props.deadline
    }

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeAmount = this.handleChangeAmount.bind(this);
    this.handleChangeMessage = this.handleChangeMessage.bind(this);
    this.handleChangeDeadline = this.handleChangeDeadline.bind(this);

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

  handleChangeDeadline(e) {
    this.setState({deadline: e.target.value})
    console.log(e.target.value);
  }

  getProps(e) {
    var info = {
      name: this.state.name,
      message: this.state.message,
      amount: formatMoney(this.state.amount),
      deadline: this.state.deadline
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
          <input type='text' name='message' value={this.state.message} onChange={this.handleChangeMessage.bind(this)}/>
        </h2>
        <h2>
          Deadline:
          <input type='date' name='deadline' value={this.state.deadline} onChange={this.handleChangeDeadline.bind(this)}/>
        </h2>
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
