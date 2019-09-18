import React from 'react';
import './App.css';
import Admin from './Components/Administrator/administrator-component';
import {Switch, Route} from 'react-router-dom';
import Specialists from './Components/Specialists/specialists-component';
import Scoreboard from './Components/Scoreboard/scoreboard-component';

class App extends React.Component {
    render(){
      return (
        <Switch>
          <Route path = '/administrator' component = {Admin}/>
          <Route path = '/specialists' component = {Specialists}/>\
          <Route path = '/scoreboard' component = {Scoreboard}/>
        </Switch>
    );
  }
}

export default App;
