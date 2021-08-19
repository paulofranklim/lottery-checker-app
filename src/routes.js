import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/home'
import Login from './pages/login'
import Users from './pages/users'
import Games from './pages/games'
import MyBets from './pages/mybets'
import AllBets from './pages/allbets'
import { PrivateRoute } from './components/privaterouter'

export default function Routes() {

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <PrivateRoute path="/home" exact component={Home} />
        <PrivateRoute path="/users" exact component={Users} />
        <PrivateRoute path="/games" exact component={Games} />
        <PrivateRoute path="/my-bets" exact component={MyBets} />
        <PrivateRoute path="/all-bets" exact component={AllBets} />
      </Switch>
    </BrowserRouter>
  );

}