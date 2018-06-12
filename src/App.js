import React from 'react';
import SULI from './Login/SULI';
import Dashboard from './Dashboard/Dashboard';
import NoteToggle from './SendNote/NoteToggle';
import HomeFriends from './HomeFriends';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Bank from './Bank/Bank';


const App = () => (
  <Switch>
    <Route exact path='/' component={SULI}/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/sendnote' component={NoteToggle}/>
    <Route path='/friends' component={HomeFriends}/>
    <Route path='/bank' component={Bank}/>
  </Switch>
)

export default App;
