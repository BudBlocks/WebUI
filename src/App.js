import React, { Component } from 'react';
import Directory from './Directory';
import SULI from './Login/SULI';
import Dashboard from './Dashboard/Dashboard';
import NoteToggle from './SendNote/NoteToggle';
import HomeFriends from './HomeFriends';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Bank from './Bank/Bank';
import store from './UserStore';
import NoteModal from './NoteModal';

import { acceptNote } from './Utils';

const App = () => (
  <Switch>
    <Route exact path='/' component={Test}/>
    <Route path='/login' component={SULI}/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/sendnote' component={NoteToggle}/>
    <Route path='/friends' component={HomeFriends}/>
    <Route path='/bank' component={Bank}/>
  </Switch>
)

const Test = () => (
  <div>
    <NoteModal header="Accept Note" note={{sender:"edopp", amount:"58", message:"Here ya go."}}/>
  </div>
)

let friends = ['Scott', 'Eric'];
for(let i = 0; i < 100; i++) {
  friends.push(i);
}
export {friends};

acceptNote('u1.0');

export default App;
