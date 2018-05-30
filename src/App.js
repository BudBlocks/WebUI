import React, { Component } from 'react';
import Directory from './Directory';
import SULI from './SULI';
import Dashboard from './Dashboard';
import NoteToggle from './NoteToggle';
import './App.css';
import { Switch, Route } from 'react-router-dom';

const App = () => (
  <Switch>
    <Route exact path='/' component={Directory}/>
    <Route path='/login' component={SULI}/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/sendnote' component={NoteToggle}/>
  </Switch>
)

let friends = ['Scott', 'Eric'];
for(let i = 0; i < 100; i++) {
  friends.push(i);
}
export {friends};

export default App;
