import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import SULI from './SULI';
import Dashboard from './Dashboard';
import NoteToggle from './NoteToggle';
import { Switch, Route, Link } from 'react-router-dom';

const styles = {
  StretchButton: {
    width: '100%',
    height: '100px',
    fontSize: '36px'
  }
}

const Directory = () => (
    <div>
      <Button style={styles.StretchButton} component={Link} to='/login'>Sign Up</Button>
      <Button style={styles.StretchButton} component={Link} to='/dashboard'>Dashboard</Button>
      <Button style={styles.StretchButton} component={Link} to='/sendnote'>Note Toggle</Button>
      <Button style={styles.StretchButton} component={Link} to='/friends'>Friends</Button>
    </div>
  )

export default Directory;
