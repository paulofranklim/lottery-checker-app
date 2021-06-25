import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home'
import Login from './pages/login'
import Users from './pages/users'
import Games from './pages/games'
import Bets from './pages/bets'
import { PrivateRoute } from './components/privaterouter'

export default function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/home" exact component={Home} />
        <PrivateRoute path="/users" exact component={Users} />
        <PrivateRoute path="/games" exact component={Games} />
        <PrivateRoute path="/bets" exact component={Bets} />
      </Switch>
    </BrowserRouter>
  );

}