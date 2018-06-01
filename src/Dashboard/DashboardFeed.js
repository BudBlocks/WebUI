import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {ArrowDownward, ArrowUpward} from '@material-ui/icons';
import {IconButton, Icon} from '@material-ui/core';
import { friends } from '../App';
import { formatMoney } from '../Utils';
import { getAllNotes } from '../Utils';
import store from '../UserStore';
import NoteModal from '../NoteModal';

let unresolved = []

for(let i = 0; i < 20; i++) {
  unresolved.push({
    id: i,
    amount: Math.random() * 50,
  });
}

class DashboardFeed extends Component {

  constructor(props) {
    super(props)

    getAllNotes().then((all_notes) => {
      let _notes_owed = []
      let _notes_received = []
      let _notes_pending = []

      all_notes.forEach((note) => {
        let number = note.number;
        for(let i = 0; i < store.notes_owed.length; i++) {
          let URI = store.notes_owed[i];
          if (URI.substring(URI.indexOf('#')+1, URI.length) == number) {
            _notes_owed.push(note);
          }
        }
        for(let i = 0; i < store.notes_received.length; i++) {
          let URI = store.notes_received[i];
          if (URI.substring(URI.indexOf('#')+1, URI.length) == number) {
            _notes_received.push(note);
          }
        }
        for(let i = 0; i < store.notes_pending.length; i++) {
          let URI = store.notes_pending[i];
          if (URI.substring(URI.indexOf('#')+1, URI.length) == number) {
            _notes_pending.push(note);
          }
        }
      });
      this.setState({
        notes_owed: _notes_owed,
        notes_received: _notes_received,
        notes_pending: _notes_pending,
      });
    });
    this.state = {
      notes_owed: [],
      notes_received: [],
      notes_pending: [],
      infoList: unresolved,
      resolvingNote: false,
      currentNote: {},
    }
  }

  handleResolve(resolveNote) {
    this.setState({
      resolvingNote: true,
      currentNote: {
          id: resolveNote.id,
          sender: "scooter",
          amount: resolveNote.amount,
          message: "default message",
      }
    });


    // this.setState((prevState) => ({
    //   infoList: prevState.infoList.filter(note => note.id != resolveNote.id)
    // }));
    // store.balance -= resolveNote.amount;
  }

  render() {
    return (
      <div>
        <NoteModal
          open={this.state.resolvingNote}
          header="Resolve Note"
          note={this.state.currentNote}
          confirm="Confirm"
          reject="Cancel"
          onAccept={() => {
            this.setState((prevState) => ({
              infoList: prevState.infoList.filter(note => note.id != this.state.currentNote.id),
              resolvingNote: false
            }));
            store.balance -= this.state.currentNote.amount;
          }}
          onReject={() => {
            this.setState({ resolvingNote: false });
          }}
        />
        <List style={{height:'inherit', overflow:'auto'}}>
          {
            this.state.infoList.map((note) =>
              <ListItem key={note.id}>
                <div styles={{alignItems: 'left'}}>
                  <ListItemText>
                    ${formatMoney(note.amount)}
                  </ListItemText>
                </div>
                <ListItemSecondaryAction>
                  <Button onClick={this.handleResolve.bind(this, note)}>
                    Resolve
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            )
          }
        </List>
      </div>
    )
  }
}

export const DashboardFeedHeader = () => (
  <div style={{textAlign:'center'}}>
    <IconButton onClick={this.showIncoming}>
      <ArrowDownward/>
    </IconButton>
    <IconButton onClick={this.showOutgoing}>
      <ArrowUpward/>
    </IconButton>
  </div>
)

export default DashboardFeed;
