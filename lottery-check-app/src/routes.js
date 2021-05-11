import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home'
import Login from './pages/login'
import { PrivateRoute } from './components/privaterouter'

export default function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/home" exact component={Home} />
      </Switch>
    </BrowserRouter>
  );

}