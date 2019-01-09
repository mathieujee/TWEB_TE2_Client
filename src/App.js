import React from 'react';
import { Switch, Route } from 'react-router-dom'

import { LoginPage } from './components/LoginPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './components/HomePage';

export default () => {
  return (    
    <Switch>
      <ProtectedRoute path="/" exact component={HomePage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}
