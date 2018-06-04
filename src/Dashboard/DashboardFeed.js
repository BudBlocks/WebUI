import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import {ArrowDownward, ArrowUpward} from '@material-ui/icons';
import {IconButton, Icon, Grid, AppBar, Tabs, Tab} from '@material-ui/core';
import { friends } from '../App';
import { formatMoney } from '../Utils';
import { getAllNotes } from '../Utils';
import store from '../UserStore';
import NoteModal from '../NoteModal';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import { ExitToApp, Check } from '@material-ui/icons';
import './DashboardFeed.css';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';
import { observable, action } from 'mobx';
import { withStyles } from '@material-ui/core/styles';

let unresolved = []
let incoming = []

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

for(let i = 0; i < 20; i++) {
  unresolved.push({
    id: i,
    amount: Math.random() * 50,
    expirationDate: new Date(),
    sender: "scooter",
  });
  incoming.push({
    id: i,
    amount: Math.random() * 10,
    expirationDate: new Date(),
    sender: "mcdaniels",
  })
}

class FeedState {
  @observable incoming = false;
  @observable outgoing = true;
  @observable currentList = []
  @observable incomingList = []
  @observable outgoingList = []

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

  @action removeIncomingNote(note) {
    for(let i = 0; i < this.incomingList.length; i++){
      if(this.incomingList[i].id == note.id) {
        this.incomingList.splice(i, 1);
      }
    }
  }

  @action removeOutgoingNote(note) {
    for(let i = 0; i < this.outgoingList.length; i++){
      if(this.outgoingList[i].id == note.id) {
        this.outgoingList.splice(i, 1);
      }
    }
  }
}

var feedState = new FeedState();
export { feedState };

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
      loading: false,
      tabValue: 0,
    }

    feedState.incomingList = incoming;
    feedState.outgoingList = unresolved;
    feedState.showIncoming();

    this.refresh = this.refresh.bind(this);
  }

  handleResolve(resolveNote) {
    this.setState({
      resolvingNote: true,
      currentNote: {
          id: resolveNote.id,
          sender: resolveNote.sender,
          amount: resolveNote.amount,
          message: "default message",
      }
    });
    // this.setState((prevState) => ({
    //   infoList: prevState.infoList.filter(note => note.id != resolveNote.id)
    // }));
    // store.balance -= resolveNote.amount;
  }

  componentDidMount() {
    this.setState({loading:true});
    this.refresh();
  }

  handleAccept(acceptNote) {
    this.setState({
      acceptingNote: true,
      currentNote: {
          id: acceptNote.id,
          sender: acceptNote.sender,
          amount: acceptNote.amount,
          message: "default message",
      }
    })
  }

  handleChange(event, value) {
    this.setState({
      tabValue: value
    })
  }

  refresh() {
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
        loading: false
      });
    });
  }

  render() {
    if(this.state.loading) {
      return (
        <div className='loader'></div>
      );
    }
    return (
      <div>
        <NoteModal
          open={this.state.resolvingNote}
          header="Resolve Note"
          note={this.state.currentNote}
          confirm="Confirm"
          reject="Cancel"
          onAccept={() => {
            feedState.removeOutgoingNote(this.state.currentNote);
            this.setState({ resolvingNote: false })
            store.balance -= this.state.currentNote.amount;
          }}
          onReject={() => {
            this.setState({ resolvingNote: false });
          }}
        />
        <NoteModal
          open={this.state.acceptingNote}
          header="Accept Note"
          note={this.state.currentNote}
          confirm="Accept"
          reject="Reject"
          onAccept={() => {
            // accept the note
            feedState.removeIncomingNote(this.state.currentNote);
            this.setState({
              acceptingNote: false
            })
          }}
          onReject={() => {
            // reject the note
            this.setState({
              acceptingNote: false
            })
          }}
        />
      {/*
          <div style={{padding:'10px', paddingLeft:'20px', fontSize:'24px', color:'#1b3b77'}}>
              { feedState.incoming ? 'Incoming' : 'Outgoing' } Notes
            </div>
        */}


        {
          feedState.currentList.map((note) =>
          <div style={{borderBottom:'1px', borderColor:'#00000044', borderBottomStyle:'solid'}}>
            <Grid container style={{paddingLeft:'20px', verticalAlign:'middle'}}>
              <Grid item xs={2} style={styles.GridItem}>
                ${formatMoney(note.amount)}
              </Grid>
              <Grid item xs={3} style={styles.GridItem}>
                {note.sender}
              </Grid>
              <Grid item xs={5} style={styles.GridItem}>
                {note.expirationDate.toDateString()}
              </Grid>
              <Grid item xs={2}>
                <MuiThemeProvider theme={theme}>
                  {
                    feedState.outgoing ?
                      <IconButton onClick={this.handleResolve.bind(this, note)} >
                        <ExitToApp color = 'primary'/>
                      </IconButton>
                    :
                      <IconButton onClick={this.handleAccept.bind(this, note)} >
                        <Check color = 'primary'/>
                      </IconButton>
                  }
                </MuiThemeProvider>
              </Grid>
              </Grid>
            </div>
          )
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

class Comp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tabValue: 0
    }
  }

  handleChange(event, value) {
    this.setState({ tabValue: value });

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
            value={this.state.tabValue}
            onChange={this.handleChange.bind(this)}
            classes={{indicator: classes.indicator}}
            fullWidth
            >
            <Tab label='Pending' classes={{root: classes.tabRoot}}/>
            <Tab label='Owed' classes={{root: classes.tabRoot}}/>
          </Tabs>
        </AppBar>
      </MuiThemeProvider>
    );
  }
}
const DashboardFeedHeader = withStyles(tabStyles)(Comp);
export { DashboardFeedHeader };
export default DashboardFeed;
