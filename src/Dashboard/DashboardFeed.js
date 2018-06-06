import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {ArrowDownward, ArrowUpward} from '@material-ui/icons';
import {IconButton, Icon, Grid, AppBar, Tabs, Tab} from '@material-ui/core';
import { friends } from '../App';
import { formatMoney, updateUserInfo, getAllNotes, getAllUsers, resolveNote, acceptNote, rejectNote } from '../Utils';
import store from '../UserStore';
import NoteModal from '../NoteModal';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { ExitToApp, Check  } from '@material-ui/icons';
import './DashboardFeed.css';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { withStyles } from '@material-ui/core/styles';

//let unresolved = []
//let incoming = []

const MONEY_COLS = 3;
const USER_COLS = 3;
const DATE_COLS = 4;
const ICON_COLS = 2;

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#2c81b5'
      },
     secondary: {
       main: '#d64949'
     }
        }
      });

const texttheme = createMuiTheme({
    palette: {
      primary: {
        main: '#1b3b77'
      },
     secondary: {
       main: '#d64949'
     }
        }
      });

const styles = {
  GridItem: {
    paddingTop: '15px',
  }
}

// for(let i = 0; i < 20; i++) {
//   unresolved.push({
//     id: i,
//     amount: Math.random() * 50,
//     expirationDate: new Date(),
//     sender: "scooter",
//   });
//   incoming.push({
//     id: i,
//     amount: Math.random() * 10,
//     expirationDate: new Date(),
//     sender: "mcdaniels",
//   })
// }

class FeedState {
  @observable incoming = false;
  @observable outgoing = true;
  @observable currentList = []
  @observable incomingList = []
  @observable outgoingList = []
  @observable receivedList = []
  @observable waitingList = []
  @observable tabValue = 0
  @observable loading = false
  @observable acceptingNote = false
  @observable resolvingNote = false
  @observable currentNote = {}
  @observable someNoteOverdue = false

  @action showIncoming() {
    this.incoming = true;
    this.outgoing = false;
    this.currentList = this.incomingList;
  }

  @action showOutgoing() {
    this.incoming = false;
    this.outgoing = true;
    this.currentList = this.outgoingList;
  }

  @action update() {
    switch(this.tabValue) {
      case 0:
        this.showIncoming();
        break;
      case 1:
        this.showOutgoing();
        break;
    }
    this.currentList = this.incoming ? this.incomingList : this.outgoingList;
  }

  @action removeIncomingNote(note) {
    for(let i = 0; i < this.incomingList.length; i++){
      if(this.incomingList[i].number == note.number) {
        this.incomingList.splice(i, 1);
      }
    }
  }

  @action removeOutgoingNote(note) {
    for(let i = 0; i < this.outgoingList.length; i++){
      if(this.outgoingList[i].number == note.number) {
        this.outgoingList.splice(i, 1);
      }
    }
  }

  @action async handleRefresh() {
    this.loading = true;
    await updateUserInfo(store.username);
    let allUsers = await getAllUsers();
    getAllNotes().then((all_notes) => {
      let _notes_owed = []
      let _notes_received = []
      let _notes_pending = []
      let _notes_waiting = []
      this.someNoteOverdue = false;

      all_notes.forEach((note) => {
        let number = note.number;
        if (store.notes_owed) {
          for(let i = 0; i < store.notes_owed.length; i++) {
            let URI = store.notes_owed[i];
            if (URI.substring(URI.indexOf('#')+1, URI.length) == number) {
              let new_note = note;
              new_note.sender = new_note.sender.substring(new_note.sender.indexOf('#')+1, new_note.sender.length);
              new_note.receiver = new_note.receiver.substring(new_note.receiver.indexOf('#')+1, new_note.receiver.length);
              _notes_owed.push(new_note);
              if (formatDate(new_note.expiration_date) === 'Overdue') {
                this.someNoteOverdue = true;
              }
            }
          }
        }
        if (store.notes_received) {
          for(let i = 0; i < store.notes_received.length; i++) {
            let URI = store.notes_received[i];
            if (URI.substring(URI.indexOf('#')+1, URI.length) == number) {
              let new_note = note;
              new_note.sender = new_note.sender.substring(new_note.sender.indexOf('#')+1, new_note.sender.length);
              new_note.receiver = new_note.receiver.substring(new_note.receiver.indexOf('#')+1, new_note.receiver.length);
              _notes_received.push(new_note);
            }
          }
        }
        if (store.notes_pending) {
          for(let i = 0; i < store.notes_pending.length; i++) {
            let URI = store.notes_pending[i];
            if (URI.substring(URI.indexOf('#')+1, URI.length) == number) {
              let new_note = note;
              new_note.sender = new_note.sender.substring(new_note.sender.indexOf('#')+1, new_note.sender.length);
              new_note.receiver = new_note.receiver.substring(new_note.receiver.indexOf('#')+1, new_note.receiver.length);
              _notes_pending.push(new_note);
            }
          }
        }
        if (store.notes_waiting) {
          for(let i = 0; i < store.notes_waiting.length; i++) {
            let URI = store.notes_waiting[i];
            if (URI.substring(URI.indexOf('#')+1, URI.length) == number) {
              let new_note = note;
              new_note.sender = new_note.sender.substring(new_note.sender.indexOf('#')+1, new_note.sender.length);
              new_note.receiver = new_note.receiver.substring(new_note.receiver.indexOf('#')+1, new_note.receiver.length);
              _notes_waiting.push(new_note);
            }
          }
        }
      });
      this.incomingList = _notes_pending;
      this.outgoingList = _notes_owed;
      this.receivedList = _notes_received;
      this.waitingList = _notes_waiting;
      this.update();
      this.loading = false;
    });
  }
}

var feedState = new FeedState();
export { feedState };

function formatDate(expiration_date) {
  let diff = new Date(expiration_date).getTime() - new Date().getTime();
  let days = diff / (24 * 60 * 60 * 1000);

  if(days < 0) return 'Overdue';
  return Math.floor(days) + ' days'; // 30-Dec-2011
}

@observer
class DashboardFeed extends Component {

  constructor(props) {
    super(props);

    this.state = {
      notes_owed: [],
      notes_received: [],
      notes_pending: [],
      resolvingNote: false,
      acceptingNote: false,
      currentNote: {},
    }
  }

  handleResolve(resolveNote) {
    this.setState({
      resolvingNote: true,
      currentNote: resolveNote,
    });
    // this.setState((prevState) => ({
    //   infoList: prevState.infoList.filter(note => note.id != resolveNote.id)
    // }));
    // store.balance -= resolveNote.amount;
  }

  componentDidMount() {
    feedState.handleRefresh();
  }



  render() {
    if(feedState.loading) {
      return (
        <div className='loader'></div>
      );
    }
    return (
      <div>
        <NoteModal
          open={feedState.resolvingNote}
          header="Resolve Note"
          note={feedState.currentNote}
          confirm="Confirm"
          reject="Cancel"
          useTo={true}
          onCancel={() => { feedState.resolvingNote = false; }}
          onAccept={() => {
            // API CALL
            resolveNote(feedState.currentNote.number)
              .then(res => {
                console.log('Note has been resolved.');
                feedState.removeOutgoingNote(feedState.currentNote);
                store.balance -= feedState.currentNote.amount / 100;
              })
              .catch(error => {
                console.log('Resolve failed.')
              })
              .then(() => {
                feedState.handleRefresh().then(() => {
                  feedState.resolvingNote = false;
                  feedState.showIncoming()
                });
              });

          }}
          onReject={() => {
            feedState.resolvingNote = false;
          }}
        />
        <NoteModal
          open={feedState.acceptingNote}
          header="Accept Note"
          note={feedState.currentNote}
          useTo={false}
          confirm="Accept"
          reject="Reject"
          onCancel={() => { feedState.acceptingNote = false; }}
          onAccept={() => {
            acceptNote(feedState.currentNote.number)
              .then(res => {
                console.log('Note has been accepted.');
              })
              .catch(error => {
                console.log('accept failed.')
              })
              .then(() => {
                feedState.handleRefresh().then(() => {
                  feedState.acceptingNote = false;
                  feedState.showOutgoing()
                });
              });
          }}
          onReject={() => {
            rejectNote(feedState.currentNote.number)
              .then(res => {
                console.log('Note has been rejected.');
              })
              .catch(error => {
                console.log('reject failed.')
              })
              .then(() => {
                feedState.handleRefresh().then(() => {
                  feedState.acceptingNote = false;
                  feedState.showOutgoing()
                });
              });
          }}
        />
      {/*
          <div style={{padding:'10px', paddingLeft:'20px', fontSize:'24px', color:'#1b3b77'}}>
              { feedState.incoming ? 'Incoming' : 'Outgoing' } Notes
            </div>
        */}

        {
          feedState.outgoing ?
          feedState.waitingList.map((note) =>
            <div style={{borderBottom:'1px', borderColor:'#00000044', borderBottomStyle:'solid'}}>
              <WaitingNoteRow note={note}/>
            </div>
          ) : null
        }
        {
          feedState.currentList.map((note) =>
            <div style={{borderBottom:'1px', borderColor:'#00000044', borderBottomStyle:'solid'}}>
              {
                feedState.incoming ?
                <AcceptNoteRow note={note}/> :
                <ResolveNoteRow note={note}/>
              }
            </div>
          )
        }
        {
          feedState.incoming ?
          feedState.receivedList.map((note) =>
            <div style={{borderBottom:'1px', borderColor:'#00000044', borderBottomStyle:'solid'}}>
              <ReceivedNoteRow note={note}/>
            </div>
          ) : null
        }
      {/*<List style={{height:'inherit', overflow:'auto'}}>
          {
            this.state.infoList.map((note) =>
              <ListItem key={note.id}>
                <div className = 'amount' styles={{alignItems: 'left'}}>
                  <ListItemText>
                    <MuiThemeProvider theme={texttheme}>
                      <Typography variant='body' color='primary'>
                        {if ()}
                        ${formatMoney(note.amount) + ' - ' + note.sender + ' - ' + note.expirationDate.toDateString()}
                      </Typography>
                    </MuiThemeProvider>
                  </ListItemText>
                </div>
                <ListItemSecondaryAction>
                  <MuiThemeProvider theme={theme}>
                    <IconButton onClick={this.handleResolve.bind(this, note)} >
                      <ExitToApp color = 'primary'/>
                    </IconButton>
                  </MuiThemeProvider>
                </ListItemSecondaryAction>
              </ListItem>
            )
          }
        </List>*/}
      </div>
    )
  }
}

const tabStyles = theme => ({
  indicator:{
    backgroundColor:'#2c81b5',
  },
  tabRoot: {
    color: '#1b3b77',
    textTransform: 'none',
  },
});

@observer
class Comp extends Component {

  constructor(props) {
    super(props);

    feedState.tabValue = 0
  }

  handleChange(event, value) {
    feedState.tabValue = value;

    // Pending
    if(value === 0) {
      feedState.showIncoming();
    }
    else if(value === 1) {
      feedState.showOutgoing();
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position='static' style={{backgroundColor:'white'}}>
          <Tabs
            value={feedState.tabValue}
            onChange={this.handleChange.bind(this)}
            classes={{indicator: classes.indicator}}
            fullWidth
            >
            <Tab label='Lent' classes={{root: classes.tabRoot}}/>
            <Tab label='Borrowed' classes={{root: classes.tabRoot}}/>
          </Tabs>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}

class AcceptNoteRow extends Component {
  constructor(props) {
    super(props);
  }

  handleAccept(acceptNote) {
    feedState.acceptingNote = true;
    feedState.currentNote = acceptNote;
  }

  render() {
    return (
      <Grid container style={{paddingLeft:'20px', verticalAlign:'middle'}}>
        <Grid item xs={MONEY_COLS} style={styles.GridItem}>
          ${formatMoney(this.props.note.amount / 100)}
        </Grid>
        <Grid item xs={USER_COLS} style={styles.GridItem}>
          { this.props.note.sender }
        </Grid>
        <Grid item xs={DATE_COLS} style={styles.GridItem}>
          {
            formatDate(this.props.note.expiration_date)
          }
        </Grid>
        <Grid item xs={ICON_COLS}>
          <MuiThemeProvider theme={theme}>
            <IconButton onClick={this.handleAccept.bind(this, this.props.note)} >
              <Check color = 'primary'/>
            </IconButton>
          </MuiThemeProvider>
        </Grid>
      </Grid>
    );
  }
}

class ResolveNoteRow extends Component {
  constructor(props) {
    super(props);
  }

  handleResolve(resolveNote) {
    feedState.resolvingNote = true;
    feedState.currentNote = resolveNote;
  }

  render() {
    return (
      <Grid container style={{paddingLeft:'20px', verticalAlign:'middle'}}>
        <Grid item xs={MONEY_COLS} style={styles.GridItem}>
          ${formatMoney(this.props.note.amount / 100)}
        </Grid>
        <Grid item xs={USER_COLS} style={styles.GridItem}>
          {this.props.note.receiver}
        </Grid>
        <Grid item xs={DATE_COLS} style={styles.GridItem, { color: formatDate(this.props.note.expiration_date) === 'Overdue' ? 'red' : 'black', paddingTop:'15px'}}>
          {
            formatDate(this.props.note.expiration_date)
          }
        </Grid>
        <Grid item xs={ICON_COLS}>
          <MuiThemeProvider theme={theme}>
              <IconButton onClick={this.handleResolve.bind(this, this.props.note)} >
                <ExitToApp color = 'primary'/>
              </IconButton>
          </MuiThemeProvider>
        </Grid>
      </Grid>
    );
  }
}

const ReceivedNoteRow = props => (
  <Grid container style={{paddingLeft:'20px', paddingBottom:'15px', verticalAlign:'middle'}}>
    <Grid item xs={MONEY_COLS} style={styles.GridItem}>
      ${formatMoney(props.note.amount / 100)}
    </Grid>
    <Grid item xs={USER_COLS} style={styles.GridItem}>
      {props.note.sender}
    </Grid>
    <Grid item xs={DATE_COLS - 1} style={styles.GridItem, { color: formatDate(props.note.expiration_date) === 'Overdue' ? 'red' : 'black', paddingTop:'15px'}}>
      {
        formatDate(props.note.expiration_date)
      }
    </Grid>
    <Grid item xs={ICON_COLS + 1} style={styles.GridItem}>
      Waiting
    </Grid>
  </Grid>
)

const WaitingNoteRow = props => (
  <Grid container style={{paddingLeft:'20px', paddingBottom:'15px', verticalAlign:'middle'}}>
    <Grid item xs={MONEY_COLS} style={styles.GridItem}>
      ${formatMoney(props.note.amount / 100)}
    </Grid>
    <Grid item xs={USER_COLS} style={styles.GridItem}>
      {props.note.receiver}
    </Grid>
    <Grid item xs={DATE_COLS - 1} style={styles.GridItem}>
      {
        formatDate(props.note.expiration_date)
      }
    </Grid>
    <Grid item xs={ICON_COLS + 1} style={styles.GridItem}>
      Pending
    </Grid>
  </Grid>
)


const DashboardFeedHeader = withStyles(tabStyles)(Comp);
export { DashboardFeedHeader };
export default DashboardFeed;
