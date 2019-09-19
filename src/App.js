import React from 'react';
import './App.css';
import Admin from './Components/Administrator/administrator-component';
import {Switch, Route} from 'react-router-dom';
import Specialists from './Components/Specialists/specialists-component';
import Scoreboard from './Components/Scoreboard/scoreboard-component';
import data from './Components/Administrator/client-list-example';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      items: []
    }
    this.deleteItem = this.deleteItem.bind(this);
    this.addNewClient = this.addNewClient.bind(this);
    
  }
  
  deleteItem = (name, number) => {
    const copy = this.state.items;
    let index;
    copy.forEach((el) => {
        if(el.SpecialistName === name && el.Number === number){                
            index = copy.indexOf(el);
        }
        return el;                           
    });        
    copy.splice(index,1);
    this.setState({items: copy});
  }  
  addNewClient = (name, number) => {
    const add = {SpecialistName: name, Number: number};
    this.setState({items: [...this.state.items, add]});
  }
  componentDidMount(){
    const data = localStorage.getItem('state');
    if(data === null){
      this.setState({items: [
        {"SpecialistName":"John", "Number":"123"},
        {"SpecialistName":"Alysa", "Number":"148"},
        {"SpecialistName":"George", "Number":"153"},
        {"SpecialistName":"Antony", "Number":"124"},
        {"SpecialistName":"Tom", "Number":"144"},
        {"SpecialistName":"John", "Number":"189"},
        {"SpecialistName":"Alysa", "Number":"111"},
        {"SpecialistName":"George", "Number":"145"},
        {"SpecialistName":"Antony", "Number":"177"},
        {"SpecialistName":"Tom", "Number":"198"}]
      });
    }
    else{
      this.setState({items: JSON.parse(data)});
      console.log(JSON.parse(data));
    }
  }
  componentDidUpdate(){
    const data = JSON.stringify(this.state.items);
    localStorage.setItem('state', data);
  }
  /*async componentDidMount(){
    let response = await data;
    response = JSON.parse(response);
    this.setState({items: response.clients});   
  }*/
    render(){
      return (
        <Switch>
          <Route path = '/administrator' render = {(props) => <Admin {...props} Items = {this.state.items} addNewClient = {this.addNewClient}/>}/>
          <Route path = '/specialists' render = {(props) => <Specialists {...props} Items = {this.state.items} deleteItem = {this.deleteItem}/>}/>
          <Route path = '/scoreboard' render = {(props) => <Scoreboard {...props} Items = {this.state.items}/>}/>
        </Switch>

    );
  }
}

export default App;
